import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, Container, Stack, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons';

import { TabTitle } from '../../../utils/generalFunction';

const EmailVerificationRequiredPage = () => {
  TabTitle("Xác thực email")
  const { email } = useSelector((state) => state.auth);

  return (
    <Container
      maxWidth="sm"
      sx={{
        marginTop: 8,
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Stack sx={{ pb: 2 }} alignItems="center">
        <Typography variant="h5" gutterBottom>
          Xác nhận email
        </Typography>
        <Typography variant="subtitle2 ">
          Cảm ơn bạn đã đăng ký tài khoản MyJob
        </Typography>
      </Stack>
      <Card sx={{ p: 6, pt: 2, boxShadow: 0 }}>
        <Stack alignItems="center" spacing={2}>
          <Box sx={{ mb: 1 }}>
            <FontAwesomeIcon
              icon={faEnvelopeCircleCheck}
              size="7x"
              color="#fca34d"
            />
          </Box>
          <Box>
            <Typography variant="h5" gutterBottom>
              Xác nhận địa chỉ email của bạn
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" gutterBottom>
              Email xác nhận đã được gửi đến:
            </Typography>
            <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
              {email}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: 'gray' }}>
              Nhấp vào liên kết trong email để kích hoạt tài khoản của bạn
            </Typography>
          </Box>
        </Stack>
        <Box sx={{ mt: 10 }}>
          <Typography
            variant="body1"
            sx={{ color: 'gray', textAlign: 'center', cursor: 'pointer' }}
          >
            Không nhận được email?{' '}
            <span style={{ fontWeight: 'bold', color: 'red' }}>
              Gửi lại email
            </span>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default EmailVerificationRequiredPage;
