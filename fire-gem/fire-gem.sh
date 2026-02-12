#!/bin/bash
GUID=$1

# Scanning for BIN drops and writing to disk
for bin_file in *.bin; do
    [ -e "$bin_file" ] || continue
    if ! grep -q "$bin_file" fire-gem.csv 2>/dev/null; then
        echo "[LITTLEBOT] Writing $bin_file to disk..."
        # Manifest the installation log
        echo "KB_ID: $bin_file" > "INSTALLED_$bin_file.log"
        echo "AUTH: $GUID" >> "INSTALLED_$bin_file.log"
        # Register in CSV
        echo "$bin_file,INSTALLED,$(date)" >> fire-gem.csv
    fi
done
