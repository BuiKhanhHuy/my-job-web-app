/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import { toast } from 'react-toastify';

const toastMessages = {
  success: (message) =>
    toast.success(message, {
      theme: 'colored',
      delay: 0,
    }),
  error: (message) =>
    toast.error(message, {
      theme: 'colored',
      delay: 0,
    }),
  warn: (message) =>
    toast.warn(message, {
      theme: 'colored',
      delay: 0,
    }),
  info: (message) =>
    toast.info(message, {
      theme: 'colored',
      delay: 0,
    }),
};

export default toastMessages;
