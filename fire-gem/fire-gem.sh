#!/bin/bash
# AVIS-DATALAKE/fire-gem/fire-gem.sh
GUID=$1

# 1. Compile both ASM modules to object files (.o)
nasm -f elf64 fire-gem.asm -o fire-gem-asm.o
nasm -f elf64 fire-end.asm -o fire-end-asm.o

# 2. Link ALL objects together with the C engine
# You MUST include fire-end-asm.o here to resolve the reference
gcc fire-gem.c fire-gem-asm.o fire-end-asm.o -o fire-gem -no-pie -z noexecstack

# 3. RUN: Boot the Engine
./fire-gem "$GUID"
