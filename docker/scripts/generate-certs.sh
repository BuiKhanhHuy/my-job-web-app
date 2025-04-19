#!/bin/bash

echo "Starting local SSL certificate generation..."

# Create certs directory if it doesn't exist
mkdir -p ./docker/nginx/certs

# Check if mkcert is installed
if ! command -v mkcert &> /dev/null; then
    echo "mkcert is not installed. Installing..."
    
    # Detect operating system
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS - Run without sudo
        if [ "$(id -u)" -eq 0 ]; then
            echo "On macOS, you should not run this script with sudo."
            echo "Please run it again as a normal user."
            exit 1
        fi
        brew install mkcert
        brew install nss # for Firefox
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        if [ "$(id -u)" -ne 0 ]; then
            echo "On Linux, this script requires sudo privileges to run."
            echo "Please run with sudo."
            exit 1
        fi
        apt-get update
        apt-get install -y libnss3-tools
        # Download and install mkcert
        curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64"
        chmod +x mkcert-v*-linux-amd64
        mv mkcert-v*-linux-amd64 /usr/local/bin/mkcert
    else
        echo "Operating system not supported. Please install mkcert manually."
        exit 1
    fi
fi

# Install root CA
mkcert -install

# Generate certificates for domains
mkcert -key-file ./docker/nginx/certs/myjob.key -cert-file ./docker/nginx/certs/myjob.crt myjob.com "*.myjob.com" localhost 127.0.0.1 ::1

echo "SSL certificates successfully generated in ./docker/nginx/certs/"
echo "You can now access the following domains via HTTPS:"
echo "- https://myjob.com"
echo "- https://employer.myjob.com"