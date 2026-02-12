#!/bin/bash
# CVBGOD: High-Voltage Forge (Tool-Aware)
TARGET_DIR="gemini/kb/so"
mkdir -p "$TARGET_DIR"

# 1. GROUND THE TOOLS (Acquire power)
if ! command -v nasm &> /dev/null; then
    echo "FORGE: Tools missing. Acquiring NASM..."
    sudo apt-get update && sudo apt-get install -y nasm binutils jq
fi

echo "FORGE: Compiling with -fPIC for Shared Object..."

# 2. ASSEMBLE: Prepare the Brain
nasm -f elf64 engine/kb_processor.asm -o engine/kb_processor.o

# 3. LINK: Manifest the .so
ld -shared engine/kb_processor.o -o "$TARGET_DIR/kb_processor.so"

if [ -f "$TARGET_DIR/kb_processor.so" ]; then
    echo "STATUS: KB Engine manifested at $TARGET_DIR/kb_processor.so"
else
    echo "ERROR: Linker failed to ground the binary."
    exit 1
fi
