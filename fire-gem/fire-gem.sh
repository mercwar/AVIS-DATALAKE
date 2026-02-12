#!/bin/bash
# fire-gem.sh
GUID=$1

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
