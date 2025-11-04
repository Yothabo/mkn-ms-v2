#!/bin/bash
set -e

# Start build
echo "Starting production build at $(date)"

# Run TypeScript and Vite build
tsc
vite build

# Print bundle summary
echo
echo "Bundle size summary:"
echo "--------------------"

# Loop through all files in dist/assets
for file in dist/**/*.*; do
    # Skip directories
    [ -f "$file" ] || continue

    # Get human-readable size
    size=$(du -h "$file" | cut -f1)

    # Get gzip size
    gzip_size=$(gzip -c "$file" | wc -c)
    # Convert to KB
    gzip_size_kb=$(awk "BEGIN {printf \"%.2f KB\", $gzip_size/1024}")

    echo "$size    $file    gzip: $gzip_size_kb"
done

# Total build size
total_size=$(du -sh dist | cut -f1)
echo
echo "Total build directory size: $total_size"
echo "Build completed successfully at $(date)"
