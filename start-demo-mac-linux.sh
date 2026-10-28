#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

echo "============================================================================"
echo "  Partner AI Demo Command Center (Voice / Animation / Game / Decision Model)"
echo "============================================================================"

URL="http://127.0.0.1:8788/"
if command -v open >/dev/null 2>&1; then
  (sleep 1 && open "$URL") &
elif command -v xdg-open >/dev/null 2>&1; then
  (sleep 1 && xdg-open "$URL") &
fi

if command -v node >/dev/null 2>&1; then
  echo "[INFO] Starting Node.js warm server on $URL ..."
  exec node server.mjs
elif command -v python3 >/dev/null 2>&1; then
  echo "[INFO] Falling back to python3 http.server on $URL ..."
  exec python3 -m http.server 8788 --bind 127.0.0.1
else
  echo "[ERROR] Please install Node.js or Python 3, or open index.html in your browser."
  exit 1
fi
