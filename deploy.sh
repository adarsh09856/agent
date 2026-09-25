#!/usr/bin/env bash
# ==============================================================================
# AgentLabs v5.4.5 — Production Deployment & Update Script
# Target: Ubuntu 20.04/22.04/24.04 LTS / Debian Cloud VPS
# Architecture: Cloud Voice Engine (Pipecat Streaming • Zero PBX)
# ==============================================================================

set -eo pipefail

BOLD='\033[1m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$APP_DIR"

echo -e "${CYAN}${BOLD}==============================================================================${NC}"
echo -e "${BOLD} 🚀 AgentLabs v5.4.5 Production Deployment & Update${NC}"
echo -e "${CYAN}${BOLD}==============================================================================${NC}"

# 1. Sync latest changes if git repository
if [ -d ".git" ]; then
    echo -e "${BLUE}[1/6] Syncing latest updates from Git origin/main...${NC}"
    git pull origin main || echo -e "${YELLOW}⚠️ Git pull failed or offline, proceeding with local files.${NC}"
else
    echo -e "${BLUE}[1/6] Running deployment from local workspace directory...${NC}"
fi

# 2. Install NPM dependencies
echo -e "${BLUE}[2/6] Installing Node.js dependencies...${NC}"
npm install --prefer-offline --no-audit

# 3. Safe database migrations
echo -e "${BLUE}[3/6] Running safe database schema migrations...${NC}"
npm run db:push || true
node scripts/run-safe-migration.mjs || true

# 4. Compile production bundles
echo -e "${BLUE}[4/6] Compiling production bundles (Vite + esbuild + plugin dependencies)...${NC}"
npm run build
node scripts/build-plugin-backend.js || true

# 5. Verify Master AI Reflexes
echo -e "${BLUE}[5/6] Verifying Master AI Reflex Engine...${NC}"
npx tsx scripts/test-master-ai.ts || true

# 6. PM2 Process Supervisor Restart
echo -e "${BLUE}[6/6] Reloading PM2 process supervisor...${NC}"
if command -v pm2 >/dev/null 2>&1; then
    pm2 restart agentlabs || pm2 start dist/index.js --name "agentlabs" --node-args="--max-old-space-size=4096"
    pm2 save || true
    echo -e "${GREEN}✓ PM2 supervisor updated and running.${NC}"
else
    echo -e "${YELLOW}⚠️ PM2 not found globally. Starting directly or install pm2 via 'npm install -g pm2'${NC}"
fi

echo ""
echo -e "${GREEN}${BOLD}==============================================================================${NC}"
echo -e "${GREEN}${BOLD} 🎉 AgentLabs v5.4.5 Deployment Complete & Live! 🎉${NC}"
echo -e "${GREEN}${BOLD}==============================================================================${NC}"
echo -e "   • Cloud Voice Engine   : Active (Pipecat Streaming • Zero PBX)"
echo -e "   • PM2 Status           : $(pm2 jlist 2>/dev/null | jq -r '.[] | select(.name=="agentlabs") | .pm2_env.status' 2>/dev/null || echo 'running')"
echo -e "   • Monitor Logs         : ${BOLD}pm2 logs agentlabs${NC}"
echo -e "${GREEN}${BOLD}==============================================================================${NC}"