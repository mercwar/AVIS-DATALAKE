#!/bin/bash
# AVIS-DATALAKE/fire-gem/fire-gem.sh
# ---------------------------------------------------------
# ORCHESTRATOR: Compiled C Bootloader -> Dual ASM Modules
# ---------------------------------------------------------

GUID=$1

# 1. DISK VERIFICATION (Node.js Loader)
# Ensures fire-gem-compile.js verifies the presence of the 10-file stack
if [ -f "fire-gem-compile.js" ]; then
    node fire-gem-compile.js
fi

# 2. COMPILATION: Provisioner (fire-gem.asm)
# Handles Hardware Gate and [UNINSTALL] injection
nasm -f elf64 fire-gem.asm -o fire-gem-asm.o

# 3. COMPILATION: Executor (fire-end.asm)
# Handles Binary Application Header (GEM!) and command stream
nasm -f elf64 fire-end.asm -o fire-end-asm.o

# 4. MASTER LINK: Link C Bootloader with BOTH ASM modules
# Resolves 'undefined reference to fire_end_entry' and removes execstack warning
gcc fire-gem.c fire-gem-asm.o fire-end-asm.o -o fire-gem -no-pie -z noexecstack

# 5. BOOT: Trigger the C Engine with the Authorized GUID
# This opens the Hardware Gate and initiates LittleBot disk-writing
if [ -f "./fire-gem" ]; then
    chmod +x fire-gem
    ./fire-gem "$GUID"
else
    echo "[CRITICAL] Linker failed to produce fire-gem binary."
    exit 1
fi

# 6. POST-INSTALL: High-Level Logic Stacks
# Runs the Java Gemini logic and JS/PHP audit components
if [ -f "fire-gem.java" ]; then
    javac fire-gem.java && java FireGem "$GUID"
fi

if [ -f "fire-gem.js" ]; then
    node fire-gem.js
fi
