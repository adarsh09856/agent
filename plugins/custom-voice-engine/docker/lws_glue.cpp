#include <switch.h>
#include <string.h>
#include <string>
#include <mutex>
#include <list>
#include <vector>
#include <algorithm>
#include <condition_variable>
#include <cctype>
#include <cassert>

#include "mod_audio_fork.h"

// buffer at most 2 secs of audio (at 20 ms packetization)
#define MAX_BUFFERED_MSGS (100)

namespace {
  static int interrupted = 0;
  static struct lws_context *context = NULL;
  static std::list<struct cap_cb *> pendingConnects;
  static std::list<struct cap_cb *> pendingDisconnects;
  static std::list<struct cap_cb *> pendingWrites;
  static std::mutex g_mutex_connects;
  static std::mutex g_mutex_disconnects;
  static std::mutex g_mutex_writes;

  // Mutex protecting cap_cb lifecycle release actions
  static std::mutex g_mutex_cb_lifecycle;

  // Base64 helper characters
  static const std::string base64_chars =
               "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
               "abcdefghijklmnopqrstuvwxyz"
               "0123456789+/";

  static inline bool is_base64(unsigned char c) {
    return (isalnum(c) || (c == '+') || (c == '/'));
  }

  // C++ Base64 Decoder
  std::vector<uint8_t> base64_decode(std::string const& encoded_string) {
    int in_len = encoded_string.size();
    int i = 0;
    int j = 0;
    int in_ = 0;
    unsigned char char_array_4[4], char_array_3[3];
    std::vector<uint8_t> ret;

    while (in_len-- && ( encoded_string[in_] != '=') && is_base64(encoded_string[in_])) {
      char_array_4[i++] = encoded_string[in_]; in_++;
      if (i == 4) {
        for (i = 0; i < 4; i++)
          char_array_4[i] = base64_chars.find(char_array_4[i]);

        char_array_3[0] = (char_array_4[0] << 2) + ((char_array_4[1] & 0x30) >> 4);
        char_array_3[1] = ((char_array_4[1] & 0xf) << 4) + ((char_array_4[2] & 0x3c) >> 2);
        char_array_3[2] = ((char_array_4[2] & 0x3) << 6) + char_array_4[3];

        for (i = 0; (i < 3); i++)
          ret.push_back(char_array_3[i]);
        i = 0;
      }
    }

    if (i) {
      for (j = i; j < 4; j++)
        char_array_4[j] = 0;

      for (j = 0; j < 4; j++)
        char_array_4[j] = base64_chars.find(char_array_4[j]);

      char_array_3[0] = (char_array_4[0] << 2) + ((char_array_4[1] & 0x30) >> 4);
      char_array_3[1] = ((char_array_4[1] & 0xf) << 4) + ((char_array_4[2] & 0x3c) >> 2);
      char_array_3[2] = ((char_array_4[2] & 0x3) << 6) + char_array_4[3];

      for (j = 0; (j < i - 1); j++) ret.push_back(char_array_3[j]);
    }

    return ret;
  }

  void bufInit(struct cap_cb* cb) {
    cb->buf_head = &cb->audio_buffer[0] + LWS_PRE;
  }
  uint8_t* bufGetWriteHead(struct cap_cb* cb) {
    return cb->buf_head;
  }
  uint8_t* bufGetReadHead(struct cap_cb* cb) {
    return &cb->audio_buffer[0] + LWS_PRE;
  }
  size_t bufGetAvailable(struct cap_cb* cb) {
    uint8_t* pEnd = &cb->audio_buffer[0] + sizeof(cb->audio_buffer);
    assert(cb->buf_head <= pEnd);
    return pEnd - cb->buf_head;
  }
  size_t bufGetUsed(struct cap_cb* cb) {
    return cb->buf_head - &cb->audio_buffer[0] - LWS_PRE;
  }
  void bufBumpWriteHead(struct cap_cb* cb, spx_uint32_t len) {
    cb->buf_head += len;
    assert(cb->buf_head <= &cb->audio_buffer[0] + sizeof(cb->audio_buffer));
  }

  void addPendingConnect(struct cap_cb* cb) {
    std::lock_guard<std::mutex> guard(g_mutex_connects);
    cb->state = LWS_CLIENT_IDLE;
    pendingConnects.push_back(cb);
    switch_log_printf(SWITCH_CHANNEL_LOG, SWITCH_LOG_DEBUG, "addPendingConnect - after adding there are now %d pending\n", pendingConnects.size());
  }

  void addPendingDisconnect(struct cap_cb* cb) {
    std::lock_guard<std::mutex> guard(g_mutex_disconnects);
    cb->state = LWS_CLIENT_DISCONNECTING;
    pendingDisconnects.push_back(cb);
    switch_log_printf(SWITCH_CHANNEL_LOG, SWITCH_LOG_DEBUG, "addPendingDisconnect - after adding there are now %d pending\n", pendingDisconnects.size());
  }

  void addPendingWrite(struct cap_cb* cb) {
    std::lock_guard<std::mutex> guard(g_mutex_writes);
    pendingWrites.push_back(cb);
  }

  struct cap_cb* findAndRemovePendingConnect(struct lws *wsi) {
    struct cap_cb* cb = NULL;
    std::lock_guard<std::mutex> guard(g_mutex_connects);

    for (auto it = pendingConnects.begin(); it != pendingConnects.end() && !cb; ++it) {
      if ((*it)->state == LWS_CLIENT_CONNECTING && (*it)->wsi == wsi) cb = *it;
    }

    if (cb) pendingConnects.remove(cb);

    switch_log_printf(SWITCH_CHANNEL_LOG, SWITCH_LOG_DEBUG, "findAndRemovePendingConnect - after removing there are now %d pending\n", pendingConnects.size());

    return cb;
  }

  void destroy_cb(struct cap_cb *cb) {
    switch_log_printf(SWITCH_CHANNEL_LOG, SWITCH_LOG_DEBUG, "destroy_cb - freeing resources for session: %s\n", cb->sessionId);
    if (cb->resampler) {
      speex_resampler_destroy(cb->resampler);
      cb->resampler = NULL;
    }
    // CRASH FIX: Only destroy mutex/cond if session has not been released.
    // If the session has already been released, FreeSWITCH already freed the pool.
    if (!cb->session_released) {
      if (cb->mutex) {
        switch_mutex_destroy(cb->mutex);
        cb->mutex = NULL;
      }
      if (cb->cond) {
        switch_thread_cond_destroy(cb->cond);
        cb->cond = NULL;
      }
    }
    if (cb->metadata) {
      delete[] cb->metadata;
      cb->metadata = NULL;
    }
    // Heap-allocated structure is freed here
    free(cb);
  }

  void release_session(struct cap_cb* cb) {
    bool should_delete = false;
    bool should_disconnect = false;
    {
      std::lock_guard<std::mutex> guard(g_mutex_cb_lifecycle);
      cb->session_released = 1;
      if (cb->connection_released) {
        should_delete = true;
      } else if (cb->wsi && cb->state == LWS_CLIENT_CONNECTED) {
        should_disconnect = true;
        cb->state = LWS_CLIENT_DISCONNECTING;
      }
    }

    if (should_delete) {
      destroy_cb(cb);
    } else if (should_disconnect) {
      switch_mutex_lock(cb->mutex);
      addPendingDisconnect(cb);
      lws_cancel_service(cb->vhd->context);
      switch_mutex_unlock(cb->mutex);
    }
  }

  void release_connection(struct cap_cb* cb) {
    bool should_delete = false;
    {
      std::lock_guard<std::mutex> guard(g_mutex_cb_lifecycle);
      cb->connection_released = 1;
      if (cb->session_released) {
        should_delete = true;
      }
    }

    if (should_delete) {
      destroy_cb(cb);
    }
  }

  int connect_client(struct cap_cb* cb, struct lws_per_vhost_data *vhd) {
    struct lws_client_connect_info i;

    memset(&i, 0, sizeof(i));

    i.context = vhd->context;
    i.port = cb->port;
    i.address = cb->host;
    i.path = cb->path;
    i.host = i.address;
    i.origin = i.address;
    i.ssl_connection = cb->sslFlags;
    i.protocol = "audiostream.drachtio.org";
    i.pwsi = &(cb->wsi);

    cb->state = LWS_CLIENT_CONNECTING;
    cb->vhd = vhd;

    if (!lws_client_connect_via_info(&i)) {
      //cb->state = LWS_CLIENT_IDLE;
      return 0;
    }

    return 1;
  }

  static int lws_callback(struct lws *wsi,
    enum lws_callback_reasons reason,
    void *user, void *in, size_t len) {

    struct lws_per_vhost_data *vhd =
      (struct lws_per_vhost_data *) lws_protocol_vh_priv_get(lws_get_vhost(wsi), lws_get_protocol(wsi));

    struct lws_vhost* vhost = lws_get_vhost(wsi);
    struct cap_cb ** pCb = (struct cap_cb **) user;

    switch (reason) {

    case LWS_CALLBACK_PROTOCOL_INIT:
      switch_log_printf(SWITCH_CHANNEL_LOG, SWITCH_LOG_DEBUG, "lws_callback LWS_CALLBACK_PROTOCOL_INIT wsi: %p\n", wsi);
      vhd = (struct lws_per_vhost_data *) lws_protocol_vh_priv_zalloc(lws_get_vhost(wsi), lws_get_protocol(wsi), sizeof(struct lws_per_vhost_data));
      vhd->context = lws_get_context(wsi);
      vhd->protocol = lws_get_protocol(wsi);
      vhd->vhost = lws_get_vhost(wsi);
      break;

    case LWS_CALLBACK_EVENT_WAIT_CANCELLED:
      {
        // check if we have any new connections requested
        {
          std::lock_guard<std::mutex> guard(g_mutex_connects);
          for (auto it = pendingConnects.begin(); it != pendingConnects.end(); ++it) {
            struct cap_cb* cb = *it;
            if (cb->state == LWS_CLIENT_IDLE) {
              connect_client(cb, vhd);
            }
          }
        }

        // process disconnects
        {
          std::lock_guard<std::mutex> guard(g_mutex_disconnects);
          for (auto it = pendingDisconnects.begin(); it != pendingDisconnects.end(); ++it) {
            struct cap_cb* cb = *it;
            if (cb->wsi) {
              lws_callback_on_writable(cb->wsi);
            }
          }
          pendingDisconnects.clear();
        }

        // process writes
        {
          std::lock_guard<std::mutex> guard(g_mutex_writes);
          for (auto it = pendingWrites.begin(); it != pendingWrites.end(); ++it) {
            struct cap_cb* cb = *it;
            if (cb->wsi) {
              lws_callback_on_writable(cb->wsi);
            }
          }
          pendingWrites.clear();
        }

      }
      break;

    /* --- client callbacks --- */
    case LWS_CALLBACK_CLIENT_CONNECTION_ERROR:
      switch_log_printf(SWITCH_CHANNEL_LOG, SWITCH_LOG_INFO, "lws_callback LWS_CALLBACK_CLIENT_CONNECTION_ERROR wsi: %p\n", wsi);
      {
        struct cap_cb* my_cb = findAndRemovePendingConnect(wsi);
        if (!my_cb) {
          switch_log_printf(SWITCH_CHANNEL_LOG, SWITCH_LOG_ERROR, "lws_callback LWS_CALLBACK_CLIENT_CONNECTION_ERROR unable to find pending connection for wsi: %p\n", wsi);
        }
        else {
          struct cap_cb *cb = *pCb = my_cb;
          switch_mutex_lock(cb->mutex);
          cb->state = LWS_CLIENT_FAILED;
          switch_thread_cond_signal(cb->cond);
          switch_mutex_unlock(cb->mutex);
        }
      }
      break;


    case LWS_CALLBACK_CLIENT_ESTABLISHED:

      // remove the associated cb from the pending list and allocate audio ring buffer
      {
        struct cap_cb* my_cb = findAndRemovePendingConnect(wsi);
        if (!my_cb) {
          switch_log_printf(SWITCH_CHANNEL_LOG, SWITCH_LOG_ERROR, "lws_callback LWS_CALLBACK_CLIENT_ESTABLISHED unable to find pending connection for wsi: %p\n", wsi);
        }
        else {
          struct cap_cb *cb = *pCb = my_cb;
          switch_mutex_lock(cb->mutex);
          cb->vhd = vhd;
          cb->state = LWS_CLIENT_CONNECTED;
          switch_thread_cond_signal(cb->cond);
          switch_mutex_unlock(cb->mutex);
        }
      }
      break;

    case LWS_CALLBACK_CLIENT_CLOSED:
      {
        struct cap_cb *cb = *pCb;
        if (cb) {
          switch_log_printf(SWITCH_CHANNEL_LOG, SWITCH_LOG_DEBUG, "lws_callback LWS_CALLBACK_CLIENT_CLOSED wsi: %p (state: %d)\n", wsi, cb->state);
          cb->wsi = NULL;
          release_connection(cb);
          *pCb = NULL;
        }
      }
      break;

    case LWS_CALLBACK_CLIENT_RECEIVE:
      {
        struct cap_cb *cb = *pCb;
        if (cb) {
          std::string msg((const char*)in, len);
          size_t type_pos = msg.find("\"type\":\"playAudio\"");
          size_t content_pos = msg.find("\"audioContent\":\"");

          if (type_pos != std::string::npos && content_pos != std::string::npos) {
            content_pos += 16; // Skip past key characters
            size_t end_pos = msg.find("\"", content_pos);
            if (end_pos != std::string::npos) {
              std::string b64 = msg.substr(content_pos, end_pos - content_pos);
              std::vector<uint8_t> pcm = base64_decode(b64);

              if (!pcm.empty()) {
                // Generate a unique temp file path
                char filePath[256];
                switch_time_t now = switch_micro_time_now();
                snprintf(filePath, sizeof(filePath), "/tmp/%s_%lld.raw", cb->sessionId, (long long)now);

                // Write the raw PCM 8k mono audio to the file
                FILE* f = fopen(filePath, "wb");
                if (f) {
                  fwrite(pcm.data(), 1, pcm.size(), f);
                  fclose(f);

                  // Fire the CUSTOM event in FreeSWITCH to notify the Node.js ESL listener
                  switch_event_t *event = NULL;
                  if (switch_event_create_subclass(&event, SWITCH_EVENT_CUSTOM, "mod_audio_fork::play_audio") == SWITCH_STATUS_SUCCESS) {
                    switch_event_add_header_string(event, SWITCH_STACK_BOTTOM, "Unique-ID", cb->sessionId);
                    switch_event_add_header_string(event, SWITCH_STACK_BOTTOM, "Channel-Call-UUID", cb->sessionId);
                    switch_event_add_body(event, "{\"file\":\"%s\"}", filePath);
                    switch_event_fire(&event);
                  }
                }
              }
            }
          }
        }
      }
      break;

    case LWS_CALLBACK_CLIENT_WRITEABLE:
      {
        struct cap_cb *cb = *pCb;
        if (!cb || cb->state == LWS_CLIENT_DISCONNECTING) {
          return -1;
        }

        // check for initial metadata
        if (cb->metadata) {
          int n = cb->metadata_length - LWS_PRE - 1;
          int m = lws_write(wsi, cb->metadata + LWS_PRE, n, LWS_WRITE_TEXT);
          delete[] cb->metadata;
          cb->metadata = NULL;
          cb->metadata_length = 0;
          if (m < n) {
            switch_log_printf(SWITCH_CHANNEL_LOG, SWITCH_LOG_ERROR, "error writing metadata %d requested, %d written\n", n, m);
            return -1;
          }
        }
        else {
          // check for audio packets
          switch_mutex_lock(cb->mutex);
          int n = bufGetUsed(cb);
          if (n > 0) {
            int m = lws_write(wsi, bufGetReadHead(cb), n, LWS_WRITE_BINARY);
            if (m < n) {
              switch_log_printf(SWITCH_CHANNEL_LOG, SWITCH_LOG_ERROR, "error writing audio data %d requested, %d written\n", n, m);
              return -1;
            }
            bufInit(cb);
          }
          switch_mutex_unlock(cb->mutex);
        }
        return 0;
      }
      break;

    default:
      break;
    }

    return lws_callback_http_dummy(wsi, reason, user, in, len);
  }

  static const struct lws_protocols protocols[] = {
    {
      "audiostream.drachtio.org",
      lws_callback,
      sizeof(void *),
      0,
    },
    { NULL, NULL, 0, 0 }
  };

  void lws_logger(int level, const char *line) {
    switch_log_level_t llevel = SWITCH_LOG_DEBUG;

    switch (level) {
      case LLL_ERR: llevel = SWITCH_LOG_ERROR; break;
      case LLL_WARN: llevel = SWITCH_LOG_WARNING; break;
      case LLL_NOTICE: llevel = SWITCH_LOG_NOTICE; break;
      case LLL_INFO: llevel = SWITCH_LOG_INFO; break;
      break;
    }
    switch_log_printf(SWITCH_CHANNEL_LOG, llevel, "%s\n", line);
  }

}

extern "C" {

  int parse_ws_uri(const char* szServerUri, char* host, char *path, unsigned int* pPort, int* pSslFlags) {
    std::string uri(szServerUri);

    // Parse scheme
    std::string scheme;
    size_t scheme_end = uri.find("://");
    if (scheme_end == std::string::npos) {
      return 0;
    }
    scheme = uri.substr(0, scheme_end);

    // Validate scheme
    if (scheme == "ws" || scheme == "WS" || scheme == "http" || scheme == "HTTP") {
      *pSslFlags = 0;
      *pPort = 80;
    } else if (scheme == "wss" || scheme == "WSS" || scheme == "https" || scheme == "HTTPS") {
      *pSslFlags = LCCSCF_USE_SSL | LCCSCF_ALLOW_SELFSIGNED;
      *pPort = 443;
    } else {
      return 0;
    }

    std::string rest = uri.substr(scheme_end + 3);

    // Find path start
    size_t path_start = rest.find('/');
    std::string host_port;
    if (path_start == std::string::npos) {
      host_port = rest;
      strcpy(path, "/");
    } else {
      host_port = rest.substr(0, path_start);
      std::string path_str = rest.substr(path_start);
      strncpy(path, path_str.c_str(), MAX_PATH_LEN - 1);
      path[MAX_PATH_LEN - 1] = '\0';
    }

    // Parse host and port
    size_t colon = host_port.find(':');
    if (colon == std::string::npos) {
      strncpy(host, host_port.c_str(), MAX_WS_URL_LEN - 1);
      host[MAX_WS_URL_LEN - 1] = '\0';
    } else {
      std::string host_str = host_port.substr(0, colon);
      std::string port_str = host_port.substr(colon + 1);
      strncpy(host, host_str.c_str(), MAX_WS_URL_LEN - 1);
      host[MAX_WS_URL_LEN - 1] = '\0';
      *pPort = atoi(port_str.c_str());
    }

    return 1;
  }



  switch_status_t fork_init() {
    return SWITCH_STATUS_SUCCESS;
  }

  switch_status_t fork_cleanup() {
    return SWITCH_STATUS_SUCCESS;
  }

  switch_status_t fork_session_init(switch_core_session_t *session,
              uint32_t samples_per_second,
              char *host,
              unsigned int port,
              char *path,
              int sampling,
              int sslFlags,
              int channels,
              char* metadata,
              void **ppUserData)
  {
    switch_channel_t *channel = switch_core_session_get_channel(session);
    struct cap_cb *cb;
    int err;

    // HEAP ALLOCATION (So it doesn't get auto-freed by session memory pool)
    cb = (struct cap_cb *) malloc(sizeof(struct cap_cb));
    memset(cb, 0, sizeof(struct cap_cb));

    cb->base = switch_core_session_strdup(session, "mod_audio_fork");
    strncpy(cb->sessionId, switch_core_session_get_uuid(session), MAX_SESSION_ID);
    cb->state = LWS_CLIENT_IDLE;
    strncpy(cb->host, host, MAX_WS_URL_LEN);
    cb->port = port;
    strncpy(cb->path, path, MAX_PATH_LEN);
    cb->sslFlags = sslFlags;
    cb->wsi = NULL;
    cb->vhd = NULL;
    cb->metadata = NULL;
    cb->sampling = sampling;
    cb->session_released = 0;
    cb->connection_released = 0;
    bufInit(cb);

    switch_mutex_init(&cb->mutex, SWITCH_MUTEX_NESTED, switch_core_session_get_pool(session));
    switch_thread_cond_create(&cb->cond, switch_core_session_get_pool(session));

    cb->resampler = speex_resampler_init(channels, 8000, sampling, SWITCH_RESAMPLE_QUALITY, &err);

    if (0 != err) {
      switch_log_printf(SWITCH_CHANNEL_SESSION_LOG(session), SWITCH_LOG_ERROR, "%s: Error initializing resampler: %s.\n",
        switch_channel_get_name(channel), speex_resampler_strerror(err));
      free(cb);
      return SWITCH_STATUS_FALSE;
    }

    // now try to connect
    switch_mutex_lock(cb->mutex);
    addPendingConnect(cb);
    lws_cancel_service(context);
    switch_thread_cond_wait(cb->cond, cb->mutex);
    switch_mutex_unlock(cb->mutex);

    if (cb->state == LWS_CLIENT_FAILED) {
      switch_log_printf(SWITCH_CHANNEL_SESSION_LOG(session), SWITCH_LOG_ERROR, "%s: failed connecting to host %s\n",
        switch_channel_get_name(channel), host);
      destroy_cb(cb);
      return SWITCH_STATUS_FALSE;
    }

    // write initial metadata
    cb->metadata_length = strlen(metadata) + 1 + LWS_PRE;
    cb->metadata = new uint8_t[cb->metadata_length];
    memset(cb->metadata, 0, cb->metadata_length);
    memcpy(cb->metadata + LWS_PRE, metadata, strlen(metadata));
    addPendingWrite(cb);
    lws_cancel_service(cb->vhd->context);

    *ppUserData = cb;
    return SWITCH_STATUS_SUCCESS;
  }

  switch_status_t fork_session_cleanup(switch_core_session_t *session) {
    switch_channel_t *channel = switch_core_session_get_channel(session);
    switch_media_bug_t *bug = (switch_media_bug_t*) switch_channel_get_private(channel, MY_BUG_NAME);

    if (bug) {
      struct cap_cb *cb = (struct cap_cb *) switch_core_media_bug_get_user_data(bug);
      switch_channel_set_private(channel, MY_BUG_NAME, NULL);

      // Release session ownership thread-safely
      release_session(cb);

      switch_log_printf(SWITCH_CHANNEL_SESSION_LOG(session), SWITCH_LOG_INFO, "fork_session_cleanup: Closed stream\n");
      return SWITCH_STATUS_SUCCESS;
    }
    switch_log_printf(SWITCH_CHANNEL_SESSION_LOG(session), SWITCH_LOG_INFO, "%s Bug is not attached.\n", switch_channel_get_name(channel));
    return SWITCH_STATUS_FALSE;
  }

  switch_bool_t fork_frame(switch_media_bug_t *bug, void* user_data) {
    switch_core_session_t *session = switch_core_media_bug_get_session(bug);
    struct cap_cb *cb = (struct cap_cb *) user_data;
    bool written = false;
    int channels = switch_core_media_bug_test_flag(bug, SMBF_STEREO) ? 2 : 1;

    // Check if session has already been released to avoid use-after-free
    {
      std::lock_guard<std::mutex> guard(g_mutex_cb_lifecycle);
      if (cb->session_released) {
        return SWITCH_TRUE;
      }
    }

    if (switch_mutex_trylock(cb->mutex) == SWITCH_STATUS_SUCCESS) {
      uint8_t data[SWITCH_RECOMMENDED_BUFFER_SIZE];
      switch_frame_t frame = {};
      frame.data = data;
      frame.buflen = SWITCH_RECOMMENDED_BUFFER_SIZE;

      while (switch_core_media_bug_read(bug, &frame, SWITCH_TRUE) == SWITCH_STATUS_SUCCESS && !switch_test_flag((&frame), SFF_CNG)) {
        if (frame.datalen) {
          size_t n = bufGetAvailable(cb) >> 1;  // divide by 2 to num of uint16_t spaces available
          if (n  > frame.samples) {
            spx_uint32_t out_len = n;
            spx_uint32_t in_len = frame.samples;

            speex_resampler_process_interleaved_int(cb->resampler,
              (const spx_int16_t *) frame.data,
              (spx_uint32_t *) &in_len,
              (spx_int16_t *) bufGetWriteHead(cb),
              &out_len);

             // i.e., if we wrote 320 16bit items then we need to increment 320*2 bytes in single-channel mode, twice that in dual channel
            bufBumpWriteHead(cb, out_len << channels);
            written = true;
          }
          else {
            switch_log_printf(SWITCH_CHANNEL_SESSION_LOG(session), SWITCH_LOG_ERROR, "Dropping packet.\n");
          }
        }
      }
      switch_mutex_unlock(cb->mutex);
    }

    // Only register write if connection is active
    if (cb->state == LWS_CLIENT_CONNECTED && written) {
      addPendingWrite(cb);
      lws_cancel_service(cb->vhd->context);
    }

    return SWITCH_TRUE;
  }

  switch_status_t fork_service_thread(int *pRunning) {
    struct lws_context_creation_info info;
    int logs = LLL_ERR | LLL_WARN | LLL_NOTICE ;
      //LLL_INFO | LLL_PARSER | LLL_HEADER | LLL_EXT | LLL_CLIENT  | LLL_LATENCY | LLL_DEBUG ;

    lws_set_log_level(logs, lws_logger);

    memset(&info, 0, sizeof info);
    info.port = CONTEXT_PORT_NO_LISTEN;
    info.protocols = protocols;
    info.options = LWS_SERVER_OPTION_DO_SSL_GLOBAL_INIT;

    context = lws_create_context(&info);
    if (!context) {
      switch_log_printf(SWITCH_CHANNEL_LOG, SWITCH_LOG_ERROR, "mod_audio_fork: lws_create_context failed\n");
      return SWITCH_STATUS_FALSE;
    }
    switch_log_printf(SWITCH_CHANNEL_LOG, SWITCH_LOG_NOTICE, "mod_audio_fork: successfully created lws context\n");

    int n;
    do {
      n = lws_service(context, 500);
    } while (n >= 0 && *pRunning);

    lws_context_destroy(context);
    return SWITCH_STATUS_FALSE;
  }    

}