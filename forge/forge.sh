#!/bin/bash
# CVBGOD: Base64 Engine Forge
echo "FORGE: Linking Base64 Decoder Brain..."

nasm -f elf64 engine/fire_gem.asm -o engine/fire_gem.o
ld engine/fire_gem.o -o engine/fire_gem

nasm -f elf64 engine/kb_processor.asm -o engine/kb_processor.o
ld engine/kb_processor.o -o engine/kb_processor

chmod +x engine/fire_gem engine/kb_processor
echo "STATUS: Base64 Engine Primed. Feed the machine."
