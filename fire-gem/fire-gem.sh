#!/bin/bash
# AVIS-DATALAKE/fire-gem/fire-gem.sh
GUID=$1

# 1. Scan for any BIN files (e.g., KB_123456789.bin)
for bin_file in *.bin; do
    [ -e "$bin_file" ] || continue

    # 2. Check Registry (fire-gem.csv)
    if ! grep -q "$bin_file" fire-gem.csv; then
        echo "[DISK] Processing $bin_file..."
        
        # 3. Create Installation Record (Write to Disk)
        echo "INSTALL_LOG: $bin_file" > "INSTALLED_$bin_file.log"
        echo "AUTH_GUID: $GUID" >> "INSTALLED_$bin_file.log"
        
        # 4. Update CSV
        echo "$bin_file,INSTALLED,$(date)" >> fire-gem.csv
    fi
done
