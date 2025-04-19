.PHONY: setup-hosts generate-certs docker-up docker-down docker-build docker-restart

# Detect OS for certificate generation
OS_NAME := $(shell uname -s)

# Setup hosts file
setup-hosts:
	chmod +x ./docker/scripts/setup-hosts.sh && sudo ./docker/scripts/setup-hosts.sh

# Generate SSL certificates
generate-certs:
ifeq ($(OS_NAME), Darwin)
	chmod +x ./docker/scripts/generate-certs.sh && ./docker/scripts/generate-certs.sh
else
	chmod +x ./docker/scripts/generate-certs.sh && sudo ./docker/scripts/generate-certs.sh
endif

# Start docker containers
docker-up:
	docker-compose up -d

# Stop docker containers
docker-down:
	docker-compose down

# Rebuild docker containers
docker-build:
	docker-compose build

# Restart docker containers
docker-restart:
	docker-compose restart

# Initialize everything (hosts, certs, docker)
init: setup-hosts generate-certs docker-build docker-up

# Check logs
logs:
	docker-compose logs -f

# Remove SSL certificates
clean-certs:
	rm -rf ./docker/nginx/certs/*

# Reinstall SSL certificates
reinstall-certs: clean-certs generate-certs docker-restart 