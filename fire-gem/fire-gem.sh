#!/bin/bash
# AVIS-DATALAKE/fire-gem/fire-gem.sh
GUID=$1

# Scan for any KB bin files in the directory
for bin_file in *.bin; do
    [ -e "$bin_file" ] || continue

    # Cross-reference with the CSV registry
    if ! grep -q "$bin_file" fire-gem.csv; then
        echo "[LITTLEBOT] Writing $bin_file to disk..."
        
        # Manifest the installation log
        {
            echo "KB_IDENTIFIER: $bin_file"
            echo "INSTALL_GUID: $GUID"
            echo "TIMESTAMP: $(date)"
        } > "INSTALLED_$bin_file.log"
        
        # Register in CSV
        echo "$bin_file,INSTALLED,$(date)" >> fire-gem.csv
    fi
done
