import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import JobPostSearch from '../../components/defaults/JobPostSearch';
import SuggestedJobPostCard from '../../components/defaults/SuggestedJobPostCard';
import MainJobPostCard from '../../components/defaults/MainJobPostCard';

const JobPage = () => {
  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Box>
          {/* Start: JobPostSearch */}
          <JobPostSearch />
          {/* End: JobPostSearch */}
        </Box>
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
              {/* Start: MainJobPostCard */}
              <MainJobPostCard />
              {/* End: MainJobPostCard */}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
              <Box sx={{ pt: 2, pb: 3 }}>
                <Typography variant="h5">Việc làm đề xuất</Typography>
              </Box>
              {/* Start: SuggestedJobPostCard */}
              <SuggestedJobPostCard title="" icon="" />
              {/* End: SuggestedJobPostCard */}
            </Grid>
          </Grid>
        </Box>
        <Box>Việc làm theo khu vực ngành nghề</Box>
      </Box>
    </>
  );
};

export default JobPage;
