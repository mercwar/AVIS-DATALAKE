#!/bin/bash
# AVIS-DATALAKE/fire-gem/fire-gem.sh

GUID=$1

# 1. COMPILE: Build modules as Position-Independent Code
nasm -f elf64 fire-gem.asm -o fire-gem-asm.o
nasm -f elf64 fire-end.asm -o fire-end-asm.o

# 2. CREATE SHARED OBJECT (.so)
# We use -shared to create the library LittleBot needs
gcc -shared -fPIC fire-gem-asm.o fire-end-asm.o -o libfiregem.so -z noexecstack

# 3. LINK ASM ENTRY (The Fix)
# We use 'ld' directly to avoid the 'multiple definition of _start' error
# We link the two objects into a single standalone bootloader
ld fire-gem-asm.o fire-end-asm.o -o fire-gem-boot

# 4. RUN: Boot the Hardware Gate
if [ -f "./fire-gem-boot" ]; then
    chmod +x fire-gem-boot
    ./fire-gem-boot "$GUID"
else
    echo "[CRITICAL] Linker failed."
    exit 1
fi
