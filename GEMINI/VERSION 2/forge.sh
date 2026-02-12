#!/bin/bash
# CVBGOD: High-Voltage FVS Conductor
# Purpose: Hard-code the Next-Phase Section and hand full control to ASM

# 1. IDENTIFY LOCAL CONTEXT
# We use BASH_SOURCE to lock the space-containing path
TARGET_DIR="$(cd "$(dirname "${BASH_SOURCE}")" && pwd)"
INI_FILE="../../fire-gem.ini"

# 2. HARD-CODE NEXT-PHASE SECTION (Write-Ahead)
# This ensures ASM always has the "First Directory" to look at
echo "" >> "$INI_FILE"
echo "[fire-gem-next]" >> "$INI_FILE"
echo "next_dir=\"$TARGET_DIR\"" >> "$INI_FILE"
echo "status=\"IGNITION_LOCKED\"" >> "$INI_FILE"

# 3. FORGE THE ENGINE
# Transform ASM into the Machine-Code Master
nasm -f elf64 "$TARGET_DIR/fire-gem.asm" -o "$TARGET_DIR/fire-gem.o"
ld "$TARGET_DIR/fire-gem.o" -o "$TARGET_DIR/fire-gem"

# 4. FULL HANDOVER
# We don't just run it; we exec it. 
# This replaces the Bash process with the ASM process entirely.
echo "MAGIC: Relinquishing control to ASM Engine..."
exec "$TARGET_DIR/fire-gem" "$INI_FILE"
