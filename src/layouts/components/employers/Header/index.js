import React from 'react';
import { useSelector } from 'react-redux';
import {
  AppBar,
  Avatar,
  Box,
  Badge,
  Card,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';

import SwitchModeButton from '../../../../components/SwitchModeButton';
import UserMenu from '../../commons/UserMenu';
import AccountSwitchMenu from '../../commons/AccountSwitchMenu';

const Header = ({ drawerWidth, handleDrawerToggle }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const authArea = (
    <Box sx={{ flexGrow: 0, ml: 3 }}>
      <Card
        variant="outlined"
        onClick={handleOpenUserMenu}
        sx={{
          p: 0.5,
          borderRadius: 50,
          backgroundColor: 'transparent',
          borderColor: '#7e57c2',
          cursor: 'pointer',
        }}
      >
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Avatar alt="Remy Sharp" src={currentUser?.avatarUrl} />
          <Typography
            variant="subtitle1"
            sx={{
              px: 1,
              color: (theme) =>
                theme.palette.mode === 'light' ? 'white' : 'white',
              display: {
                xs: 'none',
                sm: 'block',
                md: 'block',
                lg: 'block',
                xl: 'block',
              },
            }}
          >
            {currentUser?.fullName}
          </Typography>
        </Stack>
      </Card>
      {/* Start: User menu */}
      <UserMenu
        anchorElUser={anchorElUser}
        open={Boolean(anchorElUser)}
        handleCloseUserMenu={handleCloseUserMenu}
      />
      {/* End: User menu */}
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Start: Account switch menu */}
          <AccountSwitchMenu />
          {/* Start: Account switch menu */}
        </Toolbar>

        <Toolbar>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          {/* Start: SwitchModeButton */}
          <SwitchModeButton />
          {/* End: SwitchModeButton */}

          {/* Start: authArea */}
          {authArea}
          {/* End: authArea */}
        </Toolbar>
      </Stack>
    </AppBar>
  );
};

export default Header;
