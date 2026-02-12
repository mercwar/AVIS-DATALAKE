#!/bin/bash
# AVIS-DATALAKE/fire-gem/fire-gem.sh
GUID=$1

# 1. Compile both ASM modules
nasm -f elf64 fire-gem.asm -o fire-gem-asm.o
nasm -f elf64 fire-end.asm -o fire-end-asm.o

# 2. Link with C Engine (fixes 'undefined reference to fire_end_entry')
gcc fire-gem.c fire-gem-asm.o fire-end-asm.o -o fire-gem -no-pie -z noexecstack

# 3. RUN: Boot the Engine
./fire-gem "$GUID"
