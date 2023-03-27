import * as React from 'react';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box  } from '@mui/material';

import Header from '../components/employers/Header';
import Sidebar from '../components/employers/Sidebar';
import Footer from '../components/employers/Footer';

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
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {/* <Toolbar /> */}
        <Box sx={{ p: 3, mt: 7 }}>
          <Outlet />
        </Box>

        {/* Start: Footer */}
        <Box>
          <Footer />
        </Box>
        {/* End: Footer */}
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
