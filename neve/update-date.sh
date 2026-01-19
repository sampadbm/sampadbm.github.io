#!/bin/bash

# Get the last commit date
LAST_COMMIT_DATE=$(git log -1 --format=%cd --date=short)

# Update the profile.yml file
sed -i "s/last_updated: \".*\"/last_updated: \"$LAST_COMMIT_DATE\"/" data/profile.yml

echo "Updated last_updated to: $LAST_COMMIT_DATE"
