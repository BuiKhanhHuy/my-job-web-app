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
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import { IMAGES } from '../../../../configs/constants';

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  '& .css-6ubf1z-MuiTreeItem-content.Mui-selected': {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(0.5),
    borderBottomRightRadius: theme.spacing(0.5),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props) {
  const { labelIcon: LabelIcon, labelText, ...other } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', py: 1, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: 'inherit', flexGrow: 1 }}
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
    <Toolbar>
      <Box component={Link} to="/nha-tuyen-dung">
        <Avatar
          src={IMAGES.getTextLogo(
            theme.palette.mode === 'light' ? 'dark' : 'light'
          )}
          sx={{
            height: 44,
            width: '100%',
            margin: '0 auto',
          }}
          variant="square"
          alt="LOGO"
        />
      </Box>
    </Toolbar>
    <Divider />
    <Box>
      <TreeView
        defaultExpanded={['1', '2', '3', '4', '5']}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
        sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      >
        <StyledTreeItem nodeId="1" labelText="Tổng quan">
          <NavLink
            to="/nha-tuyen-dung"
            style={{
              textDecoration: 'none',
              display: 'block',
              backgroundColor:
                location.pathname === '/nha-tuyen-dung'
                  ? 'rgba(68, 29, 160, 0.08)'
                  : 'inherit',
            }}
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
            to="/nha-tuyen-dung/tin-tuyen-dung"
            style={{
              textDecoration: 'none',
              display: 'block',
              backgroundColor:
                location.pathname === '/nha-tuyen-dung/tin-tuyen-dung'
                  ? 'rgba(68, 29, 160, 0.08)'
                  : 'inherit',
            }}
          >
            <StyledTreeItem
              nodeId="8"
              labelText="Danh sách tin đăng"
              labelIcon={ListAltOutlinedIcon}
            />
          </NavLink>
        </StyledTreeItem>
        <StyledTreeItem nodeId="3" labelText="Quản lý ứng viên">
          <NavLink
            to="/nha-tuyen-dung/ho-so-ung-tuyen"
            style={{
              textDecoration: 'none',
              display: 'block',
              backgroundColor:
                location.pathname === '/nha-tuyen-dung/ho-so-ung-tuyen'
                  ? 'rgba(68, 29, 160, 0.08)'
                  : 'inherit',
            }}
          >
            <StyledTreeItem
              nodeId="9"
              labelText="Hồ sơ ứng tuyển"
              labelIcon={FactCheckOutlinedIcon}
            />
          </NavLink>
          <NavLink
            to="/nha-tuyen-dung/ho-so-da-luu"
            style={{
              textDecoration: 'none',
              display: 'block',
              backgroundColor:
                location.pathname === '/nha-tuyen-dung/ho-so-da-luu'
                  ? 'rgba(68, 29, 160, 0.08)'
                  : 'inherit',
            }}
          >
            <StyledTreeItem
              nodeId="10"
              labelText="Hồ sơ đã lưu"
              labelIcon={BookmarkAddedOutlinedIcon}
            />
          </NavLink>
          <NavLink
            to="/nha-tuyen-dung/danh-sach-ung-vien"
            style={{
              textDecoration: 'none',
              display: 'block',
              backgroundColor:
                location.pathname === '/nha-tuyen-dung/danh-sach-ung-vien'
                  ? 'rgba(68, 29, 160, 0.08)'
                  : 'inherit',
            }}
          >
            <StyledTreeItem
              nodeId="11"
              labelText="Tìm ứng viên mới"
              labelIcon={ContentPasteSearchOutlinedIcon}
            />
          </NavLink>
        </StyledTreeItem>
        <StyledTreeItem nodeId="4" labelText="Quản lý tài khoản">
          <NavLink
            to="/nha-tuyen-dung/cong-ty"
            style={{
              textDecoration: 'none',
              display: 'block',
              backgroundColor:
                location.pathname === '/nha-tuyen-dung/cong-ty'
                  ? 'rgba(68, 29, 160, 0.08)'
                  : 'inherit',
            }}
          >
            <StyledTreeItem
              nodeId="12"
              labelText="Thông tin công ty"
              labelIcon={BusinessOutlinedIcon}
            />
          </NavLink>
          <NavLink
            to="/nha-tuyen-dung/tai-khoan"
            style={{
              textDecoration: 'none',
              display: 'block',
              backgroundColor:
                location.pathname === '/nha-tuyen-dung/tai-khoan'
                  ? 'rgba(68, 29, 160, 0.08)'
                  : 'inherit',
            }}
          >
            <StyledTreeItem
              nodeId="13"
              labelText="Tài khoản"
              labelIcon={AccountCircleOutlinedIcon}
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
        },
      }}
    >
      {drawer(location, theme)}
    </Drawer>
  );
};

Sidebar.MobileSidebar = MobileSidebar;

export default Sidebar;
