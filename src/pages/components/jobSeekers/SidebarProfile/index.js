import React from 'react';
import { useSelector } from 'react-redux';

import { Avatar, Box, Chip, Stack, Typography } from '@mui/material';

import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const SidebarProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <Box>
          <Avatar src={currentUser?.avatarUrl} sx={{ width: 90, height: 90 }} />
        </Box>
        <Box flex={1}>
          <Typography variant="caption">Chào mừng trở lại,</Typography>
          <Typography variant="h6" gutterBottom>
            {currentUser?.fullName}
          </Typography>
          {currentUser?.isVerifyEmail ? (
            <Chip
              icon={<CheckIcon />}
              label="Tài khoản đã xác thực"
              color="success"
              size="small"
              variant="filled"
            />
          ) : (
            <Chip
              icon={<ClearIcon />}
              label="Tài khoản chưa xác thực"
              color="error"
              size="small"
              variant="filled"
            />
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default SidebarProfile;
