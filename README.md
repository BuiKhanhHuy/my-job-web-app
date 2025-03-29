<p align="center">
 
 <img src="https://github.com/BuiKhanhHuy/my-job-web-app/assets/69914972/3252a6c3-4ec7-46cd-8265-e1d42ade58ea" width="200"  alt="Image" />
 
</p>
<h1 align="center">JOB PORTAL SYSTEM</h1>
<h1 align="center">MyJob Web Application (ReactJS)</h1>

❗Must run [SERVER](https://github.com/BuiKhanhHuy/myjob_api) first

## Setup

### 👉 Clone repo

```plaintext
git clone https://github.com/BuiKhanhHuy/my-job-web-app.git
```

### 👉 Go to the project directory

```plaintext
cd my-job-web-app
```

### 👉 Update the data in `.env` file

Create `.env` file

```plaintext
my-job-web-app/
  |-- ...
  |-- src
  |-- .env 👈
```

```plaintext
REACT_APP_NODE_ENV=local

REACT_APP_BASE_URL=http://localhost:8001 (server URL)

REACT_APP_MYJOB_SERVER_CLIENT_ID=
REACT_APP_MYJOB_SERVER_CLIENT_SECRECT=

REACT_APP_FACEBOOK_CLIENT_ID=
REACT_APP_FACEBOOK_CLIENT_SECRET=

REACT_APP_GOOGLE_CLIENT_ID=
REACT_APP_GOOGLE_CLIENT_SECRET=

REACT_APP_GOONGAPI_KEY=
REACT_APP_GOONGAPI_ACCESS_TOKEN=

REACT_APP_CHAT_APP_ID=
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_FIREBASE_MEASUREMENT_ID=
```

### 👉 Run app

<table><tbody><tr><td><h4>Docker</h4></td><td><h4>Manual (Windows)</h4></td></tr><tr><td><pre><code class="language-plaintext">docker compose -p myjob-web-app up -d</code></pre><p>→ Go to: <a href="http://localhost:80">http://localhost:80</a></p></td><td><pre><code class="language-plaintext">npm install</code></pre><pre><code class="language-plaintext">npm start</code></pre><p>→ Go to: <a href="http://localhost:3000">http://localhost:3000</a></p></td></tr></tbody></table>

## Video demo

#### **👉 Link**: [https://www.youtube.com/watch?v=4vq1rl6vj5c](https://www.youtube.com/watch?v=4vq1rl6vj5c)

[![Watch the video](https://github.com/BuiKhanhHuy/my-job-web-app/assets/69914972/6ed3db35-f195-4295-b152-a861fa30b3d7)](https://www.youtube.com/watch?v=4vq1rl6vj5c)

## Live demo

#### 👉 Link: http://myjob.id.vn/

#### 👉 Test account

*   Job seeker:
    *   Email: test@gmail.com
    *   Password: 123
*   Employer
    *   Email: employer\[1-4900\]@gmail.com
    *   Password: 123

## Backend & Mobile repo link

### 🖥️ [Backend server](https://github.com/BuiKhanhHuy/myjob_api)

### 📱 [Mobile app](https://github.com/BuiKhanhHuy/MyJobApp)
