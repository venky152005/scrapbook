#!/usr/bin/env bash

# Navigate to script's directory (crucial for macOS Finder double-click)
cd "$(dirname "$0")" || exit 1

echo "========================================================"
echo "  Launching Samantha's Sketchbook..."
echo "========================================================"
echo ""

# Check for Node.js
if ! command -v node >/dev/null 2>&1; then
    echo "[ERROR] Node.js is not installed or not in your PATH!"
    echo "Please install Node.js from https://nodejs.org and try again."
    echo ""
    read -p "Press Enter to exit..."
    exit 1
fi

# Install dependencies if node_modules does not exist
if [ ! -d "node_modules" ]; then
    echo "[INFO] First-time setup detected: Installing npm dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "[ERROR] Failed to install dependencies."
        echo ""
        read -p "Press Enter to exit..."
        exit 1
    fi
fi

echo ""
echo "[INFO] Starting Vite development server..."
echo "[INFO] Opening http://localhost:5173 in your default browser..."
echo ""

# Open default browser (macOS 'open', Linux fallback 'xdg-open')
if command -v open >/dev/null 2>&1; then
    open "http://localhost:5173" &
elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open "http://localhost:5173" &
fi

# Run the Vite development server
npm run dev
