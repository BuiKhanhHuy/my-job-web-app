import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import WorkIcon from '@mui/icons-material/Work';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const tabItems = [
  { id: 1, label: 'My MyJob', icon: <DashboardIcon />, path: '/ung-vien' },
  {
    id: 2,
    label: 'Hồ sơ xin việc',
    icon: <AssignmentIndIcon />,
    path: '/ung-vien/ho-so',
  },
  {
    id: 3,
    label: 'Việc làm của tôi',
    icon: <WorkIcon />,
    path: '/ung-vien/viec-lam-cua-toi',
  },
  {
    id: 4,
    label: 'Công ty của tôi',
    icon: <ApartmentIcon />,
    path: '/ung-vien/cong-ty-cua-toi',
  },
  {
    id: 5,
    label: 'Tài khoản',
    icon: <AccountCircleIcon />,
    path: '/ung-vien/tai-khoan',
  },
];

const TabBar = () => {
  const location = useLocation();
  const activeTabIndex = tabItems.findLastIndex((tab) =>
    location.pathname.includes(tab.path)
  );
  const [value, setValue] = React.useState(activeTabIndex);

  React.useEffect(() => {
    setValue(activeTabIndex);
  }, [activeTabIndex]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="nav tabs job seeker"
      >
        {tabItems.map((tab) => (
          <Tab
            classes={{ selected: true }}
            key={tab.id}
            icon={tab.icon}
            iconPosition="start"
            label={tab.label}
            to={tab.path}
            component={NavLink}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default TabBar;
