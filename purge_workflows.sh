#!/bin/bash
echo "CVBGOD: Initializing manual purge..."

# Get all workflow run IDs
RUN_IDS=$(gh run list --limit 1000 --json databaseId -q '.[].databaseId')

if [ -z "$RUN_IDS" ]; then
  echo "No workflow runs found."
  exit 0
fi

# Loop and delete each run to clear the sidebar
for id in $RUN_IDS; do
  echo "Deleting run ID: $id"
  gh run delete "$id"
done

echo "Purge complete. Ghost runs removed."
