/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from 'react';
import { Box, Stack, Pagination, Chip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import { ImageSvg6 } from '../../../../configs/constants';
import NoDataCard from '../../../../components/NoDataCard';
import CompanyAction from '../../../../components/CompanyAction';
import resumeViewedService from '../../../../services/resumeViewedService';

const pageSize = 10;

const CompanyViewedCard = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [resumesViewed, setResumesViewed] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const getResumeViewed = async (params) => {
      setIsLoading(true);
      try {
        const resData = await resumeViewedService.getResumeViewed(params);
        const data = resData.data;

        setCount(data.count);
        setResumesViewed(data.results);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    getResumeViewed({
      pageSize: pageSize,
      page: page,
    });
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
              <CompanyAction.Loading key={value} />
            ))}
          </Stack>
        ) : resumesViewed.length === 0 ? (
          <NoDataCard
            title="Chưa có nhà tuyển dụng nào xem hồ sơ của bạn"
            imgComponentSgv={<ImageSvg6 />}
          ></NoDataCard>
        ) : (
          <Stack spacing={2}>
            {resumesViewed.map((value) => (
              <CompanyAction
                key={value.id}
                id={value.id}
                views={value.views}
                createAt={value.createAt}
                resume={value.resume}
                company={value.company}
              >
                {value.isSavedResume && (
                  <Chip
                    icon={<CheckIcon />}
                    label="Đã lưu hồ sơ của bạn"
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(47, 161, 51, 0.15)',
                      color: 'rgb(47, 161, 50)',
                    }}
                  />
                )}
              </CompanyAction>
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

export default React.memo(CompanyViewedCard);
