@echo off
chcp 65001 >nul
title Partner AI Demo Command Center (Port 8788)
cd /d "%~dp0"

echo ============================================================================
echo   Partner AI Demo Command Center (Voice / Animation / Game / Decision Model)
echo ============================================================================
echo.

where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [INFO] Starting Node.js in-memory warm server on http://127.0.0.1:8788/ ...
    start "" "http://127.0.0.1:8788/"
    node server.mjs
    goto :eof
)

where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [INFO] Node.js not found. Falling back to Python HTTP server on http://127.0.0.1:8788/ ...
    start "" "http://127.0.0.1:8788/"
    python -m http.server 8788 --bind 127.0.0.1
    goto :eof
)

echo [INFO] Neither Node.js nor Python was found in PATH. Opening index.html directly...
start "" "%~dp0index.html"
