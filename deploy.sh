#!/bin/bash
set -e

echo "📦 Code already synced from repository..."

echo "📦 Installing dependencies..."
npm install --prefer-offline --no-audit

echo "🗄️ Checking database schema migrations..."
npm run db:push || true
node scripts/run-safe-migration.mjs || true

echo "🔧 Building TypeScript & Bundles (Vite + esbuild + plugin deps)..."
npm run build

echo "🔌 Building plugin backend..."
node scripts/build-plugin-backend.js || true

echo "⚡ Verifying Native Master AI Reflex Engine..."
npx tsx scripts/test-master-ai.ts || true

echo "🚀 Restarting PM2 supervisor..."
pm2 restart agentlabs || pm2 start dist/index.js --name "agentlabs" --node-args="--max-old-space-size=4096"

echo "🎉 Deployment finished successfully!"