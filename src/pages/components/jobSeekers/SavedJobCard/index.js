/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Stack, Button, Pagination } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { ImageSvg5, ROUTES } from '../../../../configs/constants';
import NoDataCard from '../../../../components/NoDataCard';
import JobPostAction from '../../../../components/JobPostAction';
import jobService from '../../../../services/jobService';
import errorHandling from '../../../../utils/errorHandling';
import toastMessages from '../../../../utils/toastMessages';

const pageSize = 10;

const SavedJobCard = () => {
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
            {Array.from(Array(5).keys()).map((value) => (
              <JobPostAction.Loading key={value} />
            ))}
          </Stack>
        ) : jobPosts.length === 0 ? (
          <NoDataCard title="Bạn chưa lưu công việc nào" imgComponentSgv={<ImageSvg5 />}>
            <Button
              component={Link}
              to={`/${ROUTES.JOB_SEEKER.JOBS}`}
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
                  startIcon={<FavoriteIcon />}
                  onClick={() => handleSave(value.slug)}
                >
                  Hủy lưu
                </Button>
              </JobPostAction>
            ))}
            <Stack sx={{ pt: 2 }} alignItems="center">
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
          </Stack>
        )}
      </Box>
    </>
  );
};

export default SavedJobCard;
