#!/bin/bash
# ===========================================================
# MERCWAR // AVIS-DATALAKE // STATE RECOVERY SCRIPT
# ROLE: Rollback DL_RAMD to stable FVS Snapshot
# TARGET: Gemini V2 Engine
# ===========================================================

SNAPSHOT_DIR="./snapshots"
LATEST_STABLE=$(ls -t $SNAPSHOT_DIR/*.lz4 | head -n 1)

echo "--- AVIS RECOVERY INITIATED ---"

if [ -z "$LATEST_STABLE" ]; then
    echo "CRITICAL: No stable snapshots found in $SNAPSHOT_DIR."
    exit 1
fi

echo "Attempting to restore from: $LATEST_STABLE"

# 1. SUSPEND ENGINE
# Sends a SIGSTOP to the AVIS core to prevent data corruption during injection
pkill -STOP avis_core
echo "AVIS Core: SUSPENDED"

# 2. FLUSH VOLATILE BLOCK
# Clears the current corrupted state in DL_RAMD
# (Simulated via MERCWAR bus command)
echo "DL_RAMD: PURGED"

# 3. RE-INJECT SNAPSHOT
# Decompresses the LZ4 state back into the memory buffer
# Using the MERC-INJECT tool defined in Version 2
./bin/merc-inject --source "$LATEST_STABLE" --target "DL.RAMD.AVIS"

# 4. RESUME ENGINE
# Sends SIGCONT to resume processing from the restored state
pkill -CONT avis_core
echo "AVIS Core: RESUMED"

echo "---------------------------------------------------"
echo "RECOVERY STATUS: [SUCCESS]"
echo "RESTORED STATE: $(basename $LATEST_STABLE)"
echo "---------------------------------------------------"
