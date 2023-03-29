import React from 'react';

import { Box, Grid, Typography } from '@mui/material';

import JobPostSearch from '../../components/defaults/JobPostSearch';
import JobPosts from '../../../components/JobPosts';
import { ProductService } from '../../../layouts/Demo/ProductService';
import SuggestedJobPostCard from '../../components/defaults/SuggestedJobPostCard';

const JobPage = () => {
  const [dataViewValue, setDataViewValue] = React.useState([]);

  React.useEffect(() => {
    ProductService.getProducts().then((data) => setDataViewValue(data));
  }, []);

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Box>
          <JobPostSearch />
        </Box>
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
              <Box sx={{ py: 2 }}>
                <Typography variant="h5">
                  Kết quả tìm kiếm (2043 tin đăng)
                </Typography>
              </Box>
              <JobPosts jobPostList={dataViewValue} />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
              <Box sx={{ py: 2 }}>
                <Typography variant="h5">Việc làm đề xuất</Typography>
              </Box>
              <SuggestedJobPostCard title="" icon="" />
            </Grid>
          </Grid>
        </Box>
        <Box>Việc làm theo khu vực ngành nghề</Box>
      </Box>
    </>
  );
};

export default JobPage;
