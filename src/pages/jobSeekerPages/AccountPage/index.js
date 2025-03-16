import React from 'react';
import { Card, Grid } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import AccountCard from '../../components/auths/AccountCard';
import PersonalInfoCard from '../../components/jobSeekers/PersonalInfoCard';
import SettingCard from '../../components/settings/SettingCard';

const AccountPage = () => {
  TabTitle('Quản lý tài khoản Người tìm việc');

  return (
    <Grid spacing={3} container>
      <Grid item xs={12} sm={12} md={5} lg={6} xl={6}>
        <Card>
          {/* Start: Account card */}
          <AccountCard title="Thông tin tài khoản" />
          {/* End: Account card */}
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={7} lg={6} xl={6}>
        <Card>
          {/* Start: Personal info */}
          <PersonalInfoCard title="Thông tin cá nhân" />
          {/* End: Personal info  */}
        </Card>

        <Card sx={{ marginTop: 3 }}>
          {/* Start: SettingCard info */}
          <SettingCard title="Cài đặt" />
          {/* End: SettingCard info  */}
        </Card>
      </Grid>
    </Grid>
  );
};

export default AccountPage;
