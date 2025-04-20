/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from "react";
import { Card, Typography } from "@mui/material";

import { TabTitle } from "../../../utils/generalFunction";
import NotificationCard from "../../components/defaults/NotificationCard";
import { APP_NAME } from "../../../configs/constants";

const NotificationPage = () => {
  TabTitle(`${APP_NAME} thông báo`);

  return (
    <Card sx={{ p: { xs: 2, sm: 2, md: 2, lg: 3, xl: 3 } }}>
      {/* Start: NotificationCard */}
      <NotificationCard
        title={
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              background: "primary.gradient",
              WebkitBackgroundClip: "text",
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
            }}
          >
            {`${APP_NAME} thông báo`}
          </Typography>
        }
      />

      {/* End: NotificationCard  */}
    </Card>
  );
};

export default NotificationPage;
