import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import {
  Box,
  Card,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
  Button,
  Skeleton,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faUsers,
  faCalendarDays,
  faGlobe,
  faEnvelope,
  faPhoneVolume,
  faHashtag,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';

import { QRCode } from 'antd';

import { ICONS, IMAGES, ROLES_NAME } from '../../../configs/constants';
import errorHandling from '../../../utils/errorHandling';
import toastMessages from '../../../utils/toastMessages';
import Map from '../../../components/Map';
import SocialNetworkSharingPopup from '../../../components/SocialNetworkSharingPopup/SocialNetworkSharingPopup';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MuiImageCustom from '../../../components/MuiImageCustom';
import NoDataCard from '../../../components/NoDataCard';
import ImageGalleryCustom from '../../../components/ImageGalleryCustom';
import companyService from '../../../services/companyService';

import FilterJobPostCard from '../../components/defaults/FilterJobPostCard';

const LoadingComponent = () => {
  return (
    <Stack>
      <Card>
        <Box height={250}>
          <Skeleton variant="rounded" width={'100%'} height={'100%'} />
        </Box>
        <Box sx={{ p: 3, pt: 1 }}>
          <Stack
            direction={{
              xs: 'column',
              sm: 'column',
              md: 'row',
              lg: 'row',
              xl: 'row',
            }}
            spacing={2}
            alignItems="center"
          >
            <Box>
              <Skeleton variant="rounded" width={120} height={120} />
            </Box>
            <Stack flex={1} spacing={2}>
              <Skeleton variant="rounded" />
              <Stack
                direction={{
                  xs: 'column',
                  sm: 'row',
                  md: 'row',
                  lg: 'row',
                  xl: 'row',
                }}
                spacing={{ xs: 0.5, sm: 2, md: 3, lg: 3, xl: 3 }}
              >
                <Skeleton variant="rounded" width={'100%'} />
                <Skeleton variant="rounded" width={'100%'} />
                <Skeleton variant="rounded" width={'100%'} />
              </Stack>
            </Stack>
            <Skeleton height={80} width={80} variant="rounded" />
          </Stack>
        </Box>
      </Card>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
          <Card sx={{ p: { xs: 2, sm: 2, md: 3, lg: 3, xl: 3 } }}>
            <Stack spacing={2}>
              <Skeleton variant="rounded" />
              <Skeleton height={150} variant="rounded" />
              <Skeleton variant="rounded" />
              <Skeleton height={300} variant="rounded" />
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <Card sx={{ p: { xs: 2, sm: 2, md: 3, lg: 3, xl: 3 } }}>
            <Stack spacing={3}>
              <Box>
                <Skeleton variant="rounded" />
                <Box sx={{ mt: 1 }}>
                  <Skeleton variant="rounded" />
                </Box>
              </Box>
              <Box>
                <Skeleton variant="rounded" />
                <Box sx={{ mt: 1 }}>
                  <Skeleton variant="rounded" />
                </Box>
              </Box>
              <Box>
                <Skeleton variant="rounded" />
                <Box sx={{ mt: 1 }}>
                  <Skeleton variant="rounded" />
                </Box>
                <Box sx={{ mt: 1 }}>
                  <Skeleton variant="rounded" />
                </Box>
                <Box sx={{ mt: 1 }}>
                  <Skeleton variant="rounded" />
                </Box>
                <Box sx={{ mt: 1 }}>
                  <Skeleton variant="rounded" />
                </Box>
              </Box>
              <Box>
                <Skeleton variant="rounded" />
                <Box sx={{ mt: 1, height: 200 }}>
                  <Skeleton variant="rounded" height="100%" />
                </Box>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};

const CompanyDetailPage = () => {
  const { slug } = useParams();
  const { allConfig } = useSelector((state) => state.config);
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const [openSharePopup, setOpenSharePopup] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadingFollow, setIsLoadingFollow] = React.useState(false);
  const [companyDetail, setCompanyDetail] = React.useState(null);
  const [imageList, setImageList] = React.useState([]);

  React.useEffect(() => {
    const getCompanyDetail = async (companySlug) => {
      try {
        const resData = await companyService.getCompanyDetailById(companySlug);
        const data = resData.data;
        const companyImages = data?.companyImages || [];

        setCompanyDetail(data);

        var imagelistNew = [];
        for (let i = 0; i < companyImages.length; i++) {
          imagelistNew.push({
            original: companyImages[i].imageUrl,
            thumbnail: companyImages[i].imageUrl,
          });
        }
        setImageList(imagelistNew);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    getCompanyDetail(slug);
  }, [slug]);

  const handleFollow = () => {
    const follow = async () => {
      setIsLoadingFollow(true);
      try {
        const resData = await companyService.followCompany(slug);
        const isFollowed = resData.data.isFollowed;
        setCompanyDetail({
          ...companyDetail,
          isFollowed: isFollowed,
          followNumber: isFollowed
            ? companyDetail.followNumber + 1
            : companyDetail.followNumber - 1,
        });
        toastMessages.success(
          isFollowed ? 'Theo dõi thành công.' : 'Hủy theo dõi thành công.'
        );
      } catch (error) {
        errorHandling(error);
      } finally {
        // setIsLoadingFollow(false);
      }
    };

    follow();
  };

  return isLoading ? (
    <LoadingComponent />
  ) : companyDetail === null ? (
    <NoDataCard />
  ) : (
    <>
      <Box>
        <Stack>
          <Card>
            <Box>
              <MuiImageCustom
                src={
                  companyDetail?.companyCoverImageUrl ||
                  IMAGES.coverImageDefault
                }
                sx={{ borderRadius: 1.5, maxHeight: 250 }}
                duration={1500}
                width="100%"
                fit="cover"
              />
            </Box>
            <Box sx={{ p: 3, pt: 1 }}>
              <Stack
                direction={{
                  xs: 'column',
                  sm: 'column',
                  md: 'row',
                  lg: 'row',
                  xl: 'row',
                }}
                spacing={2}
                alignItems="center"
              >
                <Box>
                  <MuiImageCustom
                    src={companyDetail.companyImageUrl}
                    sx={{
                      borderRadius: 2,
                      mt: -7,
                      p: 0.5,
                      bgcolor: 'white',
                      boxShadow: 5,
                    }}
                    duration={1500}
                    width={120}
                    height={120}
                  />
                </Box>
                <Box flex={1}>
                  <Box>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{
                        textAlign: {
                          xs: 'center',
                          sm: 'center',
                          md: 'left',
                          lg: 'left',
                          xl: 'left',
                        },
                      }}
                    >
                      {companyDetail.companyName}
                    </Typography>
                  </Box>
                  <Stack
                    direction={{
                      xs: 'column',
                      sm: 'row',
                      md: 'row',
                      lg: 'row',
                      xl: 'row',
                    }}
                    spacing={{ xs: 0.5, sm: 2, md: 3, lg: 3, xl: 3 }}
                  >
                    <Box>
                      <Typography variant="subtitle1" gutterBottom>
                        <FontAwesomeIcon
                          icon={faBriefcase}
                          style={{ marginRight: 6 }}
                        />
                        {companyDetail.fieldOperation}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" gutterBottom>
                        <FontAwesomeIcon
                          icon={faUsers}
                          style={{ marginRight: 6 }}
                        />
                        {allConfig?.employeeSizeDict[
                          companyDetail.employeeSize
                        ] || (
                          <span
                            style={{
                              color: '#e0e0e0',
                              fontStyle: 'italic',
                              fontSize: 13,
                            }}
                          >
                            Chưa cập nhật
                          </span>
                        )}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" gutterBottom>
                        <FontAwesomeIcon
                          icon={faCalendarDays}
                          style={{ marginRight: 6 }}
                        />
                        {dayjs(companyDetail?.since).format('DD/MM/YYYY')}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
                <Box sx={{ pt: 1 }}>
                  <QRCode value={window.location.href || '-'} size={75} />
                </Box>
                <Stack spacing={1} justifyContent="center">
                  {isAuthenticated &&
                    currentUser?.roleName === ROLES_NAME.JOB_SEEKER && (
                      <LoadingButton
                        onClick={handleFollow}
                        startIcon={
                          companyDetail.isFollowed ? (
                            <BookmarkIcon />
                          ) : (
                            <BookmarkBorderIcon />
                          )
                        }
                        loading={isLoadingFollow}
                        loadingPosition="start"
                        variant="outlined"
                        color="primary"
                        sx={{ textTransform: 'inherit' }}
                      >
                        <span>
                          {companyDetail.isFollowed
                            ? 'Đang theo dõi'
                            : 'Theo dõi'}{' '}
                          ({companyDetail.followNumber})
                        </span>
                      </LoadingButton>
                    )}
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ textTransform: 'inherit' }}
                    startIcon={<ShareIcon />}
                    onClick={() => setOpenSharePopup(true)}
                  >
                    Chia sẻ
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Card>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
              <Card sx={{ p: { xs: 2, sm: 2, md: 3, lg: 3, xl: 3 } }}>
                <Stack spacing={4}>
                  {/* Start: mo ta cong ty */}
                  <Box>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: '#441da0' }}
                    >
                      Về công ty
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Typography style={{ textAlign: 'justify' }}>
                        {companyDetail?.description ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: companyDetail?.description,
                            }}
                          ></div>
                        ) : (
                          <span
                            style={{
                              color: '#e0e0e0',
                              fontStyle: 'italic',
                              fontSize: 13,
                            }}
                          >
                            Chưa cập nhật
                          </span>
                        )}
                      </Typography>
                    </Box>
                  </Box>
                  {/* End: mo ta cong ty */}

                  {/* Start: viec lam */}
                  <Box>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: '#441da0' }}
                    >
                      Việc làm đang tuyển
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <FilterJobPostCard
                        params={{
                          companyId: companyDetail.id,
                        }}
                      />
                    </Box>
                  </Box>
                  {/* End: viec lam */}
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Card sx={{ p: { xs: 2, sm: 2, md: 3, lg: 3, xl: 3 } }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="h6" sx={{ color: '#441da0' }}>
                      Website
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Typography>
                        <FontAwesomeIcon
                          icon={faGlobe}
                          style={{ marginRight: 6 }}
                        />{' '}
                        <Link target="_blank" href={companyDetail.websiteUrl}>
                          {companyDetail.websiteUrl}
                        </Link>
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: '#441da0' }}>
                      Theo dõi tại
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      {companyDetail?.facebookUrl ||
                      companyDetail?.youtubeUrl ||
                      companyDetail?.linkedinUrl ? (
                        <>
                          {companyDetail?.facebookUrl && (
                            <Link
                              target="_blank"
                              href={companyDetail.facebookUrl}
                            >
                              <IconButton color="primary" aria-label="facebook">
                                <img width="30" src={ICONS.FACEBOOK} alt="" />
                              </IconButton>
                            </Link>
                          )}
                          {companyDetail?.youtubeUrl && (
                            <Link
                              target="_blank"
                              href={companyDetail.youtubeUrl}
                            >
                              <IconButton color="primary" aria-label="youtube">
                                <img width="30" src={ICONS.YOUTUBE} alt="" />
                              </IconButton>
                            </Link>
                          )}
                          {companyDetail?.linkedinUrl && (
                            <Link
                              target="_blank"
                              href={companyDetail.linkedinUrl}
                            >
                              <IconButton color="primary" aria-label="linked">
                                <img width="30" src={ICONS.LINKEDIN} alt="" />
                              </IconButton>
                            </Link>
                          )}
                        </>
                      ) : (
                        <span
                          style={{
                            color: '#e0e0e0',
                            fontStyle: 'italic',
                            fontSize: 13,
                          }}
                        >
                          Chưa cập nhật
                        </span>
                      )}
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: '#441da0' }}>
                      Thông tin chung
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Typography>
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          style={{ marginRight: 6 }}
                        />{' '}
                        {companyDetail.companyEmail}
                      </Typography>
                      <Typography sx={{ mt: 1 }}>
                        <FontAwesomeIcon
                          icon={faPhoneVolume}
                          style={{ marginRight: 6 }}
                        />{' '}
                        {companyDetail.companyPhone}
                      </Typography>
                      <Typography sx={{ mt: 1 }}>
                        <FontAwesomeIcon
                          icon={faHashtag}
                          style={{ marginRight: 6 }}
                        />{' '}
                        {companyDetail.taxCode}
                      </Typography>
                      <Typography sx={{ mt: 1 }}>
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          style={{ marginRight: 6 }}
                        />{' '}
                        {companyDetail.location?.address || (
                          <span
                            style={{
                              color: '#e0e0e0',
                              fontStyle: 'italic',
                              fontSize: 13,
                            }}
                          >
                            Chưa cập nhật
                          </span>
                        )}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: '#441da0' }}>
                      Bản đồ
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Map
                        title={companyDetail?.companyName}
                        subTitle={companyDetail?.location?.address}
                        latitude={companyDetail?.location?.lat}
                        longitude={companyDetail?.location?.lng}
                      />
                    </Box>
                  </Box>
                  {imageList.length > 0 && (
                    <Box>
                      <Typography variant="h6" sx={{ color: '#441da0' }}>
                        Hình ảnh
                      </Typography>
                      <Box sx={{ mt: 1, borderRadius: 2, overflow: 'hidden' }}>
                        <ImageGalleryCustom images={imageList} />
                      </Box>
                    </Box>
                  )}
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Box>
      {/* Start: SocialNetworkSharingPopup */}
      <SocialNetworkSharingPopup
        open={openSharePopup}
        setOpenPopup={setOpenSharePopup}
        facebook={{
          url: window.location.href,
        }}
        facebookMessenger={{
          url: window.location.href,
        }}
        linkedin={{
          url: window.location.href,
          source: '',
          title: '',
          summary: '',
        }}
        twitter={{
          url: window.location.href,
          title: '',
          via: '',
          hashtags: [],
          related: [],
        }}
        email={{
          url: window.location.href,
          subject: '',
          body: '',
        }}
      />
      {/* End: SocialNetworkSharingPopup */}
    </>
  );
};

export default CompanyDetailPage;
