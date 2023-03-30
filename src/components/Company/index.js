import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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
import {
  faBriefcase,
  faFontAwesome,
  faMapLocation,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { IMAGES } from '../../configs/constants';

const Company = ({
  id,
  slug,
  companyImageUrl,
  companyCoverImageUrl,
  companyName,
  employeeSize,
  fieldOperation,
  city,
  followNumber,
  jobPostNumber,
  isFollowed,
}) => {
  const nav = useNavigate();
  const { allConfig } = useSelector((state) => state.config);

  return (
    <Card sx={{ p: 2 }} variant="outlined">
      <Stack>
        <Box>
          <CardMedia
            component="img"
            width="100%"
            image={companyCoverImageUrl || IMAGES.coverImageDefault}
            alt="Paella dish"
            sx={{ borderRadius: 1.5 }}
          />
        </Box>
        <Box sx={{ px: 2 }}>
          <Stack direction="row" justifyContent="space-between">
            <Box
              sx={{ width: 85, height: 85, marginTop: -5 }}
              component={Link}
              to={`/cong-ty/${slug}`}
            >
              <Avatar
                sx={{
                  bgcolor: 'white',
                  boxShadow: 2,
                  p: 1,
                  width: '100%',
                  height: '100%',
                }}
                variant="rounded"
                src={companyImageUrl}
              />
            </Box>
            <Box sx={{ py: 1 }}>
              <Typography variant="caption" display="block">
                <FontAwesomeIcon
                  icon={faUsers}
                  style={{ marginRight: 2 }}
                  color="#bdbdbd"
                />{' '}
                {followNumber} lượt theo dõi
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h6"
            gutterBottom
            component={Link}
            to={`/cong-ty/${slug}`}
            sx={{ textDecoration: 'none', color: 'inherit' }}
          >
            {companyName}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <FontAwesomeIcon
              icon={faFontAwesome}
              style={{ marginRight: 2 }}
              color="#bdbdbd"
            />{' '}
            {fieldOperation || (
              <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
                Chưa cập nhật
              </span>
            )}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <FontAwesomeIcon
              icon={faMapLocation}
              style={{ marginRight: 2 }}
              color="#bdbdbd"
            />{' '}
            {allConfig?.cityDict[city] || (
              <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
                Chưa cập nhật
              </span>
            )}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <FontAwesomeIcon
              icon={faUser}
              style={{ marginRight: 2 }}
              color="#bdbdbd"
            />{' '}
            {allConfig?.employeeSizeDict[employeeSize] || (
              <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
                Chưa cập nhật
              </span>
            )}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <FontAwesomeIcon
              icon={faBriefcase}
              style={{ marginRight: 2 }}
              color="#bdbdbd"
            />{' '}
            4{jobPostNumber}
          </Typography>
        </Box>
        <Box sx={{ py: 1, px: 2 }}>
          {isFollowed ? (
            <Button
              variant="contained"
              color="warning"
              sx={{ width: '100%', color: 'white' }}
            >
              Đang theo dõi
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="warning"
              sx={{ width: '100%', color: 'white' }}
            >
              Theo dõi
            </Button>
          )}
        </Box>
      </Stack>
    </Card>
  );
};

const Loading = () => (
  <>
    <Card sx={{ p: 2, boxShadow: 0 }}>
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
