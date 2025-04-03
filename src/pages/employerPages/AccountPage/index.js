import React from "react";
import { Card, Grid, Stack, Typography } from "@mui/material";

import { TabTitle } from "../../../utils/generalFunction";
import AccountCard from "../../components/auths/AccountCard";

const AccountPage = () => {
  TabTitle("Quản lý tài khoản Nhà tuyển dụng");

  return (
    <Stack spacing={3}>
      <Card sx={{ p: 0 }}>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={5} xl={5}>
            {/* Start: Account card */}
            <AccountCard
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
                  Thông tin tài khoản
                </Typography>
              }
              sx={{ boxShadow: 0 }}
            />
            {/* End: Account card */}
          </Grid>
        </Grid>
      </Card>
    </Stack>
  );
};

export default AccountPage;
