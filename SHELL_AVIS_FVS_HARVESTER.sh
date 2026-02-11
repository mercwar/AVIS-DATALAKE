#!/bin/bash
# [SHELL_AVIS_FVS_HARVESTER]

GUID_VECTOR=$1 # The 4-bit hex (e.g., 0xA, 0xF)
SEARCH_QUERY="0x$GUID_VECTOR+extension:asm"

echo "/* AVIS: Harvesting OpCode for Vector $GUID_VECTOR */"

# Search GitHub for matching ASM signatures
RESULT=$(curl -s -H "Authorization: token $MERC_G_PAT" \
    "https://api.github.com")

# Extract the RAW ASM file URL (simplified)
RAW_URL=$(echo "$RESULT" | jq -r '.items[0].html_url' | sed 's/://github.com' | sed 's|/blob/|/|')

if [ "$RAW_URL" != "null" ]; then
    curl -L "$RAW_URL" -o "./lake/vector_$GUID_VECTOR.asm"
    echo "/* VECTOR_STASHED_IN_DATALAKE */"
else
    echo "/* VECTOR_NOT_FOUND_IN_WILD */"
fi
