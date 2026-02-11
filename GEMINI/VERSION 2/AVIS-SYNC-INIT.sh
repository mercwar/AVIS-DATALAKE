#!/bin/bash
# ===========================================================
# MERCWAR // AVIS-DATALAKE // GEMINI V2 INITIALIZATION
# BOOT_ID: AVIS-V2-INIT-SEQ
# TARGET: /mercwar/AVIS-DATALAKE/GEMINI/VERSION 2/
# ===========================================================

echo "--- STARTING AVIS VARIANT ENGINE: GEMINI V2 ---"

# 1. VERIFY ENVIRONMENT
if [ ! -f "./AVIS-VERSION-CONTROL.yml" ]; then
    echo "ERROR: V2 Manifest not found. Check installation path."
    exit 1
fi

# 2. BIND C-HEADERS TO RUNTIME
# Injects the AIFVS-HEADER.h logic into the MERCWAR Core
echo "Linking AIFVS-HEADER.h to Core Bus..."
ln -sf ../../headers/AIFVS-HEADER.h /usr/include/avis/AIFVS-HEADER.h

# 3. INITIALIZE DATALAKE STRUCTURE
# Creates the snapshot and meta directories defined in the YML
mkdir -p ./snapshots ./meta ./logs

# 4. ARM THE CALLBACK EXPANSION
# Communicates with the MERCWAR bus to set status to 'ARMED'
echo "Arming FVS.AI.EXPORT.CALLBACK.EXPAND..."
export AVIS_STATE="ENABLED"
export AVIS_ID="AI.VARIANT.ON"

# 5. EXECUTE ENGINE BOOT
# Starts the background process for high-frequency state capture
# (Simulating the C-executable 'avis_core')
./bin/avis_core --config ./AVIS-VERSION-CONTROL.yml --mode V2_STREAM &

echo "---------------------------------------------------"
echo "AVIS STATUS: [READY]"
echo "DATALAKE PATH: $(pwd)"
echo "GEMINI BRIDGE: ACTIVE"
echo "---------------------------------------------------"
