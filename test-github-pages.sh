#!/bin/bash
# Script to test GitHub Pages deployment locally
# This simulates how GitHub Pages will serve your site

echo "Testing GitHub Pages deployment locally..."
echo ""
echo "Creating temporary directory structure that matches GitHub Pages..."

# Create a temp directory to simulate GitHub Pages structure
TEMP_DIR=$(mktemp -d)
mkdir -p "$TEMP_DIR/school-evaluator"

# Copy the built files to simulate GitHub Pages structure
echo "Copying built files..."
cp -r out/* "$TEMP_DIR/school-evaluator/"

echo ""
echo "✅ Test setup complete!"
echo ""
echo "Starting server at http://localhost:7777"
echo "Your site will be available at: http://localhost:7777/school-evaluator/en.html"
echo ""
echo "Available pages:"
echo "  - English:  http://localhost:7777/school-evaluator/en.html"
echo "  - Chinese:  http://localhost:7777/school-evaluator/zh.html"
echo "  - Japanese: http://localhost:7777/school-evaluator/ja.html"
echo "  - Spanish:  http://localhost:7777/school-evaluator/es.html"
echo "  - French:   http://localhost:7777/school-evaluator/fr.html"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start server from temp directory (simulating GitHub's root)
cd "$TEMP_DIR"
python3 -m http.server 7777

# Cleanup on exit
trap "rm -rf $TEMP_DIR" EXIT
