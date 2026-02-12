#!/bin/bash
echo "CVBGOD: High-Voltage Purge Initialized..."

# Get the IDs and pipe them into 30 parallel workers
gh run list --limit 1000 --json databaseId -q '.[].databaseId' | xargs -I{} -P 30 gh run delete {}

echo "PURGE COMPLETE: All ghosts grounded."
