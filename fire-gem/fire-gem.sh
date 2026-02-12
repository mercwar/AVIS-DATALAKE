#!/bin/bash
# AVIS-DATALAKE/fire-gem/fire-gem.sh

# Option A: Use JavaScript to compile and verify
node fire-gem-compile.js

# Option B: Use Java to compile and verify
# javac FireGemCompiler.java && java FireGemCompiler

# Final Link with verified object files
gcc fire-gem.c fire-gem-asm.o fire-end-asm.o -o fire-gem -no-pie -z noexecstack

./fire-gem "$1"

