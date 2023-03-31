import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Box,
  Card,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faFontAwesome,
  faMapLocation,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { IMAGES } from '../../configs/constants';
import MuiImageCustom from '../MuiImageCustom';

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
  isLoadingFollow,
  handleFollow,
}) => {
  const { allConfig } = useSelector((state) => state.config);

  return (
    <Card
      sx={{
        p: 2,
        '&:hover': {
          borderColor: '#441da0',
        },
      }}
      variant="outlined"
    >
      <Stack>
        <Box>
          <MuiImageCustom
            width="100%"
            src={companyCoverImageUrl || IMAGES.coverImageDefault}
            sx={{ borderRadius: 1.5 }}
            duration={1500}
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
                  p: 0.75,
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
            {jobPostNumber} việc làm
          </Typography>
        </Box>
        <Box sx={{ py: 1, px: 2 }}>
          <LoadingButton
            fullWidth
            onClick={() => handleFollow(slug)}
            startIcon={isFollowed ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            loading={isLoadingFollow}
            loadingPosition="start"
            variant={isFollowed ? 'contained' : 'outlined'}
            color="warning"
            sx={{ textTransform: 'inherit' }}
          >
            <span>{isFollowed ? 'Đang theo dõi' : 'Theo dõi'}</span>
          </LoadingButton>
        </Box>
      </Stack>
    </Card>
  );
};

const Loading = () => (
  <>
    <Card
      sx={{
        p: 2,
        boxShadow: 0,
      }}
    >
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
