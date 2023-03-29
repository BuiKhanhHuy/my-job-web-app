import React from 'react';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';

const Company = () => {
  return (
    <Card sx={{ p: 2 }} variant="outlined">
      <Stack>
        <Box>
          <CardMedia
            component="img"
            width="100%"
            image="https://www.vietnamworks.com/_next/image?url=https%3A%2F%2Fimages02.vietnamworks.com%2Fcompanyprofile%2F3MVietnam%2Fen%2FTH_trip-full_country_2019.jpg&w=1920&q=75"
            alt="Paella dish"
            sx={{ borderRadius: 1.5 }}
          />
        </Box>
        <Box sx={{ px: 2 }}>
          <Stack direction="row" justifyContent="space-between">
            <Box sx={{ width: 85, height: 85, marginTop: -5 }}>
              <Avatar
                sx={{
                  bgcolor: 'white',
                  boxShadow: 2,
                  p: 1,
                  width: '100%',
                  height: '100%',
                }}
                variant="rounded"
                src="https://www.vietnamworks.com/_next/image?url=https%3A%2F%2Fimages02.vietnamworks.com%2Fcompanyprofile%2Fgoldengategroup%2Fvi%2FLOGO_cac_chuoi-08_1464175772.png&w=1920&q=75"
              />
            </Box>
            <Box sx={{ py: 1 }}>
              <Typography variant="caption" display="block">
                <FontAwesomeIcon
                  icon={faBriefcase}
                  style={{ marginRight: 2 }}
                />{' '}
                211 lượt theo dõi
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            WOORI BANK VIETNAM LIMITED
          </Typography>
          <Typography variant="body2" gutterBottom>
            <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: 2 }} />{' '}
            Công nghệ viễn thông
          </Typography>
          <Typography variant="body2" gutterBottom>
            <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: 2 }} />{' '}
            TP. Hồ Chí Minh
          </Typography>
          <Typography variant="body2" gutterBottom>
            <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: 2 }} />{' '}
            5000+ nhân viên
          </Typography>
          <Typography variant="body2" gutterBottom>
            <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: 2 }} /> 4
            việc làm
          </Typography>
        </Box>
        <Box sx={{ py: 1, px: 2 }}>
          <Button variant="outlined" color="warning" sx={{ width: '100%' }}>
            Theo dõi
          </Button>
        </Box>
      </Stack>
    </Card>
  );
};

const Loading = () => (
  <>
    <Card sx={{ p: 2 }} variant="outlined">
      <Stack>
        <Box>
          <Skeleton variant="rounded" height={150} />
        </Box>
        <Box sx={{ px: 2 }}>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Avatar
              sx={{
                width: 85,
                height: 85,
                marginTop: -5,
                backgroundColor: 'white',
              }}
              variant="rounded"
            >
              <Skeleton variant="rounded" sx={{ width: 85, height: 85 }} />
            </Avatar>
            <Box flex={1} sx={{ py: 1 }}>
              <Typography variant="caption" display="block">
                <Skeleton />
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            <Skeleton />
          </Typography>
          <Typography variant="body2" gutterBottom>
            <Skeleton />
          </Typography>
          <Typography variant="body2" gutterBottom>
            <Skeleton />
          </Typography>
          <Typography variant="body2" gutterBottom>
            <Skeleton />
          </Typography>
          <Typography variant="body2" gutterBottom>
            <Skeleton />
          </Typography>
        </Box>
        <Box sx={{ px: 2 }}>
          <Skeleton variant="rounded" height={30} />
        </Box>
      </Stack>
    </Card>
  </>
);

Company.Loading = Loading;

export default Company;
