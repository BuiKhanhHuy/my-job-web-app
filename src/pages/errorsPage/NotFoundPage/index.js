import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import { Result } from 'antd';

import { TabTitle } from '../../../utils/generalFunction';

const NotFoundPage = () => {
  TabTitle("Không tìm thấy trang")
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
