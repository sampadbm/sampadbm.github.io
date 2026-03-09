#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Get the last commit date
LAST_COMMIT_DATE=$(git log -1 --format=%cd --date=short)

# Update the profile.yml file
sed -i "s/last_updated: \".*\"/last_updated: \"$LAST_COMMIT_DATE\"/" "$SCRIPT_DIR/data/profile.yml"
echo "Updated last_updated to: $LAST_COMMIT_DATE"

# Run component generate-config scripts
for script in "$SCRIPT_DIR"/*/scripts/generate-config.sh; do
    if [ -f "$script" ]; then
        echo ""
        echo "Running: $script"
        bash "$script"
    fi
done
