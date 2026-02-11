#!/bin/bash
# ===========================================================
# MERCWAR // AVIS-DATALAKE // KNOWLEDGE INGESTION
# BOOT_ID: AUI-INGEST-V2
# TARGET: Process .avis Polyglot Artifacts
# ===========================================================

# 1. LOAD INTERPRETER CONFIG
CONFIG="./AVIS-INTERPRETER-CONFIG.yml"
TARGET_FILE="./CORE_LOGIC_V2.avis"

echo "--- AVIS INGESTION SEQUENCE STARTING ---"

# 2. VALIDATION
if [ ! -f "$TARGET_FILE" ]; then
    echo "ERROR: Target .avis file not found."
    exit 1
fi

# 3. EXECUTE INTERPRETER (AUI-V2)
# This triggers the multi-language scanners (C89, PY-JIT, etc.)
echo "Deconstructing Polyglot Payload: $TARGET_FILE..."
./bin/aui-interpreter --config "$CONFIG" --input "$TARGET_FILE" --mode DEEP_LEARN

# 4. MAP TO DATALAKE ROOT
# Updates the .md files so the LLM knows where the new knowledge is located
echo "Updating AVIS-DATALAKE-ROOT.md with new Knowledge Graph..."
./bin/avis-mapper --update-root --artifact-id "AVIS-BEEF-2026-V2-MULTI"

# 5. SYNC TO GEMINI V2 CONTEXT
# Injects the new cross-language relationships into the active LLM context
echo "Pushing embeddings to GEMINI V2 Memory..."
curl -X POST http://localhost:8888/v2/context/inject -d @./meta/CORE_LOGIC_V2.json

echo "---------------------------------------------------"
echo "INGESTION STATUS: [COMPLETE]"
echo "KNOWLEDGE OBJECT: {AVIS-BEEF-2026-V2-MULTI}"
echo "---------------------------------------------------"
