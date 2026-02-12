#!/bin/bash
# CVBGOD: Fixed Binary Port Forge
TARGET_DIR="gemini/kb/so"

echo "FORGE: Opening Binary Port at $TARGET_DIR..."

# THE FIX: Force the directory to exist before the linker runs
mkdir -p "$TARGET_DIR"

# 1. Compile the Brain
nasm -f elf64 engine/kb_processor.asm -o engine/kb_processor.o

# 2. Link the .so - Now the path exists, so the binary can land
ld -shared engine/kb_processor.o -o "$TARGET_DIR/kb_processor.so"

echo "STATUS: KB Engine manifested at $TARGET_DIR/kb_processor.so"
