import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Box, Card, Container, Grid, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { TabTitle } from '../../../utils/generalFunction';
import { PLATFORM, ROLES_NAME } from '../../../configs/constants';
import errorHandling from '../../../utils/errorHandling';
import BackdropLoading from '../../../components/loading/BackdropLoading';

import { updateVerifyEmail } from '../../../redux/authSlice';
import authService from '../../../services/authService';

import EmployerSignUpForm from '../../components/auths/EmployerSignUpForm';

const EmployerSignUp = () => {
  TabTitle("Đăng ký tài khoản Nhà tuyển dụng")

  const dispatch = useDispatch();
  const nav = useNavigate();
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [serverErrors, setServerErrors] = React.useState({});

  const handleRegister = (data) => {
    const register = async (data, roleName) => {
      setIsFullScreenLoading(true);

      try {
        await authService.employerRegister(data);

        dispatch(
          updateVerifyEmail({
            isAllowVerifyEmail: true,
            email: data?.email,
            roleName: roleName,
          })
        );
        nav('/email-verification-required');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    register(
      {
        ...data,
        platform: PLATFORM,
      },
      ROLES_NAME.EMPLOYER
    );
  };

  const checkCreds = async (email, roleName) => {
    try {
      const resData = await authService.checkCreds(email, roleName);

      const { exists } = resData.data;
      if (exists === true) {
        // set server errors here
        setServerErrors({
          email: ['Email đã tồn tại'],
        });

        return false;
      }

      return true;
    } catch (error) {
      errorHandling(error);
      return false;
    }
  };

  return (
    <>
      <Container
        maxWidth="md"
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
              Đăng ký tài khoản nhà tuyển dụng
            </Typography>
          </Box>
          <Box sx={{ mt: { xs: 3, sm: 4, md: 4, lg: 4, xl: 4 } }}>
            {/* Start: Employer sign up form */}
            <EmployerSignUpForm
              onSignUp={handleRegister}
              serverErrors={serverErrors}
              checkCreds={checkCreds}
            />
            {/* End: Employer sign up form */}
          </Box>
          <Grid container sx={{ mt: 3 }}>
            <Grid item xs></Grid>
            <Grid item>
              <Link
                to="/dang-nhap-nha-tuyen-dung"
                variant="body2"
                style={{ textDecoration: 'none', color: '#441da0' }}
              >
                {'Đã có tài khoản? Đăng nhập'}
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

export default EmployerSignUp;
