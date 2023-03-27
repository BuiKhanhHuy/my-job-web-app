import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Box, Card, Container, Grid, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ROLES_NAME } from '../../../configs/constants';
import toastMessages from '../../../utils/toastMessages';

import { updateVerifyEmail } from '../../../redux/authSlice';

import authService from '../../../services/authService';

import JobSeekerSignUpForm from '../../components/auths/JobSeekerSignUpForm';
import errorHandling from '../../../utils/errorHandling';

const JobSeekerSignUp = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [serverErrors, setServerErrors] = React.useState({});

  const handleRegister = (data) => {
    const register = async (data, roleName) => {
      try {
        await authService.jobSeekerRegister(data);

        dispatch(
          updateVerifyEmail({
            isAllowVerifyEmail: true,
            email: data?.email,
            roleName: roleName,
          })
        );
        nav('/email-verification-required');
      } catch (error) {
        errorHandling(error, setServerErrors);
      } finally {
      }
    };

    register(data, ROLES_NAME.JOB_SEEKER);
  };

  const handleFacebookRegister = () => {
    alert('Facebook Login');
  };

  const handleGoogleRegister = () => {
    alert('Google Login');
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng ký tài khoản ứng viên
          </Typography>
        </Box>
        <Box sx={{ mt: 4 }}>
          {/* Start: login form */}
          <JobSeekerSignUpForm
            onRegister={handleRegister}
            onFacebookRegister={handleFacebookRegister}
            onGoogleRegister={handleGoogleRegister}
            serverErrors={serverErrors}
          />
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
              {'Đã có tài khoản? Đăng nhập'}
            </Link>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default JobSeekerSignUp;
