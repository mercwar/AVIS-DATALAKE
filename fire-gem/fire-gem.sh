#!/bin/bash
# AVIS-DATALAKE/fire-gem/fire-gem.sh

GUID=$1

# 1. COMPILE: Build both ASM modules into 64-bit ELF objects
nasm -f elf64 fire-gem.asm -o fire-gem-asm.o
nasm -f elf64 fire-end.asm -o fire-end-asm.o

# 2. LINK: You MUST include fire-end-asm.o here to resolve the reference
# The -z noexecstack removes the deprecated linker warning
gcc fire-gem.c fire-gem-asm.o fire-end-asm.o -o fire-gem -no-pie -z noexecstack

# 3. RUN: Boot the 32-bit GUID Engine
if [ -f "./fire-gem" ]; then
    chmod +x fire-gem
    ./fire-gem "$GUID"
else
    echo "[CRITICAL] Linker failed to create the fire-gem binary."
    exit 1
fi
