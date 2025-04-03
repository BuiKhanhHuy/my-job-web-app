import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Stack, styled } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import PasswordTextFieldCustom from '../../../../components/controls/PasswordTextFieldCustom';

const StyledButton = styled(Button)(({ theme }) => ({
  padding: '8px 16px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: 500,
  textTransform: 'none',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
}));

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
    <Box 
      component="form" 
      onSubmit={handleSubmit(onLogin)}
      sx={{
        width: '100%',
        '& .MuiTextField-root': {
          borderRadius: '10px',
        },
      }}
    >
      <Stack spacing={2.5} sx={{ mb: 3 }}>
        <TextFieldCustom
          name="email"
          control={control}
          title="Email"
          placeholder="Nhập email của bạn"
          showRequired={true}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }
          }}
        />
        <PasswordTextFieldCustom
          name="password"
          control={control}
          title="Mật khẩu"
          placeholder="Nhập mật khẩu của bạn"
          showRequired={true}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }
          }}
        />
      </Stack>
      <StyledButton 
        fullWidth 
        variant="contained" 
        type="submit"
        startIcon={<LoginIcon />}
      >
        Đăng nhập
      </StyledButton>
    </Box>
  );
};

export default EmployerLoginForm;
