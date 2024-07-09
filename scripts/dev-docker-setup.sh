#!/usr/bin/env sh
set -e

# File paths
API_SBOM_FILE="./access.sbom.json"
FRONTEND_SBOM_FILE="./frontend/accessfrontend.sbom.json"

# Check if API_SBOM file exists
if [ -e "$API_SBOM_FILE" ]; then
	echo "File $API_SBOM_FILE already exists. Skipping creation."
else
	# Create the file
	echo "File $API_SBOM_FILE does not exist. Creating file."
	touch "$API_SBOM_FILE"

	# Add content to file
	echo "echo '{}' > $API_SBOM_FILE"
	echo "File $API_SBOM_FILE created."
fi

# Check if FRONTEND_SBOM file exists
if [ -e "$FRONTEND_SBOM_FILE" ]; then
	echo "File $FRONTEND_SBOM_FILE already exists. Skipping creation."
else
	# Create the file
	echo "File $FRONTEND_SBOM_FILE does not exist. Creating file."
	touch "$FRONTEND_SBOM_FILE"

	# Add content to file
	echo "echo '{}' > $FRONTEND_SBOM_FILE"
	echo "File $FRONTEND_SBOM_FILE created."
fi

# Build the Docker image using Docker Compose
docker compose build

# Run the Docker Compose services
docker compose -p telicent_access up -d
