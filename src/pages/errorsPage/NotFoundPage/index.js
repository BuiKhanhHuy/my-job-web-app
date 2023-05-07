import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack } from '@mui/material';

const NotFoundPage = () => {
  const nav = useNavigate();

  return (
    <Stack direction="column" alignItems="center">
      <Button variant="contained" color="primary" onClick={() => nav('/')}>
        Quay Về Trang Chủ
      </Button>
    </Stack>
  );
};

export default NotFoundPage;
