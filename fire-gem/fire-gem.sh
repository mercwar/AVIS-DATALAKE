#!/bin/bash
# AVIS-DATALAKE/fire-gem/fire-gem.sh
GUID=$1

# 1. PREP: Compile BOTH ASM modules
nasm -f elf64 fire-gem.asm -o fire-gem-asm.o
nasm -f elf64 fire-end.asm -o fire-end-asm.o

# 2. LINK: Include both .o files to resolve 'fire_end_entry'
# Adding -z noexecstack to remove the linker warning
gcc fire-gem.c fire-gem-asm.o fire-end-asm.o -o fire-gem -no-pie -z noexecstack

# 3. RUN: Open C Engine with the GUID
./fire-gem "$GUID"
