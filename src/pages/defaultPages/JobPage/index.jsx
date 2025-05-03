/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from "react";
import { Box, Grid, Typography } from "@mui/material";

import { TabTitle } from "../../../utils/generalFunction";
import JobPostSearch from "../../components/defaults/JobPostSearch";
import SuggestedJobPostCard from "../../components/defaults/SuggestedJobPostCard";
import MainJobPostCard from "../../components/defaults/MainJobPostCard";
import AppIntroductionCard from "../../../components/AppIntroductionCard";
import MainJobRightBanner from "../../../components/MainJobRightBanner";

const JobPage = () => {
  TabTitle("Kết quả tìm kiếm tin tuyển dụng");

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
              <Box
                sx={{
                  mt: 2,
                  display: { xs: "none", sm: "none", md: "none", lg: "block" },
                }}
              >
                {/* Start: MainJobRightBanner */}
                <MainJobRightBanner />
                {/* End: MainJobRightBanner */}
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
