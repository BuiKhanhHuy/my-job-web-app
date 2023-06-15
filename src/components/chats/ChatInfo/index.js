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

const HeaderChatInfo = ({ avatarUrl, title, subTitle }) => {
  return (
    <Stack direction="row" spacing={1} p={1} alignItems="center">
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
      <Stack>
        <Typography variant="subtitle2" fontWeight="bold">
          {title || '---'}
        </Typography>
        <Typography variant="subtitle2">{subTitle || '---'}</Typography>
      </Stack>
    </Stack>
  );
};

ChatInfo.HeaderChatInfo = HeaderChatInfo;

export default ChatInfo;
