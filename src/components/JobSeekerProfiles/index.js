import React from 'react';
import { Box, Grid, Pagination, Stack } from '@mui/material';

import JobSeekerProfile from '../JobSeekerProfile';

const JobSeekerProfiles = () => {
  return (
    <Box>
      <Stack spacing={4}>
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5, 6, 7, 7, 1, 24].map((value) => (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <JobSeekerProfile />
            </Grid>
          ))}
        </Grid>
        <Stack>
          <Pagination
            count={10}
            color="primary"
            size="medium"
            variant="outlined"
            sx={{ margin: '0 auto' }}
            page={1}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default JobSeekerProfiles;
