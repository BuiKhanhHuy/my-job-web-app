<p align="center">
 <img src="https://github.com/BuiKhanhHuy/my-job-web-app/assets/69914972/3252a6c3-4ec7-46cd-8265-e1d42ade58ea" width="200"  alt="Image" />
</p>
<h1 align="center">JOB PORTAL SYSTEM</h1>
<h1 align="center">MyJob Web Application (ReactJS)</h1>
<p align="center">Web application for the My Job employment and recruitment platform.</p>

## Table of Contents

- [Overview](#overview)
  - [Live Demo](#live-demo)
- [System Requirements](#system-requirements)
- [Installation](#installation)
  - [MacOS & Linux](#macos--linux)
  - [Windows](#windows)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [API & Integration](#api--integration)

## Overview

My Job is a platform connecting employers and job seekers. This web application includes:
- User interface for job seekers (www.myjob.com)
- Management interface for employers (employer.myjob.com)

### Live Demo

[https://myjob.buikhanhhuy.com](https://myjob.buikhanhhuy.com)

### Technologies Used

- Frontend: React.js
- Containerization: Docker, Docker Compose
- Web Server: Nginx
- SSL: mkcert (for local development environment)

## System Requirements

- [Git](https://git-scm.com/downloads)
- [Docker](https://www.docker.com/products/docker-desktop/) and Docker Compose
- [Make](https://www.gnu.org/software/make/) (optional, to use Makefile commands)
- [Node.js](https://nodejs.org/) (v16+, for local development without Docker)

## Installation

### MacOS & Linux

#### 1. Clone the project

```bash
git clone https://github.com/buikhanhhuy/my-job-web-app.git
cd my-job-web-app
```

#### 2. Configure environment

Create an `.env` file from the template:

```bash
cp .env.develop.example .env
```

Edit the `.env` file if necessary.

#### 3. Install and launch (Simple method)

Use Makefile to perform all necessary steps:

```bash
make init
```

This command will:
- Update the system hosts file (requires sudo)
- Create and install local SSL certificates
- Build Docker images
- Start the containers

#### 4. Manual installation (step by step)

**a. Grant execute permission to scripts**:

```bash
chmod +x ./docker/scripts/*.sh
```

**b. Update hosts file**:

```bash
sudo ./docker/scripts/setup-hosts.sh
```

**c. Create local SSL certificate**:

```bash
sudo ./docker/scripts/generate-certs.sh
```

**d. Build and run Docker**:

```bash
docker-compose build
docker-compose up -d
```

#### 5. Access the application

When completed, access:
- https://www.myjob.com - Job seeker interface
- https://employer.myjob.com - Employer interface

### Windows

#### 1. Install necessary tools

- Docker Desktop with WSL2: [Installation Guide](https://docs.docker.com/desktop/windows/install/)
- WSL2 (Windows Subsystem for Linux): [Installation Guide](https://docs.microsoft.com/en-us/windows/wsl/install)

#### 2. Method 1: Using WSL2 (Recommended)

**a. Open Ubuntu in WSL2**:
```
wsl
```

**b. Clone and install the project**:
```bash
cd ~
git clone https://github.com/buikhanhhuy/my-job-web-app.git
cd my-job-web-app
```

**c. Continue with steps as in MacOS/Linux**:
```bash
make init
```

#### 3. Method 2: Using CMD/PowerShell with Admin rights or Git Bash

**a. Update hosts file**:

Open Notepad with Admin rights and open the file:
```
C:\Windows\System32\drivers\etc\hosts
```

Add to the end of the file:
```
127.0.0.1 myjob.com
127.0.0.1 employer.myjob.com
```

**b. If using Git Bash, grant execute permission to scripts**:
```bash
chmod +x ./docker/scripts/*.sh
```

**c. Install mkcert**:

Using Chocolatey:
```
choco install mkcert
```

**d. Create certs directory and SSL certificate**:
```
mkdir docker\nginx\certs
mkcert -install
mkcert -key-file docker\nginx\certs\myjob.key -cert-file docker\nginx\certs\myjob.crt myjob.com *.myjob.com localhost 127.0.0.1 ::1
```

**e. Build and run Docker**:
```
docker-compose build
docker-compose up -d
```

## Application Management

### Using Makefile (MacOS, Linux, Windows with WSL)

```bash
# Initialize everything
make init

# Setup hosts
make setup-hosts

# Generate SSL certificates
make generate-certs

# Start Docker
make docker-up

# Stop Docker
make docker-down

# Rebuild Docker
make docker-build

# View logs
make logs

# Reinstall SSL certificates
make reinstall-certs
```

### Using Docker Compose directly

```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# Restart Nginx
docker-compose restart frontend_nginx

# View logs
docker-compose logs -f
```

## Project Structure

```
my-job-web-app/
├── Dockerfile              # Main Dockerfile
├── docker-compose.yaml     # Docker Compose configuration
├── Makefile                # Makefile command definitions
├── docker/                 # Docker configuration directory
│   ├── nginx/              # Nginx configuration
│   │   ├── certs/          # SSL certificates directory
│   │   ├── default.conf    # Nginx configuration
│   │   └── hosts           # Hosts file
│   └── scripts/            # Helper scripts
│       ├── generate-certs.sh  # SSL generation script
│       └── setup-hosts.sh  # Hosts file update script
├── src/                    # React source code
├── public/                 # Static files
└── package.json            # npm configuration
```

## Troubleshooting

### SSL Issues

**Browser shows insecure connection warning**:
1. If using mkcert, certificates should be automatically trusted
2. If not, you can:
   - Accept the risk and continue (only for development environment)
   - Import the root CA certificate into your browser

**Reinstall SSL certificates**:
```bash
make reinstall-certs
```

### Hosts Issues

**Cannot access domain**:
1. Check hosts file:
   ```bash
   # MacOS/Linux
   cat /etc/hosts
   
   # Windows
   type C:\Windows\System32\drivers\etc\hosts
   ```
2. Run hosts setup script again:
   ```bash
   # MacOS/Linux
   sudo ./docker/scripts/setup-hosts.sh
   
   # Windows (CMD with Admin rights)
   notepad C:\Windows\System32\drivers\etc\hosts
   ```

### Docker Issues

**Containers not running**:
```bash
# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

**Port in use**:
1. Check and stop services using ports 80/443:
   ```bash
   # MacOS/Linux
   sudo lsof -i :80
   sudo lsof -i :443
   
   # Windows
   netstat -ano | findstr :80
   netstat -ano | findstr :443
   ```
2. Edit `docker-compose.yaml` to use different ports if needed

## API & Integration

### Backend API

The application connects to the My Job API Server. Ensure the API server is running and accessible via the URL configured in the `.env` file:

```
REACT_APP_BASE_URL=http://api.myjob.com/
```

## Links

### 🚀 [API Server](https://github.com/buikhanhhuy/my-job-api-server)
### 📱 [Mobile app](https://github.com/buikhanhhuy/MyJobApp)


<details>
<summary>VN</summary>

# My Job Web App

Web app cho nền tảng tìm kiếm việc làm và tuyển dụng My Job.

## Mục lục

- [Tổng quan](#tổng-quan)
  - [Live Demo](#live-demo)
- [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
- [Cài đặt](#cài-đặt)
  - [MacOS & Linux](#macos--linux)
  - [Windows](#windows)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Xử lý sự cố](#xử-lý-sự-cố)
- [API & Tích hợp](#api--tích-hợp)

## Tổng quan

My Job là nền tảng kết nối nhà tuyển dụng và người tìm việc. Dự án web app này bao gồm:
- Giao diện người dùng cho người tìm việc (www.myjob.com)
- Giao diện quản lý cho nhà tuyển dụng (employer.myjob.com)

### Live Demo

[https://myjob.buikhanhhuy.com](https://myjob.buikhanhhuy.com)

### Công nghệ sử dụng

- Frontend: React.js
- Containerization: Docker, Docker Compose
- Web Server: Nginx
- SSL: mkcert (cho môi trường phát triển local)

## Yêu cầu hệ thống

- [Git](https://git-scm.com/downloads)
- [Docker](https://www.docker.com/products/docker-desktop/) và Docker Compose
- [Make](https://www.gnu.org/software/make/) (tùy chọn, để sử dụng các lệnh Makefile)
- [Node.js](https://nodejs.org/) (v16+, cho phát triển local không dùng Docker)

## Cài đặt

### MacOS  & Linux

#### 1. Clone dự án

```bash
git clone https://github.com/buikhanhhuy/my-job-web-app.git
cd my-job-web-app
```

#### 2. Cấu hình môi trường

Tạo file `.env` từ file mẫu:

```bash
cp example.env .env
```

Chỉnh sửa file `.env` nếu cần thiết.

#### 3. Cài đặt và khởi động (Cách đơn giản)

Sử dụng Makefile để thực hiện tất cả các bước cần thiết:

```bash
make init
```

Lệnh trên sẽ:
- Cập nhật file hosts hệ thống (yêu cầu quyền sudo)
- Tạo và cài đặt chứng chỉ SSL local
- Build Docker images
- Khởi động các container

#### 4. Cài đặt thủ công (từng bước)

**a. Cấp quyền thực thi cho scripts**:

```bash
chmod +x ./docker/scripts/*.sh
```

**b. Cập nhật file hosts**:

```bash
sudo ./docker/scripts/setup-hosts.sh
```

**c. Tạo chứng chỉ SSL local**:

```bash
sudo ./docker/scripts/generate-certs.sh
```

**d. Build và chạy Docker**:

```bash
docker-compose build
docker-compose up -d
```

#### 5. Truy cập ứng dụng

Sau khi hoàn tất, truy cập:
- https://www.myjob.com - Giao diện người tìm việc
- https://employer.myjob.com - Giao diện nhà tuyển dụng

### Windows

#### 1. Cài đặt các công cụ cần thiết

- Docker Desktop với WSL2: [Hướng dẫn cài đặt](https://docs.docker.com/desktop/windows/install/)
- WSL2 (Windows Subsystem for Linux): [Hướng dẫn cài đặt](https://docs.microsoft.com/en-us/windows/wsl/install)

#### 2. Phương pháp 1: Sử dụng WSL2 (Khuyến nghị)

**a. Mở Ubuntu trong WSL2**:
```
wsl
```

**b. Clone và cài đặt dự án**:
```bash
cd ~
git clone https://github.com/buikhanhhuy/my-job-web-app.git
cd my-job-web-app
```

**c. Tiếp tục với các bước như MacOS/Linux**:
```bash
make init
```

#### 3. Phương pháp 2: Sử dụng CMD/PowerShell với quyền Admin hoặc Git Bash

**a. Cập nhật file hosts**:

Mở Notepad với quyền Admin và mở file:
```
C:\Windows\System32\drivers\etc\hosts
```

Thêm vào cuối file:
```
127.0.0.1 myjob.com
127.0.0.1 employer.myjob.com
```

**b. Nếu sử dụng Git Bash, cấp quyền thực thi cho scripts**:
```bash
chmod +x ./docker/scripts/*.sh
```

**c. Cài đặt mkcert**:

Sử dụng Chocolatey:
```
choco install mkcert
```

**d. Tạo thư mục certs và chứng chỉ SSL**:
```
mkdir docker\nginx\certs
mkcert -install
mkcert -key-file docker\nginx\certs\myjob.key -cert-file docker\nginx\certs\myjob.crt myjob.com *.myjob.com localhost 127.0.0.1 ::1
```

**e. Build và chạy Docker**:
```
docker-compose build
docker-compose up -d
```

## Quản lý ứng dụng

### Sử dụng Makefile (MacOS, Linux, Windows với WSL)

```bash
# Khởi tạo toàn bộ
make init

# Cài đặt hosts
make setup-hosts

# Tạo chứng chỉ SSL
make generate-certs

# Khởi động Docker
make docker-up

# Dừng Docker
make docker-down

# Build lại Docker
make docker-build

# Xem logs
make logs

# Cài đặt lại chứng chỉ SSL
make reinstall-certs
```

### Sử dụng Docker Compose trực tiếp

```bash
# Khởi động
docker-compose up -d

# Dừng
docker-compose down

# Khởi động lại Nginx
docker-compose restart frontend_nginx

# Xem logs
docker-compose logs -f
```

## Cấu trúc dự án

```
my-job-web-app/
├── Dockerfile              # Dockerfile chính
├── docker-compose.yaml     # Cấu hình Docker Compose
├── Makefile                # Định nghĩa các lệnh make
├── docker/                 # Thư mục chứa cấu hình Docker
│   ├── nginx/              # Cấu hình Nginx
│   │   ├── certs/          # Thư mục chứa chứng chỉ SSL
│   │   ├── default.conf    # Cấu hình Nginx
│   │   └── hosts           # File hosts
│   └── scripts/            # Scripts hỗ trợ
│       ├── generate-certs.sh  # Script tạo SSL
│       └── setup-hosts.sh  # Script cập nhật hosts
├── src/                    # Mã nguồn React
├── public/                 # Static files
└── package.json            # Cấu hình npm
```

## Xử lý sự cố

### Vấn đề về SSL

**Trình duyệt hiển thị cảnh báo kết nối không an toàn**:
1. Nếu sử dụng mkcert, chứng chỉ nên được tin cậy tự động
2. Nếu không, bạn có thể:
   - Chấp nhận rủi ro và tiếp tục (chỉ dùng cho môi trường phát triển)
   - Nhập chứng chỉ CA root vào trình duyệt

**Tái cài đặt chứng chỉ SSL**:
```bash
make reinstall-certs
```

### Vấn đề về hosts

**Không thể truy cập domain**:
1. Kiểm tra file hosts:
   ```bash
   # MacOS/Linux
   cat /etc/hosts
   
   # Windows
   type C:\Windows\System32\drivers\etc\hosts
   ```
2. Chạy lại script cài đặt hosts:
   ```bash
   # MacOS/Linux
   sudo ./docker/scripts/setup-hosts.sh
   
   # Windows (CMD với quyền Admin)
   notepad C:\Windows\System32\drivers\etc\hosts
   ```

### Vấn đề về Docker

**Các container không chạy**:
```bash
# Kiểm tra trạng thái
docker-compose ps

# Xem logs
docker-compose logs -f
```

**Cổng bị sử dụng**:
1. Kiểm tra và dừng dịch vụ đang sử dụng cổng 80/443:
   ```bash
   # MacOS/Linux
   sudo lsof -i :80
   sudo lsof -i :443
   
   # Windows
   netstat -ano | findstr :80
   netstat -ano | findstr :443
   ```
2. Chỉnh sửa `docker-compose.yaml` để sử dụng cổng khác nếu cần

## API & Tích hợp

### Backend API

Ứng dụng kết nối với My Job API Server. Đảm bảo server API đang chạy và truy cập được qua URL đã cấu hình trong file `.env`:

```
REACT_APP_BASE_URL=http://api.myjob.com/
```

## Liên kết

### 🚀 [API Server](https://github.com/buikhanhhuy/my-job-api-server)
### 📱 [Mobile app](https://github.com/buikhanhhuy/MyJobApp)

</details>