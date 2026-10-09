#!/bin/bash

# Create a new short math insight post in posts/math/insights/
# Usage: scripts/new-insight.sh "Title of the insight" [extra,tags]

BLOG_DIR="$(cd "$(dirname "$0")/.." && pwd)"
INSIGHTS_DIR="$BLOG_DIR/posts/math/insights"

if [ -z "$1" ]; then
    echo "Usage: $0 \"Title of the insight\" [extra,tags]"
    exit 1
fi

TITLE="$1"
EXTRA_TAGS="$2"
DATE=$(date +%F)
SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g')
FILE="$INSIGHTS_DIR/$SLUG.md"

if [ -e "$FILE" ]; then
    echo "Already exists: $FILE"
    exit 1
fi

TAGS="math, insight"
if [ -n "$EXTRA_TAGS" ]; then
    TAGS="$TAGS, $(echo "$EXTRA_TAGS" | sed 's/,/, /g; s/  */ /g')"
fi

mkdir -p "$INSIGHTS_DIR"
cat > "$FILE" << EOF
---
date: $DATE
title: "$TITLE"
tags: [$TAGS]
summary:
authors: [sampad]
---

EOF

echo "Created $FILE"
echo "Run scripts/generate-config.sh after writing it."
