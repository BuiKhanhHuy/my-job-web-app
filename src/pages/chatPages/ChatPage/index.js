import React from 'react';
import { useSelector } from 'react-redux';
import { 
  Box, 
  Grid, 
  Stack, 
  Typography,
  Drawer,
  IconButton,
  useTheme,
  useMediaQuery 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import GroupIcon from '@mui/icons-material/Group';

import { ROLES_NAME } from '../../../configs/constants';

// page components
import RightSidebar from '../../components/chats/RightSidebar';
import ChatWindow from '../../components/chats/ChatWindow';
import LeftSidebar from '../../components/chats/LeftSidebar';
// components
import SidebarHeader from '../../../components/chats/SidebarHeader';

const ChatPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  const { currentUser } = useSelector((state) => state.user);
  
  const [openLeftDrawer, setOpenLeftDrawer] = React.useState(false);
  const [openRightDrawer, setOpenRightDrawer] = React.useState(false);

  return (
    <Grid container sx={{ height: '100vh', bgcolor: 'background.default' }}>
      {/* Left Sidebar */}
      {isMobile ? (
        <Drawer
          anchor="left"
          open={openLeftDrawer}
          onClose={() => setOpenLeftDrawer(false)}
          PaperProps={{
            sx: {
              width: '80%',
              maxWidth: 360,
              bgcolor: 'background.paper',
            }
          }}
        >
          <Box px={2} py={2} sx={{ height: '100%' }}>
            <Stack spacing={2}>
              <Box>
                <SidebarHeader />
              </Box>
              <Box>
                {currentUser?.roleName === ROLES_NAME.JOB_SEEKER ? (
                  <LeftSidebar />
                ) : (
                  <LeftSidebar.Employer />
                )}
              </Box>
            </Stack>
          </Box>
        </Drawer>
      ) : (
        <Grid
          item
          xs={12}
          sm={4}
          md={3}
          sx={{
            height: '100vh',
            borderRight: 1,
            borderColor: 'divider',
            display: { xs: 'none', sm: 'block' }
          }}
        >
          <Box px={2} py={2} sx={{ height: '100%', bgcolor: 'background.paper' }}>
            <Stack spacing={2}>
              <Box>
                <SidebarHeader />
              </Box>
              <Box>
                {currentUser?.roleName === ROLES_NAME.JOB_SEEKER ? (
                  <LeftSidebar />
                ) : (
                  <LeftSidebar.Employer />
                )}
              </Box>
            </Stack>
          </Box>
        </Grid>
      )}

      {/* Main Chat Window */}
      <Grid 
        item 
        xs={12} 
        sm={8} 
        md={6}
        sx={{ 
          height: '100vh',
          bgcolor: 'background.paper',
        }}
      >
        <Box sx={{ height: '100%' }}>
          <Stack direction="column" sx={{ height: '100%' }}>
            <Box 
              sx={{ 
                borderBottom: 1, 
                borderColor: 'divider',
                p: 2,
                bgcolor: 'background.paper',
                boxShadow: (theme) => theme.customShadows.card,
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              {/* Mobile Menu Buttons */}
              {(isMobile || isMedium) && (
                <Stack direction="row" spacing={1}>
                  {isMobile && (
                    <IconButton 
                      onClick={() => setOpenLeftDrawer(true)}
                      sx={{ 
                        bgcolor: 'primary.background',
                        '&:hover': { bgcolor: 'primary.background' }
                      }}
                    >
                      <GroupIcon color="primary" />
                    </IconButton>
                  )}
                  {(isMobile || isMedium) && (
                    <IconButton 
                      onClick={() => setOpenRightDrawer(true)}
                      sx={{ 
                        bgcolor: 'primary.background',
                        '&:hover': { bgcolor: 'primary.background' }
                      }}
                    >
                      <MenuIcon color="primary" />
                    </IconButton>
                  )}
                </Stack>
              )}

              <Typography 
                variant="subtitle1" 
                fontWeight={600}
                sx={{
                  flex: 1,
                  background: (theme) => theme.palette.primary.gradient,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textAlign: 'center'
                }}
              >
                New way to follow your chance.{' '}
                <span>More engage, more success</span>
              </Typography>
            </Box>
            
            <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
              <ChatWindow />
            </Box>
          </Stack>
        </Box>
      </Grid>

      {/* Right Sidebar */}
      {isMedium ? (
        <Drawer
          anchor="right"
          open={openRightDrawer}
          onClose={() => setOpenRightDrawer(false)}
          PaperProps={{
            sx: {
              width: '80%',
              maxWidth: 360,
              bgcolor: 'background.paper',
            }
          }}
        >
          <Box px={2} py={2}>
            {currentUser?.roleName === ROLES_NAME.JOB_SEEKER ? (
              <RightSidebar />
            ) : (
              <RightSidebar.Employer />
            )}
          </Box>
        </Drawer>
      ) : (
        <Grid
          item
          md={3}
          sx={{
            height: '100vh',
            borderLeft: 1,
            borderColor: 'divider',
            display: { xs: 'none', md: 'block' },
            bgcolor: 'background.paper'
          }}
        >
          <Box px={2} py={2}>
            {currentUser?.roleName === ROLES_NAME.JOB_SEEKER ? (
              <RightSidebar />
            ) : (
              <RightSidebar.Employer />
            )}
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default ChatPage;
