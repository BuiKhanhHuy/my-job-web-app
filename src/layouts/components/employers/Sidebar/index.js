/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  useTheme,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
} from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import GridViewIcon from '@mui/icons-material/GridView';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import { IMAGES, ROUTES, APP_NAME } from '../../../../configs/constants';

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: '8px',
  marginBottom: '2px',
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  position: 'relative',
  '&:hover': {
    backgroundColor: theme.palette.primary.background,
    color: theme.palette.text.secondary,
    textDecoration: 'none',
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.background,
    color: theme.palette.primary.main,
    fontWeight: 600,
    '&:hover': {
      backgroundColor: theme.palette.primary.background,
      color: theme.palette.primary.main,
    },
  },
  '& .MuiTypography-root': {
    color: 'inherit',
  },
  '& .MuiListItemIcon-root': {
    color: 'inherit',
  },
  '&.active': {
    backgroundColor: theme.palette.primary.background,
    color: theme.palette.primary.main,
    fontWeight: 600,
    '&:hover': {
      backgroundColor: theme.palette.primary.background,
      color: theme.palette.primary.main,
    },
  },
}));

const MenuItem = ({ icon: Icon, text, to, onClick, isSelected, isExpanded, hasChildren, isChild }) => {
  return (
    <StyledListItemButton
      component={to ? NavLink : 'div'}
      to={to}
      onClick={onClick}
      selected={isSelected}
      sx={{ 
        pl: isChild ? 3 : 2,
        ...(hasChildren ? {} : { '& .MuiListItemIcon-root': { ml: 0 } })
      }}
    >
      {!isChild && Icon && (
        <ListItemIcon sx={{ minWidth: 35 }}>
          <Icon fontSize="small" />
        </ListItemIcon>
      )}
      {isChild && (
        <Box
          sx={{
            width: 4,
            height: 4,
            borderRadius: '50%',
            backgroundColor: 'text.secondary',
            mr: 1.5,
            ml: 1,
          }}
        />
      )}
      <ListItemText 
        primary={text} 
        primaryTypographyProps={{ 
          variant: 'body2',
          fontSize: '0.9rem',
        }}
      />
      {hasChildren && (
        <Box component="span" sx={{ ml: 'auto' }}>
          {isExpanded ? (
            <ArrowDropDownIcon fontSize="small" />
          ) : (
            <ArrowRightIcon fontSize="small" />
          )}
        </Box>
      )}
    </StyledListItemButton>
  );
};

const DrawerContent = () => {
  const location = useLocation();
  const theme = useTheme();
  const [expandedItems, setExpandedItems] = useState({
    candidates: true,
    account: true,
  });

  const handleExpand = (section) => {
    setExpandedItems(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div>
      <Toolbar sx={{ px: 2, py: 1.5 }}>
        <Box 
          component={Link} 
          to={`/${ROUTES.EMPLOYER.DASHBOARD}`}
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Avatar
            src={IMAGES.getTextLogo(
              theme.palette.mode === 'light' ? 'dark' : 'light'
            )}
            sx={{
              height: 48,
              width: 'auto',
            }}
            variant="rounded"
            alt="LOGO"
          />
        </Box>
      </Toolbar>
      <Divider sx={{ borderColor: 'grey.500' }} />
      <Box sx={{ px: 1.5, py: 1.5 }}>
        <List component="nav" disablePadding>
          {/* Tổng quan */}
          <ListItem disablePadding>
            <MenuItem
              icon={GridViewIcon}
              text="Bản điều khiển"
              to={`/${ROUTES.EMPLOYER.DASHBOARD}`}
              isSelected={location.pathname === `/${ROUTES.EMPLOYER.DASHBOARD}`}
            />
          </ListItem>

          {/* Quản lý đăng tuyển */}
          <ListItem disablePadding>
            <MenuItem
              icon={ListAltOutlinedIcon}
              text="Danh sách tin đăng"
              to={`/${ROUTES.EMPLOYER.JOB_POST}`}
              isSelected={location.pathname === `/${ROUTES.EMPLOYER.JOB_POST}`}
            />
          </ListItem>

          {/* Quản lý ứng viên */}
          <ListItem disablePadding>
            <MenuItem
              icon={FactCheckOutlinedIcon}
              text="Quản lý ứng viên"
              hasChildren
              isExpanded={expandedItems.candidates}
              onClick={() => handleExpand('candidates')}
            />
          </ListItem>
          <Collapse in={expandedItems.candidates} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <MenuItem
                text="Hồ sơ ứng tuyển"
                to={`/${ROUTES.EMPLOYER.APPLIED_PROFILE}`}
                isSelected={location.pathname === `/${ROUTES.EMPLOYER.APPLIED_PROFILE}`}
                isChild
              />
              <MenuItem
                text="Hồ sơ đã lưu"
                to={`/${ROUTES.EMPLOYER.SAVED_PROFILE}`}
                isSelected={location.pathname === `/${ROUTES.EMPLOYER.SAVED_PROFILE}`}
                isChild
              />
              <MenuItem
                text="Tìm ứng viên mới"
                to={`/${ROUTES.EMPLOYER.PROFILE}`}
                isSelected={location.pathname === `/${ROUTES.EMPLOYER.PROFILE}`}
                isChild
              />
            </List>
          </Collapse>

          {/* Quản lý thông báo */}
          <ListItem disablePadding>
            <MenuItem
              icon={NotificationsNoneOutlinedIcon}
              text={`${APP_NAME} thông báo`}
              to={`/${ROUTES.EMPLOYER.NOTIFICATION}`}
              isSelected={location.pathname === `/${ROUTES.EMPLOYER.NOTIFICATION}`}
            />
          </ListItem>

          {/* Quản lý tài khoản */}
          <ListItem disablePadding>
            <MenuItem
              icon={BusinessOutlinedIcon}
              text="Quản lý tài khoản"
              hasChildren
              isExpanded={expandedItems.account}
              onClick={() => handleExpand('account')}
            />
          </ListItem>
          <Collapse in={expandedItems.account} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <MenuItem
                text="Thông tin công ty"
                to={`/${ROUTES.EMPLOYER.COMPANY}`}
                isSelected={location.pathname === `/${ROUTES.EMPLOYER.COMPANY}`}
                isChild
              />
              <MenuItem
                text="Tài khoản"
                to={`/${ROUTES.EMPLOYER.ACCOUNT}`}
                isSelected={location.pathname === `/${ROUTES.EMPLOYER.ACCOUNT}`}
                isChild
              />
              <MenuItem
                text="Cài đặt"
                to={`/${ROUTES.EMPLOYER.SETTING}`}
                isSelected={location.pathname === `/${ROUTES.EMPLOYER.SETTING}`}
                isChild
              />
            </List>
          </Collapse>
        </List>
      </Box>
    </div>
  );
};

const Sidebar = ({ drawerWidth }) => {
  const location = useLocation();
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: {
          xs: 'none',
          sm: 'none',
          md: 'none',
          lg: 'none',
          xl: 'block',
        },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
          borderRight: '0px',
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.customShadows.sidebar,
          borderRadius: '0px 10px 10px 0px',
        },
      }}
      open
    >
      <DrawerContent />
    </Drawer>
  );
};

const MobileSidebar = ({
  drawerWidth,
  container,
  mobileOpen,
  handleDrawerToggle,
}) => {
  const theme = useTheme();

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
        display: {
          xs: 'block',
          sm: 'block',
          md: 'block',
          lg: 'block',
          xl: 'none',
        },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
          borderRight: '0px',
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.customShadows.sidebar,
          borderRadius: '0px 10px 10px 0px',
        },
      }}
    >
      <DrawerContent />
    </Drawer>
  );
};

Sidebar.MobileSidebar = MobileSidebar;

export default Sidebar;