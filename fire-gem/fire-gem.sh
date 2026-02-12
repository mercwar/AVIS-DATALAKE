#!/bin/bash
# AVIS-DATALAKE/fire-gem/fire-gem.sh
GUID=$1

# 1. PREP: Compile BOTH ASM modules to disk
# Using elf64 for the runner architecture
nasm -f elf64 fire-gem.asm -o fire-gem-asm.o
nasm -f elf64 fire-end.asm -o fire-end-asm.o

# 2. LINK: Include both .o files + C file
# This resolves the 'undefined reference' by providing the body of fire_end_entry
gcc fire-gem.c fire-gem-asm.o fire-end-asm.o -o fire-gem -no-pie -z noexecstack

# 3. RUN: Boot the C Engine with the 32-bit GUID
# This triggers the HW gate and the manual jump to fire-end
if [ -f "./fire-gem" ]; then
    ./fire-gem "$GUID"
else
    echo "CRITICAL: Linker failed to create fire-gem binary."
    exit 1
fi
