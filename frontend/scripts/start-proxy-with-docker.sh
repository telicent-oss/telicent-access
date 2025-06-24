#!/usr/bin/env sh
set -e

if lsof -i :8080 -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Port 8080 is in use."
  echo ""
  echo "This script is used to run the frontend web dev server against docker-compose.yaml services"
  echo "(in order to have quicker development experience)"
  echo "As 8080 is in use, its probably the frontend added to the docker-compose.yaml"
  echo ""
  echo "PROBABLE SOLUTION: Temporarilyt remove 'ui' service from ./docker-compose.yaml"
  cat ../docker-compose.yaml | grep "ui:" -A3;
  exit 1;
else
  echo "Port 8080 is free."
fi

PORT=8080 \
    DEV_FE_API_PROXY_TARGET=\"http://localhost:8091\" \
    ./scripts/start-proxy.sh;
