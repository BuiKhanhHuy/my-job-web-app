<p align="center">
 <img src="https://github.com/BuiKhanhHuy/myjob_api/assets/69914972/ef0c454d-7947-46ab-a5e6-64ffe964bb3a" width="200"  alt="Image" />
</p>

<h1 align="center">ReactJS</h3>
 
`Dependencies`
```commandline
"@emotion/react": "^11.10.6",
"@emotion/styled": "^11.10.6",
"@fontsource/open-sans": "^4.5.14",
"@fontsource/public-sans": "^4.5.12",
"@fontsource/roboto": "^4.5.8",
"@fortawesome/fontawesome-svg-core": "^6.3.0",
"@fortawesome/free-regular-svg-icons": "^6.4.0",
"@fortawesome/free-solid-svg-icons": "^6.3.0",
"@fortawesome/react-fontawesome": "^0.2.0",
"@goongmaps/goong-map-react": "^1.1.2",
"@hookform/resolvers": "^2.9.11",
"@kommunicate/kommunicate-chatbot-plugin": "^0.0.6",
"@mui/base": "^5.0.0-alpha.119",
"@mui/icons-material": "^5.11.11",
"@mui/lab": "^5.0.0-alpha.122",
"@mui/material": "^5.11.11",
"@mui/styled-engine-sc": "^5.11.11",
"@mui/x-date-pickers": "^6.0.1",
"@react-pdf-viewer/core": "^3.12.0",
"@react-pdf-viewer/get-file": "^3.12.0",
"@react-pdf-viewer/zoom": "^3.12.0",
"@react-pdf/renderer": "^3.1.9",
"@reduxjs/toolkit": "^1.9.3",
"@testing-library/jest-dom": "^5.16.5",
"@testing-library/react": "^13.4.0",
"@testing-library/user-event": "^13.5.0",
"@tippyjs/react": "^4.2.6",
"antd": "^5.4.7",
"antd-img-crop": "^4.12.2",
"axios": "^1.3.4",
"bingmaps-react": "^1.2.10",
"chart.js": "^4.3.0",
"dayjs": "^1.11.7",
"dotenv-webpack": "^8.0.1",
"draft-js": "^0.11.7",
"draftjs-to-html": "^0.9.1",
"firebase": "^9.21.0",
"js-cookie": "^3.0.1",
"material-ui-popup-state": "^5.0.5",
"mdb-react-ui-kit": "^6.1.0",
"moment": "^2.29.4",
"moment-timezone": "^0.5.43",
"mui-file-dropzone": "^4.0.2",
"mui-image": "^1.0.7",
"pdfjs-dist": "^3.4.120",
"query-string": "^8.1.0",
"react": "^18.2.0",
"react-chartjs-2": "^5.2.0",
"react-dom": "^18.2.0",
"react-draft-wysiwyg": "^1.15.0",
"react-dropzone": "^14.2.3",
"react-geolocated": "^4.0.3",
"react-hook-form": "^7.43.4",
"react-image-gallery": "^1.2.11",
"react-infinite-scroll-component": "^6.1.0",
"react-moment": "^1.1.3",
"react-redux": "^8.0.5",
"react-router-dom": "^6.8.2",
"react-scripts": "5.0.1",
"react-share": "^4.4.1",
"react-spinners": "^0.13.8",
"react-to-print": "^2.14.12",
"react-toastify": "^9.1.1",
"reactjs-social-login": "^2.6.2",
"recharts": "^2.4.3",
"styled-components": "^5.3.8",
"sweetalert2": "^11.7.3",
"swiper": "^9.1.0",
"web-vitals": "^2.1.4",
"xlsx": "https://cdn.sheetjs.com/xlsx-0.19.2/xlsx-0.19.2.tgz",
"yup": "^1.0.2"
```

### 👉 Setup

#### Clone repo
```bash
git clone https://github.com/BuiKhanhHuy/my-job-web-app.git
```
```bash
cd myjob_api
```

#### Update the data in the file `.env`
```bash
|--> .env
```
```bash
APP_ENV=
DEBUG=
APPEND_SLASH=
ALLOWED_HOSTS=
CSRF_TRUSTED_ORIGINS=
DB_ENGINE=
DB_HOST=
DB_NAME=
DB_PASSWORD=
DB_PORT=
DB_USER=
EMAIL_HOST=
EMAIL_HOST_PASSWORD=
EMAIL_HOST_USER=
EMAIL_PORT=
SERVICE_REDIS_HOST=
SERVICE_REDIS_PASSWORD=
SERVICE_REDIS_PORT=
SERVICE_REDIS_USERNAME=
SERVICE_REDIS_DB=
SOCIAL_AUTH_FACEBOOK_KEY=
SOCIAL_AUTH_FACEBOOK_SECRET=
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY=
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
WEB_CLIENT_URL=
```

### 👉 Applocation Local server `environment` setup

```base
pip install virtualenv 
virtualenv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### 👉 `celery` command to below
```base
celery -A myjob_api.celery worker --pool=solo --loglevel=info
celery -A myjob_api beat -l info --scheduler django_celery_beat.schedulers:DatabaseScheduler
```

### 👉 Go to http://localhost:8000/swagger/
<img src="https://github.com/BuiKhanhHuy/myjob_api/assets/69914972/bdf34cb0-40e9-4403-9345-5e6f6299df3a" alt="Image" /> 

### 👉 Go to http://localhost:8000/admin/
<img src="https://github.com/BuiKhanhHuy/myjob_api/assets/69914972/c411ed48-6c1e-4940-a51a-8d30859aa90e" alt="Image" /> 

### 👉 Frontend repo link
* #### 🌐  [Web-app](https://github.com/BuiKhanhHuy/my-job-web-app) 
* #### 📱  [Mobile-app](https://github.com/BuiKhanhHuy/MyJobApp) 
