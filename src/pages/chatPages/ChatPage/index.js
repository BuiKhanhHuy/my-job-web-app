import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid, Stack, Typography } from '@mui/material';

import { ROLES_NAME } from '../../../configs/constants';

// page components
import RightSidebar from '../../components/chats/RightSidebar';
import ChatWindow from '../../components/chats/ChatWindow';
import LeftSidebar from '../../components/chats/LeftSidebar';
// components
import SidebarHeader from '../../../components/chats/SidebarHeader';

const ChatPage = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Grid container>
      <Grid
        item
        xs={3}
        sx={{ height: '100vh', borderRight: 1, borderColor: '#e0e0e0' }}
      >
        <Box px={1} py={2}>
          <Stack spacing={2}>
            <Box>
              {/* Start: SidebarHeader */}
              <SidebarHeader />
              {/* Start: End */}
            </Box>
            <Box>
              {/* Start: LeftSidebar */}
              {currentUser?.roleName === ROLES_NAME.JOB_SEEKER ? (
                <LeftSidebar />
              ) : (
                <LeftSidebar.Employer />
              )}
              {/* End: LeftSidebar */}
            </Box>
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={6} sx={{ height: '100vh' }}>
        <Box>
          <Stack direction="column">
            <Box sx={{ borderBottom: 1, borderBottomColor: '#e0e0e0', p: 2 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                New way to follow your your chance.{' '}
                <span style={{ color: '#fca34d' }}>
                  {' '}
                  More engage, more success
                </span>
              </Typography>
            </Box>
            <Box>
              {/* Start: ChatWindow */}
              <ChatWindow />
              {/* End: ChatWindow */}
            </Box>
          </Stack>
        </Box>
      </Grid>
      <Grid
        item
        xs={3}
        sx={{ height: '100vh', borderLeft: 1, borderLeftColor: '#e0e0e0' }}
      >
        <Box px={1} py={2}>
          {/* Start: RightSidebar */}
          {currentUser?.roleName === ROLES_NAME.JOB_SEEKER ? (
            <RightSidebar />
          ) : (
            <RightSidebar.Employer />
          )}
          {/* End: RightSidebar */}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChatPage;
