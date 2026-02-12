#!/bin/bash
# CVBGOD: Shared Object (.so) Forge
# Purpose: Compile ASM into dynamic libraries

TARGET_DIR="gemini/kb/so"

echo "FORGE: Compiling KB to Shared Object..."

# -felf64: 64-bit ELF format
# -shared: Create a shared library
nasm -f elf64 engine/kb_processor.asm -o engine/kb_processor.o
ld -shared engine/kb_processor.o -o "$TARGET_DIR/kb_processor.so"

echo "STATUS: KB Engine manifested at $TARGET_DIR/kb_processor.so"
