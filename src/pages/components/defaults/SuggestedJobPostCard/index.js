import React from 'react';
import { Grid, Pagination, Stack } from '@mui/material';

import { IMAGE_SVG } from '../../../../configs/constants';
import NoDataCard from '../../../../components/NoDataCard';
import jobService from '../../../../services/jobService';
import JobPost from '../../../../components/JobPost';

const SuggestedJobPostCard = ({ pageSize = 12 }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [jobPosts, setJobPosts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const getJobPosts = async () => {
      setIsLoading(true);
      try {
        const resData = await jobService.getSuggestedJobPosts({
          pageSize: pageSize,
          page: page,
        });
        const data = resData.data;

        setCount(data.count);
        setJobPosts(data.results);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    getJobPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
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
        <NoDataCard img={IMAGE_SVG.img8} />
      ) : (
        <>
          <Grid container spacing={2}>
            {jobPosts.map((value) => (
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} key={value.id}>
                {/* Start: Job post */}
                <JobPost
                  id={value.id}
                  slug={value.slug}
                  companyImageUrl={value?.companyDict?.companyImageUrl}
                  companyName={value?.companyDict?.companyName}
                  jobName={value?.jobName}
                  cityId={value?.locationDict?.city}
                  deadline={value?.deadline}
                  isUrgent={value?.isUrgent}
                  isHot={value?.isHot}
                  salaryMin={value.salaryMin}
                  salaryMax={value.salaryMax}
                />
                {/* End: Job post */}
              </Grid>
            ))}
          </Grid>
          <Stack>
            {Math.ceil(count / pageSize) > 1 && (
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
  );
};

export default SuggestedJobPostCard;
