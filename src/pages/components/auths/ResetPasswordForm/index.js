/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Stack } from '@mui/material';

import PasswordTextFieldCustom from '../../../../components/controls/PasswordTextFieldCustom';

const ResetPasswordForm = ({ handleResetPassword, serverErrors = {} }) => {
  const schema = yup.object().shape({
    newPassword: yup
      .string()
      .required('Mật khẩu mới là bắt buộc!')
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự.')
      .max(128, 'Mật khẩu mới vượt quá độ dài cho phép.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Phải chứa một chữ hoa, một chữ thường, một số và một ký tự đặc biệt'
      ),
    confirmPassword: yup
      .string()
      .required('Mật khẩu xác nhận là bắt buộc.')
      .oneOf([yup.ref('newPassword')], 'Mật khẩu xác nhận không chính xác.'),
  });

  const { control, setError, handleSubmit } = useForm({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    for (let err in serverErrors) {
      setError(err, { type: 400, message: serverErrors[err]?.join(' ') });
    }
  }, [serverErrors, setError]);

  return (
    <Box>
      <Stack spacing={1.5} sx={{ mb: 2 }}>
        <PasswordTextFieldCustom
          name="newPassword"
          control={control}
          title="Mật khẩu mới"
          showRequired={true}
          placeholder="Nhập mật khẩu mới"
        />
        <PasswordTextFieldCustom
          name="confirmPassword"
          control={control}
          title="Mật khẩu xác nhận"
          showRequired={true}
          placeholder="Nhập lại mật khẩu mới"
        />
      </Stack>

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSubmit(handleResetPassword)}
      >
        Đặt lại mật khẩu
      </Button>
    </Box>
  );
};

export default ResetPasswordForm;
