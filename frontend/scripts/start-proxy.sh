#!/usr/bin/env sh
set -e

if [ -z "$DEV_FE_API_PROXY_TARGET" ]; then
    echo "Error: DEV_FE_API_PROXY_TARGET must be set. Exiting scripts/start-proxy ..."
    exit 1
fi

DEV_FE_API_PROXY_TARGET="$DEV_FE_API_PROXY_TARGET" \
    yarn start
