import * as React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { IMAGES } from '../../../../configs/constants';
import SwitchModeButton from '../../../../components/SwitchModeButton';
import UserMenu from '../UserMenu';
import LeftDrawer from '../LeftDrawer';
import AccountSwitchMenu from '../AccountSwitchMenu';

const pages = [
  { id: 1, label: 'Việc làm', path: '/viec-lam' },
  { id: 2, label: 'Công ty', path: '/cong-ty' },
  { id: 3, label: 'Về chúng tôi', path: '/ve-chung-toi' },
];

const Header = (props) => {
  const nav = useNavigate();
  const { currentUser, isAuthenticated } = useSelector((state) => state.user);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = () => {
    nav('/dang-nhap-ung-vien');
  };

  const handleSignUp = () => {
    nav('/dang-ky-tai-khoan-ung-vien');
  };

  const authArea = isAuthenticated ? (
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
  ) : (
    <Box
      sx={{
        ml: 3,
        display: {
          xs: 'none',
          sm: 'block',
          md: 'block',
          lg: 'block',
          xl: 'block',
        },
      }}
    >
      <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          color="info"
          sx={{ color: 'white' }}
          onClick={handleLogin}
        >
          Đăng nhập
        </Button>
        <Button
          variant="contained"
          color="warning"
          sx={{ color: 'white' }}
          onClick={handleSignUp}
        >
          Đăng ký
        </Button>
      </Stack>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ boxShadow: 0 }} id="common-header">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Stack direction="row" alignItems="center" component={Link} to="/">
              <Avatar
                src={IMAGES.getLogo('medium', 'light')}
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  mr: 1,
                  width: 50,
                  height: 50,
                }}
                alt="LOGO"
              />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  color: 'white',
                }}
              >
                MyJob
              </Typography>
            </Stack>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.id}
                    onClick={handleCloseNavMenu}
                    component={NavLink}
                    to={page.path}
                  >
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  component={NavLink}
                  to={page.path}
                  key={page.id}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    mr: 1,
                    color: 'white',
                    display: 'block',
                    // backgroundColor: '#fca34d',
                  }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <ChatIcon />
              </Badge>
            </IconButton>
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

            <Divider
              orientation="vertical"
              flexItem
              variant="middle"
              sx={{ mx: 2, borderColor: 'lightgray' }}
            />

            {/* Start: Account switch menu */}
            <AccountSwitchMenu />
            {/* Start: Account switch menu */}
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="nav">
        <LeftDrawer
          pages={pages}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      </Box>
    </>
  );
};
export default Header;
