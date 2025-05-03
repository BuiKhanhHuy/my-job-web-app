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
import {
  Box,
  Stack,
  Button,
  Pagination,
  Chip,
  Typography,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

import { CV_TYPES, SVG_IMAGES, ROUTES } from '../../../../configs/constants';
import NoDataCard from '../../../../components/NoDataCard';
import JobPostAction from '../../../../components/JobPostAction';
import errorHandling from '../../../../utils/errorHandling';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import jobPostActivityService from '../../../../services/jobPostActivityService';
import dayjs from 'dayjs';

const pageSize = 10;

const AppliedJobCard = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [jobPostsApplied, setJobPostsApplied] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const getJobPosts = async (params) => {
      setIsLoading(true);
      try {
        const resData = await jobPostActivityService.getJobPostActivity({
          pageSize: pageSize,
          page: page,
        });
        const data = resData.data;

        setCount(data.count);
        setJobPostsApplied(data.results);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoading(false);
      }
    };

    getJobPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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
        ) : jobPostsApplied.length === 0 ? (
          <NoDataCard
            title="Bạn chưa ứng tuyển công việc nào"
            imgComponentSgv={<SVG_IMAGES.ImageSvg5 />}
          >
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
            {jobPostsApplied.map((value) => (
              <JobPostAction
                key={value.id}
                id={value?.jobPostDict.id}
                slug={value?.jobPostDict.slug}
                companyImageUrl={
                  value?.jobPostDict?.companyDict?.companyImageUrl
                }
                companyName={value?.jobPostDict?.companyDict?.companyName}
                jobName={value?.jobPostDict?.jobName}
                cityId={value?.jobPostDict?.locationDict?.city}
                deadline={value?.jobPostDict?.deadline}
                isUrgent={value?.jobPostDict?.isUrgent}
                isHot={value?.jobPostDict?.isHot}
                salaryMin={value?.jobPostDict.salaryMin}
                salaryMax={value?.jobPostDict.salaryMax}
              >
                <Stack spacing={1}>
                  <Chip
                    label={`Ứng tuyển ngày: ${dayjs(value?.createAt).format(
                      'DD/MM/YYYY'
                    )}`}
                    size="small"
                    color="success"
                    icon={<DoneIcon />}
                  />
                  <Typography variant="subtitle2" color="GrayText">
                    {value?.resumeDict?.type === CV_TYPES.cvWebsite ? (
                      <>
                        <FontAwesomeIcon
                          icon={faFile}
                          style={{ marginRight: 1 }}
                          color="#441da0"
                        />{' '}
                        Hồ sơ trực tuyến
                      </>
                    ) : value?.resumeDict?.type === CV_TYPES.cvUpload ? (
                      <>
                        <FontAwesomeIcon
                          icon={faFilePdf}
                          style={{ marginRight: 1 }}
                          color="red"
                        />{' '}
                        Hồ sơ đính kèm
                      </>
                    ) : (
                      ''
                    )}
                  </Typography>
                </Stack>
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

export default AppliedJobCard;
