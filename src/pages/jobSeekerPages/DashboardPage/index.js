import React from 'react';

import { Box, Card, Grid, Stack, Typography } from '@mui/material';

import JobSeekerQuantityStatistics from '../../components/jobSeekers/JobSeekerQuantityStatistics';
import SidebarProfile from '../../components/jobSeekers/SidebarProfile';
import SidebarViewTotal from '../../components/jobSeekers/SidebarViewTotal';
import DemoChart from '../../../components/charts/DemoChart';
import SuggestedJobPostCard from '../../components/defaults/SuggestedJobPostCard';

const DashboardPage = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid xs={12} sm={12} md={5} lg={3} xl={3} item>
          <Stack spacing={2}>
            <Card sx={{ p: 2 }}>
              {/* Start: Sidebar profile */}
              <SidebarProfile />
              {/* End: Sidebar profile */}
            </Card>
            <Card sx={{ p: 2 }}>
              {/* Start: Sidebar view total */}
              <SidebarViewTotal />
              {/* End: Sidebar view total */}
            </Card>
            <Card sx={{ p: 2 }}>
              {/* Start: Chart */}
              <DemoChart />
              {/* End: Chart */}
            </Card>
          </Stack>
        </Grid>
        <Grid xs={12} sm={12} md={7} lg={9} xl={9} item>
          <Stack spacing={2}>
            <Box>
              {/* Start: JobSeekerQuantityStatistics */}
              <JobSeekerQuantityStatistics />
              {/* End: JobSeekerQuantityStatistics */}
            </Box>
            <Card sx={{ p: 2 }}>
              <Stack>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6">Hoạt động của bạn</Typography>
                </Box>
                <Box>
                  {/* Start:  */}
                  <DemoChart />
                  {/* End: */}
                </Box>
              </Stack>
            </Card>
            <Card sx={{ p: 2 }}>
              <Stack>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6">Việc làm gợi ý</Typography>
                </Box>
                <Box>
                  {/* Start: SuggestedJobPostCard */}
                  <SuggestedJobPostCard pageSize={10}/>
                  {/* End: SuggestedJobPostCard */}
                </Box>
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
