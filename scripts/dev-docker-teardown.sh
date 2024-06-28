#!/usr/bin/env sh
set -e

# Run the Docker Compose services
docker compose -p telicent_access down -v
