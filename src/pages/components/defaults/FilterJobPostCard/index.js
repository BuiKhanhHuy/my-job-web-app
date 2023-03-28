import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';

import jobService from '../../../../services/jobService';
import JobPost from '../../../../components/JobPost';
import NoDataCard from '../../../../components/NoDataCard';

const pageSize = 12;

const FilterJobPostCard = ({ title, titleIcon, params = {} }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [jobPosts, setJobPosts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const getJobPosts = async (params) => {
      setIsLoading(true);
      try {
        const resData = await jobService.getJobPosts({
          ...params,
          pageSize: pageSize,
          page: page,
        });
        const data = resData.data;

        setCount(data.count);
        setJobPosts(data.results);
        console.log(title, ': ');
        console.log(data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    getJobPosts(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'white' }} aria-label="recipe">
            {titleIcon}
          </Avatar>
        }
        title={
          <Typography variant="h5" sx={{ color: 'white' }}>
            {title}
          </Typography>
        }
        sx={{ backgroundColor: '#441da0' }}
      />
      <CardContent>
        <Box sx={{ p: 2 }}>
          <Stack spacing={4}>
            {isLoading ? (
              <Grid container spacing={2}>
                {Array.from(Array(pageSize).keys()).map((item) => (
                  <Grid key={item} item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <JobPost.Loading></JobPost.Loading>
                  </Grid>
                ))}
              </Grid>
            ) : jobPosts.length === 0 ? (
              <NoDataCard />
            ) : (
              <>
                <Grid container spacing={2}>
                  {jobPosts.map((value) => (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={4}
                      lg={4}
                      xl={4}
                      key={value.id}
                    >
                      {/* Start: Job post */}
                      <JobPost />
                      {/* End: Job post */}
                    </Grid>
                  ))}
                </Grid>
                <Stack>
                  {count > 0 && (
                    <Pagination
                      color="primary"
                      size="medium"
                      variant="outlined"
                      sx={{ margin: '0 auto' }}
                      count={Math.ceil(count / pageSize)}
                      page={page}
                      onChange={handleChangePage}
                    />
                  )}
                </Stack>
              </>
            )}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FilterJobPostCard;
