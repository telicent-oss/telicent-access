#!/usr/bin/env sh
set -e

# Run the Docker Compose services
docker compose -p telicent-access down -v
