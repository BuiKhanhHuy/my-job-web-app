import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Divider, Stack } from '@mui/material';

import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import PasswordTextFieldCustom from '../../../../components/controls/PasswordTextFieldCustom';

const JobSeekerLoginForm = ({ onLogin, onFacebookLogin, onGoogleLogin }) => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email là bắt buộc!')
      .email('Email không đúng định dạng'),
    password: yup.string().required('Mật khẩu là bắt buộc!'),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  return (
    <Box>
      <Stack spacing={1.5} sx={{ mb: 2 }}>
        <TextFieldCustom
          name="email"
          control={control}
          title="Email"
          placeholder="Nhập email"
        />
        <PasswordTextFieldCustom
          name="password"
          control={control}
          title="Mật khẩu"
          placeholder="Nhập mật khẩu"
        />
      </Stack>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSubmit(onLogin)}
      >
        Đăng nhập
      </Button>
      <Divider>HOẶC</Divider>
      <Button
        fullWidth
        variant="outlined"
        sx={{ mt: 3, mb: 2 }}
        onClick={onFacebookLogin}
      >
        Đăng nhập với Facebook
      </Button>
      <Button
        fullWidth
        variant="outlined"
        sx={{ mb: 2 }}
        onClick={onGoogleLogin}
      >
        Đăng nhập với Google
      </Button>
    </Box>
  );
};

export default JobSeekerLoginForm;
