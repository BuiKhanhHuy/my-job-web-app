import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
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

import { TabTitle } from '../../../utils/generalFunction';
import { ROLES_NAME } from '../../../configs/constants';
import toastMessages from '../../../utils/toastMessages';
import BackdropLoading from '../../../components/loading/BackdropLoading';

import { updateVerifyEmail } from '../../../redux/authSlice';
import { getUserInfo } from '../../../redux/userSlice';

import authService from '../../../services/authService';
import tokenService from '../../../services/tokenService';

import EmployerLoginForm from '../../components/auths/EmployerLoginForm';

const EmployerLogin = () => {
  TabTitle('Đăng nhập tài khoản Nhà tuyển dụng');

  const dispatch = useDispatch();
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [successMessage, setSuccessMessage] = React.useState(null);

  React.useEffect(() => {
    const successMsg = searchParams.get('successMessage');
    const errorMsg = searchParams.get('errorMessage');

    if (successMsg !== null) {
      setSuccessMessage(successMsg);
    }

    setErrorMessage(errorMsg);
  }, [searchParams]);

  const handleLogin = (data) => {
    const getAccesToken = async (email, password, roleName) => {
      setIsFullScreenLoading(true);
      try {
        const resData = await authService.getToken(email, password, roleName);
        const {
          access_token: accessToken,
          refresh_token: refreshToken,
          backend,
        } = resData.data;

        // save cookie
        const isSaveTokenToCookie =
          tokenService.saveAccessTokenAndRefreshTokenToCookie(
            accessToken,
            refreshToken,
            backend
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
        const res = error.response;
        if (res.status === 400) {
          const errors = res.data?.errors;
          if ('errorMessage' in errors) {
            setErrorMessage(errors.errorMessage.join(' '));
          } else {
            toastMessages.error('Đã xảy ra lỗi, vui lòng thử lại!');
          }
        }
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    const checkCreds = async (email, password, roleName) => {
      setIsFullScreenLoading(true);
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
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    checkCreds(data.email, data.password, ROLES_NAME.EMPLOYER);
  };

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          marginTop: { xs: 2, sm: 4, md: 8, lg: 8, xl: 8 },
          p: 0,
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card sx={{ p: { xs: 2, sm: 6, md: 6, lg: 6, xl: 6 }, pt: 2 }}>
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
            <Typography component="h1" variant="h5" align="center">
              Đăng nhập tài khoản nhà tuyển dụng
            </Typography>
          </Box>
          {/* <Box>
            <Alert severity="info">
              <AlertTitle>Thông tin đăng nhập</AlertTitle>
              <Typography>
                Email: <strong>employer[1-4900]@gmail.com</strong>
              </Typography>
              <Typography>
                Password: <strong>123</strong>
              </Typography>
            </Alert>
          </Box> */}
          {errorMessage ? (
            <Box>
              <Alert severity="error">
                <AlertTitle>Thất bại</AlertTitle>
                {errorMessage}
              </Alert>
            </Box>
          ) : successMessage ? (
            <Box>
              <Alert severity="success">
                <AlertTitle>Thành công</AlertTitle>
                {successMessage}
              </Alert>
            </Box>
          ) : (
            ''
          )}

          <Box sx={{ mt: { xs: 3, sm: 4, md: 4, lg: 4, xl: 4 } }}>
            {/* Start: login form */}
            <EmployerLoginForm onLogin={handleLogin} />
            {/* End: login form */}
          </Box>
          <Grid container sx={{ mt: 3 }}>
            <Grid item xs>
              <Link
                to="/quen-mat-khau"
                variant="body2"
                style={{ textDecoration: 'none', color: '#441da0' }}
              >
                Quên mật khẩu?
              </Link>
            </Grid>
            <Grid item>
              <Link
                to="/dang-ky-tai-khoan-nha-tuyen-dung"
                variant="body2"
                style={{ textDecoration: 'none', color: '#441da0' }}
              >
                {'Chưa có tài khoản? Đăng ký'}
              </Link>
            </Grid>
          </Grid>
        </Card>
      </Container>
      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

export default EmployerLogin;
