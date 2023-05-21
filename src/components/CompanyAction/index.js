import React from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Box, Card, Skeleton, Stack, Tooltip, Typography } from '@mui/material';

import MuiImageCustom from '../MuiImageCustom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faFontAwesome,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

const CompanyAction = ({ id, views, createAt, resume, company, children }) => {
  const nav = useNavigate();
  const [parentWidth, setParentWidth] = React.useState(0);
  const [stackDirection, setStackDirection] = React.useState('column');

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
    console.log(parentWidth);
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
          p: 1,
          '&:hover': {
            borderColor: '#441da0',
          },
        }}
      >
        <Stack direction={stackDirection} spacing={2} width="100%">
          <Stack direction="row" spacing={1}>
            <Stack justifyContent="center">
              <MuiImageCustom
                width={75}
                height={75}
                src={company?.companyImageUrl}
                sx={{ border: 0.5, borderRadius: 1.5, borderColor: '#e0e0e0' }}
              />
            </Stack>
            <Stack
              flex={1}
              justifyContent="center"
              style={{ overflow: 'hidden' }}
            >
              <Tooltip followCursor title={company?.companyName}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontSize: 14, cursor: 'pointer', fontWeight: 'bold' }}
                  gutterBottom
                  noWrap
                  style={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                  onClick={() => nav(`/cong-ty/${company?.slug}`)}
                >
                  {company?.companyName}
                </Typography>
              </Tooltip>

              <Box>
                <Typography
                  variant="subtitle2"
                  color="gray"
                  style={{
                    fontWeight: 'normal',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  Đã xem hồ sơ {resume?.title} {views} lần
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="gray"
                  style={{
                    fontWeight: 'normal',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  Lần xem cuối {dayjs(createAt).format('DD/MM/YYYY HH:mm')}
                </Typography>
              </Box>
            </Stack>
          </Stack>
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

const CompanyActionFollow = ({ id, company, children }) => {
  const nav = useNavigate();
  const [parentWidth, setParentWidth] = React.useState(0);
  const [stackDirection, setStackDirection] = React.useState('column');

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
    console.log(parentWidth);
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
          p: 1,
          '&:hover': {
            borderColor: '#441da0',
          },
        }}
      >
        <Stack direction={stackDirection} spacing={2} >
          <Box>
            <Stack direction="row" spacing={1}>
              <Stack direction="row" justifyContent="center">
                <MuiImageCustom
                  width={75}
                  height={75}
                  src={company?.companyImageUrl}
                  sx={{
                    border: 0.5,
                    borderRadius: 1.5,
                    borderColor: '#e0e0e0',
                  }}
                />
              </Stack>
              <Stack flex={1} justifyContent="center">
                <Box>
                  <Tooltip followCursor title={company?.companyName}>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontSize: 14, fontWeight: 'bold', cursor: 'pointer' }}
                      gutterBottom
                      style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                      onClick={() => nav(`/cong-ty/${company?.slug}`)}
                    >
                      {company?.companyName}
                    </Typography>
                  </Tooltip>
                </Box>

                <Typography variant="body2" gutterBottom>
                  <FontAwesomeIcon
                    icon={faFontAwesome}
                    style={{ marginRight: 2 }}
                    color="#bdbdbd"
                  />{' '}
                  {company?.fieldOperation || (
                     <span style={{ color: '#e0e0e0', fontStyle: 'italic', fontSize: 13 }}>
                     Chưa cập nhật
                   </span>
                  )}
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Typography variant="body2" gutterBottom>
                    <FontAwesomeIcon
                      icon={faUsers}
                      style={{ marginRight: 2 }}
                      color="#bdbdbd"
                    />{' '}
                    {company?.followNumber} theo dõi
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <FontAwesomeIcon
                      icon={faBriefcase}
                      style={{ marginRight: 2 }}
                      color="#bdbdbd"
                    />{' '}
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
            spacing={1}
          >
            {children}
          </Stack>
        </Stack>
      </Card>
    </div>
  );
};

const Loading = () => (
  <>
    <Card sx={{ p: 1, boxShadow: 0 }}>
      <Stack direction="row" spacing={1}>
        <Box>
          <Skeleton variant="rounded" width={75} height={75} />
        </Box>
        <Box flex={1}>
          <Typography variant="subtitle2" sx={{ fontSize: 15 }} gutterBottom>
            <Skeleton height={30} />
          </Typography>
          <Typography variant="subtitle2" color="gray">
            <Skeleton />
          </Typography>
          <Typography variant="subtitle2" color="gray">
            <Skeleton />
          </Typography>
        </Box>
      </Stack>
    </Card>
  </>
);

CompanyAction.CompanyActionFollow = CompanyActionFollow;
CompanyAction.Loading = Loading;

export default CompanyAction;
