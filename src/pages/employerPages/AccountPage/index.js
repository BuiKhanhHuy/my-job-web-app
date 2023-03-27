import React from 'react';
import { Card, Grid, Stack } from '@mui/material';

import AccountCard from '../../components/auths/AccountCard';

const AccountPage = () => {
  return (
    <Stack spacing={3}>
      <Card sx={{ p: 2 }}>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={5} xl={5}>
            {/* Start: Account card */}
            <AccountCard title="Thông tin tài khoản" />
            {/* End: Account card */}
          </Grid>
        </Grid>
      </Card>
    </Stack>
  );
};

export default AccountPage;
