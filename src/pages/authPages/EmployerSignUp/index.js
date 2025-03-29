import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Avatar, 
  Box, 
  Card, 
  Container, 
  Grid, 
  Typography,
  styled 
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { TabTitle } from '../../../utils/generalFunction';
import { PLATFORM, ROLES_NAME, ROUTES } from '../../../configs/constants';
import errorHandling from '../../../utils/errorHandling';
import BackdropLoading from '../../../components/loading/BackdropLoading';

import { updateVerifyEmail } from '../../../redux/authSlice';
import authService from '../../../services/authService';

import EmployerSignUpForm from '../../components/auths/EmployerSignUpForm';

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
        nav(`/${ROUTES.AUTH.EMAIL_VERIFICATION}`);
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
              Tạo tài khoản nhà tuyển dụng mới
            </Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <EmployerSignUpForm
              onSignUp={handleRegister}
              serverErrors={serverErrors}
              checkCreds={checkCreds}
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

export default EmployerSignUp;
