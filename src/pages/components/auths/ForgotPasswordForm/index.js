import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Stack } from '@mui/material';

import TextFieldCustom from '../../../../components/controls/TextFieldCustom';

const ForgotPasswordForm = ({ handleRequestResetPassword }) => {

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email là bắt buộc!')
      .email('Email không đúng định dạng'),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
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
      </Stack>

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSubmit(handleRequestResetPassword)}
      >
        Đặt lại mật khẩu
      </Button>
    </Box>
  );
};

export default ForgotPasswordForm;
