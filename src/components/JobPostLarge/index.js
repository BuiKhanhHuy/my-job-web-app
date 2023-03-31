import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Avatar, Box, Card, Skeleton, Stack, Typography } from '@mui/material';

import { salaryString } from '../../utils/customData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faCircleDollarToSlot,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';

const JobPostLarge = ({
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
        backgroundColor: '#fff5e7',
        cursor: 'pointer',
        p: 1,
        '&:hover': {
          boxShadow: 5
        },
      }}
      onClick={() => nav(`/viec-lam/${slug}`)}
    >
      <Stack direction="row" spacing={2}>
        <Box>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              border: 0.5,
              borderColor: '#e0e0e0',
              borderRadius: 1.5,
              p: 0.5,
            }}
            src={companyImageUrl}
            alt="H"
          />
        </Box>
        <Stack flex={1} justifyContent="center" spacing={0.8}>
          <Box>
            <Typography
              sx={{ fontSize: 19, fontWeight: 'bold' }}
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
            variant="body1"
            color="gray"
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {companyName}
          </Typography>

          <Stack direction="row" spacing={1.5}>
            <Typography sx={{ fontWeight: 'bold' }} variant="body1">
              <FontAwesomeIcon icon={faCircleDollarToSlot} color="#bdbdbd" />{' '}
              {salaryString(salaryMin, salaryMax)}
            </Typography>
            <Typography sx={{ fontWeight: 'bold' }} variant="body1">
              <FontAwesomeIcon icon={faLocationDot} color="#bdbdbd" />{' '}
              {allConfig?.cityDict[cityId] || 'Chưa cập nhật'}
            </Typography>
            <Typography sx={{ fontWeight: 'bold' }} variant="body1">
              <FontAwesomeIcon icon={faCalendarDays} color="#bdbdbd" />{' '}
              {dayjs(deadline).format('DD/MM/YYYY')}
            </Typography>
          </Stack>
        </Stack>
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
    </Card>
  );
};

const Loading = () => (
  <>
    <Card sx={{ p: 1, boxShadow: 0 }}>
      <Stack direction="row" spacing={2}>
        <Box>
          <Skeleton variant="rounded" width={100} height={100} />
        </Box>
        <Box flex={1} justifyContent="center" spacing={0.8}>
          <Typography variant="subtitle2">
            <Skeleton height={40} />
          </Typography>
          <Typography variant="subtitle2">
            <Skeleton height={30} />
          </Typography>
          <Typography variant="body1">
            <Skeleton height={25} />
          </Typography>
        </Box>
      </Stack>
    </Card>
  </>
);

JobPostLarge.Loading = Loading;

export default JobPostLarge;