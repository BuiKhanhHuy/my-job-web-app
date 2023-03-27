import React from 'react';
import { Box, Card, Divider, Grid, Stack, Typography } from '@mui/material';

import AdvanceProfileSearchForm from '../AdvanceProfileSearchForm';
import BasicProfileSearchForm from '../BasicProfileSearchForm';
import JobSeekerProfiles from '../../../../components/JobSeekerProfiles';

const ProfileCard = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        {/* Start: Basis profile search */}
        <BasicProfileSearchForm />
        {/* End: Basis profile search */}
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
        <Card sx={{ boxShadow: 0 }}>
          {/* Start: Advance profile search */}
          <AdvanceProfileSearchForm />
          {/* End: Advance profile search */}
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={9} xl={9} >
        <Card sx={{ boxShadow: 0 }}>
          <Stack>
            <Box>
              <Typography
                variant="body1"
                sx={{ fontSize: 18, fontWeight: 'bold' }}
              >
                Kết quả tìm thấy:{' '}
                <span style={{ color: 'red' }}>732 hồ sơ</span>
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              {/* Start: Job seeker profiles */}
              <JobSeekerProfiles />
              {/* End: Job seeker profiles */}
            </Box>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfileCard;
