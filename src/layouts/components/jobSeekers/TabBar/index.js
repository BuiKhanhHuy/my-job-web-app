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
import { ROUTES } from "../../../../configs/constants";

const tabItems = [
  { id: 1, label: "My MyJob", icon: <DashboardIcon />, path: `/${ROUTES.JOB_SEEKER.DASHBOARD}` },
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
    label: "MyJob thông báo",
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
    <Box sx={{ width: "100%" }}>
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
            onClick={() => nav(tab.path)}
            classes={{ selected: true }}
            key={tab.id}
            icon={tab.icon}
            iconPosition="start"
            label={tab.label}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default TabBar;
