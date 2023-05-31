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
