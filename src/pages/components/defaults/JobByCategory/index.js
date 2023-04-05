import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Stack, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { searchJobPost } from '../../../../redux/filterSlice';

const maxItem = 6;

const JobByCategory = () => {
  const { allConfig } = useSelector((state) => state.config);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { jobPostFilter } = useSelector((state) => state.filter);

  const careerOptions = allConfig?.careerOptions || [];
  const cityOptions = allConfig?.cityOptions || [];
  const jobTypeOptions = allConfig?.jobTypeOptions || [];

  const handleFilter = (id, type) => {
    switch (type) {
      case 'CARRER':
        dispatch(searchJobPost({ ...jobPostFilter, careerId: id }));
        break;
      case 'CITY':
        dispatch(searchJobPost({ ...jobPostFilter, cityId: id }));
        break;
      case 'JOB_TYPE':
        dispatch(searchJobPost({ ...jobPostFilter, jobTypeId: id }));
        break;
      default:
        break;
    }
    nav('/viec-lam');
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <Stack spacing={2}>
          <Typography variant="h6">Việc làm theo nghề nghiệp</Typography>
          <Stack>
            {careerOptions?.slice(0, maxItem).map((item) => (
              <Typography
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#fca34d',
                    fontWeight: 'bold',
                  },
                }}
                key={item.id}
                gutterBottom
                onClick={() => handleFilter(item.id, "CARRER")}
              >
                <span> {item.name}</span>
              </Typography>
            ))}
            {careerOptions.length > maxItem && (
              <Typography
                variant="caption"
                color="#441da0"
                sx={{ mt: 1, fontWeight: 'bold', textDecoration: 'none' }}
                component={Link}
                to="/viec-lam-theo-nganh-nghe"
              >
                Xem tất cả nghề nghiệp <FontAwesomeIcon icon={faChevronRight} />
              </Typography>
            )}
          </Stack>
        </Stack>
      </Grid>

      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <Stack spacing={2}>
          <Typography variant="h6">Việc làm theo theo khu vực</Typography>
          <Stack>
            {cityOptions?.slice(0, maxItem).map((item) => (
              <Typography
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#fca34d',
                    fontWeight: 'bold',
                  },
                }}
                key={item.id}
                gutterBottom
                onClick={() => handleFilter(item.id, "CITY")}
              >
                {item.name}
              </Typography>
            ))}
            {cityOptions.length > maxItem && (
              <Typography
                variant="caption"
                color="#441da0"
                sx={{ mt: 1, fontWeight: 'bold', textDecoration: 'none' }}
                component={Link}
                to="/viec-lam-theo-tinh-thanh"
              >
                Xem tất cả khu vực <FontAwesomeIcon icon={faChevronRight} />
              </Typography>
            )}
          </Stack>
        </Stack>
      </Grid>

      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <Stack spacing={2}>
          <Typography variant="h6">Việc làm theo hình thức làm việc</Typography>
          <Stack>
            {jobTypeOptions?.slice(0, maxItem).map((item) => (
              <Typography
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#fca34d',
                    fontWeight: 'bold',
                  },
                }}
                key={item.id}
                gutterBottom
                onClick={() => handleFilter(item.id, "JOB_TYPE")}
              >
                {item.name}
              </Typography>
            ))}
            {jobTypeOptions.length > maxItem && (
              <Typography
                variant="caption"
                color="#441da0"
                sx={{ mt: 1, fontWeight: 'bold', textDecoration: 'none' }}
                component={Link}
                to="/viec-lam-theo-hinh-thuc-lam-viec"
              >
                Xem tất cả hình thức làm việc{' '}
                <FontAwesomeIcon icon={faChevronRight} />
              </Typography>
            )}
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default JobByCategory;
