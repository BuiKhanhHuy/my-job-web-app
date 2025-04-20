/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from "react";
import { Box, Card, Divider, Typography } from "@mui/material";

import { TabTitle } from "../../../utils/generalFunction";
import ProfileCard from "../../components/employers/ProfileCard";

const ProfilePage = () => {
  TabTitle("Tìm kiếm ứng viên");

  return (
    <Card sx={{ p: 3, pt: 4 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          background: "primary.gradient",
          WebkitBackgroundClip: "text",
          fontSize: { xs: "1.25rem", sm: "1.5rem" },
        }}
      >
        Tìm kiếm ứng viên
      </Typography>

      <Divider sx={{ mt: 2, mb: 3 }} />
      <Box>
        {/* Start: Profile card */}
        <ProfileCard />
        {/* End: Profile card */}
      </Box>
    </Card>
  );
};

export default ProfilePage;
