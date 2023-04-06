import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Divider, Stack } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { OldSocialLogin as SocialLogin } from 'react-social-login';

import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import PasswordTextFieldCustom from '../../../../components/controls/PasswordTextFieldCustom';
import { AUTH_CONFIG, AUTH_PROVIDER } from '../../../../configs/constants';

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
      <SocialLogin
        provider={AUTH_PROVIDER.FACEBOOK}
        appId={AUTH_CONFIG.FACEBOOK_CLIENT_ID}
        callback={onFacebookLogin}
        onLoginFailure={() => console.log('LOGIN FACEBOOK FAILED')}
      >
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: '#3B66C4' }}
          startIcon={<FacebookIcon />}
        >
          Đăng nhập với Facebook
        </Button>
      </SocialLogin>

      <SocialLogin
        provider="google"
        appId=""
        callback={onGoogleLogin}
        onLoginFailure={() => console.log('LOGIN GOOGLE FAILED')}
      >
        <Button
          fullWidth
          variant="contained"
          sx={{ mb: 2, backgroundColor: '#CF4332' }}
          startIcon={<GoogleIcon />}
          onClick={onGoogleLogin}
        >
          Đăng nhập với Google
        </Button>
      </SocialLogin>
    </Box>
  );
};

export default JobSeekerLoginForm;
