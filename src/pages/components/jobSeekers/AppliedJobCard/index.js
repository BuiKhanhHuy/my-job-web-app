import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Stack, Button, Pagination } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SendIcon from '@mui/icons-material/Send';

import { IMAGE_SVG } from '../../../../configs/constants';
import NoDataCard from '../../../../components/NoDataCard';
import JobPostAction from '../../../../components/JobPostAction';
import jobService from '../../../../services/jobService';
import errorHandling from '../../../../utils/errorHandling';
import toastMessages from '../../../../utils/toastMessages';

const pageSize = 10;

const AppliedJobCard = () => {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [jobPosts, setJobPosts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const getJobPosts = async (params) => {
      setIsLoading(true);
      try {
        const resData = await jobService.getJobPostsSaved({
          pageSize: pageSize,
          page: page,
        });
        const data = resData.data;

        setCount(data.count);
        setJobPosts(data.results);
        console.log(data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    getJobPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, isSuccess]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSave = (slug) => {
    const saveJobPost = async (slug) => {
      try {
        const resData = await jobService.saveJobPost(slug);
        const isSaved = resData.data.isSaved;

        toastMessages.success(
          isSaved ? 'Lưu thành công.' : 'Hủy lưu thành công.'
        );
        setIsSuccess(!isSuccess);
      } catch (error) {
        errorHandling(error);
      }
    };

    saveJobPost(slug);
  };

  return (
    <>
      <Box>
        {isLoading ? (
          <Stack spacing={2}>
            {Array.from(Array(3).keys()).map((value) => (
              <JobPostAction.Loading key={value} />
            ))}
          </Stack>
        ) : jobPosts.length === 0 ? (
          <NoDataCard title="Bạn chưa lưu công việc nào" img={IMAGE_SVG.img5}>
            <Button
              component={Link}
              to="/viec-lam"
              variant="contained"
              color="primary"
              sx={{ textTransform: 'inherit' }}
            >
              Tìm việc làm
            </Button>
          </NoDataCard>
        ) : (
          <Stack spacing={2}>
            {jobPosts.map((value) => (
              <JobPostAction
                key={value.id}
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
              >
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  sx={{ textTransform: 'inherit' }}
                  startIcon={<BookmarkIcon />}
                  onClick={() => handleSave(value.slug)}
                >
                  Hủy lưu
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="warning"
                  sx={{ textTransform: 'inherit', color: 'white' }}
                  startIcon={<SendIcon />}
                >
                  Ứng tuyển
                </Button>
              </JobPostAction>
            ))}
            <Stack sx={{ pt: 2 }} alignItems="center">
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
          </Stack>
        )}
      </Box>
    </>
  );
};

export default AppliedJobCard;
