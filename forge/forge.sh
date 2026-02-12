#!/bin/bash
# ==========================================================
# FIREGEM: FINAL SO FORGE
# FILE: forge/forge.sh
# PURPOSE: Manifest fire-gem.so and kb_processor.so
# ==========================================================

TARGET_DIR="gemini/kb/so"
ENGINE_DIR="engine"

# 1. GROUND THE TOOLS
if ! command -v nasm &> /dev/null; then
    echo "FORGE: Tools missing. Restoring power..."
    sudo apt-get update && sudo apt-get install -y nasm binutils jq
fi

# 2. OPEN THE PORT
mkdir -p "$TARGET_DIR"

echo "FORGE: Compiling fire-gem.so..."

# 3. MANIFEST FIRE-GEM.SO (The Igniter Version)
# Using RIP-relative addressing for -fPIC compatibility
nasm -f elf64 "$ENGINE_DIR/fire_gem.asm" -o "$ENGINE_DIR/fire_gem.o"
ld -shared "$ENGINE_DIR/fire_gem.o" -o "$TARGET_DIR/fire-gem.so"

# 4. MANIFEST KB_PROCESSOR.SO (The Brain)
nasm -f elf64 "$ENGINE_DIR/kb_processor.asm" -o "$ENGINE_DIR/kb_processor.o"
ld -shared "$ENGINE_DIR/kb_processor.o" -o "$TARGET_DIR/kb_processor.so"

# 5. CLEANUP GHOSTS
rm -f "$ENGINE_DIR"/*.o

# 6. VERIFY GROUND
if [ -f "$TARGET_DIR/fire-gem.so" ]; then
    echo "STATUS: fire-gem.so manifested in $TARGET_DIR"
else
    echo "ERROR: Failed to ground fire-gem.so"
    exit 1
fi
