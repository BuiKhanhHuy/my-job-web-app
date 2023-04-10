import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  useTheme,
  Button,
} from '@mui/material';
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { confirmModal } from '../../../../utils/sweetalert2Modal';
import errorHandling from '../../../../utils/errorHandling';

import { IMAGES, ROLES_NAME } from '../../../../configs/constants';
import { removeUserInfo } from '../../../../redux/userSlice';
import tokenService from '../../../../services/tokenService';
import AccountSwitchMenu from '../AccountSwitchMenu';

const drawerWidth = 240;

const LeftDrawer = ({ window, pages, mobileOpen, handleDrawerToggle }) => {
  const dispath = useDispatch();
  const nav = useNavigate();
  const theme = useTheme();

  const { isAuthenticated, currentUser } = useSelector((state) => state.user);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleLogout = () => {
    const roleName = currentUser.roleName;
    const accessToken = tokenService.getAccessTokenFromCookie();
    dispath(removeUserInfo(accessToken))
      .unwrap()
      .then(() => {
        switch (roleName) {
          case ROLES_NAME.JOB_SEEKER:
            nav('/dang-nhap-ung-vien');
            break;
          case ROLES_NAME.EMPLOYER:
            nav('/dang-nhap-nha-tuyen-dung');
            break;
          default:
            nav('/');
        }
      })
      .catch((error) => {
        errorHandling(error);
      });
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Stack
        sx={{ py: 1 }}
        justifyContent="center"
        alignItems="center"
        component={Link}
        to="/"
      >
        <Avatar
          src={IMAGES.getTextLogo(
            theme.palette.mode === 'light' ? 'dark' : 'light'
          )}
          sx={{
            width: '55%',
            height: 44,
          }}
          variant="square"
          alt="LOGO"
        />
      </Stack>
      <Divider />
      <List>
        {pages.map((page) => (
          <ListItem
            key={page.id}
            component={NavLink}
            to={page.path}
            disablePadding
          >
            <ListItemButton
              sx={{
                textAlign: 'center',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'black' : 'white',
              }}
            >
              <ListItemText primary={page.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Start: Account switch menu */}
      <AccountSwitchMenu isShowButton={true} />
      {/* Start: Account switch menu */}

      <Divider variant="middle" sx={{ mt: 2 }} />

      <Stack spacing={1} sx={{ p: 2 }}>
        {isAuthenticated ? (
          <Button
            variant="contained"
            color="error"
            sx={{ color: 'white' }}
            onClick={() =>
              confirmModal(
                handleLogout,
                'Đăng xuất tài khoản',
                'Bạn có chắc chắn muốn đăng xuất?',
                'question'
              )
            }
          >
            Đăng xuất
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              color="info"
              sx={{ color: 'white' }}
              onClick={() => nav('/dang-nhap-ung-vien')}
            >
              Đăng nhập
            </Button>
            <Button
              variant="contained"
              color="warning"
              sx={{ color: 'white' }}
              onClick={() => nav('/dang-ky-tai-khoan-ung-vien')}
            >
              Đăng ký
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );

  return (
    <Drawer
      container={container}
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default LeftDrawer;
