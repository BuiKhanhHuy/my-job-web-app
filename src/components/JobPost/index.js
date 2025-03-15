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
import { formatRoute } from '../../utils/funcUtils';
import { ROUTES } from '../../configs/constants';

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
  const myRef = React.useRef(null);
  const [width, setWidth] = React.useState("95%")
  const nav = useNavigate();
  const { allConfig } = useSelector((state) => state.config);

  React.useEffect(() => {
    const elementWidth = myRef.current?.offsetWidth - 70;
    setWidth(elementWidth);
  }, []);


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
      onClick={() => nav(`/${formatRoute(ROUTES.JOB_SEEKER.JOB_DETAIL, slug)}`)}
    >
      <Stack direction="row" spacing={1} alignItems="center" ref={myRef}>
        <Stack>
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
        <Stack
          spacing={0}
          width={width}
        >
          <Stack
            direction="row"
            alignItems="center"
            style={{ overflow: 'hidden' }}
            spacing={1.25}
          >
            <Tooltip followCursor title={jobName}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: 13.5,
                  fontWeight: 'bold',
                  fontFamily: 'Open Sans',
                }}
                noWrap
                style={{
                  textOverflow: 'ellipsis',
                }}
                flex={1}
              >
                {jobName}
              </Typography>
            </Tooltip>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              {isHot && (
                <span
                  style={{
                    padding: 0,
                    fontSize: 11,
                    fontWeight: 'bold',
                    color: 'red',
                  }}
                >
                  HOT
                </span>
              )}
              {isHot && isUrgent && (
                <span style={{ color: '#e0e0e0' }}> | </span>
              )}
              {isUrgent && (
                <span
                  style={{
                    padding: 0,
                    fontSize: 11,
                    fontWeight: 'bold',
                    color: 'orange',
                  }}
                >
                  Tuyển gấp
                </span>
              )}
            </Stack>
          </Stack>
          <Tooltip followCursor title={companyName}>
            <Typography
              variant="subtitle2"
              color="gray"
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: 13.5,
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
          <Typography sx={{ fontWeight: 'bold', fontSize: 13 }} variant="body2">
            <FontAwesomeIcon icon={faCircleDollarToSlot} color="#e0e0e0" />{' '}
            {salaryString(salaryMin, salaryMax)}
          </Typography>
          <Typography sx={{ fontWeight: 'bold', fontSize: 13 }} variant="body2">
            <FontAwesomeIcon icon={faLocationDot} color="#e0e0e0" />{' '}
            {allConfig?.cityDict[cityId] || (
              <span
                style={{ color: '#e0e0e0', fontStyle: 'italic', fontSize: 13 }}
              >
                Chưa cập nhật
              </span>
            )}
          </Typography>
          <Typography sx={{ fontWeight: 'bold', fontSize: 13 }} variant="body2">
            <FontAwesomeIcon icon={faCalendarDays} color="#e0e0e0" />{' '}
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
