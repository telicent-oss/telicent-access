#!/bin/sh
set -e

trivy config \
    --format table \
    --exit-code 1 \
    --severity HIGH,CRITICAL \
    Dockerfile;

trivy config \
    --format table \
    --exit-code 1 \
    --severity HIGH,CRITICAL \
    ./frontend/Dockerfile;