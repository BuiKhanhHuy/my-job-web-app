import React from 'react';
import { Card, Grid, Stack } from '@mui/material';
import SettingCard from '../../components/settings/SettingCard';

const SettingPage = () => {
  return (
    <Stack spacing={3}>
      <Card sx={{ p: 2 }}>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={5} xl={5}>
            {/* Start: Setting card */}
            <SettingCard title="Cài đặt" />
            {/* End: Setting card */}
          </Grid>
        </Grid>
      </Card>
    </Stack>
  );
};

export default SettingPage;
