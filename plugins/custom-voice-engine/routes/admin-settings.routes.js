import { Router } from "express";
import { db } from "../../../server/db.js";
import { sql } from "drizzle-orm";
function createAdminSettingsRouter() {
  const router = Router();
  (async () => {
    try {
      await db.execute(sql`DROP TABLE IF EXISTS ve_sip_gateways CASCADE;`);
      console.log("[VE Admin] Deleted old ve_sip_gateways table");
    } catch (err) {
      console.error("[VE Admin] Failed to drop ve_sip_gateways table:", err.message);
    }
  })();
  router.get("/", async (_req, res) => {
    try {
      const result = await db.execute(
        sql`SELECT * FROM ve_freeswitch_nodes ORDER BY created_at ASC`
      );
      res.json({
        success: true,
        data: {
          nodes: result.rows,
          totalNodes: result.rows.length,
          onlineNodes: result.rows.filter((n) => n.status === "online").length
        }
      });
    } catch (err) {
      console.error("[VE Admin] Error fetching settings:", err.message);
      res.status(500).json({ success: false, error: "Failed to fetch settings" });
    }
  });
  router.get("/nodes", async (_req, res) => {
    try {
      const result = await db.execute(
        sql`SELECT * FROM ve_freeswitch_nodes ORDER BY created_at ASC`
      );
      res.json({ success: true, data: result.rows });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.post("/nodes", async (req, res) => {
    try {
      const { name, eslHost, eslPort, eslPassword, sipHost, sipPort, wsPort, maxCalls, status } = req.body;
      if (!name || !eslHost || !eslPort || !sipHost || !sipPort || !wsPort) {
        return res.status(400).json({ success: false, error: "Missing required fields" });
      }
      const result = await db.execute(sql`
        INSERT INTO ve_freeswitch_nodes (name, esl_host, esl_port, esl_password, sip_host, sip_port, ws_port, max_calls, status)
        VALUES (${name}, ${eslHost}, ${eslPort}, ${eslPassword || "ClueCon"}, ${sipHost}, ${sipPort}, ${wsPort}, ${maxCalls || 100}, ${status || "offline"})
        RETURNING *
      `);
      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.put("/nodes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { name, eslHost, eslPort, eslPassword, sipHost, sipPort, wsPort, maxCalls, status } = req.body;
      const result = await db.execute(sql`
        UPDATE ve_freeswitch_nodes SET
          name = COALESCE(${name !== void 0 ? name : null}, name),
          esl_host = COALESCE(${eslHost !== void 0 ? eslHost : null}, esl_host),
          esl_port = COALESCE(${eslPort !== void 0 ? eslPort : null}, esl_port),
          esl_password = COALESCE(${eslPassword !== void 0 ? eslPassword : null}, esl_password),
          sip_host = COALESCE(${sipHost !== void 0 ? sipHost : null}, sip_host),
          sip_port = COALESCE(${sipPort !== void 0 ? sipPort : null}, sip_port),
          ws_port = COALESCE(${wsPort !== void 0 ? wsPort : null}, ws_port),
          max_calls = COALESCE(${maxCalls !== void 0 ? maxCalls : null}, max_calls),
          status = COALESCE(${status !== void 0 ? status : null}, status),
          updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `);
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, error: "Node not found" });
      }
      res.json({ success: true, data: result.rows[0] });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.delete("/nodes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await db.execute(sql`DELETE FROM ve_freeswitch_nodes WHERE id = ${id}`);
      res.json({ success: true, message: "Node deleted" });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  return router;
}
export {
  createAdminSettingsRouter
};
