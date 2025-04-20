/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

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

import { IMAGES, ROUTES } from '../../../../configs/constants';
import { removeUserInfo } from '../../../../redux/userSlice';
import tokenService from '../../../../services/tokenService';
import AccountSwitchMenu from '../AccountSwitchMenu';
import {
  resetSearchCompany,
  resetSearchJobPostFilter,
  resetSearchResume,
} from '../../../../redux/filterSlice';

const drawerWidth = 240;

const LeftDrawer = ({ window, pages, mobileOpen, handleDrawerToggle }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const theme = useTheme();

  const { isAuthenticated } = useSelector((state) => state.user);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleLogout = () => {
    const accessToken = tokenService.getAccessTokenFromCookie();
    const backend = tokenService.getProviderFromCookie();
    dispatch(removeUserInfo({accessToken, backend}))
      .unwrap()
      .then(() => {
        dispatch(resetSearchJobPostFilter());
        dispatch(resetSearchCompany());
        dispatch(resetSearchResume());

        nav(`/${ROUTES.AUTH.LOGIN}`);
      })
      .catch((error) => {
        errorHandling(error);
      });
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Stack
        sx={{ 
          py: 2,
          background: (theme) => theme.palette.primary.gradient,
          borderRadius: '0 10px 0 0',
        }}
        justifyContent="center"
        alignItems="center"
        component={Link}
        to="/"
      >
        <Avatar
          src={IMAGES.getTextLogo('light')}
          sx={{
            width: '55%',
            height: 44,
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            }
          }}
          variant="square"
          alt="LOGO"
        />
      </Stack>
      <Divider sx={{ borderColor: 'grey.200' }} />
      <List sx={{ py: 2 }}>
        {pages.map((page) => (
          <ListItem
            key={page.id}
            component={NavLink}
            to={page.path}
            disablePadding
            sx={{
              mb: 1,
              mx: 1,
            }}
          >
            <ListItemButton
              sx={{
                textAlign: 'center',
                borderRadius: 2,
                transition: 'all 0.2s ease-in-out',
                color: 'primary.main',
                '&.active': {
                  backgroundColor: 'primary.background',
                  color: 'primary.main',
                  fontWeight: 600,
                },
                '&:hover': {
                  backgroundColor: 'grey.100',
                  transform: 'translateX(5px)',
                }
              }}
            >
              <ListItemText 
                primary={page.label}
                primaryTypographyProps={{
                  fontSize: '0.95rem',
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Start: Account switch menu */}
      <AccountSwitchMenu isShowButton={true} />
      {/* Start: Account switch menu */}

      <Divider
        variant="middle"
        sx={{
          my: 2,
          borderColor: 'grey.200',
          display: {
            xs: 'block',
            sm: 'none',
            md: 'none',
            lg: 'none',
            xl: 'none',
          },
        }}
      />

      <Stack
        spacing={1.5}
        sx={{
          p: 2,
        }}
      >
        {isAuthenticated ? (
          <Button
            variant="contained"
            color="error"
            fullWidth
            sx={{ 
              py: 1,
              boxShadow: (theme) => theme.customShadows.small,
              '&:hover': {
                transform: 'translateY(-2px)',
                transition: 'transform 0.2s ease-in-out',
              }
            }}
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
              color="primary"
              fullWidth
              sx={{
                py: 1,
                boxShadow: (theme) => theme.customShadows.small,
                display: {
                  xs: 'block',
                  sm: 'none',
                  md: 'none',
                  lg: 'none',
                  xl: 'none',
                },
                '&:hover': {
                  transform: 'translateY(-2px)',
                  transition: 'transform 0.2s ease-in-out',
                }
              }}
              onClick={() => nav(`/${ROUTES.AUTH.REGISTER}`)}
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
        keepMounted: true,
      }}
      sx={{
        display: { xs: 'block', sm: 'block', md: 'none' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
          boxShadow: (theme) => theme.customShadows.card,
          border: 'none',
          borderRadius: '0 10px 0 0',
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default LeftDrawer;
