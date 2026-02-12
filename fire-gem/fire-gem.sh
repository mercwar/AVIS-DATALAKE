#!/bin/bash
# AVIS-DATALAKE/fire-gem/fire-gem.sh

GUID=$1

# 1. COMPILATION: Build ASM modules as Position-Independent Code (PIC)
# The elf64 format remains, but logic inside must be PIC-compatible
nasm -f elf64 fire-gem.asm -o fire-gem-asm.o
nasm -f elf64 fire-end.asm -o fire-end-asm.o

# 2. CREATE SHARED OBJECT: Bind ASM and C into a .so library
# -shared creates the Shared Object; -fPIC ensures position independence
gcc -shared -fPIC fire-gem-asm.o fire-end-asm.o -o libfiregem.so -z noexecstack

# 3. LINK BOOTLOADER: Link the C main engine against the new .so
# -L. looks in current dir; -lfiregem links libfiregem.so
gcc fire-gem.c -L. -lfiregem -o fire-gem -no-pie -Wl,-rpath,$(pwd)

# 4. BOOT: Trigger the C Engine
if [ -f "./fire-gem" ]; then
    ./fire-gem "$GUID"
else
    echo "[CRITICAL] Shared Object compilation failed."
    exit 1
fi
