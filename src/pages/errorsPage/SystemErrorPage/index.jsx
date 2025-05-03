/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from 'react';
import { Stack } from '@mui/material';
import { Result } from 'antd';

const SystemErrorPage = () => {
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      justifyItems="center"
    >
      <Result
        style={{ marginTop: '15vh' }}
        status="500"
        title="500"
        subTitle="Xin lỗi, hệ thống đang bảo trì. Bạn vui lòng quay lại sau."
      />
    </Stack>
  );
};

export default SystemErrorPage;
