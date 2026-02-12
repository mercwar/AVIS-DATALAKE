#!/bin/bash
# ==========================================================
# FIREGEM FORGE CONTROLLER
# FILE: forge/forge.sh
# PURPOSE: Link the Hardware Logic to the JSON Fuel
# ==========================================================

# 1. ACQUIRE HARDWARE TOOLS
# Standardizing the environment for the ASM build
sudo apt-get update && sudo apt-get install -y nasm binutils jq

# 2. FORGE THE ENGINE
# Compiling the hard-coded directory creator
echo "[FORGE] Assembling Fire-Gem Engine..."
nasm -f elf64 engine/fire_gem.asm -o engine/fire_gem.o
ld engine/fire_gem.o -o engine/fire_gem

# 3. SECURE THE SURFACE
chmod +x engine/fire_gem

# 4. IGNITION
# Handing full control to the ASM and passing the JSON path ($1)
echo "[FORGE] Relinquishing control to ASM..."
./engine/fire_gem "$1"

# 5. PHYSICAL GROUNDING (GIT SYNC)
# CVBGOD: Forcing the repo to accept the manifested surface
git config --local user.email "cvbgod@demonizer.com"
git config --local user.name "CVBGOD"
git add .
git commit -m "FIREGEM: Surface Manifested by ASM Engine" || exit 0
git push origin HEAD:main
