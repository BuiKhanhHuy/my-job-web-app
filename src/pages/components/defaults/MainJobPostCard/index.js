import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Pagination, Stack, Typography } from '@mui/material';

import { IMAGE_SVG } from '../../../../configs/constants';
import JobPostLarge from '../../../../components/JobPostLarge';
import NoDataCard from '../../../../components/NoDataCard';
import jobService from '../../../../services/jobService';

const MainJobPostCard = () => {
  const { jobPostFilter } = useSelector((state) => state.filter);
  const { pageSize } = jobPostFilter;
  const [isLoading, setIsLoading] = React.useState(true);
  const [jobPosts, setJobPosts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const getJobPosts = async () => {
      setIsLoading(true);
      try {
        const resData = await jobService.getJobPosts({
          ...jobPostFilter,
          page: page,
        });

        const data = resData.data;

        setCount(data.count);
        setJobPosts(data?.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getJobPosts();
  }, [jobPostFilter, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Box sx={{ pt: 2, pb: 3 }}>
        <Typography variant="h5">
          Kết quả tìm kiếm (<span style={{ color: 'red' }}>{count}</span> tin
          đăng)
        </Typography>
      </Box>
      <Stack spacing={2}>
        {isLoading ? (
          Array.from(Array(10).keys()).map((value) => (
            <Box key={value}>
              <JobPostLarge.Loading />
            </Box>
          ))
        ) : jobPosts.length === 0 ? (
          <NoDataCard
            title="Hiện chưa tìm thấy việc làm phù hợp với tiêu chí của bạn"
            img={IMAGE_SVG.img3}
          />
        ) : (
          <>
            {jobPosts.map((value) => (
              <JobPostLarge
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
            ))}
            <Stack sx={{ pt: 2 }}>
              {Math.ceil(count / pageSize) > 1 && (
                <Pagination
                  color="primary"
                  size="medium"
                  variant="text"
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
    </>
  );
};

export default MainJobPostCard;
