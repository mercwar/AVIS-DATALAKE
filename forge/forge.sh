#!/bin/bash
# CVBGOD: V4 Final Conductor
TARGET_DIR="engine"

if [ -f "fire_gem" ]; then
    echo "MAGIC: Executing V4 Surface Build..."
    ./fire_gem fire_gem_config.json
    echo "STATUS: Synchronized to Zero."
else
    echo "ERROR: Engine Forge Failed."
    exit 1
fi
