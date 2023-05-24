import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Box, Card, Skeleton, Stack, Tooltip, Typography } from '@mui/material';

import { salaryString } from '../../utils/customData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faCircleDollarToSlot,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import MuiImageCustom from '../MuiImageCustom';

const JobPostAction = ({
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
  children,
}) => {
  const nav = useNavigate();
  const { allConfig } = useSelector((state) => state.config);
  const [parentWidth, setParentWidth] = React.useState(0);
  const [stackDirection, setStackDirection] = React.useState('column');

  React.useEffect(() => {
    const handleResize = () => {
      const newWidth = document.getElementById('job-post-action').offsetWidth;
      setParentWidth(newWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    if (parentWidth < 600) {
      setStackDirection('column');
    } else {
      setStackDirection('row');
    }
  }, [parentWidth]);

  return (
    <div id="job-post-action">
      <Card
        variant="outlined"
        sx={{
          p: 1,
          '&:hover': {
            borderColor: '#441da0',
          },
        }}
      >
        <Stack direction={stackDirection} spacing={2}>
          <Box width={stackDirection === "row" ? "70%" : "100%"}>
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
                  }}
                />
              </Stack>
              <Stack
                flex={1}
                justifyContent="center"
                style={{ overflow: 'hidden' }}
              >
                <Tooltip followCursor title={jobName}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontSize: 14, fontWeight: 'bold', cursor: 'pointer' }}
                    gutterBottom
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    onClick={() => nav(`/viec-lam/${slug}`)}
                  >
                    {jobName}
                  </Typography>
                </Tooltip>

                <Tooltip followCursor title={companyName}>
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
                </Tooltip>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              sx={{ mt: 1 }}
              justifyContent="space-between"
            >
              <Stack direction="row" spacing={1.5}>
                <Typography
                  sx={{ fontWeight: 'bold', fontSize: 13 }}
                  variant="body2"
                >
                  <FontAwesomeIcon
                    icon={faCircleDollarToSlot}
                    color="#bdbdbd"
                  />{' '}
                  {salaryString(salaryMin, salaryMax)}
                </Typography>
                <Typography
                  sx={{ fontWeight: 'bold', fontSize: 13 }}
                  variant="body2"
                >
                  <FontAwesomeIcon icon={faLocationDot} color="#bdbdbd" />{' '}
                  {allConfig?.cityDict[cityId] || (
                    <span
                      style={{
                        color: '#e0e0e0',
                        fontStyle: 'italic',
                        fontSize: 13,
                      }}
                    >
                      Chưa cập nhật
                    </span>
                  )}
                </Typography>
                <Typography
                  sx={{ fontWeight: 'bold', fontSize: 13 }}
                  variant="body2"
                >
                  <FontAwesomeIcon icon={faCalendarDays} color="#bdbdbd" />{' '}
                  {dayjs(deadline).format('DD/MM/YYYY')}
                </Typography>
              </Stack>
            </Stack>
          </Box>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            flex={1}
            spacing={1}
          >
            {children}
          </Stack>
        </Stack>
      </Card>
    </div>
  );
};

const Loading = () => {
  const [parentWidth, setParentWidth] = React.useState(0);
  const [stackDirection, setStackDirection] = React.useState('column');

  React.useEffect(() => {
    const handleResize = () => {
      const newWidth = document.getElementById(
        'job-post-action-loading'
      ).offsetWidth;
      setParentWidth(newWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    if (parentWidth < 600) {
      setStackDirection('column');
    } else {
      setStackDirection('row');
    }
  }, [parentWidth]);

  return (
    <>
      <div id="job-post-action-loading">
        <Card sx={{ p: 1, boxShadow: 0 }}>
          <Stack direction={stackDirection} spacing={2}>
            <Box flex={1}>
              <Stack direction="row" spacing={1}>
                <Stack direction="row" justifyContent="center">
                  <Skeleton variant="rounded" width={60} height={60} />
                </Stack>
                <Stack flex={1} justifyContent="center">
                  <Typography variant="subtitle2" gutterBottom>
                    <Skeleton height={30} />
                  </Typography>

                  <Typography variant="subtitle2">
                    <Skeleton />
                  </Typography>
                </Stack>
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                sx={{ mt: 1 }}
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={1.5}>
                  <Skeleton width={80} />
                  <Skeleton width={80} />
                  <Skeleton width={80} />
                </Stack>
              </Stack>
            </Box>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={1}
            >
              <Skeleton height={30} width={60} />
            </Stack>
          </Stack>
        </Card>
      </div>
    </>
  );
};

JobPostAction.Loading = Loading;

export default JobPostAction;
