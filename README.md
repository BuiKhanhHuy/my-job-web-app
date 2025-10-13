# 🚀 MyJob - Job Recruitment & Search Web Application

<div align="center">
  <img src="https://github.com/BuiKhanhHuy/my-job-web-app/assets/69914972/3252a6c3-4ec7-46cd-8265-e1d42ade58ea" width="200" alt="MyJob Logo" />
  
  **Platform connecting employers and job seekers**
</div>

---

## 📋 Table of Contents

1. [Introduction](#-introduction)
2. [Installation Guide](#-installation-guide)
3. [Environment Variables Configuration](#-environment-variables-configuration)
4. [Data Configuration](#-data-configuration)

---

## 🎯 Introduction

**MyJob** is a platform connecting employers and job seekers, including:
- 👨‍💼 **Job seeker interface**: `https://www.myjob.com`
- 🏢 **Employer interface**: `https://employer.myjob.com`

---

## 📦 Installation Guide

### Step 1: Clone the Project

```bash
# Clone repository
git clone https://github.com/BuiKhanhHuy/my-job-web-app.git

# Navigate to project directory
cd my-job-web-app

# Create environment configuration file from template
cp .env.example .env
```

### Step 2: Configure Environment Variables

1. Open the newly created `.env` file
2. Fill in all configuration information according to the [guide below](#-environment-variables-configuration)
3. Save the file

### Step 3: Configure Nginx

1. Copy file `default.conf.example` → `default.conf`
2. Update `<ngrok domain>` in the file with the ngrok domain configured in Backend
   
   Example: `<ngrok domain>` → `sought-shiner-utterly.ngrok-free.app`

### Step 4: Launch Application

```bash
# Build and run application with Docker
docker-compose up -d --build
```

> **Note**: Ensure Docker and Docker Compose are installed on your machine.

### Step 5: Domain Simulation

Allow www.myjob.com and employer.myjob.com to replace localhost (127.0.0.1)

**For MacOS, Linux:**

Open terminal and run:
```bash
sudo vim /etc/hosts
```
Add these 2 lines:
```
127.0.0.1       www.myjob.com
127.0.0.1       employer.myjob.com
```

**For Windows:**

Navigate to `C:\Windows\System32\drivers\etc\`
Add the above 2 lines to the `hosts` file (Open with administrator privileges)


### Step 6: Verify Results

After successful launch, access:
- 🌐 **Job seeker page**: https://www.myjob.com
- 🌐 **Employer page**: https://employer.myjob.com

---

## ⚙️ Environment Variables Configuration

### 1. GOONG Maps API

GOONG Maps is used to display maps and addresses.

**Required environment variables:**
```env
VITE_GOONGAPI_KEY=<API_Key>
```

**Configuration steps:**

1. Access [GOONG Maps](https://account.goong.io/) and register an account
2. In Dashboard → Create a new API Key
3. Copy the API Key and paste it into the `VITE_GOONGAPI_KEY` variable in the `.env` file

---

### 2. Firebase Configuration

Firebase serves notification and chat functionality.

**Required environment variables:**
```env
VITE_FIREBASE_API_KEY=<API_Key>
VITE_FIREBASE_AUTH_DOMAIN=<Auth_Domain>
VITE_FIREBASE_PROJECT_ID=<Project_ID>
VITE_FIREBASE_STORAGE_BUCKET=<Storage_Bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<Sender_ID>
VITE_FIREBASE_APP_ID=<App_ID>
```

**Configuration steps:**

Copy the entire Firebase configuration from the **Backend** `.env` file (already set up previously) and paste it into the Frontend `.env` file.

---

### 3. OAuth2 Authentication

Configure Client ID and Client Secret for login methods.

#### 3.1. Login With Email & Password

   **Required environment variables:**
   ```env
VITE_MYJOB_SERVER_CLIENT_ID=<Client_ID>
VITE_MYJOB_SERVER_CLIENT_SECRECT=<Client_Secret>
```

**Configuration steps:**

1. Access the Backend `Applications` page at: `https://ngrok-domain/o/applications/`
2. Click **`New Application`** button
3. Fill in information as follows:
   - **Name**: Choose any name (e.g., `Default authentication`)
   - **Client id**: Keep default value → Copy and update to `VITE_MYJOB_SERVER_CLIENT_ID`
   - **Client secret**: Keep default value → Copy and update to `VITE_MYJOB_SERVER_CLIENT_SECRECT`
   - **Hash client secret**: ✅ Check
   - **Client type**: Select `Confidential`
   - **Authorization grant type**: Select `Resource owner password-based`
   - Other fields can be left empty
   
   > ⚠️ **Important note**: Client id and Client secret must be **copied and saved** before clicking Save (cannot be viewed again after Save)

4. Click **`Save`**

---

#### 3.2. Login With Facebook

   **Required environment variables:**
   ```env
VITE_FACEBOOK_CLIENT_ID=<Client_ID>
VITE_FACEBOOK_CLIENT_SECRET=<Client_Secret>
```

**Configuration steps:**

1. Access the Backend `Applications` page at: `https://ngrok-domain/o/applications/`
2. Click **`New Application`** button
3. Fill in information as follows:
   - **Name**: Choose any name (e.g., `Authenticate with Facebook`)
   - **Client id**: Keep default value → Copy and update to `VITE_FACEBOOK_CLIENT_ID`
   - **Client secret**: Keep default value → Copy and update to `VITE_FACEBOOK_CLIENT_SECRET`
   - **Hash client secret**: ✅ Check
   - **Client type**: Select `Confidential`
   - **Authorization grant type**: Select `Client credentials`
   - Other fields can be left empty
   
   > ⚠️ **Important note**: Client id and Client secret must be **copied and saved** before clicking Save

4. Click **`Save`**

---

#### 3.3. Login With Google

   **Required environment variables:**
   ```env
VITE_GOOGLE_CLIENT_ID=<Client_ID>
VITE_GOOGLE_CLIENT_SECRET=<Client_Secret>
```

**Configuration steps:**

1. Access the Backend `Applications` page at: `https://ngrok-domain/o/applications/`
2. Click **`New Application`** button
3. Fill in information as follows:
   - **Name**: Choose any name (e.g., `Authenticate with Google`)
   - **Client id**: Keep default value → Copy and update to `VITE_GOOGLE_CLIENT_ID`
   - **Client secret**: Keep default value → Copy and update to `VITE_GOOGLE_CLIENT_SECRET`
   - **Hash client secret**: ✅ Check
   - **Client type**: Select `Confidential`
   - **Authorization grant type**: Select `Client credentials`
   - Other fields can be left empty
   
   > ⚠️ **Important note**: Client id and Client secret must be **copied and saved** before clicking Save

4. Click **`Save`**

---

### 4. Dialogflow Chatbot

Configure chatbot for job seekers and employers.

**Required environment variables:**
```env
VITE_JOB_SEEKER_BOT_AGENT_ID=<Job_Seeker_Agent_ID>
VITE_EMPLOYER_BOT_AGENT_ID=<Employer_Agent_ID>
```

**Configuration steps:**

You need to create **2 chatbot agents**: one for job seekers and one for employers.

1. Access [Dialogflow Console](https://dialogflow.cloud.google.com/)
2. Click **`Create new agent`**
3. Fill in agent information:
   - Create first agent with name: `JobSeekerMyJobAgent` (for job seekers)
   - Create second agent with name: `EmployerMyJobAgent` (for employers)
   - You can choose a previously created Google Project or create a new one
4. After creating the agent, access **`Integrations`** → Select **`Dialogflow Messenger`** → Click **`ENABLE`**
5. The dialog displays the **agent-id**, copy and paste into:
   - `VITE_JOB_SEEKER_BOT_AGENT_ID` (for JobSeekerMyJobAgent)
   - `VITE_EMPLOYER_BOT_AGENT_ID` (for EmployerMyJobAgent)

> 💡 **Tip**: Repeat steps 2-5 for both agents

---

## 🗃️ Data Configuration

### 1. Configure Chatbot Data

**Purpose**: Import intents, entities and configure webhook so the chatbot can answer user questions.

**Steps to perform:**

1. Access [Dialogflow Console](https://dialogflow.cloud.google.com/)
2. Select agent `JobSeekerMyJobAgent` (or `EmployerMyJobAgent` to configure for employers)

3. **Configure Webhook** for chatbot to call Backend API:
   - Access **Fulfillment** → Enable **Enabled Webhook**
   - Enter information:
     - **URL**: 
       - For job seekers: `https://ngrok-domain/api/chatbot/jobseeker/webhook/`
       - For employers: `https://ngrok-domain/api/chatbot/employer/webhook/`
     - **Basic Auth**: 
       - Username: `temp`
       - Password: `temp`
   - Click **Save**

4. **Import agent data** from Backend:
   - Access **Settings** (gear icon) of the agent
   - Select **Export and Import** tab
   - Click **`IMPORT FROM ZIP`**
   - Select the corresponding file from the Backend `data/chatbot/` directory:
     - `JobSeekerMyJobAgent.zip` (for job seeker agent)
     - `EmployerMyJobAgent.zip` (for employer agent)
   - Wait for the import process to complete

> 💡 **Note**: Perform similarly for both agents (JobSeekerMyJobAgent and EmployerMyJobAgent)

---

### 2. Configure Images (Upload to Cloudinary)

**Purpose**: Automatically upload sample images to Cloudinary for display in the application.

**Steps to perform:**

1. Access the **Backend admin page** (Django Admin)
2. Go to **Periodic tasks** (Manage periodic tasks)
3. Find and select the record named: 
   ```
   [SETUP] Upload Files To Cloudinary One-time Task: every 60 seconds
   ```
4. Check the **`Enabled`** box
5. Click **`Save`**
6. Wait **60 seconds** for the cron job to automatically run and upload images

> ⚠️ **Important note**: 
> - This is a **one-time cron job** (one-time task)
> - The cron job will automatically upload all images from the `data/cloudinary/cloudinary_files.json` file (in Backend) to Cloudinary
> - **Do not shut down the Backend** while the cron job is running (at least 10 minutes)
> - After upload completes, you can disable this task

---

## 🎉 Complete!

You have completed the installation and configuration of **MyJob Web Application**. Access the application and enjoy!

**Useful links:**
- 📖 [Documentation](https://github.com/BuiKhanhHuy/my-job-web-app)
- 🐛 [Report Issues](https://github.com/BuiKhanhHuy/my-job-web-app/issues)
- 💬 [Discussions](https://github.com/BuiKhanhHuy/my-job-web-app/discussions)

---

<details>
<summary>🇻🇳 <strong>Vietnamese</strong></summary>

# 🚀 MyJob - Ứng Dụng Web Tuyển Dụng & Tìm Việc

<div align="center">
  <img src="https://github.com/BuiKhanhHuy/my-job-web-app/assets/69914972/3252a6c3-4ec7-46cd-8265-e1d42ade58ea" width="200" alt="MyJob Logo" />
  
  **Nền tảng kết nối nhà tuyển dụng và người tìm việc**
</div>

---

## 📋 Mục Lục

1. [Giới Thiệu](#-giới-thiệu)
2. [Hướng Dẫn Cài Đặt](#-hướng-dẫn-cài-đặt)
3. [Cấu Hình Biến Môi Trường](#-cấu-hình-biến-môi-trường)
4. [Cấu Hình Dữ Liệu](#-cấu-hình-dữ-liệu)

---

## 🎯 Giới Thiệu

**MyJob** là nền tảng kết nối giữa nhà tuyển dụng và người tìm việc, bao gồm:
- 👨‍💼 **Giao diện dành cho người tìm việc**: `https://www.myjob.com`
- 🏢 **Giao diện dành cho nhà tuyển dụng**: `https://employer.myjob.com`

---

## 📦 Hướng Dẫn Cài Đặt

### Bước 1: Clone Dự Án

```bash
# Clone repository về máy
git clone https://github.com/BuiKhanhHuy/my-job-web-app.git

# Di chuyển vào thư mục dự án
cd my-job-web-app

# Tạo file cấu hình môi trường từ template
cp .env.example .env
```

### Bước 2: Cấu Hình Biến Môi Trường

1. Mở file `.env` vừa tạo
2. Điền đầy đủ các thông tin cấu hình theo hướng dẫn ở [phần dưới](#-cấu-hình-biến-môi-trường)
3. Lưu file lại

### Bước 3: Cấu hình nginx
1. Clone file `default.conf.example` → `default.conf`
2. Cập nhật `<ngrok domain>` trong file thành domain của ngrok đã setup ở Backend
Ví dụ: `<ngrok domain>` → `sought-shiner-utterly.ngrok-free.app`

### Bước 4: Khởi Chạy Ứng Dụng

```bash
# Build và chạy ứng dụng với Docker
docker-compose up -d --build
```

> **Lưu ý**: Đảm bảo Docker và Docker Compose đã được cài đặt trên máy.

### Bước 5: Giả lập domain

Cho phép www.myjob.com, employer.myjob.com thay thế cho localhost (127.0.0.1)

**Đối với MacOS, Linux:**

Vào terminal, gõ lệnh:
```bash
sudo vim /etc/hosts
```
Thêm 2 dòng:
```
127.0.0.1       www.myjob.com
127.0.0.1       employer.myjob.com
```

**Đối với Windows:**

Truy cập vào `C:\Windows\System32\drivers\etc\`
Thêm 2 dòng trên vào file `hosts` (Mở với quyền administrators)


### Bước 6: Kiểm Tra Kết Quả

Sau khi khởi chạy thành công, truy cập:
- 🌐 **Trang người tìm việc**: https://www.myjob.com
- 🌐 **Trang nhà tuyển dụng**: https://employer.myjob.com

---

## ⚙️ Cấu Hình Biến Môi Trường

### 1. GOONG Maps API

GOONG Maps được sử dụng để hiển thị bản đồ và địa chỉ.

**Biến môi trường cần thiết:**
```env
VITE_GOONGAPI_KEY=<API_Key>
```

**Các bước cấu hình:**

1. Truy cập [GOONG Maps](https://account.goong.io/) và đăng ký tài khoản
2. Tại Dashboard → Tạo một API Key mới
3. Copy API Key và dán vào biến `VITE_GOONGAPI_KEY` trong file `.env`

---

### 2. Firebase Configuration

Firebase phục vụ cho chức năng thông báo (notification) và nhắn tin (chat).

**Biến môi trường cần thiết:**
```env
VITE_FIREBASE_API_KEY=<API_Key>
VITE_FIREBASE_AUTH_DOMAIN=<Auth_Domain>
VITE_FIREBASE_PROJECT_ID=<Project_ID>
VITE_FIREBASE_STORAGE_BUCKET=<Storage_Bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<Sender_ID>
VITE_FIREBASE_APP_ID=<App_ID>
```

**Các bước cấu hình:**

Copy toàn bộ cấu hình Firebase từ file `.env` của **Backend** (đã setup trước đó) và dán vào file `.env` của Frontend.

---

### 3. OAuth2 Authentication

Cấu hình Client ID và Client Secret cho các phương thức đăng nhập.

#### 3.1. Đăng Nhập Với Email & Password

**Biến môi trường cần thiết:**
```env
VITE_MYJOB_SERVER_CLIENT_ID=<Client_ID>
VITE_MYJOB_SERVER_CLIENT_SECRECT=<Client_Secret>
```

**Các bước cấu hình:**

1. Truy cập trang `Applications` của Backend tại: `https://ngrok-domain/o/applications/`
2. Click nút **`New Application`**
3. Điền thông tin như sau:
   - **Name**: Đặt tên tuỳ ý (ví dụ: `Default authentication`)
   - **Client id**: Giữ nguyên giá trị mặc định → Copy và cập nhật vào `VITE_MYJOB_SERVER_CLIENT_ID`
   - **Client secret**: Giữ nguyên giá trị mặc định → Copy và cập nhật vào `VITE_MYJOB_SERVER_CLIENT_SECRECT`
   - **Hash client secret**: ✅ Tích chọn
   - **Client type**: Chọn `Confidential`
   - **Authorization grant type**: Chọn `Resource owner password-based`
   - Các trường còn lại có thể để trống
   
   > ⚠️ **Lưu ý quan trọng**: Client id và Client secret phải được **copy và lưu lại** trước khi nhấn Save (sau khi Save sẽ không thể xem lại)

4. Nhấn **`Save`**

---

#### 3.2. Đăng Nhập Với Facebook

**Biến môi trường cần thiết:**
```env
VITE_FACEBOOK_CLIENT_ID=<Client_ID>
VITE_FACEBOOK_CLIENT_SECRET=<Client_Secret>
```

**Các bước cấu hình:**

1. Truy cập trang `Applications` của Backend tại: `https://ngrok-domain/o/applications/`
2. Click nút **`New Application`**
3. Điền thông tin như sau:
   - **Name**: Đặt tên tuỳ ý (ví dụ: `Authenticate with Facebook`)
   - **Client id**: Giữ nguyên giá trị mặc định → Copy và cập nhật vào `VITE_FACEBOOK_CLIENT_ID`
   - **Client secret**: Giữ nguyên giá trị mặc định → Copy và cập nhật vào `VITE_FACEBOOK_CLIENT_SECRET`
   - **Hash client secret**: ✅ Tích chọn
   - **Client type**: Chọn `Confidential`
   - **Authorization grant type**: Chọn `Client credentials`
   - Các trường còn lại có thể để trống
   
   > ⚠️ **Lưu ý quan trọng**: Client id và Client secret phải được **copy và lưu lại** trước khi nhấn Save

4. Nhấn **`Save`**

---

#### 3.3. Đăng Nhập Với Google

**Biến môi trường cần thiết:**
```env
VITE_GOOGLE_CLIENT_ID=<Client_ID>
VITE_GOOGLE_CLIENT_SECRET=<Client_Secret>
```

**Các bước cấu hình:**

1. Truy cập trang `Applications` của Backend tại: `https://ngrok-domain/o/applications/`
2. Click nút **`New Application`**
3. Điền thông tin như sau:
   - **Name**: Đặt tên tuỳ ý (ví dụ: `Authenticate with Google`)
   - **Client id**: Giữ nguyên giá trị mặc định → Copy và cập nhật vào `VITE_GOOGLE_CLIENT_ID`
   - **Client secret**: Giữ nguyên giá trị mặc định → Copy và cập nhật vào `VITE_GOOGLE_CLIENT_SECRET`
   - **Hash client secret**: ✅ Tích chọn
   - **Client type**: Chọn `Confidential`
   - **Authorization grant type**: Chọn `Client credentials`
   - Các trường còn lại có thể để trống
   
   > ⚠️ **Lưu ý quan trọng**: Client id và Client secret phải được **copy và lưu lại** trước khi nhấn Save

4. Nhấn **`Save`**

---

### 4. Dialogflow Chatbot

Cấu hình chatbot cho người tìm việc và nhà tuyển dụng.

**Biến môi trường cần thiết:**
```env
VITE_JOB_SEEKER_BOT_AGENT_ID=<Agent_ID_người_tìm_việc>
VITE_EMPLOYER_BOT_AGENT_ID=<Agent_ID_nhà_tuyển_dụng>
```

**Các bước cấu hình:**

Bạn cần tạo **2 agent chatbot**: một cho người tìm việc và một cho nhà tuyển dụng.

1. Truy cập [Dialogflow Console](https://dialogflow.cloud.google.com/)
2. Click **`Create new agent`**
3. Điền thông tin agent:
   - Tạo agent thứ nhất với tên: `JobSeekerMyJobAgent` (dành cho người tìm việc)
   - Tạo agent thứ hai với tên: `EmployerMyJobAgent` (dành cho nhà tuyển dụng)
   - Có thể chọn Google Project đã tạo trước đó hoặc tạo mới
4. Sau khi tạo agent, truy cập **`Integrations`** → Chọn **`Dialogflow Messenger`** → Click **`ENABLE`**
5. Hộp thoại hiển thị **agent-id**, copy và điền vào:
   - `VITE_JOB_SEEKER_BOT_AGENT_ID` (cho JobSeekerMyJobAgent)
   - `VITE_EMPLOYER_BOT_AGENT_ID` (cho EmployerMyJobAgent)

> 💡 **Mẹo**: Lặp lại các bước từ 2-5 cho cả hai agent

---

## 🗃️ Cấu Hình Dữ Liệu

### 1. Cấu Hình Data Cho Chatbot

**Mục đích**: Import intents, entities và cấu hình webhook để chatbot có thể trả lời các câu hỏi từ người dùng.

**Các bước thực hiện:**

1. Truy cập [Dialogflow Console](https://dialogflow.cloud.google.com/)
2. Chọn agent `JobSeekerMyJobAgent` (hoặc `EmployerMyJobAgent` để cấu hình cho nhà tuyển dụng)

3. **Cấu hình Webhook** để chatbot gọi API Backend:
   - Truy cập **Fulfillment** → Bật **Enabled Webhook**
   - Nhập thông tin:
     - **URL**: 
       - Cho người tìm việc: `https://ngrok-domain/api/chatbot/jobseeker/webhook/`
       - Cho nhà tuyển dụng: `https://ngrok-domain/api/chatbot/employer/webhook/`
     - **Basic Auth**: 
       - Username: `temp`
       - Password: `temp`
   - Click **Save**

4. **Import dữ liệu agent** từ Backend:
   - Truy cập **Settings** (biểu tượng bánh răng) của agent
   - Chọn tab **Export and Import**
   - Click **`IMPORT FROM ZIP`**
   - Chọn file tương ứng từ thư mục `data/chatbot/` của Backend:
     - `JobSeekerMyJobAgent.zip` (cho agent người tìm việc)
     - `EmployerMyJobAgent.zip` (cho agent nhà tuyển dụng)
   - Đợi quá trình import hoàn tất

> 💡 **Lưu ý**: Thực hiện tương tự cho cả 2 agent (JobSeekerMyJobAgent và EmployerMyJobAgent)

---

### 2. Cấu Hình Hình Ảnh (Upload Lên Cloudinary)

**Mục đích**: Tự động upload hình ảnh mẫu lên Cloudinary để hiển thị trong ứng dụng.

**Các bước thực hiện:**

1. Truy cập **trang quản trị Backend** (Django Admin)
2. Vào mục **Periodic tasks** (Quản lý các tác vụ định kỳ)
3. Tìm và chọn record có tên: 
   ```
   [SETUP] Upload Files To Cloudinary One-time Task: every 60 seconds
   ```
4. Tích chọn ô **`Enabled`**
5. Nhấn **`Save`**
6. Đợi **60 giây** để cron job tự động chạy và upload hình ảnh

> ⚠️ **Lưu ý quan trọng**: 
> - Đây là **cron job chạy một lần duy nhất** (one-time task)
> - Cron job sẽ tự động upload tất cả hình ảnh từ file `data/cloudinary/cloudinary_files.json` (trong Backend) lên Cloudinary
> - **Không tắt Backend** trong quá trình cron job đang chạy (ít nhất 10 phút)
> - Sau khi upload xong, có thể tắt (disable) lại task này

---

## 🎉 Hoàn Tất!

Bạn đã hoàn thành việc cài đặt và cấu hình **MyJob Web Application**. Truy cập ứng dụng và trải nghiệm!

**Liên kết hữu ích:**
- 📖 [Documentation](https://github.com/BuiKhanhHuy/my-job-web-app)
- 🐛 [Báo lỗi](https://github.com/BuiKhanhHuy/my-job-web-app/issues)
- 💬 [Thảo luận](https://github.com/BuiKhanhHuy/my-job-web-app/discussions)

</details>
