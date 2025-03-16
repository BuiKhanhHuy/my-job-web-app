import React from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Box, Card, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import defaultTheme from '../../themeConfigs/defaultTheme';

import MuiImageCustom from '../MuiImageCustom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faFontAwesome,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { formatRoute } from '../../utils/funcUtils';
import { ROUTES } from '../../configs/constants';

const CompanyAction = ({ id, views, createAt, resume, company, children }) => {
  const nav = useNavigate();
  const [parentWidth, setParentWidth] = React.useState(0);
  const [stackDirection, setStackDirection] = React.useState('column');
  const theme = useTheme();

  React.useEffect(() => {
    const handleResize = () => {
      const newWidth = document.getElementById('parent-element').offsetWidth;
      setParentWidth(newWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    if (parentWidth < 800) {
      setStackDirection('column');
    } else {
      setStackDirection('row');
    }
  }, [parentWidth]);

  return (
    <div id="parent-element">
      <Card
        variant="outlined"
        sx={{
          p: 1.5,
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
        <Stack direction={stackDirection} spacing={1.5} width="100%">
          <Stack direction="row" spacing={2}>
            <Stack justifyContent="center">
              <MuiImageCustom
                width={85}
                height={85}
                src={company?.companyImageUrl}
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
              justifyContent="center" 
              spacing={1}
              style={{ overflow: 'hidden' }}
            >
              <Tooltip followCursor title={company?.companyName}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: 16,
                    cursor: 'pointer',
                    color: theme.palette.primary.main,
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: theme.palette.primary.dark
                    }
                  }}
                  noWrap
                  onClick={() => nav(`/${formatRoute(ROUTES.JOB_SEEKER.COMPANY_DETAIL, company?.slug)}`)}
                >
                  {company?.companyName}
                </Typography>
              </Tooltip>

              <Stack spacing={0.5}>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  Đã xem hồ sơ {resume?.title} {views} lần
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  Lần xem cuối {dayjs(createAt).format('DD/MM/YYYY HH:mm')}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
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

const CompanyActionFollow = ({ id, company, children }) => {
  const nav = useNavigate();
  const [parentWidth, setParentWidth] = React.useState(0);
  const [stackDirection, setStackDirection] = React.useState('column');
  const theme = useTheme();

  React.useEffect(() => {
    const handleResize = () => {
      const newWidth = document.getElementById(
        'company-action-follow'
      ).offsetWidth;
      setParentWidth(newWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    if (parentWidth < 800) {
      setStackDirection('column');
    } else {
      setStackDirection('row');
    }
  }, [parentWidth]);

  return (
    <div id="company-action-follow">
      <Card
        variant="outlined"
        sx={{
          p: 1.5,
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
        <Stack direction={stackDirection} spacing={3}>
          <Box>
            <Stack direction="row" spacing={2}>
              <Stack direction="row" justifyContent="center">
                <MuiImageCustom
                  width={85}
                  height={85}
                  src={company?.companyImageUrl}
                  sx={{
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.grey[200]}`,
                    p: 0.5,
                    backgroundColor: 'white',
                  }}
                />
              </Stack>
              <Stack flex={1} justifyContent="center" spacing={1.5}>
                <Box>
                  <Tooltip followCursor title={company?.companyName}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: 16,
                        cursor: 'pointer',
                        color: theme.palette.primary.main,
                        transition: 'color 0.2s ease',
                        '&:hover': {
                          color: theme.palette.primary.dark
                        }
                      }}
                      onClick={() => nav(`/${formatRoute(ROUTES.JOB_SEEKER.COMPANY_DETAIL, company?.slug)}`)}
                    >
                      {company?.companyName}
                    </Typography>
                  </Tooltip>
                </Box>

                <Typography 
                  variant="body2"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: theme.palette.text.secondary
                  }}
                >
                  <FontAwesomeIcon
                    icon={faFontAwesome}
                    style={{ fontSize: 14 }}
                    color={theme.palette.grey[400]}
                  />
                  {company?.fieldOperation || (
                    <span style={{ 
                      color: theme.palette.grey[400],
                      fontStyle: 'italic',
                      fontSize: 13
                    }}>
                      Chưa cập nhật
                    </span>
                  )}
                </Typography>

                <Stack 
                  direction="row" 
                  spacing={3}
                  sx={{
                    '& .MuiTypography-root': {
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      color: theme.palette.text.secondary
                    }
                  }}
                >
                  <Typography variant="body2">
                    <FontAwesomeIcon
                      icon={faUsers}
                      style={{ fontSize: 14 }}
                      color={theme.palette.grey[400]}
                    />
                    {company?.followNumber} theo dõi
                  </Typography>
                  <Typography variant="body2">
                    <FontAwesomeIcon
                      icon={faBriefcase}
                      style={{ fontSize: 14 }}
                      color={theme.palette.grey[400]}
                    />
                    {company?.jobPostNumber} việc làm
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

const Loading = () => (
  <Card 
    sx={{ 
      p: 2,
      boxShadow: defaultTheme.customShadows.small,
      border: `1px solid ${defaultTheme.palette.grey[200]}`
    }}
  >
    <Stack direction="row" spacing={2}>
      <Box>
        <Skeleton 
          variant="rounded" 
          width={85} 
          height={85}
          sx={{ borderRadius: 2 }}
        />
      </Box>
      <Box flex={1}>
        <Typography variant="h6" gutterBottom>
          <Skeleton height={35} width="80%" />
        </Typography>
        <Typography variant="body2">
          <Skeleton height={25} width="60%" />
        </Typography>
        <Typography variant="body2">
          <Skeleton height={25} width="40%" />
        </Typography>
      </Box>
    </Stack>
  </Card>
);

CompanyAction.CompanyActionFollow = CompanyActionFollow;
CompanyAction.Loading = Loading;

export default CompanyAction;
