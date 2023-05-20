import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import { Result } from 'antd';

const NotFoundPage = () => {
  const nav = useNavigate();

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      justifyItems="center"
    >
      <Result
        style={{ marginTop: '15vh' }}
        status="404"
        title="404"
        subTitle="Xin lỗi, trang bạn truy cập không tồn tại."
        extra={
          <Button type="primary" variant="contained" onClick={() => nav('/')}>
            Về trang chủ
          </Button>
        }
      />
    </Stack>
  );
};

export default NotFoundPage;
