#!/bin/bash

# Check admin privileges
if [ "$(id -u)" -ne 0 ]; then
    echo "This script requires sudo privileges to run. Please run with sudo."
    echo "Example: sudo bash docker/scripts/setup-hosts.sh"
    exit 1
fi

echo "Updating hosts file..."

# Check if domains already exist in hosts file
if grep -q "myjob.com" /etc/hosts; then
    echo "Domain myjob.com already exists in hosts file."
else
    echo "127.0.0.1 myjob.com" >> /etc/hosts
    echo "Domain myjob.com has been added to hosts file."
fi

if grep -q "employer.myjob.com" /etc/hosts; then
    echo "Domain employer.myjob.com already exists in hosts file."
else
    echo "127.0.0.1 employer.myjob.com" >> /etc/hosts
    echo "Domain employer.myjob.com has been added to hosts file."
fi

echo "Setup completed!"
echo "You can now access the following domains in your browser:"
echo "- http://myjob.com (will automatically redirect to HTTPS)"
echo "- https://myjob.com"
echo "- http://employer.myjob.com (will automatically redirect to HTTPS)"
echo "- https://employer.myjob.com"

echo
echo "Note: To use HTTPS, you need to run generate-certs.sh script to generate SSL certificates:"
echo "sudo ./docker/scripts/generate-certs.sh"