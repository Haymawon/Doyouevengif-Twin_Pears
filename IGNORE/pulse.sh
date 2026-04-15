#!/usr/bin/env bash

# --- Configuration & Styling ---
readonly ICON_INFO="ℹ️"
readonly ICON_WARN="⚠️"
readonly ICON_CRIT="🔥"
readonly RESET="\033[0m"
readonly BOLD="\033[1m"
readonly RED="\033[31m"
readonly CYAN="\033[36m"

# --- Safety & Signals ---
set -uo pipefail
trap 'printf "\n\033[?25h %b Graceful exit.\n" "$ICON_INFO"; exit 0' SIGINT SIGTERM

# --- Core Logic ---
check_resources() {
    local cpu_load mem_usage disk_space
    
    # Capture metrics
    cpu_load=$(top -bn1 | grep "Cpu(s)" | awk '{print $2 + $4}')
    mem_usage=$(free | grep Mem | awk '{print $3/$2 * 100.0}')
    disk_space=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')

    printf "${BOLD}${CYAN}--- System Pulse Summary ---${RESET}\n"
    
    # CPU Logic
    if (( $(echo "$cpu_load > 80" | bc -l) )); then
        printf "%b CPU: ${RED}%.2f%%${RESET} (High Load)\n" "$ICON_CRIT" "$cpu_load"
    else
        printf "%b CPU: %.2f%%\n" "$ICON_INFO" "$cpu_load"
    fi

    # Memory Logic
    if (( $(echo "$mem_usage > 90" | bc -l) )); then
        printf "%b MEM: ${RED}%.2f%%${RESET}\n" "$ICON_CRIT" "$mem_usage"
    else
        printf "%b MEM: %.2f%%\n" "$ICON_INFO" "$mem_usage"
    fi

    # Disk Logic
    [[ "$disk_space" -gt 85 ]] && \
        printf "%b DISK: ${RED}%s%%${RESET} - Clean logs immediately.\n" "$ICON_WARN" "$disk_space" || \
        printf "%b DISK: %s%%\n" "$ICON_INFO" "$disk_space"
}

get_top_hogs() {
    printf "\n${BOLD}Top 5 Memory Consumers:${RESET}\n"
    ps -eo pid,ppid,cmd,%mem --sort=-%mem | head -n 6 | awk 'NR>1 {printf "  %-8s %-10s %s%%\n", $1, $3, $4}'
}

# --- Execution Loop ---
main() {
    clear
    # Hide cursor
    printf "\033[?25l"
    
    while true; do
        # Move cursor to top-left to avoid scrolling flicker
        printf "\033[H"
        printf "${BOLD}Timestamp: $(date '+%Y-%m-%d %H:%M:%S')${RESET}\n\n"
        
        check_resources
        get_top_hogs
        
        printf "\n${CYAN}Press [CTRL+C] to detach...${RESET}"
        sleep 2
    done
}

main "$@"
