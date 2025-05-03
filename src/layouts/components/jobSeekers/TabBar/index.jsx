/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import WorkIcon from "@mui/icons-material/Work";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import { ROUTES, APP_NAME } from "../../../../configs/constants";

const tabItems = [
  { id: 1, label: `My ${APP_NAME}`, icon: <DashboardIcon />, path: `/${ROUTES.JOB_SEEKER.DASHBOARD}` },
  {
    id: 2,
    label: "Hồ sơ xin việc",
    icon: <AssignmentIndIcon />,
    path: `/${ROUTES.JOB_SEEKER.DASHBOARD}/${ROUTES.JOB_SEEKER.PROFILE}`,
  },
  {
    id: 3,
    label: "Việc làm của tôi",
    icon: <WorkIcon />,
    path: `/${ROUTES.JOB_SEEKER.DASHBOARD}/${ROUTES.JOB_SEEKER.MY_JOB}`,
  },
  {
    id: 4,
    label: "Công ty của tôi",
    icon: <ApartmentIcon />,
    path: `/${ROUTES.JOB_SEEKER.DASHBOARD}/${ROUTES.JOB_SEEKER.MY_COMPANY}`,
  },
  {
    id: 5,
    label: `${APP_NAME} thông báo`,
    icon: <CircleNotificationsIcon />,
    path: `/${ROUTES.JOB_SEEKER.DASHBOARD}/${ROUTES.JOB_SEEKER.NOTIFICATION}`,
  },
  {
    id: 6,
    label: "Tài khoản & cài đặt",
    icon: <ManageAccountsOutlinedIcon />,
    path: `/${ROUTES.JOB_SEEKER.DASHBOARD}/${ROUTES.JOB_SEEKER.ACCOUNT}`,
  },
];

const TabBar = () => {
  const location = useLocation();
  const activeTabIndex = tabItems.findLastIndex((tab) =>
    location.pathname.includes(tab.path)
  );
  const nav = useNavigate();
  const [value, setValue] = React.useState(activeTabIndex);

  React.useEffect(() => {
    setValue(activeTabIndex);
  }, [activeTabIndex]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ 
      width: "100%",
      px: 5,
      pt: 2,
      backgroundColor: (theme) => theme.palette.grey[50]
    }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="nav tabs job seeker"
        sx={{
          minHeight: '60px',
          '& .MuiTabs-scroller': {
            height: '100%'
          },
          '& .MuiTabScrollButton-root': {
            width: 48,
            height: '100%',
          }
        }}
      >
        {tabItems.map((tab) => (
          <Tab
            onClick={() => nav(tab.path)}
            key={tab.id}
            icon={tab.icon}
            iconPosition="start"
            label={tab.label}
            sx={{
              mx: 0.5,
              transition: 'all 0.2s ease-in-out',
              '&:first-of-type': {
                ml: 0
              },
              '&:last-of-type': {
                mr: 0
              }
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default TabBar;
