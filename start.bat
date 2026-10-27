@echo off
title Scrapbook - Samantha's Sketchbook
echo ========================================================
echo   Launching Samantha's Sketchbook...
echo ========================================================
echo.

:: Check for Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in your PATH!
    echo Please install Node.js from https://nodejs.org and try again.
    echo.
    pause
    exit /b 1
)

:: Install dependencies if node_modules does not exist
if not exist "node_modules\" (
    echo [INFO] First-time setup detected: Installing npm dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install dependencies.
        pause
        exit /b 1
    )
)

echo.
echo [INFO] Starting Vite development server...
echo [INFO] Opening http://localhost:5173 in your default browser...
echo.

:: Launch the browser after a brief pause so Vite is ready
start "" http://localhost:5173

:: Run the Vite development server
call npm run dev

pause
