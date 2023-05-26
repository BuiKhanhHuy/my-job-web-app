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
