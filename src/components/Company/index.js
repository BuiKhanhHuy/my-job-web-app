/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Box, Card, Skeleton, Stack, Typography } from '@mui/material';
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

import { IMAGES, ROLES_NAME, ROUTES } from '../../configs/constants';
import MuiImageCustom from '../MuiImageCustom';

import companyService from '../../services/companyService';
import toastMessages from '../../utils/toastMessages';
import errorHandling from '../../utils/errorHandling';
import { formatRoute } from '../../utils/funcUtils';

const FollowComponent = ({ slug, isFollowed }) => {
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const [isLoadingFollow, setIsLoadingFollow] = React.useState(false);
  const [followed, setFollowed] = React.useState(isFollowed);

  const handleFollow = (slug) => {
    const follow = async (slugCompany) => {
      setIsLoadingFollow(true);
      try {
        const resData = await companyService.followCompany(slugCompany);
        const isFollowed = resData.data.isFollowed;

        setFollowed(isFollowed);
        toastMessages.success(
          isFollowed ? 'Theo dõi thành công.' : 'Hủy theo dõi thành công.'
        );
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoadingFollow(false);
      }
    };

    follow(slug);
  };

  return (
    <>
      {isAuthenticated && currentUser?.roleName === ROLES_NAME.JOB_SEEKER && (
        <Stack justifyContent="flex-end" sx={{ py: 1, px: 2, height: '100%' }}>
          <LoadingButton
            fullWidth
            onClick={() => handleFollow(slug)}
            startIcon={
              followed ? (
                <BookmarkIcon sx={{ color: 'common.white' }} />
              ) : (
                <BookmarkBorderIcon />
              )
            }
            loading={isLoadingFollow}
            loadingPosition="start"
            variant={followed ? 'contained' : 'outlined'}
            color="warning"
            sx={{ textTransform: 'inherit' }}
          >
            <span>
              {followed ? (
                <span style={{ color: 'white' }}>Đang theo dõi</span>
              ) : (
                'Theo dõi'
              )}
            </span>
          </LoadingButton>
        </Stack>
      )}
    </>
  );
};

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
  const { allConfig } = useSelector((state) => state.config);
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);

  return (
    <Card
      sx={{
        p: 2,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          borderColor: (theme) => theme.palette.primary.main,
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.customShadows.large,
        },
      }}
      variant="outlined"
    >
      <Stack
        style={{
          height:
            isAuthenticated && currentUser?.roleName === ROLES_NAME.JOB_SEEKER
              ? 480
              : 420,
        }}
        direction="column"
        justifyContent={'space-between'}
      >
        <Box>
          <Box sx={{ position: 'relative' }}>
            <MuiImageCustom
              width="100%"
              height={180}
              fit="cover"
              src={companyCoverImageUrl || IMAGES.coverImageDefault}
              sx={{ 
                borderRadius: 2,
                filter: 'brightness(0.9)',
              }}
              duration={1500}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -40,
                left: 16,
                width: 85,
                height: 85,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
              component={Link}
              to={`/${formatRoute(ROUTES.JOB_SEEKER.COMPANY_DETAIL, slug)}`}
            >
              <MuiImageCustom
                width={80}
                height={80}
                src={companyImageUrl}
                sx={{
                  bgcolor: 'white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  p: 0.75,
                  borderRadius: 3,
                }}
              />
            </Box>
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 12, 
                right: 12,
                bgcolor: 'rgba(255,255,255,0.9)', 
                borderRadius: 2,
                px: 1.5,
                py: 0.5,
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 500 }}>
                <FontAwesomeIcon
                  icon={faUsers}
                  style={{ marginRight: 4 }}
                  color={(theme) => theme.palette.custom.mutedText} 
                />
                {followNumber} lượt theo dõi
              </Typography>
            </Box>
          </Box>

          <Box sx={{ p: 2, pt: 5, width: '100%' }}>
            <Box mb={2}>
              <Typography
                variant="h6"
                component={Link}
                to={`/${formatRoute(ROUTES.JOB_SEEKER.COMPANY_DETAIL, slug)}`}
                sx={{
                  textDecoration: 'none',
                  color: 'inherit',
                  fontWeight: 600,
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: (theme) => theme.palette.primary.main,
                  },
                }}
              >
                {companyName.substr(0, 55)}
                {companyName.length > 55 && '...'}
              </Typography>
            </Box>

            <Stack spacing={1.5}>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FontAwesomeIcon
                  icon={faFontAwesome}
                  style={{ width: 16 }}
                  sx={{ color: 'grey.600' }}
                />
                {fieldOperation || (
                  <span style={{ color: '#9e9e9e', fontStyle: 'italic', fontSize: 13 }}>
                    Chưa cập nhật
                  </span>
                )}
              </Typography>

              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FontAwesomeIcon
                  icon={faMapLocation}
                  style={{ width: 16 }}
                  sx={{ color: 'grey.600' }}
                />
                {allConfig?.cityDict[city] || (
                  <span style={{ color: '#9e9e9e', fontStyle: 'italic', fontSize: 13 }}>
                    Chưa cập nhật
                  </span>
                )}
              </Typography>

              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FontAwesomeIcon
                  icon={faUser}
                  style={{ width: 16 }}
                  sx={{ color: 'grey.600' }}
                />
                {allConfig?.employeeSizeDict[employeeSize] || (
                  <span style={{ color: '#9e9e9e', fontStyle: 'italic', fontSize: 13 }}>
                    Chưa cập nhật
                  </span>
                )}
              </Typography>

              <Typography 
                variant="body2" 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: 1,
                  color: 'primary.main',
                  fontWeight: 500
                }}
              >
                <FontAwesomeIcon
                  icon={faBriefcase}
                  style={{ width: 16 }}
                  sx={{ color: 'primary.main' }}
                />
                {jobPostNumber} việc làm
              </Typography>
            </Stack>
          </Box>
        </Box>

        <FollowComponent slug={slug} isFollowed={isFollowed} />
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
