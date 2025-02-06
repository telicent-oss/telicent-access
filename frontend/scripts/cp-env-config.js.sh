#!/usr/bin/env bash
set -e
RED="\e[31m"
ENDCOLOR="\e[0m"

if [ ! -f "./env-config.js" ]; then
    printf "${RED}No ./env-config.js - this won't work in a local dev server!${ENDCOLOR}"
    echo
    exit 0
fi

if [ -d "./public" ]; then
    cp ./env-config.js ./public
    echo "Copied ./env-config.js to ./public"
fi
if [ -d "./build" ]; then
    cp ./env-config.js ./build
    echo "Copied ./env-config.js to ./build"
fi
