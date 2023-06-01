import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import MuiImageCustom from '../../MuiImageCustom';

const ChatInfo = ({ avatarUrl, title, subTitle }) => {
  return (
    <Stack justifyContent="center" alignItems="center" spacing={1} mt={3}>
      <Box>
        <MuiImageCustom
          width={54}
          height={54}
          sx={{
            borderRadius: 50,
            border: 1,
            borderColor: '#e0e0e0',
            p: 0.25,
          }}
          src={avatarUrl}
        />
      </Box>
      <Typography variant="subtitle2" textAlign="center" fontWeight="bold">
        {title || '---'}
      </Typography>
      <Typography variant="subtitle2" textAlign="center" fontWeight="bold">
        {subTitle || '---'}
      </Typography>
      <Typography textAlign="center" variant="caption">
        Hãy bắt đầu cuộc trò chuyện bằng một lời chào 😍
      </Typography>
    </Stack>
  );
};

export default ChatInfo;
