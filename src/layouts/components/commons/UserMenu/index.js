import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Menu,
  Stack,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

import { confirmModal } from '../../../../utils/sweetalert2Modal';
import errorHandling from '../../../../utils/errorHandling';

import { removeUserInfo } from '../../../../redux/userSlice';

import { ROLES_NAME } from '../../../../configs/constants';
import tokenService from '../../../../services/tokenService';

const jobSeekerUserMenu = [
  {
    label: 'Quản lý tài khoản',
    path: '/ung-vien',
  },
];

const employerUserMenu = [
  {
    label: 'Trang quản lý NTD',
    path: '/nha-tuyen-dung',
  },
];

const UserMenu = ({ anchorElUser, open, handleCloseUserMenu }) => {
  const nav = useNavigate();
  const dispath = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const menuItems = React.useMemo(() => {
    return currentUser.roleName === ROLES_NAME.JOB_SEEKER
      ? jobSeekerUserMenu
      : currentUser.roleName === ROLES_NAME.EMPLOYER
      ? employerUserMenu
      : [];
  }, [currentUser]);

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

  return (
    <Menu
      anchorEl={anchorElUser}
      id="account-menu"
      open={open}
      onClose={handleCloseUserMenu}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <Stack spacing={1} sx={{ p: 1 }}>
        {menuItems.map((item) => (
          <Button
            key={item.path}
            variant="outlined"
            sx={{ textTransform: 'inherit' }}
            fullWidth
            component={Link}
            to={item.path}
          >
            {item.label}
          </Button>
        ))}
        <Button
          startIcon={<LogoutIcon />}
          variant="outlined"
          color="error"
          sx={{ textTransform: 'inherit' }}
          fullWidth
          onClick={() => {
            handleCloseUserMenu();
            confirmModal(
              handleLogout,
              'Đăng xuất tài khoản',
              'Bạn có chắc chắn muốn đăng xuất?',
              'question'
            );
          }}
        >
          Đăng xuất
        </Button>
      </Stack>
    </Menu>
  );
};

export default UserMenu;
