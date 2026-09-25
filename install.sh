#!/usr/bin/env bash
# ==============================================================================
# AgentLabs v5.4.5 — One-Command Production Installer Entrypoint
# Runs setup.sh with elevated privileges and forwards all parameters
# ==============================================================================

set -eo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
chmod +x "$SCRIPT_DIR/setup.sh" 2>/dev/null || true

echo "🚀 Launching AgentLabs v5.4.5 Production Setup..."
bash "$SCRIPT_DIR/setup.sh" "$@"
