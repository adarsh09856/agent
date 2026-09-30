#!/usr/bin/env bash
# ==============================================================================
# AgentLabs v5.4.5 — One-Command Production Installer & Manager Entrypoint
# Runs setup.sh or uninstall.sh with elevated privileges and forwards arguments
# ==============================================================================

set -eo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
chmod +x "$SCRIPT_DIR/setup.sh" "$SCRIPT_DIR/uninstall.sh" 2>/dev/null || true

# Handle uninstall requests forwarded through install.sh
if [ "$1" = "--uninstall" ] || [ "$1" = "uninstall" ] || [ "$1" = "-u" ]; then
    shift
    echo "🗑️  Redirecting to AgentLabs Production Uninstaller..."
    exec bash "$SCRIPT_DIR/uninstall.sh" "$@"
fi

# Help message
if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    echo "AgentLabs v5.4.5 — Production Management Utility"
    echo ""
    echo "Usage:"
    echo "  sudo bash install.sh [DOMAIN]            Install or upgrade AgentLabs"
    echo "  sudo bash install.sh --uninstall [OPTS]  Uninstall AgentLabs and clean up services"
    echo "  sudo bash uninstall.sh [OPTS]            Direct uninstaller entrypoint"
    echo ""
    echo "Run 'sudo bash uninstall.sh --help' for uninstaller options."
    exit 0
fi

echo "🚀 Launching AgentLabs v5.4.5 Production Setup..."
exec bash "$SCRIPT_DIR/setup.sh" "$@"
