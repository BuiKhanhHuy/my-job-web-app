import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  useTheme,
  Toolbar,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
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

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  '& .css-6ubf1z-MuiTreeItem-content.Mui-selected': {
    backgroundColor: 'transparent',
  },
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderRadius: '8px',
    padding: '6px 8px',
    marginBottom: '2px',
    fontWeight: 500,
    transition: 'all 0.2s ease-in-out',

    '&.Mui-expanded': {
      fontWeight: 600,
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.background,
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.background,
      color: theme.palette.primary.main,
      fontWeight: 600,
      '&:hover': {
        backgroundColor: theme.palette.primary.background,
      },
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: '8px',
    paddingLeft: '8px',
    borderLeft: `1px dashed ${theme.palette.divider}`,
  },
}));

function StyledTreeItem(props) {
  const { labelIcon: LabelIcon, labelText, ...other } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', py: 0.5 }}>
          <Box 
            component={LabelIcon} 
            color="inherit" 
            sx={{ 
              mr: 1,
              fontSize: '1.2rem',
              transition: 'all 0.2s',
            }} 
          />
          <Typography
            variant="body2"
            sx={{ 
              fontWeight: 'inherit', 
              flexGrow: 1,
              fontSize: '0.9rem',
            }}
          >
            {labelText}
          </Typography>
        </Box>
      }
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const drawer = (location, theme) => (
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
      <TreeView
        defaultExpanded={['1', '2', '3', '4', '5']}
        defaultCollapseIcon={<ArrowDropDownIcon sx={{ fontSize: '1.2rem' }} />}
        defaultExpandIcon={<ArrowRightIcon sx={{ fontSize: '1.2rem' }} />}
        defaultEndIcon={<div style={{ width: 20 }} />}
        sx={{ 
          flexGrow: 1, 
          maxWidth: '100%', 
          overflowY: 'auto',
          '& .MuiTreeItem-content': {
            padding: '2px 0',
          }
        }}
      >
        <StyledTreeItem nodeId="1" labelText="Tổng quan">
          <NavLink
            to={`/${ROUTES.EMPLOYER.DASHBOARD}`}
            style={({ isActive }) => ({
              textDecoration: 'none',
              display: 'block',
              backgroundColor: isActive ? theme.palette.primary.background : 'inherit',
            })}
          >
            <StyledTreeItem
              nodeId="6"
              labelText="Bản điều khiển"
              labelIcon={GridViewIcon}
            />
          </NavLink>
        </StyledTreeItem>
        <StyledTreeItem nodeId="2" labelText="Quản lý đăng tuyển">
          <NavLink
            to={`/${ROUTES.EMPLOYER.JOB_POST}`}
            style={({ isActive }) => ({
              textDecoration: 'none',
              display: 'block',
              backgroundColor: isActive ? theme.palette.primary.background : 'inherit',
            })}
          >
            <StyledTreeItem
              nodeId="7"
              labelText="Danh sách tin đăng"
              labelIcon={ListAltOutlinedIcon}
            />
          </NavLink>
        </StyledTreeItem>
        <StyledTreeItem nodeId="3" labelText="Quản lý ứng viên">
          <NavLink
            to={`/${ROUTES.EMPLOYER.APPLIED_PROFILE}`}
            style={({ isActive }) => ({
              textDecoration: 'none',
              display: 'block',
              backgroundColor: isActive ? theme.palette.primary.background : 'inherit',
            })}
          >
            <StyledTreeItem
              nodeId="8"
              labelText="Hồ sơ ứng tuyển"
              labelIcon={FactCheckOutlinedIcon}
            />
          </NavLink>
          <NavLink
            to={`/${ROUTES.EMPLOYER.SAVED_PROFILE}`}
            style={({ isActive }) => ({
              textDecoration: 'none',
              display: 'block',
              backgroundColor: isActive ? theme.palette.primary.background : 'inherit',
            })}
          >
            <StyledTreeItem
              nodeId="9"
              labelText="Hồ sơ đã lưu"
              labelIcon={BookmarkAddedOutlinedIcon}
            />
          </NavLink>
          <NavLink
            to={`/${ROUTES.EMPLOYER.PROFILE}`}
            style={({ isActive }) => ({
              textDecoration: 'none',
              display: 'block',
              backgroundColor: isActive ? theme.palette.primary.background : 'inherit',
            })}
          >
            <StyledTreeItem
              nodeId="10"
              labelText="Tìm ứng viên mới"
              labelIcon={ContentPasteSearchOutlinedIcon}
            />
          </NavLink>
        </StyledTreeItem>
        <StyledTreeItem nodeId="4" labelText="Quản lý thông báo">
          <NavLink
            to={`/${ROUTES.EMPLOYER.NOTIFICATION}`}
            style={({ isActive }) => ({
              textDecoration: 'none',
              display: 'block',
              backgroundColor: isActive ? theme.palette.primary.background : 'inherit',
            })}
          >
            <StyledTreeItem
              nodeId="11"
              labelText={`${APP_NAME} thông báo`}
              labelIcon={NotificationsNoneOutlinedIcon}
            />
          </NavLink>
        </StyledTreeItem>
        <StyledTreeItem nodeId="5" labelText="Quản lý tài khoản">
          <NavLink
            to={`/${ROUTES.EMPLOYER.COMPANY}`}
            style={({ isActive }) => ({
              textDecoration: 'none',
              display: 'block',
              backgroundColor: isActive ? theme.palette.primary.background : 'inherit',
            })}
          >
            <StyledTreeItem
              nodeId="12"
              labelText="Thông tin công ty"
              labelIcon={BusinessOutlinedIcon}
            />
          </NavLink>
          <NavLink
            to={`/${ROUTES.EMPLOYER.ACCOUNT}`}
            style={({ isActive }) => ({
              textDecoration: 'none',
              display: 'block',
              backgroundColor: isActive ? theme.palette.primary.background : 'inherit',
            })}
          >
            <StyledTreeItem
              nodeId="13"
              labelText="Tài khoản"
              labelIcon={AccountCircleOutlinedIcon}
            />
          </NavLink>
          <NavLink
            to={`/${ROUTES.EMPLOYER.SETTING}`}
            style={({ isActive }) => ({
              textDecoration: 'none',
              display: 'block',
              backgroundColor: isActive ? theme.palette.primary.background : 'inherit',
            })}
          >
            <StyledTreeItem
              nodeId="14"
              labelText="Cài đặt"
              labelIcon={SettingsOutlinedIcon}
            />
          </NavLink>
        </StyledTreeItem>
      </TreeView>
    </Box>
  </div>
);

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
      {drawer(location, theme)}
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
  const location = useLocation();

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
      {drawer(location, theme)}
    </Drawer>
  );
};

Sidebar.MobileSidebar = MobileSidebar;

export default Sidebar;
