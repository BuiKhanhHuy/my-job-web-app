import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Divider, Stack } from '@mui/material';

import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { LoginSocialFacebook, LoginSocialGoogle } from 'reactjs-social-login';

import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import PasswordTextFieldCustom from '../../../../components/controls/PasswordTextFieldCustom';
import { AUTH_CONFIG } from '../../../../configs/constants';

const JobSeekerSignUpForm = ({
  onRegister,
  onFacebookRegister,
  onGoogleRegister,
  serverErrors = {},
}) => {
  const schema = yup.object().shape({
    fullName: yup.string().required('Họ và tên là bắt buộc.'),
    email: yup
      .string()
      .required('Email là bắt buộc!')
      .email('Email không đúng định dạng')
      .max(100, 'Email vượt quá độ dài cho phép.'),
    password: yup
      .string()
      .required('Mật khẩu là bắt buộc!')
      .max(128, 'Mật khẩu vượt quá độ dài cho phép.'),
    confirmPassword: yup
      .string()
      .required('Mật khẩu xác nhận là bắt buộc.')
      .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không chính xác.'),
  });

  const { control, setError, handleSubmit } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
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
        <TextFieldCustom
          name="fullName"
          control={control}
          title="Họ và tên"
          placeholder="Nhập họ và tên"
          showRequired={true}
        />
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
        <PasswordTextFieldCustom
          name="confirmPassword"
          control={control}
          title="Mật khẩu xác nhận"
          placeholder="Nhập mật khẩu xác nhận"
          showRequired={true}
        />
      </Stack>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSubmit(onRegister)}
      >
        Đăng ký
      </Button>
      <Divider>HOẶC</Divider>
      <LoginSocialFacebook
        appId={AUTH_CONFIG.FACEBOOK_CLIENT_ID}
        fieldsProfile={'id'}
        // onLoginStart={onLoginStart}
        // onLogoutSuccess={onLogoutSuccess}
        // redirect_uri={REDIRECT_URI}
        isOnlyGetToken={true}
        ux_mode='popup'
        onResolve={onFacebookRegister}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: '#3B66C4' }}
          startIcon={<FacebookIcon />}
        >
          Đăng ký với Facebook
        </Button>
      </LoginSocialFacebook>

      <LoginSocialGoogle
        client_id={AUTH_CONFIG.GOOGLE_CLIENT_ID}
        // onLoginStart={onLoginStart}
        // redirect_uri={REDIRECT_URI}
        isOnlyGetToken={true}
        ux_mode='popup'
        access_type="offline"
        scope="openid profile email"
        discoveryDocs="claims_supported"
        onResolve={onGoogleRegister}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <Button
          fullWidth
          variant="contained"
          sx={{ mb: 2, backgroundColor: '#CF4332' }}
          startIcon={<GoogleIcon />}
        >
          Đăng ký với Google
        </Button>
      </LoginSocialGoogle>
    </Box>
  );
};

export default JobSeekerSignUpForm;
