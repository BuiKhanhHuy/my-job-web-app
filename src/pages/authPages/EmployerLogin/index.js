/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

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
  styled,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { TabTitle } from '../../../utils/generalFunction';
import { ROLES_NAME, ROUTES } from '../../../configs/constants';
import toastMessages from '../../../utils/toastMessages';
import BackdropLoading from '../../../components/loading/BackdropLoading';

import { updateVerifyEmail } from '../../../redux/authSlice';
import { getUserInfo } from '../../../redux/userSlice';

import authService from '../../../services/authService';
import tokenService from '../../../services/tokenService';

import EmployerLoginForm from '../../components/auths/EmployerLoginForm';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: '16px',
  width: '56px',
  height: '56px',
  backgroundColor: theme.palette.primary.main,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  fontWeight: 500,
  transition: 'all 0.2s ease',
  '&:hover': {
    color: theme.palette.primary.dark,
    textDecoration: 'underline',
  },
}));

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
              nav(`/${ROUTES.EMPLOYER.DASHBOARD}`);
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
          nav(`/${ROUTES.AUTH.EMAIL_VERIFICATION}`);

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
          marginTop: { xs: 0, sm: 2, md: 3 },
          p: { xs: 0, sm: 3 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <StyledCard sx={{ 
          p: { xs: 2, sm: 4, md: 5 }, 
          width: '100%',
          borderRadius: { xs: 0, sm: '16px' },
          boxShadow: { xs: 'none', sm: '0 8px 32px rgba(0, 0, 0, 0.1)' },
        }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <StyledAvatar>
              <LockOutlinedIcon sx={{ fontSize: 28 }} />
            </StyledAvatar>
            <Typography 
              component="h1" 
              variant="h4" 
              align="center"
              sx={{ 
                fontWeight: 600,
                color: 'primary.main',
                mb: 1
              }}
            >
              Đăng nhập
            </Typography>
            <Typography 
              variant="subtitle1" 
              align="center"
              sx={{ 
                color: 'text.secondary',
                mb: 2 
              }}
            >
              Chào mừng bạn đến với cổng tuyển dụng
            </Typography>
          </Box>

          {errorMessage && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: '8px',
              }}
            >
              <AlertTitle>Thất bại</AlertTitle>
              {errorMessage}
            </Alert>
          )}

          {successMessage && (
            <Alert 
              severity="success"
              sx={{ 
                mb: 3,
                borderRadius: '8px',
              }}
            >
              <AlertTitle>Thành công</AlertTitle>
              {successMessage}
            </Alert>
          )}

          <Box sx={{ mt: 2 }}>
            <EmployerLoginForm onLogin={handleLogin} />
          </Box>

          <Grid 
            container 
            spacing={2} 
            sx={{ 
              mt: 4,
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Grid item xs={12} sm={6}>
              <StyledLink to={`/${ROUTES.AUTH.FORGOT_PASSWORD}`}>
                Quên mật khẩu?
              </StyledLink>
            </Grid>
            <Grid 
              item 
              xs={12} 
              sm={6}
              sx={{
                textAlign: { xs: 'left', sm: 'right' }
              }}
            >
              <StyledLink to={`/${ROUTES.AUTH.REGISTER}`}>
                Chưa có tài khoản? Đăng ký
              </StyledLink>
            </Grid>
          </Grid>
        </StyledCard>
      </Container>
      {isFullScreenLoading && <BackdropLoading />}
    </>
  );
};

export default EmployerLogin;
