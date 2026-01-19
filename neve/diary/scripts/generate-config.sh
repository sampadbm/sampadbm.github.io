#!/bin/bash

# Auto-generate diary configuration with validation
# Lists all markdown files in entries/ directory and validates frontmatter

DIARY_DIR="/home/sampad/Desktop/sampadbm.github.io/neve/diary"
cd "$DIARY_DIR"

echo "Validating diary entries..."

# Validation counters
VALID_COUNT=0
WARNING_COUNT=0
ERROR_COUNT=0

# Arrays to store validation issues
declare -a WARNINGS
declare -a ERRORS

# Validate each markdown file
while IFS= read -r file; do
    # Check if file has frontmatter delimiters
    if ! grep -q "^---$" "$file"; then
        ERRORS+=("$file: Missing frontmatter delimiters (---)")
        ((ERROR_COUNT++))
        continue
    fi

    # Extract frontmatter (between first two --- markers)
    FRONTMATTER=$(sed -n '/^---$/,/^---$/p' "$file" | sed '1d;$d')

    # Check for required 'date' field
    if ! echo "$FRONTMATTER" | grep -q "^date:"; then
        ERRORS+=("$file: Missing required 'date' field")
        ((ERROR_COUNT++))
        continue
    fi

    # Validate date format (YYYY-MM-DD)
    DATE_VALUE=$(echo "$FRONTMATTER" | grep "^date:" | sed 's/date: *//' | tr -d '"' | tr -d "'")
    if ! [[ "$DATE_VALUE" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
        ERRORS+=("$file: Invalid date format '$DATE_VALUE' (expected YYYY-MM-DD)")
        ((ERROR_COUNT++))
        continue
    fi

    # Warnings for missing optional but recommended fields
    if ! echo "$FRONTMATTER" | grep -q "^title:"; then
        WARNINGS+=("$file: Missing optional 'title' field (will use date as title)")
        ((WARNING_COUNT++))
    fi

    if ! echo "$FRONTMATTER" | grep -q "^tags:"; then
        WARNINGS+=("$file: Missing optional 'tags' field (entry won't be filterable by tags)")
        ((WARNING_COUNT++))
    fi

    ((VALID_COUNT++))
done < <(find entries/ -type f -name "*.md")

# Print validation results
echo ""
echo "=== Validation Results ==="
echo "Valid entries: $VALID_COUNT"
echo "Warnings: $WARNING_COUNT"
echo "Errors: $ERROR_COUNT"
echo ""

# Print warnings
if [ $WARNING_COUNT -gt 0 ]; then
    echo "⚠️  WARNINGS:"
    for warning in "${WARNINGS[@]}"; do
        echo "  - $warning"
    done
    echo ""
fi

# Print errors
if [ $ERROR_COUNT -gt 0 ]; then
    echo "❌ ERRORS:"
    for error in "${ERRORS[@]}"; do
        echo "  - $error"
    done
    echo ""
    echo "Config generation aborted due to errors."
    echo "Please fix the errors above and try again."
    exit 1
fi

# Write header
cat > config.yml << 'EOF'
# Auto-generated diary configuration
# Run scripts/generate-config.sh to regenerate

entries:
EOF

# Find all markdown files and add to config
find entries/ -type f -name "*.md" | sort -r | while read -r file; do
    echo "  - $file" >> config.yml
done

# Report success
echo "✅ Config generated successfully at $DIARY_DIR/config.yml"
echo "Total entries: $VALID_COUNT"
