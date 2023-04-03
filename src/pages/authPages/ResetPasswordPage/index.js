import * as React from 'react';
import {
  Alert,
  AlertTitle,
  Box,
  Card,
  Container,
  Typography,
} from '@mui/material';

import BackdropLoading from '../../../components/loading/BackdropLoading';
import authService from '../../../services/authService';
import ResetPasswordForm from '../../components/auths/ResetPasswordForm';
import { useNavigate, useParams } from 'react-router-dom';
import toastMessages from '../../../utils/toastMessages';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const nav = useNavigate();
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [serverErrors, setServerErrors] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState(null);

  const handleResetPassword = (data) => {
    const resetPassword = async (data) => {
      setIsFullScreenLoading(true);
      try {
        const resData = await authService.resetPassword(data);

        const redirectLoginUrl = resData.data?.redirectLoginUrl;

        nav(
          `${redirectLoginUrl}/?successMessage=Cập nhật mật khẩu thành công.`
        );
      } catch (error) {
        const res = error.response;

        switch (res.status) {
          case 400:
            const errors = res.data?.errors;
            if ('errorMessage' in errors) {
              setErrorMessage(errors['errorMessage']);
            } else {
              setServerErrors(errors);
            }
            break;
          default:
            toastMessages.error('Đã xảy ra lỗi, vui lòng thử lại!');
        }
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    const newData = { ...data, token: token };
    resetPassword(newData);
  };

  return (
    <>
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
              my: 2,
            }}
          >
            <Typography component="h1" variant="h5">
              Đặt lại mật khẩu của bạn
            </Typography>
          </Box>

          {/* Start: Error alert here */}
          {errorMessage && (
            <Box>
              <Alert severity="error">
                <AlertTitle>Thất bại</AlertTitle>
                {errorMessage}
              </Alert>
            </Box>
          )}
          {/* End: Error alert here */}

          <Box sx={{ mt: 4 }}>
            <ResetPasswordForm
              handleResetPassword={handleResetPassword}
              serverErrors={serverErrors}
            />
          </Box>
        </Card>
      </Container>

      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

export default ResetPasswordPage;
