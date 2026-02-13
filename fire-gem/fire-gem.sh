#!/bin/bash
# 1. Assemble to object file
nasm -f elf64 fire-gem.asm -o fire-gem.o

# 2. Link to executable
ld fire-gem.o -o fire-gem

# 3. RUN
./fire-gem
