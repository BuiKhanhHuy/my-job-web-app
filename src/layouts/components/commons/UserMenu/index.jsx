/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Menu, Stack, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import { confirmModal } from "../../../../utils/sweetalert2Modal";
import errorHandling from "../../../../utils/errorHandling";

import { removeUserInfo } from "../../../../redux/userSlice";

import { ROLES_NAME, ROUTES } from "../../../../configs/constants";
import tokenService from "../../../../services/tokenService";
import {
  resetSearchCompany,
  resetSearchJobPostFilter,
  resetSearchResume,
} from "../../../../redux/filterSlice";

const jobSeekerUserMenu = [
  {
    label: "Quản lý tài khoản",
    path: ROUTES.JOB_SEEKER.DASHBOARD,
  },
];

const employerUserMenu = [
  {
    label: "Trang quản lý NTD",
    path: ROUTES.EMPLOYER.DASHBOARD,
  },
];

const UserMenu = ({ anchorElUser, open, handleCloseUserMenu }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const menuItems = React.useMemo(() => {
    return currentUser.roleName === ROLES_NAME.JOB_SEEKER
      ? jobSeekerUserMenu
      : currentUser.roleName === ROLES_NAME.EMPLOYER
      ? employerUserMenu
      : [];
  }, [currentUser]);

  const handleLogout = () => {
    const accessToken = tokenService.getAccessTokenFromCookie();
    const backend = tokenService.getProviderFromCookie();
    dispatch(removeUserInfo({ accessToken, backend }))
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

  return (
    <Menu
      anchorEl={anchorElUser}
      id="account-menu"
      open={open}
      onClose={handleCloseUserMenu}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Stack spacing={1} sx={{ p: 1 }}>
        {menuItems.map((item) => (
          <Link to={`/${item.path}`} key={item.path}>
            <Button
              color="primary"
              variant="text"
              sx={{ textTransform: "inherit" }}
              fullWidth
            >
              <Typography marginRight="auto"> {item.label}</Typography>
            </Button>
          </Link>
        ))}
        <Button
          startIcon={<LogoutIcon style={{ marginLeft: 4 }} />}
          variant="text"
          color="error"
          sx={{ textTransform: "inherit" }}
          fullWidth
          onClick={() => {
            handleCloseUserMenu();
            confirmModal(
              handleLogout,
              "Đăng xuất tài khoản",
              "Bạn có chắc chắn muốn đăng xuất?",
              "question"
            );
          }}
        >
          <Typography marginRight="auto">Đăng xuất</Typography>
        </Button>
      </Stack>
    </Menu>
  );
};

export default UserMenu;
