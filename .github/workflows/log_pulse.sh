#!/bin/bash
# [AVIS_LOG_PULSE_v1.0]

LOG_FILE="build_log.txt"
EXIT_CODE=$1
GATEWAY_URL="${MERC_G_PHP_URL}" # From GitHub Secrets
AUTH_TOKEN="${MERC_G_TOKEN}"    # From GitHub Secrets

echo "/* CYHY_KERNEL: Preparing Pulse... */"

# Capture the last 20 lines of the build log
LOG_CONTENT=$(tail -n 20 "$LOG_FILE" | sed 's/"/\\"/g' | tr '\n' ' ')

# Construct JSON payload
PAYLOAD="{
  \"event\": \"VB6_COMPILE_RESULT\",
  \"status\": \"$([ $EXIT_CODE -eq 0 ] && echo "SUCCESS" || echo "CRITICAL_FAILURE")\",
  \"exit_code\": \"$EXIT_CODE\",
  \"timestamp\": \"$(date)\",
  \"log_tail\": \"$LOG_CONTENT\"
}"

# Pulse to PHP Gateway
curl -X POST "$GATEWAY_URL" \
     -H "Authorization: Bearer $AUTH_TOKEN" \
     -H "Content-Type: application/json" \
     -d "$PAYLOAD"

echo "/* PULSE_EMITTED */"
