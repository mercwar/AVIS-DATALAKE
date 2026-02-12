#!/bin/bash
# CVBGOD: V4 Conductor
# Purpose: Static link and execution

TARGET_DIR="engine"
CONFIG="fire_gem_config.json"

echo "FORGE: Initializing V4 Bootstrap..."

# Standardize permissions
chmod 644 "$CONFIG"

# Handover to Compiled Engine
./fire_gem path.ini

echo "STATUS: Synchronized to Zero."
