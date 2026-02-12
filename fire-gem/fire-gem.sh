#!/bin/bash
# AVIS-DATALAKE/fire-gem/fire-gem.sh
GUID=$1

# 1. PREP: Compile BOTH ASM modules to disk
nasm -f elf64 fire-gem.asm -o fire-gem-asm.o
nasm -f elf64 fire-end.asm -o fire-end-asm.o

# 2. LINK: Include both .o files and the C file to create the binary
# This fixes 'undefined reference to fire_end_entry'
gcc fire-gem.c fire-gem-asm.o fire-end-asm.o -o fire-gem -no-pie -z noexecstack

# 3. RUN: Open C Engine with the GUID loaded from the INI
./fire-gem "$GUID"
