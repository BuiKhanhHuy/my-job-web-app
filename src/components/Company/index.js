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
                <BookmarkIcon style={{ color: 'white' }} />
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
        '&:hover': {
          borderColor: '#441da0',
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
          <Box>
            <MuiImageCustom
              width="100%"
              height={180}
              fit="cover"
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
                to={`/${formatRoute(ROUTES.JOB_SEEKER.COMPANY_DETAIL, slug)}`}
              >
                <MuiImageCustom
                  width={80}
                  height={80}
                  src={companyImageUrl}
                  sx={{
                    bgcolor: 'white',
                    boxShadow: 4,
                    p: 0.75,
                    borderRadius: 2,
                  }}
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
          <Box sx={{ p: 2, width: '100%' }}>
            <Box mb={1}>
              <Typography
                variant="h6"
                gutterBottom
                component={Link}
                to={`/${formatRoute(ROUTES.JOB_SEEKER.COMPANY_DETAIL, slug)}`}
                sx={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                {companyName.substr(0, 55)}
                {companyName.length > 55 && '...'}
              </Typography>
            </Box>
            <Typography variant="body2" gutterBottom>
              <FontAwesomeIcon
                icon={faFontAwesome}
                style={{ marginRight: 2 }}
                color="#bdbdbd"
              />{' '}
              {fieldOperation || (
                  <span style={{ color: '#e0e0e0', fontStyle: 'italic', fontSize: 13 }}>
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
                <span style={{ color: '#e0e0e0', fontStyle: 'italic', fontSize: 13 }}>
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
                 <span style={{ color: '#e0e0e0', fontStyle: 'italic', fontSize: 13 }}>
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
        </Box>
        {/* Start: FollowComponent */}
        <FollowComponent slug={slug} isFollowed={isFollowed} />
        {/* End: FollowComponent */}
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
