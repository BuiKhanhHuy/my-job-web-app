import React from 'react';
import { Card, Grid } from '@mui/material';

import AccountCard from '../../components/auths/AccountCard';
import PersonalInfoCard from '../../components/jobSeekers/PersonalInfoCard';

const AccountPage = () => {
  return (
    <Grid spacing={3} container>
      <Grid item xs={12} sm={12} md={5} lg={6} xl={6}>
        <Card sx={{ p: 2 }}>
          {/* Start: Account card */}
          <AccountCard title="Thông tin tài khoản" />
          {/* End: Account card */}
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={7} lg={6} xl={6}>
        <Card sx={{ p: 2 }}>
          {/* Start: Personal info */}
          <PersonalInfoCard title="Thông tin cá nhân" />
          {/* End: Personal info  */}
        </Card>
      </Grid>
    </Grid>
  );
};

export default AccountPage;
