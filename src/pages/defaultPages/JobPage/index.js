import React from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import JobPostSearch from '../../components/defaults/JobPostSearch';
import SuggestedJobPostCard from '../../components/defaults/SuggestedJobPostCard';
import MainJobPostCard from '../../components/defaults/MainJobPostCard';
import AppIntroductionCard from '../../../components/AppIntroductionCard';
import MuiImageCustom from '../../../components/MuiImageCustom';

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
            <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
              {/* Start: MainJobPostCard */}
              <MainJobPostCard />
              {/* End: MainJobPostCard */}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
              <Box sx={{ pt: 2, pb: 3 }}>
                <Typography variant="h5">Việc làm đề xuất</Typography>
              </Box>
              {/* Start: SuggestedJobPostCard */}
              <SuggestedJobPostCard fullWidth={true} />
              {/* End: SuggestedJobPostCard */}
              <Box px={4} mt={1}>
                <MuiImageCustom
                  src={
                    'https://vieclam24h.vn/_next/image?url=%2Fimg%2Fads-banners%2Fentry-banner.png&w=384&q=75'
                  }
                />
              </Box>
              <Box
                mt={4}
                px={4}
                style={{
                  position: 'sticky',
                  top: 80,
                }}
              >
                <MuiImageCustom
                  src={
                    'https://vieclam24h.vn/_next/image?url=https%3A%2F%2Fcdn1.vieclam24h.vn%2Fimages%2Fseeker-banner%2F2023%2F04%2F27%2FWebsite-Banner_168250414419_168259071970.jpg&w=1920&q=75'
                  }
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 4 }}>
          {/* Start: AppIntroductionCard */}
          <AppIntroductionCard />
          {/* End: AppIntroductionCard */}
        </Box>
      </Box>
    </>
  );
};

export default JobPage;
