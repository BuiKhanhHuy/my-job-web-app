/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
 
import { Provider } from 'react-redux';
import store from './redux/store';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/vi';

// Import dayjs configuration
import './configs/moment-config';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <LocalizationProvider 
        dateAdapter={AdapterDayjs}
        adapterLocale="vi"
        dateFormats={{ monthAndYear: "MM/YYYY" }}
        localeText={{
          okButtonLabel: "Đồng ý",
          cancelButtonLabel: "Hủy",
          clearButtonLabel: "Xóa",
          todayButtonLabel: "Hôm nay",
        }}
        adapterLocaleData={{ timezone: 'Asia/Ho_Chi_Minh' }}
      >
        <App />
      </LocalizationProvider>
    </BrowserRouter>
  </Provider>
); 