#!/bin/bash
TARGET_DIR="AVIS-DATALAKE/GEMINI/VERSION 2"

# Compile both modules
nasm -f elf64 "$TARGET_DIR/fire-gem.asm" -o fire-gem.o
nasm -f elf64 "$TARGET_DIR/parser.asm" -o parser.o

# Link into the High-Voltage Engine
ld fire-gem.o parser.o -o "$TARGET_DIR/fire-gem"

# Ignite
"$TARGET_DIR/fire-gem" "$TARGET_DIR/kb.kb"
