import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Typography, Button, Menu } from '@mui/material';

import { confirmModal } from '../../../../utils/sweetalert2Modal';
import { ROLES_NAME } from '../../../../configs/constants';
import tokenService from '../../../../services/tokenService';
import { removeUserInfo } from '../../../../redux/userSlice';
import errorHandling from '../../../../utils/errorHandling';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faBriefcase,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

const AccountSwitchMenu = ({ isShowButton = false }) => {
  const nav = useNavigate();
  const dispath = useDispatch();
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (path) => {
    const accessToken = tokenService.getAccessTokenFromCookie();
    dispath(removeUserInfo(accessToken))
      .unwrap()
      .then(() => {
        nav(path);
      })
      .catch((error) => {
        errorHandling(error);
      });
  };

  const handleLogin = () => {
    let path = '/dang-nhap-nha-tuyen-dung';

    if (isAuthenticated) {
      let title = '';
      let text =
        'Tài khoản đang đăng nhập hiện tại sẽ được đăng xuất. Bạn có chắc chắn?';
      let path = '';
      switch (currentUser?.roleName) {
        case ROLES_NAME.JOB_SEEKER:
          title = 'Đăng nhập nhà tuyển dụng';
          path = '/dang-nhap-nha-tuyen-dung';
          break;
        case ROLES_NAME.EMPLOYER:
          title = 'Đăng nhập ứng viên';
          path = '/dang-nhap-ung-vien';
          break;
        default:
          break;
      }

      handleClose();
      confirmModal(() => handleLogout(path), title, text, 'warning');
    } else {
      handleClose();
      nav(path);
    }
  };

  const handleSignUp = () => {
    let path = '/dang-ky-tai-khoan-nha-tuyen-dung';

    if (isAuthenticated) {
      let title = '';
      let text =
        'Tài khoản đang đăng nhập hiện tại sẽ được đăng xuất. Bạn có chắc chắn?';
      let path = '';
      switch (currentUser?.roleName) {
        case ROLES_NAME.JOB_SEEKER:
          title = 'Đăng ký tài khoản nhà tuyển dụng';
          path = '/dang-ky-tai-khoan-nha-tuyen-dung';
          break;
        case ROLES_NAME.EMPLOYER:
          title = 'Đăng ký tài khoản ứng viên';
          path = '/dang-ky-tai-khoan-ung-vien';
          break;
        default:
          break;
      }

      handleClose();
      confirmModal(() => handleLogout(path), title, text, 'warning');
    } else {
      handleClose();
      nav(path);
    }
  };

  const title = React.useMemo(() => {
    return currentUser?.roleName === ROLES_NAME.JOB_SEEKER ? (
      <Stack direction="row" alignItems="center">
        <FontAwesomeIcon
          color="#2c95ff"
          icon={faBriefcase}
          fontSize={25}
          style={{ marginRight: 8 }}
        />
        <Stack direction="column">
          <Typography>Nhà tuyển dụng</Typography>
          <Typography variant="caption" sx={{ fontSize: 11 }}>
            Đăng tin miễn phí
          </Typography>
        </Stack>
      </Stack>
    ) : currentUser?.roleName === ROLES_NAME.EMPLOYER ? (
      <Stack direction="row" alignItems="center">
        <FontAwesomeIcon
          color="#2c95ff"
          icon={faUsers}
          fontSize={25}
          style={{ marginRight: 8 }}
        />
        <Stack direction="column">
          <Typography>Người tìm việc</Typography>
          <Typography variant="caption" sx={{ fontSize: 11 }}>
            <FontAwesomeIcon icon={faArrowRight} /> Chuyển
          </Typography>
        </Stack>
      </Stack>
    ) : (
      <Stack direction="row" alignItems="center">
        <FontAwesomeIcon
          color="#2c95ff"
          icon={faBriefcase}
          fontSize={25}
          style={{ marginRight: 8 }}
        />
        <Stack direction="column">
          <Typography>Nhà tuyển dụng</Typography>
          <Typography variant="caption" sx={{ fontSize: 11 }}>
            Đăng tin miễn phí
          </Typography>
        </Stack>
      </Stack>
    );
  }, [currentUser]);

  return (
    <div>
      {isShowButton ? (
        <Stack spacing={1} sx={{ px: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            color="inherit"
            onClick={handleLogin}
            size="small"
            sx={{  textTransform: 'inherit' }}
          >
            {currentUser?.roleName === ROLES_NAME.EMPLOYER
              ? 'Đăng nhập ứng viên'
              : 'Đăng nhập NTD'}
          </Button>
          <Button
            variant="outlined"
            fullWidth
            size="small"
            color="inherit"
            sx={{  textTransform: 'inherit' }}
            onClick={handleSignUp}
          >
            {currentUser?.roleName === ROLES_NAME.EMPLOYER
              ? 'Đăng ký ứng viên'
              : 'Đăng ký NTD'}
          </Button>
        </Stack>
      ) : (
        <>
          <Typography sx={{ ml: 1, cursor: 'pointer' }} onClick={handleClick}>
            {title}
          </Typography>
          <Menu
            id="account-switch-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
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
              <Button
                variant="contained"
                fullWidth
                onClick={handleLogin}
                sx={{ color: 'white' }}
              >
                Đăng nhập
              </Button>
              <Button
                variant="contained"
                fullWidth
                color="warning"
                sx={{ color: 'white' }}
                onClick={handleSignUp}
              >
                Đăng ký
              </Button>
            </Stack>
          </Menu>{' '}
        </>
      )}
    </div>
  );
};

export default React.memo(AccountSwitchMenu);
