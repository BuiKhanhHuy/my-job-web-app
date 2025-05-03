/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from "react";
import { Card, Grid, Stack, Typography } from "@mui/material";
import SettingCard from "../../components/settings/SettingCard";

const SettingPage = () => {
  return (
    <Stack spacing={3}>
      <Card>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={5} xl={5}>
            {/* Start: Setting card */}
            <SettingCard
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
                  Cài đặt
                </Typography>
              }
              sx={{ boxShadow: 0 }}
            />
            {/* End: Setting card */}
          </Grid>
        </Grid>
      </Card>
    </Stack>
  );
};

export default SettingPage;
