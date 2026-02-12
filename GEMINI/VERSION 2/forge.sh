#!/bin/bash
# CVBGOD: AVIS-DATALAKE Gemini V2 Controller - Fixed Pathing
# The double quotes around the variable and expansions are the Flat Key.

TARGET_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "FORGE: Assembling Fire-Gem Engine in $TARGET_DIR..."

# Use quoted variables to prevent space-delimiters from breaking the forge
nasm -f elf64 "$TARGET_DIR/fire-gem.asm" -o "$TARGET_DIR/fire-gem.o"
ld "$TARGET_DIR/fire-gem.o" -o "$TARGET_DIR/fire-gem"

echo "MAGIC: Handing power to ASM Core..."
# Execute the binary using the versioned KB as the payload
"$TARGET_DIR/fire-gem" "$TARGET_DIR/kb.kb"
