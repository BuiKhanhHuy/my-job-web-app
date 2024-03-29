import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Stack } from '@mui/material';

import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import PasswordTextFieldCustom from '../../../../components/controls/PasswordTextFieldCustom';

const EmployerLoginForm = ({ onLogin }) => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email là bắt buộc!')
      .email('Email không đúng định dạng'),
    password: yup
      .string()
      .required('Mật khẩu là bắt buộc!')
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự.')
      .max(128, 'Mật khẩu vượt quá độ dài cho phép.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Phải chứa một chữ hoa, một chữ thường, một số và một ký tự đặc biệt'
      ),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onLogin)}>
      <Stack spacing={1.5} sx={{ mb: 2 }}>
        <TextFieldCustom
          name="email"
          control={control}
          title="Email"
          placeholder="Nhập email"
          showRequired={true}
        />
        <PasswordTextFieldCustom
          name="password"
          control={control}
          title="Mật khẩu"
          placeholder="Nhập mật khẩu"
          showRequired={true}
        />
      </Stack>
      <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} type="submit">
        Đăng nhập
      </Button>
    </Box>
  );
};

export default EmployerLoginForm;
