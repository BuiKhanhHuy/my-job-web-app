import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Box, Card, Skeleton, Stack, Typography } from '@mui/material';

import { salaryString } from '../../utils/customData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faCircleDollarToSlot,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import MuiImageCustom from '../MuiImageCustom';

const JobPost = ({
  id,
  slug,
  companyImageUrl,
  companyName,
  jobName,
  cityId,
  deadline,
  isUrgent,
  isHot,
  salaryMin,
  salaryMax,
}) => {
  const nav = useNavigate();
  const { allConfig } = useSelector((state) => state.config);

  return (
    <Card
      variant="outlined"
      sx={{
        cursor: 'pointer',
        p: 1,
        '&:hover': {
          borderColor: '#441da0',
          boxShadow: 5,
        },
      }}
      onClick={() => nav(`/viec-lam/${slug}`)}
    >
      <Stack direction="row" spacing={1}>
        <Stack direction="row" justifyContent="center">
          <MuiImageCustom
            width={60}
            height={60}
            src={companyImageUrl}
            sx={{
              border: 0.5,
              borderRadius: 1.5,
              borderColor: '#e0e0e0',
              p: 0.5,
            }}
          />
        </Stack>
        <Box flex={1}>
          <Box>
            <Typography
              variant="subtitle2"
              sx={{ fontSize: 15 }}
              gutterBottom
              noWrap
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {jobName}
            </Typography>
          </Box>

          <Typography
            variant="subtitle2"
            color="gray"
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {companyName}
          </Typography>
        </Box>
        <Box>
          {isHot && (
            <span
              style={{
                padding: 0,
                fontSize: 12,
                fontWeight: 'bold',
                color: 'red',
              }}
            >
              HOT
            </span>
          )}
          {isHot && isUrgent && <span style={{ color: '#bdbdbd' }}> | </span>}
          {isUrgent && (
            <span
              style={{
                padding: 0,
                fontSize: 12,
                fontWeight: 'bold',
                color: 'orange',
              }}
            >
              Tuyển gấp
            </span>
          )}
        </Box>
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        sx={{ mt: 1 }}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={1.5}>
          <Typography sx={{ fontWeight: 'bold' }} variant="body2">
            <FontAwesomeIcon icon={faCircleDollarToSlot} color="#bdbdbd" />{' '}
            {salaryString(salaryMin, salaryMax)}
          </Typography>
          <Typography sx={{ fontWeight: 'bold' }} variant="body2">
            <FontAwesomeIcon icon={faLocationDot} color="#bdbdbd" />{' '}
            {allConfig?.cityDict[cityId] || 'Chưa cập nhật'}
          </Typography>
          <Typography sx={{ fontWeight: 'bold' }} variant="body2">
            <FontAwesomeIcon icon={faCalendarDays} color="#bdbdbd" />{' '}
            {dayjs(deadline).format('DD/MM/YYYY')}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

const Loading = () => (
  <>
    <Card sx={{ p: 1, boxShadow: 0 }}>
      <Stack direction="row" spacing={1}>
        <Box>
          <Skeleton variant="rounded" width={60} height={60} />
        </Box>
        <Box flex={1}>
          <Typography variant="subtitle2" sx={{ fontSize: 15 }} gutterBottom>
            <Skeleton height={30} />
          </Typography>
          <Typography variant="subtitle2" color="gray">
            <Skeleton />
          </Typography>
        </Box>
        <Box>
          <Skeleton height={30} width={60} />
        </Box>
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        sx={{ mt: 0.75 }}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Skeleton width={80} />
          <Skeleton width={80} />
          <Skeleton width={80} />
        </Stack>
      </Stack>
    </Card>
  </>
);

JobPost.Loading = Loading;

export default JobPost;
