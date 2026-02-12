#!/bin/bash
# AVIS-DATALAKE/fire-gem/fire-gem.sh

GUID=$1

# 1. COMPILE: Build modules as Position-Independent Code (PIC)
nasm -f elf64 fire-gem.asm -o fire-gem-asm.o
nasm -f elf64 fire-end.asm -o fire-end-asm.o

# 2. CREATE SHARED OBJECT: Link modules into a dynamic library
gcc -shared -fPIC fire-gem-asm.o fire-end-asm.o -o libfiregem.so -z noexecstack

# 3. LINK ASM ENTRY: Create the final executable using ASM _start
# We link against the .so but start with the ASM entry
ld fire-gem-asm.o fire-end-asm.o -o fire-gem-boot

# 4. RUN: Start the Hardware Gate with the 32-bit GUID
if [ -f "./fire-gem-boot" ]; then
    chmod +x fire-gem-boot
    ./fire-gem-boot "$GUID"
else
    echo "[CRITICAL] ASM Linker failed."
    exit 1
fi
