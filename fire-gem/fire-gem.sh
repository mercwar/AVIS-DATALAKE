#!/bin/bash
# ==========================================================
# FIREGEM: HARDWARE ACQUISITION BRIDGE
# ==========================================================

# 1. RESTORE POWER (Install NASM if missing)
if ! command -v nasm &> /dev/null; then
    echo "[BOOT] Tools missing. Acquiring NASM and Binutils..."
    sudo apt-get update && sudo apt-get install -y nasm binutils jq
fi

# 2. GROUND THE PATHS
# Ensure we are in the root workspace to avoid the recursive path error
cd "$GITHUB_WORKSPACE"

# 3. SPARK THE C BOOTLOADER
chmod +x ./fire-gem-boot
./fire-gem-boot "$1"
