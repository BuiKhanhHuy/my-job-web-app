import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

import { confirmModal } from '../../../../utils/sweetalert2Modal';
import errorHandling from '../../../../utils/errorHandling';

import { removeUserInfo } from '../../../../redux/userSlice';

import { ROLES_NAME } from '../../../../configs/constants';
import tokenService from '../../../../services/tokenService';
import MuiImageCustom from '../../../../components/MuiImageCustom';

const jobSeekerUserMenu = [
  {
    label: 'Bảng điều khiển',
    icon: <DashboardIcon fontSize="small" />,
    path: '/ung-vien',
  },
  {
    label: 'Hồ sơ MyJob',
    icon: <AssignmentIndIcon fontSize="small" />,
    path: '/ung-vien/ho-so',
  },
  {
    label: 'Việc làm đã lưu',
    icon: <BeenhereIcon fontSize="small" />,
    path: '/ung-vien/viec-da-luu',
  },
  {
    label: 'Việc làm đã ứng tuyển',
    icon: <FactCheckIcon fontSize="small" />,
    path: '/ung-vien/viec-da-ung-tuyen',
  },
  {
    label: 'Quản lý thông báo',
    icon: <CircleNotificationsIcon fontSize="small" />,
    path: '/ung-vien/thong-bao-viec-lam',
  },
  {
    label: 'Tài khoản',
    icon: <AccountCircleIcon fontSize="small" />,
    path: '/ung-vien/tai-khoan',
  },
];

const employerUserMenu = [
  {
    label: 'Bảng điều khiển',
    icon: <DashboardIcon fontSize="small" />,
    path: '/nha-tuyen-dung',
  },
  {
    label: 'Đăng tin mới',
    icon: <NoteAddOutlinedIcon fontSize="small" />,
    path: '/nha-tuyen-dung/tin-tuyen-dung',
  },
  {
    label: 'Tìm ứng viên mới',
    icon: <ContentPasteSearchOutlinedIcon fontSize="small" />,
    path: '/nha-tuyen-dung/danh-sach-ung-vien',
  },
  {
    label: 'Tài khoản',
    icon: <AccountCircleIcon fontSize="small" />,
    path: '/nha-tuyen-dung/tai-khoan',
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
      <MenuItem
        component={Link}
        to={
          currentUser.roleName === ROLES_NAME.JOB_SEEKER
            ? '/ung-vien/tai-khoan'
            : currentUser.roleName === ROLES_NAME.EMPLOYER
            ? '/nha-tuyen-dung/tai-khoan'
            : '/'
        }
      >
        <Avatar src={currentUser?.avatarUrl} />
        {currentUser?.fullName}
      </MenuItem>
      <Divider />
      {menuItems.map((item) => (
        <MenuItem
          key={item.path}
          component={Link}
          to={item.path}
          onClick={handleCloseUserMenu}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          {item.label}
        </MenuItem>
      ))}
      <MenuItem
        sx={{ color: '#e53935' }}
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
        <ListItemIcon>
          <LogoutIcon fontSize="small" color="error" />
        </ListItemIcon>
        Đăng xuất
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;
