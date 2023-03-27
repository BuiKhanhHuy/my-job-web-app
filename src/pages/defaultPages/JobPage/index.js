import React from 'react';

import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import JobPostSearch from '../../components/defaults/JobPostSearch';
import JobPosts from '../../../components/JobPosts';
import { ProductService } from '../../../layouts/Demo/ProductService';

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
              <Box>Kết quả tìm kiếm (2043 tin đăng)</Box>
              <JobPosts jobPostList={dataViewValue} />
              <Card sx={{ mt: 6, px: 2 }} variant="outlined">
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Avatar
                      src="https://img.icons8.com/clouds/100/null/mailbox-medal.png"
                      sx={{ width: 100, height: 100 }}
                    />
                  </Box>
                  <Box flex={1}>
                    <Typography variant="h5" sx={{ fontSize: 18 }}>
                      Nhận thông báo việc làm qua mail
                    </Typography>
                    <Typography>Nhận thông báo khi có việc làm mới</Typography>
                  </Box>
                  <Box>
                    <Button variant="contained" color="secondary">
                      Nhận thông báo
                    </Button>
                  </Box>
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
              <Box>Việc làm đề xuất</Box>
              <JobPosts jobPostList={dataViewValue} />
            </Grid>
          </Grid>
        </Box>
        <Box>Việc làm theo khu vực ngành nghề</Box>
      </Box>
    </>
  );
};

export default JobPage;
