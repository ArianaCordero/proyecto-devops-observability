#!/bin/bash
set -e

exec > >(tee /var/log/user-data.log)
exec 2>&1

echo "=== Iniciando configuracion de instancia ==="

apt-get update
apt-get upgrade -y

apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common \
    git \
    unzip

echo "=== Instalando Docker ==="
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

usermod -aG docker ubuntu

echo "=== Instalando Docker Compose ==="
apt-get install -y docker-compose-plugin

systemctl enable docker
systemctl start docker

echo "=== Configurando Swap Memory ==="
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab

docker --version
docker compose version

echo "=== Configuracion completada ==="