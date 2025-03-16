import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Box, Card, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { salaryString } from '../../utils/customData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faCircleDollarToSlot,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import MuiImageCustom from '../MuiImageCustom';
import { ROUTES } from '../../configs/constants';
import { formatRoute } from '../../utils/funcUtils';

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
  const theme = useTheme();

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
          p: 2,
          transition: 'all 0.3s ease',
          border: `1px solid ${theme.palette.grey[100]}`,
          boxShadow: 0,
          '&:hover': {
            borderColor: theme.palette.primary.main,
            boxShadow: theme.customShadows.small,
            transform: 'translateY(-2px)'
          },
        }}
      >
        <Stack direction={stackDirection} spacing={2}>
          <Box width={stackDirection === "row" ? "70%" : "100%"}>
            <Stack direction="row" spacing={2}>
              <Stack direction="row" justifyContent="center">
                <MuiImageCustom
                  width={70}
                  height={70}
                  src={companyImageUrl}
                  sx={{
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.grey[200]}`,
                    p: 0.5,
                    backgroundColor: 'white',
                  }}
                />
              </Stack>
              <Stack
                flex={1}
                justifyContent="space-between"
                style={{ overflow: 'hidden' }}
              >
                <Box>
                  <Tooltip followCursor title={jobName}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: 16,
                        cursor: 'pointer',
                        color: theme.palette.primary.main,
                        transition: 'color 0.2s ease',
                        mb: 0.5,
                        '&:hover': {
                          color: theme.palette.primary.dark
                        }
                      }}
                      onClick={() => nav(`/${formatRoute(ROUTES.JOB_SEEKER.JOB_DETAIL, slug)}`)}
                      noWrap
                    >
                      {jobName}
                    </Typography>
                  </Tooltip>

                  <Tooltip followCursor title={companyName}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: 500,
                      }}
                      noWrap
                    >
                      {companyName}
                    </Typography>
                  </Tooltip>
                </Box>

                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    '& .info-item': {
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      color: theme.palette.text.secondary,
                      fontSize: '0.875rem',
                      '& svg': {
                        fontSize: 14,
                        color: theme.palette.grey[400]
                      }
                    }
                  }}
                >
                  <Typography className="info-item">
                    <FontAwesomeIcon icon={faCircleDollarToSlot} />
                    {salaryString(salaryMin, salaryMax)}
                  </Typography>
                  <Typography className="info-item">
                    <FontAwesomeIcon icon={faLocationDot} />
                    {allConfig?.cityDict[cityId] || (
                      <span style={{
                        color: theme.palette.grey[400],
                        fontStyle: 'italic',
                        fontSize: 13
                      }}>
                        Chưa cập nhật
                      </span>
                    )}
                  </Typography>
                  <Typography className="info-item">
                    <FontAwesomeIcon icon={faCalendarDays} />
                    {dayjs(deadline).format('DD/MM/YYYY')}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Box>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            flex={1}
            spacing={2}
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
  const theme = useTheme();

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
    <div id="job-post-action-loading">
      <Card
        variant="outlined"
        sx={{
          p: 2,
          border: `1px solid ${theme.palette.grey[100]}`,
          boxShadow: 0
        }}
      >
        <Stack direction={stackDirection} spacing={2}>
          <Box flex={1}>
            <Stack direction="row" spacing={2}>
              <Stack direction="row" justifyContent="center">
                <Skeleton 
                  variant="rounded" 
                  width={70} 
                  height={70}
                  sx={{ borderRadius: 2 }}
                />
              </Stack>
              <Stack flex={1} justifyContent="space-between">
                <Box>
                  <Typography variant="h6" gutterBottom>
                    <Skeleton height={30} width="80%" />
                  </Typography>
                  <Typography variant="body2">
                    <Skeleton width="60%" />
                  </Typography>
                </Box>
                <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                  <Skeleton width={100} height={24} />
                  <Skeleton width={100} height={24} />
                  <Skeleton width={100} height={24} />
                </Stack>
              </Stack>
            </Stack>
          </Box>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            <Skeleton height={36} width={100} />
          </Stack>
        </Stack>
      </Card>
    </div>
  );
};

JobPostAction.Loading = Loading;

export default JobPostAction;
