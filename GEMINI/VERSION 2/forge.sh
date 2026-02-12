#!/bin/bash
# CVBGOD: AVIS-DATALAKE Gemini V2 Controller
TARGET_DIR="AVIS-DATALAKE/GEMINI/VERSION 2"

echo "FORGE: Assembling Fire-Gem Engine in $TARGET_DIR..."
nasm -f elf64 "$TARGET_DIR/fire-gem.asm" -o "$TARGET_DIR/fire-gem.o"
ld "$TARGET_DIR/fire-gem.o" -o "$TARGET_DIR/fire-gem"

echo "MAGIC: Handing power to ASM Core..."
# Run the binary and pass the specific KB blueprint as the payload
"$TARGET_DIR/fire-gem" "$TARGET_DIR/kb.kb"
