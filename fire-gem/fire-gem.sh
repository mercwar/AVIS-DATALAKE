#!/bin/bash
# AVIS-DATALAKE/fire-gem/fire-gem.sh

GUID=$1

# 1. COMPILE: Build the single ASM file into an object
nasm -f elf64 fire-gem.asm -o fire-gem.o

# 2. LINK: Create the standalone binary (No C files, No .so)
# Using ld avoids the 'multiple definition of _start' error
ld fire-gem.o -o fire-gem

# 3. RUN: Execute the bootloader with the 32-bit GUID
if [ -f "./fire-gem" ]; then
    chmod +x fire-gem
    ./fire-gem "$GUID"
else
    echo "[CRITICAL] Link failed."
    exit 1
fi
