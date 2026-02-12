#!/bin/bash
# CVBGOD: High-Voltage Linker
echo "FORGE: Linking Igniter and Processor..."

nasm -f elf64 fire_gem.asm -o fire_gem.o
ld fire_gem.o -o fire_gem

nasm -f elf64 kb_processor.asm -o kb_processor.o
ld kb_processor.o -o kb_processor

chmod +x fire_gem kb_processor
echo "STATUS: Engines Primed. Drop kb.kb to ignite."
