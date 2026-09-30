#!/usr/bin/env bash
# ==============================================================================
# AgentLabs v5.4.5 — Automated Production Uninstaller & System Cleanup Script
# Operating System: Ubuntu 20.04 / 22.04 / 24.04 LTS & Debian 11 / 12
# Safety: Multi-Site Safe — Safely removes AgentLabs components without affecting
#         other websites, Apache/Nginx domains, or databases on this server.
# ==============================================================================

set -eo pipefail

# Text styling
BOLD='\033[1m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$APP_DIR"

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_banner() {
    clear || true
    echo -e "${CYAN}${BOLD}"
    cat << "EOF"
    ___                    __  __          __         
   /   | ____ ____  ____  / /_/ /   ____ _/ /_  _____ 
  / /| |/ __ `/ _ \/ __ \/ __/ /   / __ `/ __ \/ ___/ 
 / ___ / /_/ /  __/ / / / /_/ /___/ /_/ / /_/ (__  )  
/_/  |_\__, /\___/_/ /_/\__/_____/\__,_/_.___/____/   
      /____/   Native Master AI Voice Platform v5.4.5
EOF
    echo -e "${NC}"
    echo -e "${BOLD}==============================================================================${NC}"
    echo -e " 🗑️ AgentLabs v5.4.5 Automated Production Uninstaller & Cleanup"
    echo -e " 🛡️ Multi-Site Safe: Safely stops and removes AgentLabs services"
    echo -e " 🛡️ Protects existing websites, other databases, and global server packages"
    echo -e "${BOLD}==============================================================================${NC}"
    echo ""
}

# Root Privileges Check
check_root() {
    if [ "$EUID" -ne 0 ]; then
        log_error "This script must be run as root or with sudo privileges to manage system services."
        echo "Please re-run with: sudo bash uninstall.sh"
        exit 1
    fi
}

# Configuration options defaults
FORCE=false
DROP_DB=false
KEEP_DB=false
PURGE_ALL=false
PURGE_ENV=false
KEEP_ENV=true
PURGE_DEPS=false
PURGE_MEDIA=false
KEEP_SSL=true

show_help() {
    echo "Usage: sudo bash uninstall.sh [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -y, --force          Run non-interactively without confirmation prompts"
    echo "  --all, --purge       Complete purge: stops PM2 & Docker, deletes Nginx vhost,"
    echo "                       drops PostgreSQL 'agentlabs_db', removes dist, node_modules, and .env"
    echo "  --drop-db            Drop isolated 'agentlabs_db' database and 'agentlabs_user' role"
    echo "  --keep-db            Preserve 'agentlabs_db' and 'agentlabs_user' (default)"
    echo "  --purge-env          Remove .env configuration file (saved as backup first)"
    echo "  --keep-env           Preserve .env configuration file (default)"
    echo "  --clean-deps         Remove node_modules/ directory"
    echo "  --clean-media        Remove uploaded/recorded audio in public/audio and public/recordings"
    echo "  --remove-ssl         Remove Let's Encrypt SSL certificate for the AgentLabs domain"
    echo "  -h, --help           Display this help message and exit"
    echo ""
    echo "Examples:"
    echo "  sudo bash uninstall.sh                   # Interactive guided uninstall (safest)"
    echo "  sudo bash uninstall.sh --all -y          # Automated full wipe of AgentLabs"
    echo "  sudo bash uninstall.sh --keep-db -y      # Remove services & proxy, retain database"
    echo ""
}

# Parse Command Line Arguments
parse_args() {
    while [ "$#" -gt 0 ]; do
        case "$1" in
            -y|--force|--yes)
                FORCE=true
                shift
                ;;
            --all|--purge)
                PURGE_ALL=true
                DROP_DB=true
                PURGE_ENV=true
                PURGE_DEPS=true
                PURGE_MEDIA=true
                KEEP_SSL=false
                shift
                ;;
            --drop-db)
                DROP_DB=true
                shift
                ;;
            --keep-db)
                KEEP_DB=true
                DROP_DB=false
                shift
                ;;
            --purge-env)
                PURGE_ENV=true
                KEEP_ENV=false
                shift
                ;;
            --keep-env)
                KEEP_ENV=true
                PURGE_ENV=false
                shift
                ;;
            --clean-deps|--purge-deps)
                PURGE_DEPS=true
                shift
                ;;
            --clean-media|--purge-media)
                PURGE_MEDIA=true
                shift
                ;;
            --remove-ssl)
                KEEP_SSL=false
                shift
                ;;
            -h|--help)
                show_help
                exit 0
                ;;
            *)
                log_warn "Unknown parameter: $1 (ignoring)"
                shift
                ;;
        esac
    done
}

# Read variables from .env if present
read_installed_configs() {
    APP_PORT=5000
    FREESWITCH_SIP_PORT=5060
    FREESWITCH_SIP_TLS_PORT=5061
    FREESWITCH_WS_PORT=8089
    FREESWITCH_ESL_PORT=8021
    DOMAIN_NAME=""

    if [ -f "$APP_DIR/.env" ]; then
        log_info "Reading installed parameters from $APP_DIR/.env..."
        APP_PORT=$(grep -E "^PORT=" "$APP_DIR/.env" 2>/dev/null | cut -d'=' -f2 | tr -d ' "' || echo 5000)
        FREESWITCH_SIP_PORT=$(grep -E "^FREESWITCH_SIP_PORT=" "$APP_DIR/.env" 2>/dev/null | cut -d'=' -f2 | tr -d ' "' || echo 5060)
        FREESWITCH_SIP_TLS_PORT=$(grep -E "^FREESWITCH_SIP_TLS_PORT=" "$APP_DIR/.env" 2>/dev/null | cut -d'=' -f2 | tr -d ' "' || echo 5061)
        FREESWITCH_WS_PORT=$(grep -E "^FREESWITCH_WS_PORT=" "$APP_DIR/.env" 2>/dev/null | cut -d'=' -f2 | tr -d ' "' || echo 8089)
        FREESWITCH_ESL_PORT=$(grep -E "^FREESWITCH_ESL_PORT=" "$APP_DIR/.env" 2>/dev/null | cut -d'=' -f2 | tr -d ' "' || echo 8021)
    fi

    # Detect domain from Nginx vhost if available
    for conf in "/etc/nginx/sites-available/agentlabs.conf" "/www/server/panel/vhost/nginx/agentlabs.conf"; do
        if [ -f "$conf" ]; then
            DETECTED=$(grep -E '^\s*server_name\s+' "$conf" | head -n1 | sed -E 's/^\s*server_name\s+([^;]+);/\1/' | awk '{print $1}' || true)
            if [ -n "$DETECTED" ] && [ "$DETECTED" != "localhost" ] && [ "$DETECTED" != "127.0.0.1" ]; then
                DOMAIN_NAME="$DETECTED"
                break
            fi
        fi
    done
}

# Prompt for confirmations in interactive mode
interactive_confirmations() {
    if [ "$FORCE" = true ]; then
        return 0
    fi

    echo -e "${YELLOW}${BOLD}⚠️  CONFIRMATION REQUIRED${NC}"
    echo -e "You are about to stop and uninstall AgentLabs v5.4.5 from this system."
    echo ""
    read -p "Are you sure you want to proceed with uninstallation? (y/N): " CONFIRM_UNINSTALL
    case "$CONFIRM_UNINSTALL" in
        [yY]|[yY][eE][sS])
            log_info "Proceeding with uninstallation..."
            ;;
        *)
            log_warn "Uninstall canceled by user. No changes were made."
            exit 0
            ;;
    esac

    # Database prompt
    if [ "$DROP_DB" = false ] && [ "$KEEP_DB" = false ]; then
        echo ""
        echo -e "${YELLOW}Database Preservation:${NC}"
        echo "AgentLabs stores its data in an isolated PostgreSQL database ('agentlabs_db')."
        echo "Keeping it intact preserves your users, agents, and campaign history if you reinstall later."
        read -p "Do you want to permanently DROP the 'agentlabs_db' database and user? (y/N, Default: No): " CONFIRM_DB
        case "$CONFIRM_DB" in
            [yY]|[yY][eE][sS])
                DROP_DB=true
                log_warn "PostgreSQL database 'agentlabs_db' will be dropped."
                ;;
            *)
                DROP_DB=false
                log_info "Preserving PostgreSQL database 'agentlabs_db'."
                ;;
        esac
    fi

    # node_modules prompt
    if [ "$PURGE_DEPS" = false ]; then
        echo ""
        read -p "Do you want to delete the node_modules dependencies folder? (y/N, Default: No): " CONFIRM_DEPS
        case "$CONFIRM_DEPS" in
            [yY]|[yY][eE][sS])
                PURGE_DEPS=true
                ;;
        esac
    fi

    # .env prompt
    if [ "$PURGE_ENV" = false ] && [ "$KEEP_ENV" = true ]; then
        echo ""
        read -p "Do you want to remove the .env secret configuration file? (y/N, Default: No): " CONFIRM_ENV
        case "$CONFIRM_ENV" in
            [yY]|[yY][eE][sS])
                PURGE_ENV=true
                ;;
        esac
    fi

    # SSL prompt
    if [ -n "$DOMAIN_NAME" ] && [ "$KEEP_SSL" = true ]; then
        echo ""
        read -p "Remove Let's Encrypt SSL certificate for '$DOMAIN_NAME'? (y/N, Default: No): " CONFIRM_SSL
        case "$CONFIRM_SSL" in
            [yY]|[yY][eE][sS])
                KEEP_SSL=false
                ;;
        esac
    fi

    echo ""
}

# 1. Stop and Remove PM2 Process
step_pm2() {
    log_info "Step 1/8: Stopping & removing AgentLabs PM2 process supervisor..."
    if command -v pm2 >/dev/null 2>&1; then
        if pm2 list 2>/dev/null | grep -q "agentlabs"; then
            pm2 stop agentlabs 2>/dev/null || true
            pm2 delete agentlabs 2>/dev/null || true
            pm2 save 2>/dev/null || true
            log_success "PM2 process 'agentlabs' stopped and unregistered."
        else
            log_info "No active PM2 process named 'agentlabs' found."
        fi
    else
        log_info "PM2 not installed, skipping PM2 cleanup."
    fi
}

# 2. Stop and Remove Docker Voice Engine Cluster
step_docker() {
    log_info "Step 2/8: Stopping FreeSWITCH & Redis Docker Voice Engine containers..."
    DOCKER_DIR="$APP_DIR/plugins/custom-voice-engine/docker"
    
    if command -v docker >/dev/null 2>&1; then
        if [ -f "$DOCKER_DIR/docker-compose.voice-engine.yml" ]; then
            log_info "Shutting down Docker Compose services and named volumes..."
            docker compose -f "$DOCKER_DIR/docker-compose.voice-engine.yml" down -v --remove-orphans 2>/dev/null || true
        fi

        # Remove containers if still running
        for container in ve-freeswitch ve-redis ve-prometheus ve-grafana; do
            if docker ps -a --format '{{.Names}}' 2>/dev/null | grep -q "^${container}$"; then
                log_info "Stopping and removing container: ${container}..."
                docker rm -f "$container" 2>/dev/null || true
            fi
        done

        # Remove custom image if present
        if docker images -q ve-freeswitch:latest 2>/dev/null | grep -q .; then
            log_info "Removing local Docker image 've-freeswitch:latest'..."
            docker rmi -f ve-freeswitch:latest 2>/dev/null || true
        fi

        log_success "Voice Engine Docker containers and resources removed."
    else
        log_info "Docker is not running or not installed, skipping Docker cleanup."
    fi
}

# 3. Remove Isolated Nginx Configuration
step_nginx() {
    log_info "Step 3/8: Removing Nginx virtual host configuration..."
    RELOAD_NGINX=false

    # Standard Ubuntu / Debian
    if [ -f "/etc/nginx/sites-enabled/agentlabs.conf" ]; then
        rm -f "/etc/nginx/sites-enabled/agentlabs.conf"
        RELOAD_NGINX=true
        log_info "Removed /etc/nginx/sites-enabled/agentlabs.conf"
    fi
    if [ -f "/etc/nginx/sites-available/agentlabs.conf" ]; then
        rm -f "/etc/nginx/sites-available/agentlabs.conf"
        RELOAD_NGINX=true
        log_info "Removed /etc/nginx/sites-available/agentlabs.conf"
    fi

    # aaPanel
    if [ -f "/www/server/panel/vhost/nginx/agentlabs.conf" ]; then
        rm -f "/www/server/panel/vhost/nginx/agentlabs.conf"
        RELOAD_NGINX=true
        log_info "Removed /www/server/panel/vhost/nginx/agentlabs.conf"
    fi

    if [ "$RELOAD_NGINX" = true ] && command -v nginx >/dev/null 2>&1; then
        log_info "Testing Nginx syntax before reloading..."
        if nginx -t 2>/dev/null; then
            systemctl reload nginx 2>/dev/null || /etc/init.d/nginx reload 2>/dev/null || true
            log_success "Nginx reloaded successfully. All other websites continue serving without downtime."
        else
            log_warn "Nginx syntax check failed. Please check your remaining Nginx configurations."
        fi
    else
        log_info "No AgentLabs Nginx configuration found to remove."
    fi
}

# 4. Remove SSL Certificates if requested
step_ssl() {
    log_info "Step 4/8: Checking SSL / Certbot certificates..."
    if [ "$KEEP_SSL" = false ] && [ -n "$DOMAIN_NAME" ] && command -v certbot >/dev/null 2>&1; then
        log_info "Removing Let's Encrypt certificate for ${DOMAIN_NAME}..."
        certbot delete --cert-name "${DOMAIN_NAME}" --non-interactive 2>/dev/null || true
        log_success "Certbot certificate for ${DOMAIN_NAME} removed."
    else
        log_info "SSL certificates preserved (or none configured)."
    fi
}

# 5. Clean up UFW Firewall Rules
step_firewall() {
    log_info "Step 5/8: Reverting AgentLabs firewall rules..."
    if command -v ufw >/dev/null 2>&1 && ufw status | grep -q "Status: active"; then
        log_info "Removing AgentLabs custom port rules from UFW..."
        ufw delete allow "${APP_PORT}/tcp" >/dev/null 2>&1 || true
        ufw delete allow "${FREESWITCH_SIP_PORT}/udp" >/dev/null 2>&1 || true
        ufw delete allow "${FREESWITCH_SIP_PORT}/tcp" >/dev/null 2>&1 || true
        ufw delete allow "${FREESWITCH_SIP_TLS_PORT}/tcp" >/dev/null 2>&1 || true
        ufw delete allow "16384:32768/udp" >/dev/null 2>&1 || true

        log_success "AgentLabs firewall port rules removed. Ports 80 & 443 remain untouched for web traffic."
    else
        log_info "UFW not active, skipping firewall rule modification."
    fi
}

# 6. Drop Isolated Database & User if requested
step_database() {
    log_info "Step 6/8: Managing PostgreSQL database..."
    if [ "$DROP_DB" = true ]; then
        if command -v psql >/dev/null 2>&1 && sudo -u postgres psql -c '\l' >/dev/null 2>&1; then
            log_info "Dropping isolated PostgreSQL database 'agentlabs_db' and user 'agentlabs_user'..."
            # Terminate active client connections
            sudo -u postgres psql -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'agentlabs_db' AND pid <> pg_backend_pid();" >/dev/null 2>&1 || true
            # Drop database and user
            sudo -u postgres psql -c "DROP DATABASE IF EXISTS agentlabs_db;" >/dev/null 2>&1 || true
            sudo -u postgres psql -c "DROP USER IF EXISTS agentlabs_user;" >/dev/null 2>&1 || true
            log_success "PostgreSQL database 'agentlabs_db' and user 'agentlabs_user' dropped."
        else
            log_warn "PostgreSQL client / server not reachable to drop 'agentlabs_db'."
        fi
    else
        log_info "Preserving PostgreSQL database 'agentlabs_db' (safe default)."
    fi
}

# 7. Clean Built Artifacts, Dependencies & Files
step_workspace_cleanup() {
    log_info "Step 7/8: Cleaning application build artifacts and generated files..."

    # Remove compiled production bundles
    if [ -d "$APP_DIR/dist" ]; then
        log_info "Removing compiled 'dist/' directory..."
        rm -rf "$APP_DIR/dist"
    fi

    # Remove compiled plugin backend
    if [ -f "$APP_DIR/plugins/custom-voice-engine/index.js" ]; then
        rm -f "$APP_DIR/plugins/custom-voice-engine/index.js"
    fi

    # Clean media if requested
    if [ "$PURGE_MEDIA" = true ]; then
        log_info "Cleaning audio files and recordings in public/..."
        rm -rf "$APP_DIR/public/audio"/* "$APP_DIR/public/recordings"/* 2>/dev/null || true
    fi

    # Clean dependencies if requested
    if [ "$PURGE_DEPS" = true ] && [ -d "$APP_DIR/node_modules" ]; then
        log_info "Removing node_modules/ directory..."
        rm -rf "$APP_DIR/node_modules"
        log_success "node_modules/ removed."
    fi

    # Clean .env if requested
    if [ "$PURGE_ENV" = true ] && [ -f "$APP_DIR/.env" ]; then
        BACKUP_ENV="$APP_DIR/.env.backup.$(date +%Y%m%d_%H%M%S)"
        log_info "Backing up .env to ${BACKUP_ENV} before removal..."
        cp "$APP_DIR/.env" "$BACKUP_ENV"
        rm -f "$APP_DIR/.env"
        log_success ".env removed (backup saved at ${BACKUP_ENV})."
    else
        log_info "Preserving .env configuration."
    fi

    log_success "Workspace cleanup completed."
}

# 8. Print Final Summary
print_summary() {
    echo ""
    echo -e "${GREEN}${BOLD}==============================================================================${NC}"
    echo -e "${GREEN}${BOLD} 🎉 AgentLabs v5.4.5 Uninstallation Completed Successfully! 🎉${NC}"
    echo -e "${GREEN}${BOLD}==============================================================================${NC}"
    echo ""
    echo -e "   • PM2 Service          : ${BOLD}REMOVED${NC}"
    echo -e "   • Docker Containers    : ${BOLD}STOPPED & CLEANED${NC}"
    echo -e "   • Nginx Reverse Proxy  : ${BOLD}REMOVED (Other sites fully running)${NC}"
    echo -e "   • Port Allocations     : ${BOLD}RELEASED${NC}"
    if [ "$DROP_DB" = true ]; then
        echo -e "   • PostgreSQL Database  : ${BOLD}DROPPED (agentlabs_db)${NC}"
    else
        echo -e "   • PostgreSQL Database  : ${BOLD}PRESERVED (agentlabs_db intact)${NC}"
    fi
    if [ "$PURGE_ENV" = true ]; then
        echo -e "   • Environment File     : ${BOLD}REMOVED (Backup created)${NC}"
    else
        echo -e "   • Environment File     : ${BOLD}PRESERVED (.env intact)${NC}"
    fi
    echo ""
    echo -e "${BOLD}Multi-Site VPS Status:${NC}"
    echo -e "   ✓ All existing domains, websites, and Apache/Nginx vhosts remain active."
    echo -e "   ✓ Global packages (Node.js, Docker, Nginx, PostgreSQL) were kept intact."
    echo ""
    echo -e "${BOLD}To Reinstall In The Future:${NC}"
    echo -e "   Run: ${CYAN}${BOLD}sudo bash install.sh [your-domain]${NC}"
    echo -e "${GREEN}${BOLD}==============================================================================${NC}"
    echo ""
}

main() {
    print_banner
    parse_args "$@"
    check_root
    read_installed_configs
    interactive_confirmations
    step_pm2
    step_docker
    step_nginx
    step_ssl
    step_firewall
    step_database
    step_workspace_cleanup
    print_summary
}

main "$@"
