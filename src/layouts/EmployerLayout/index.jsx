/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import * as React from 'react';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

import Header from '../components/employers/Header';
import Sidebar from '../components/employers/Sidebar';

const drawerWidth = 240;

function EmployerLayout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Start: Header */}
      <Header
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      {/* End: Header */}
      <Box
        component="nav"
        sx={{ width: { xl: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* Start: Sidebar */}
        <Sidebar drawerWidth={drawerWidth} />
        <Sidebar.MobileSidebar
          drawerWidth={drawerWidth}
          container={container}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        {/* End: Sidebar */}
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            xs: '100%',
            sm: '100%',
            md: '100%',
            lg: '100%',
            xl: `calc(100% - ${drawerWidth}px)`,
          },
        }}
      >
        {/* <Toolbar /> */}
        <Box
          sx={{
            p: {
              xs: 1,
              sm: 3,
              md: 3,
              lg: 3,
              xl: 3,
            },
            mt: 7,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

EmployerLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default EmployerLayout;
