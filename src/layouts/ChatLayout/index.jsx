/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import ChatProvider from '../../context/ChatProvider';

const ChatLayout = () => {
  return (
    <ChatProvider>
      <Box
        sx={{
          backgroundColor: 'white',
        }}
      >
        <section>
          <Outlet />
        </section>
      </Box>
    </ChatProvider>
  );
};

export default ChatLayout;
