import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  Avatar,
  Box,
  Card,
  Chip,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import RoomIcon from '@mui/icons-material/Room';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { salaryString } from '../../utils/customData';

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
        },
      }}
      onClick={() => nav(`/viec-lam/${slug}`)}
    >
      <Stack direction="row" spacing={1}>
        <Box>
          <Avatar
            sx={{
              width: 60,
              height: 60,
              border: 0.5,
              borderColor: '#e0e0e0',
              borderRadius: 1.5,
              p: 0.5,
            }}
            src={companyImageUrl}
            alt="H"
          />
        </Box>
        <Box flex={1}>
          <Box>
            <Typography
              variant="subtitle2"
              sx={{ fontSize: 15 }}
              gutterBottom
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
        sx={{ mt: 0.75 }}
        justifyContent="space-between"
      >
        <Box>
          <Chip
            sx={{ mr: 0.75, fontSize: 12, cursor: 'pointer' }}
            size="small"
            icon={<MonetizationOnIcon />}
            label={salaryString(salaryMin, salaryMax)}
          />
          <Chip
            sx={{ mr: 0.75, fontSize: 12, cursor: 'pointer' }}
            size="small"
            icon={<RoomIcon />}
            label={allConfig?.cityDict[cityId] || 'Chưa cập nhật'}
          />
          <Chip
            sx={{ fontSize: 12, cursor: 'pointer' }}
            size="small"
            icon={<CalendarMonthIcon />}
            label={dayjs(deadline).format('DD/MM/YYYY')}
          />
        </Box>
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
