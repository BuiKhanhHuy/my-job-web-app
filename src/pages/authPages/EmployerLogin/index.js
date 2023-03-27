import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Card,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { ROLES_NAME } from '../../../configs/constants';
import toastMessages from '../../../utils/toastMessages';

import { updateVerifyEmail } from '../../../redux/authSlice';
import { getUserInfo } from '../../../redux/userSlice';

import authService from '../../../services/authService';
import tokenService from '../../../services/tokenService';

import EmployerLoginForm from '../../components/auths/EmployerLoginForm';

const EmployerLogin = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState(null);

  const handleLogin = (data) => {
    const getAccesToken = async (email, password, roleName) => {
      try {
        const resData = await authService.getToken(email, password, roleName);
        const { access_token: accessToken, refresh_token: refreshToken } =
          resData.data;

        // save cookie
        const isSaveTokenToCookie =
          tokenService.saveAccessTokenAndRefreshTokenToCookie(
            accessToken,
            refreshToken
          );
        if (isSaveTokenToCookie) {
          dispatch(getUserInfo())
            .unwrap()
            .then(() => {
              nav('/nha-tuyen-dung');
            })
            .catch(() => {
              toastMessages.error('Đã xảy ra lỗi, vui lòng đăng nhập lại!');
            });
        } else {
          toastMessages.error('Đã xảy ra lỗi, vui lòng đăng nhập lại!');
        }
      } catch (error) {
        // 400 bad request
        setErrorMessage('Email hoặc mật khẩu không chính xác!');
      } finally {
      }
    };

    const checkCreds = async (email, password, roleName) => {
      try {
        const resData = await authService.checkCreds(email, roleName);

        const { exists, email: resEmail, email_verified } = resData.data;
        if (exists === true && email_verified === false) {
          dispatch(
            updateVerifyEmail({
              isAllowVerifyEmail: true,
              email: email,
              roleName: roleName,
            })
          );
          nav('/email-verification-required');

          return;
        } else if (exists === false) {
          setErrorMessage(
            'Không tồn tại tài khoản nhà tuyển dụng nào với email này!'
          );

          return;
        }

        getAccesToken(resEmail, password, roleName);
      } catch (error) {
        toastMessages.error('Đã xảy ra lỗi, vui lòng đăng nhập lại!');
      }
    };

    checkCreds(data.email, data.password, ROLES_NAME.EMPLOYER);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        marginTop: 8,
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Card sx={{ p: 6, pt: 2, boxShadow: 0 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'error.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập tài khoản nhà tuyển dụng
          </Typography>
        </Box>

        {/* Start: Error alert here */}
        {errorMessage && (
          <Box>
            <Alert severity="error">
              <AlertTitle>Đăng nhập thất bại</AlertTitle>
              {errorMessage}
            </Alert>
          </Box>
        )}
        {/* End: Error alert here */}

        <Box sx={{ mt: 4 }}>
          {/* Start: login form */}
          <EmployerLoginForm onLogin={handleLogin} />
          {/* End: login form */}
        </Box>
        <Grid container sx={{ mt: 3 }}>
          <Grid item xs>
            <Link href="#" variant="body2">
              Quên mật khẩu?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {'Chưa có tài khoản? Đăng ký'}
            </Link>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default EmployerLogin;
