#!/bin/bash
# ==========================================================
# FIREGEM FORGE: SELF-HEALING TOOL MODE
# FILE: forge/forge.sh
# ==========================================================
TARGET_DIR="gemini/kb/so"

# 1. ACQUIRE POWER (Install Tools)
# If nasm is missing, we reach out to the repo to grab it.
if ! command -v nasm &> /dev/null; then
    echo "FORGE: Tools missing. Installing NASM and Binutils..."
    sudo apt-get update && sudo apt-get install -y nasm binutils jq
fi

# 2. OPEN THE PORT
mkdir -p "$TARGET_DIR"

echo "FORGE: Compiling with -fPIC for Shared Object..."

# 3. ASSEMBLE THE BRAIN (engine/kb_processor.asm)
# Using -f elf64 ensures we are in 64-bit hardware mode
nasm -f elf64 engine/kb_processor.asm -o engine/kb_processor.o

# 4. LINK THE BINARY (.so)
# -shared creates the dynamic library CVBGOD demanded
ld -shared engine/kb_processor.o -o "$TARGET_DIR/kb_processor.so"

# 5. VERIFY GROUND
if [ -f "$TARGET_DIR/kb_processor.so" ]; then
    echo "STATUS: KB Engine manifested at $TARGET_DIR/kb_processor.so"
else
    echo "ERROR: Linker failed to ground the binary."
    exit 1
fi
