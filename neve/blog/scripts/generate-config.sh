#!/bin/bash

# Auto-generate blog configuration with tree structure and metadata
# Extracts frontmatter metadata so landing page doesn't need to fetch each file

BLOG_DIR="/home/sampad/Desktop/sampadbm.github.io/neve/blog"
cd "$BLOG_DIR"

echo "Validating blog posts..."

# Validation counters
VALID_COUNT=0
WARNING_COUNT=0
ERROR_COUNT=0

# Arrays to store validation issues and valid files
declare -a WARNINGS
declare -a ERRORS
declare -a VALID_FILES

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
        WARNINGS+=("$file: Missing optional 'tags' field (post won't be filterable by tags)")
        ((WARNING_COUNT++))
    fi

    VALID_FILES+=("$file")
    ((VALID_COUNT++))
done < <(find posts/ -type f -name "*.md" 2>/dev/null | sort)

# Print validation results
echo ""
echo "=== Validation Results ==="
echo "Valid posts: $VALID_COUNT"
echo "Warnings: $WARNING_COUNT"
echo "Errors: $ERROR_COUNT"
echo ""

# Print warnings
if [ $WARNING_COUNT -gt 0 ]; then
    echo "WARNINGS:"
    for warning in "${WARNINGS[@]}"; do
        echo "  - $warning"
    done
    echo ""
fi

# Print errors
if [ $ERROR_COUNT -gt 0 ]; then
    echo "ERRORS:"
    for error in "${ERRORS[@]}"; do
        echo "  - $error"
    done
    echo ""
    echo "Config generation aborted due to errors."
    echo "Please fix the errors above and try again."
    exit 1
fi

# Generate config.yml using Python for clean YAML output with metadata extraction
python3 - "${VALID_FILES[@]}" << 'PYTHON_SCRIPT' > config.yml
import sys
import re
import yaml

def extract_frontmatter(filepath):
    """Extract YAML frontmatter and first paragraph from a markdown file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Parse frontmatter
    fm_match = re.match(r'^---\s*\n(.*?)\n---\s*\n(.*)$', content, re.DOTALL)
    if not fm_match:
        return None, None

    frontmatter_text = fm_match.group(1)
    body = fm_match.group(2).strip()

    try:
        frontmatter = yaml.safe_load(frontmatter_text)
    except:
        return None, None

    # Extract first paragraph if no summary
    if not frontmatter.get('summary'):
        # Split by double newlines, find first non-heading paragraph
        paragraphs = re.split(r'\n\n+', body)
        for para in paragraphs:
            para = para.strip()
            # Skip headings, lists, code blocks
            if para and not para.startswith('#') and not para.startswith('-') and not para.startswith('*') and not para.startswith('```'):
                # Limit to ~200 chars
                if len(para) > 200:
                    para = para[:200].rsplit(' ', 1)[0] + '...'
                frontmatter['_preview'] = para
                break

    return frontmatter, body

def build_tree(files_with_meta):
    """Build a nested tree structure from file paths."""
    tree = {'_root_posts': [], '_folders': {}}

    for item in files_with_meta:
        filepath = item['file']
        # Remove 'posts/' prefix
        rel_path = filepath.replace('posts/', '', 1)
        parts = rel_path.split('/')

        if len(parts) == 1:
            # Root-level file
            tree['_root_posts'].append(filepath)
        else:
            # File in a subfolder - navigate to correct location
            current = tree['_folders']
            for i, part in enumerate(parts[:-1]):
                if part not in current:
                    current[part] = {'_folders': {}, '_posts': []}
                if i == len(parts) - 2:  # Parent folder of the file
                    current[part]['_posts'].append(filepath)
                else:
                    current = current[part]['_folders']

    return tree

def tree_to_yaml_lines(tree):
    """Convert tree structure to YAML lines."""
    lines = ['tree:']

    def process_folders(folders, level=1):
        prefix = '  ' * level
        result = []

        for folder_name in sorted(folders.keys()):
            folder_data = folders[folder_name]
            result.append(f'{prefix}- name: {folder_name}')

            # Check if folder has subfolders
            subfolders = folder_data.get('_folders', {})
            if subfolders:
                result.append(f'{prefix}  children:')
                result.extend(process_folders(subfolders, level + 2))

            # Check if folder has posts
            posts = folder_data.get('_posts', [])
            if posts:
                result.append(f'{prefix}  posts:')
                for post in sorted(posts, reverse=True):
                    result.append(f'{prefix}    - {post}')

        return result

    # Process folders
    folders = tree.get('_folders', {})
    if folders:
        lines.extend(process_folders(folders))

    # Process root-level posts
    root_posts = tree.get('_root_posts', [])
    for post in sorted(root_posts, reverse=True):
        lines.append(f'  - post: {post}')

    return lines

def format_yaml_value(value):
    """Format a value for YAML output, handling special characters."""
    if value is None:
        return 'null'
    if isinstance(value, bool):
        return 'true' if value else 'false'
    if isinstance(value, (int, float)):
        return str(value)
    if isinstance(value, list):
        return '[' + ', '.join(format_yaml_value(v) for v in value) + ']'
    # String - check if needs quoting
    s = str(value)
    if '\n' in s or ':' in s or '#' in s or s.startswith('{') or s.startswith('[') or s.startswith('"') or s.startswith("'"):
        # Use quoted string, escape internal quotes
        s = s.replace('\\', '\\\\').replace('"', '\\"')
        return f'"{s}"'
    return s

# Get files from command line arguments
files = sys.argv[1:]

# Extract metadata from each file
posts_with_meta = []
for filepath in files:
    meta, _ = extract_frontmatter(filepath)
    if meta:
        # Convert date to string if needed
        date = meta.get('date', '')
        if hasattr(date, 'isoformat'):
            date = date.isoformat()[:10]
        else:
            date = str(date)[:10]

        post_data = {
            'file': filepath,
            'date': date,
            'title': meta.get('title', date),
            'tags': meta.get('tags', []),
            'summary': meta.get('summary', ''),
            'preview': meta.get('_preview', ''),
            'draft': meta.get('draft', False)
        }
        posts_with_meta.append(post_data)

# Sort by date descending
posts_with_meta.sort(key=lambda x: x['date'], reverse=True)

# Build tree
tree = build_tree(posts_with_meta)

# Output YAML
print('# Auto-generated blog configuration')
print('# Run scripts/generate-config.sh to regenerate')
print('')

# Tree section
for line in tree_to_yaml_lines(tree):
    print(line)

print('')

# Posts with metadata
print('posts:')
for post in posts_with_meta:
    print(f'  - file: {post["file"]}')
    print(f'    date: {post["date"]}')
    print(f'    title: {format_yaml_value(post["title"])}')
    if post['tags']:
        print(f'    tags: {format_yaml_value(post["tags"])}')
    if post['summary']:
        print(f'    summary: {format_yaml_value(post["summary"])}')
    elif post['preview']:
        print(f'    preview: {format_yaml_value(post["preview"])}')
    if post['draft']:
        print(f'    draft: true')
PYTHON_SCRIPT

# Report success
echo "Config generated successfully at $BLOG_DIR/config.yml"
echo "Total posts: $VALID_COUNT"
