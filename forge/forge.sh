#!/bin/bash
# ==========================================================
# FIREGEM: FINAL -fPIC SO FORGE
# ==========================================================
TARGET_DIR="gemini/kb/so"
mkdir -p "$TARGET_DIR"

echo "FORGE: Compiling fire-gem.so with PIC grounding..."

# 1. ASSEMBLE with elf64 (supports PIC)
nasm -f elf64 engine/fire_gem.asm -o engine/fire_gem.o

# 2. LINK with -shared and -pie if necessary to ground the .bss
ld -shared engine/fire_gem.o -o "$TARGET_DIR/fire-gem.so"

if [ -f "$TARGET_DIR/fire-gem.so" ]; then
    echo "STATUS: fire-gem.so manifested successfully."
else
    echo "ERROR: Failed to ground fire-gem.so"
    exit 1
fi
