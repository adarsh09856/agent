/**
 * ============================================================
 * © 2026 KodeWaves. All rights reserved.
 * Original Author: BTPL Engineering Team
 * Website: https://kodewaves.in
 * Contact: support@kodewaves.in
 *
 * Distributed under the Envato / CodeCanyon License Agreement.
 * Licensed to the purchaser for use as defined by the
 * Envato Market (CodeCanyon) Regular or Extended License.
 *
 * You are NOT permitted to redistribute, resell, sublicense,
 * or share this source code, in whole or in part.
 * Respect the author's rights and Envato licensing terms.
 * ============================================================
 */

export const MODELS_SEED_DATA = [
  // ─── Free Tier Models ──────────────────────────────────────
  {
    modelId: "gemini-2.0-flash",
    name: "Gemini 2.0 Flash (Google)",
    provider: "google",
    tier: "free",
    sortOrder: 1,
    isActive: true,
  },
  {
    modelId: "gemini-2.0-flash-lite",
    name: "Gemini 2.0 Flash Lite (Google)",
    provider: "google",
    tier: "free",
    sortOrder: 2,
    isActive: true,
  },
  {
    modelId: "gemini-2.5-flash-lite",
    name: "Gemini 2.5 Flash Lite (Google)",
    provider: "google",
    tier: "free",
    sortOrder: 3,
    isActive: true,
  },
  {
    modelId: "gemini-1.5-flash",
    name: "Gemini 1.5 Flash (Google)",
    provider: "google",
    tier: "free",
    sortOrder: 4,
    isActive: true,
  },
  {
    modelId: "gpt-4o-mini",
    name: "GPT-4o Mini (OpenAI)",
    provider: "openai",
    tier: "free",
    sortOrder: 5,
    isActive: true,
  },
  {
    modelId: "deepseek-chat",
    name: "DeepSeek V3 (DeepSeek)",
    provider: "deepseek",
    tier: "free",
    sortOrder: 6,
    isActive: true,
  },
  {
    modelId: "llama-3.1-8b-instant",
    name: "Llama 3.1 8B Instant (Groq)",
    provider: "groq",
    tier: "free",
    sortOrder: 7,
    isActive: true,
  },
  {
    modelId: "claude-3-5-haiku",
    name: "Claude 3.5 Haiku (Anthropic)",
    provider: "anthropic",
    tier: "free",
    sortOrder: 8,
    isActive: true,
  },
  {
    modelId: "sarvam-2b-v0.5",
    name: "Sarvam 2B Indic (Sarvam AI)",
    provider: "sarvam",
    tier: "free",
    sortOrder: 9,
    isActive: true,
  },
  {
    modelId: "llama3.1-8b",
    name: "Llama 3.1 8B (Cerebras)",
    provider: "cerebras",
    tier: "free",
    sortOrder: 10,
    isActive: true,
  },
  {
    modelId: "glm-45-air-fp8",
    name: "GLM-4.5-Air (ElevenLabs)",
    provider: "elevenlabs",
    tier: "free",
    sortOrder: 11,
    isActive: true,
  },
  {
    modelId: "qwen3-30b-a3b",
    name: "Qwen3-30B-A3B (ElevenLabs)",
    provider: "elevenlabs",
    tier: "free",
    sortOrder: 12,
    isActive: true,
  },
  {
    modelId: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo (OpenAI)",
    provider: "openai",
    tier: "free",
    sortOrder: 13,
    isActive: false,
  },
  {
    modelId: "claude-3-haiku",
    name: "Claude 3 Haiku (Anthropic)",
    provider: "anthropic",
    tier: "free",
    sortOrder: 14,
    isActive: false,
  },

  // ─── Pro Tier Models ───────────────────────────────────────
  {
    modelId: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash (Google)",
    provider: "google",
    tier: "pro",
    sortOrder: 20,
    isActive: true,
  },
  {
    modelId: "gemini-1.5-pro",
    name: "Gemini 1.5 Pro (Google)",
    provider: "google",
    tier: "pro",
    sortOrder: 21,
    isActive: true,
  },
  {
    modelId: "gemini-2.0-pro",
    name: "Gemini 2.0 Pro (Google)",
    provider: "google",
    tier: "pro",
    sortOrder: 22,
    isActive: true,
  },
  {
    modelId: "gpt-4o",
    name: "GPT-4o (OpenAI)",
    provider: "openai",
    tier: "pro",
    sortOrder: 23,
    isActive: true,
  },
  {
    modelId: "o3-mini",
    name: "o3-mini (OpenAI)",
    provider: "openai",
    tier: "pro",
    sortOrder: 24,
    isActive: true,
  },
  {
    modelId: "gpt-4-turbo",
    name: "GPT-4 Turbo (OpenAI)",
    provider: "openai",
    tier: "pro",
    sortOrder: 25,
    isActive: false,
  },
  {
    modelId: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet (Anthropic)",
    provider: "anthropic",
    tier: "pro",
    sortOrder: 26,
    isActive: true,
  },
  {
    modelId: "claude-3-opus",
    name: "Claude 3 Opus (Anthropic)",
    provider: "anthropic",
    tier: "pro",
    sortOrder: 27,
    isActive: true,
  },
  {
    modelId: "deepseek-reasoner",
    name: "DeepSeek R1 (DeepSeek)",
    provider: "deepseek",
    tier: "pro",
    sortOrder: 28,
    isActive: true,
  },
  {
    modelId: "llama-3.3-70b-versatile",
    name: "Llama 3.3 70B Versatile (Groq)",
    provider: "groq",
    tier: "pro",
    sortOrder: 29,
    isActive: true,
  },
  {
    modelId: "mixtral-8x7b-32768",
    name: "Mixtral 8x7B (Groq)",
    provider: "groq",
    tier: "pro",
    sortOrder: 30,
    isActive: true,
  },
  {
    modelId: "llama3.1-70b",
    name: "Llama 3.1 70B (Cerebras)",
    provider: "cerebras",
    tier: "pro",
    sortOrder: 31,
    isActive: true,
  },
  {
    modelId: "gpt-oss-120b",
    name: "GPT-OSS-120B (ElevenLabs)",
    provider: "elevenlabs",
    tier: "pro",
    sortOrder: 32,
    isActive: false,
  },
];
