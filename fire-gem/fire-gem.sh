#!/bin/bash
# AVIS-DATALAKE/fire-gem/fire-gem.sh

GUID=$1

# 1. COMPILE: Building the multi-module engine
nasm -f elf64 fire-gem.asm -o fire-gem-asm.o
nasm -f elf64 fire-end.asm -o fire-end-asm.o
gcc fire-gem.c fire-gem-asm.o fire-end-asm.o -o fire-gem -no-pie

# 2. LITTLEBOT: Processing KB Drops
for bin_file in *.bin; do
    [ -e "$bin_file" ] || continue
    if ! grep -q "$bin_file" fire-gem.csv 2>/dev/null; then
        echo "[LITTLEBOT] Writing KB to disk: $bin_file"
        
        # Write KB Log
        {
            echo "KB_ID: $bin_file"
            echo "AUTH_GUID: $GUID"
        } > "INSTALLED_$bin_file.log"
        
        # Update Registry
        echo "$bin_file,INSTALLED,$(date)" >> fire-gem.csv
    fi
done

# 3. BOOT: Start the C Engine (Triggers ASM provisioning and BIN execution)
# Passing the GUID to fix the 'too few arguments' error
./fire-gem "$GUID"
