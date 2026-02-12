#!/bin/bash
# CVBGOD: Position Independent Forge
TARGET_DIR="gemini/kb/so"
mkdir -p "$TARGET_DIR"

echo "FORGE: Compiling with -fPIC for Shared Object..."

# THE FIX: Add -fPIC logic (nasm handles this via elf64)
nasm -f elf64 engine/kb_processor.asm -o engine/kb_processor.o

# THE LINKER FIX: Use -shared to create the library
ld -shared engine/kb_processor.o -o "$TARGET_DIR/kb_processor.so"

if [ -f "$TARGET_DIR/kb_processor.so" ]; then
    echo "STATUS: KB Engine manifested at $TARGET_DIR/kb_processor.so"
else
    echo "ERROR: Linker failed to ground the binary."
    exit 1
fi
