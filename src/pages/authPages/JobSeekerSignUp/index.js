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
  styled,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  AUTH_CONFIG,
  AUTH_PROVIDER,
  PLATFORM,
  ROLES_NAME,
  ROUTES,
} from '../../../configs/constants';

import { TabTitle } from '../../../utils/generalFunction';
import toastMessages from '../../../utils/toastMessages';
import BackdropLoading from '../../../components/loading/BackdropLoading';
import errorHandling from '../../../utils/errorHandling';
import JobSeekerSignUpForm from '../../components/auths/JobSeekerSignUpForm';

import tokenService from '../../../services/tokenService';
import authService from '../../../services/authService';
import { getUserInfo } from '../../../redux/userSlice';
import { updateVerifyEmail } from '../../../redux/authSlice';

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
  backgroundColor: theme.palette.secondary.main,
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

const JobSeekerSignUp = () => {
  TabTitle("Đăng ký tài khoản Người tìm việc")

  const dispatch = useDispatch();
  const nav = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [serverErrors, setServerErrors] = React.useState({});

  const handleRegister = (data) => {
    const register = async (data, roleName) => {
      setIsFullScreenLoading(true);
      try {
        await authService.jobSeekerRegister(data);

        dispatch(
          updateVerifyEmail({
            isAllowVerifyEmail: true,
            email: data?.email,
            roleName: roleName,
          })
        );
        nav(`/${ROUTES.AUTH.EMAIL_VERIFICATION}`);
      } catch (error) {
        errorHandling(error, setServerErrors);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    register({ ...data, platform: PLATFORM }, ROLES_NAME.JOB_SEEKER);
  };

  const handleSocialRegister = async (
    clientId,
    clientSecrect,
    provider,
    token
  ) => {
    setIsFullScreenLoading(true);

    try {
      const resData = await authService.convertToken(
        clientId,
        clientSecrect,
        provider,
        token
      );
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
            nav('/');
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

  const handleFacebookRegister = (result) => {
    const accessToken = result?.data?.accessToken;
    if (accessToken) {
      handleSocialRegister(
        AUTH_CONFIG.FACEBOOK_CLIENT_ID,
        AUTH_CONFIG.FACEBOOK_CLIENT_SECRET,
        AUTH_PROVIDER.FACEBOOK,
        accessToken
      );
    }
  };

  const handleGoogleRegister = (result) => {
    const accessToken = result?.data?.access_token;
    if (accessToken) {
      handleSocialRegister(
        AUTH_CONFIG.GOOGLE_CLIENT_ID,
        AUTH_CONFIG.GOOGLE_CLIENT_SECRET,
        AUTH_PROVIDER.GOOGLE,
        accessToken
      );
    }
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
              Đăng ký tài khoản
            </Typography>
            <Typography 
              variant="subtitle1" 
              align="center"
              sx={{ 
                color: 'text.secondary',
                mb: 2 
              }}
            >
              Tạo tài khoản ứng viên mới
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

          <Box sx={{ mt: 2 }}>
            <JobSeekerSignUpForm
              onRegister={handleRegister}
              onFacebookRegister={handleFacebookRegister}
              onGoogleRegister={handleGoogleRegister}
              serverErrors={serverErrors}
            />
          </Box>

          <Grid 
            container 
            sx={{ 
              mt: 4,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Grid item>
              <StyledLink to={`/${ROUTES.AUTH.LOGIN}`}>
                Đã có tài khoản? Đăng nhập
              </StyledLink>
            </Grid>
          </Grid>
        </StyledCard>
      </Container>
      {isFullScreenLoading && <BackdropLoading />}
    </>
  );
};

export default JobSeekerSignUp;
