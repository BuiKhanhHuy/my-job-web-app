/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import Swal from 'sweetalert2';

const confirmModal = (
  func,
  title = '',
  text = '',
  icon = 'success',
  showCancelButton = true,
  confirmButtonText = 'Đồng ý',
  cancelButtonText = 'Hủy'
) => {
  return Swal.fire({
    title: title,
    html: text,
    icon: icon,
    confirmButtonColor: '#441da0',
    showCancelButton: showCancelButton,
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
  }).then((result) => {
    if (result.isConfirmed) {
      func();
    }
  });
};

const errorModal = (title = '', text = '') => {
  return Swal.fire({
    icon: 'error',
    title: title,
    html: text,
    confirmButtonColor: '#441da0',
  });
};

export { confirmModal, errorModal };
