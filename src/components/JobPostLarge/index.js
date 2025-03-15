import React from 'react';
import { useTheme } from '@mui/material/styles';
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
import { formatRoute } from '../../utils/funcUtils';
import { ROUTES } from '../../configs/constants';

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
  const theme = useTheme();
  const nav = useNavigate();
  const { allConfig } = useSelector((state) => state.config);
  const [width, setWidth] = React.useState('95%');
  const myRef = React.useRef(null);

  React.useEffect(() => {
    const elementWidth = myRef.current?.offsetWidth - 100;
    setWidth(elementWidth);
  }, []);

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: theme.palette.mode === 'light' ? '#fff5e7' : '#121212',
        cursor: 'pointer',
        p: 1,
        '&:hover': {
          boxShadow: 5,
        },
      }}
      onClick={() => nav(`/${formatRoute(ROUTES.JOB_SEEKER.JOB_DETAIL, slug)}`)}
    >
      <Stack direction="row" spacing={2} ref={myRef}>
        <Box>
          <MuiImageCustom
            width={100}
            height={100}
            src={companyImageUrl}
            sx={{
              border: 0.5,
              borderColor:
                theme.palette.mode === 'light' ? '#e0e0e0' : '#121212',
              borderRadius: 1.5,
              p: 0.5,
              backgroundColor: 'white',
            }}
          />
        </Box>
        <Stack flex={1} justifyContent="center" spacing={0.5} width={width}>
          <Box>
            <Typography
              sx={{ fontSize: 18, fontWeight: 'bold' }}
              style={{
                WebkitLineClamp: 2,
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
            <Typography
              sx={{ fontWeight: 'bold', fontSize: 15 }}
              variant="body1"
            >
              <FontAwesomeIcon icon={faCircleDollarToSlot} color="#bdbdbd" />{' '}
              {salaryString(salaryMin, salaryMax)}
            </Typography>
            <Typography
              sx={{ fontWeight: 'bold', fontSize: 15 }}
              variant="body1"
            >
              <FontAwesomeIcon icon={faLocationDot} color="#bdbdbd" />{' '}
              {allConfig?.cityDict[cityId] || 'Chưa cập nhật'}
            </Typography>
            <Typography
              sx={{ fontWeight: 'bold', fontSize: 15 }}
              variant="body1"
            >
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
