import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import {
  Avatar,
  Box,
  Card,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
  Button,
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

import { IMAGES } from '../../../configs/constants';
import errorHandling from '../../../utils/errorHandling';
import toastMessages from '../../../utils/toastMessages';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import linkedinIconSvg from '../../../assets/icons/linkedin-icon.svg';
import facebookIconSvg from '../../../assets/icons/facebook-icon.svg';
import youtubeIconSvg from '../../../assets/icons/youtube-icon.svg';
import MuiImageCustom from '../../../components/MuiImageCustom';
import NoDataCard from '../../../components/NoDataCard';
import ImageGalleryCustom from '../../../components/ImageGalleryCustom';
import companyService from '../../../services/companyService';
import FilterJobPostCard from '../../components/defaults/FilterJobPostCard';
import QRCode from 'react-qr-code';

const CompanyDetailPage = () => {
  const { slug } = useParams();
  const { allConfig } = useSelector((state) => state.config);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadingFollow, setIsLoadingFollow] = React.useState(false);
  const [companyDetail, setCompanyDetail] = React.useState(null);

  React.useEffect(() => {
    const getCompanyDetail = async (companySlug) => {
      try {
        const resData = await companyService.getCompanyDetailById(companySlug);

        setCompanyDetail(resData.data);
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
        setIsLoadingFollow(false);
      }
    };

    follow();
  };

  return isLoading ? (
    <h1>Loading</h1>
  ) : companyDetail === null ? (
    <NoDataCard />
  ) : (
    <Box>
      <Stack>
        <Card>
          <Box>
            <MuiImageCustom
              width="100%"
              src={
                companyDetail?.companyCoverImageUrl || IMAGES.coverImageDefault
              }
              sx={{ borderRadius: 1.5 }}
              duration={1500}
            />
          </Box>
          <Box sx={{ p: 3, pt: 1 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    bgcolor: 'white',
                    boxShadow: 5,
                    p: 0.5,
                    mt: -7,
                  }}
                  variant="rounded"
                  src={companyDetail.companyImageUrl}
                />
              </Box>
              <Box flex={1}>
                <Box>
                  <Typography variant="h5" gutterBottom>
                    {companyDetail.companyName}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={3}>
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
                        <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
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
              <Box sx={{pt: 1}}>
                <QRCode
                  size={75}
                  style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                  value={window.location.href}
                  viewBox={`0 0 256 256`}
                />
              </Box>
              <Stack spacing={1} justifyContent="center">
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
                    {' '}
                    {companyDetail.isFollowed ? 'Đang theo dõi' : 'Theo dõi'} (
                    {companyDetail.followNumber})
                  </span>
                </LoadingButton>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ textTransform: 'inherit' }}
                  startIcon={<ShareIcon />}
                >
                  Chia sẻ
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Card>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <Card sx={{ p: 3 }}>
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
                    <Typography>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: companyDetail?.description,
                        }}
                      ></div>
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
                    {/* <FilterJobPostCard
                      params={{
                        companyId: companyDetail.id,
                      }}
                    /> */}
                  </Box>
                </Box>
                {/* End: viec lam */}
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Card sx={{ p: 3 }}>
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
                              <img width="30" src={facebookIconSvg} alt="" />
                            </IconButton>
                          </Link>
                        )}
                        {companyDetail?.youtubeUrl && (
                          <Link target="_blank" href={companyDetail.youtubeUrl}>
                            <IconButton color="primary" aria-label="youtube">
                              <img width="30" src={youtubeIconSvg} alt="" />
                            </IconButton>
                          </Link>
                        )}
                        {companyDetail?.linkedinUrl && (
                          <Link
                            target="_blank"
                            href={companyDetail.linkedinUrl}
                          >
                            <IconButton color="primary" aria-label="linked">
                              <img width="30" src={linkedinIconSvg} alt="" />
                            </IconButton>
                          </Link>
                        )}
                      </>
                    ) : (
                      <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
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
                        <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
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
                  <Box sx={{ mt: 1 }}>Bản đồ</Box>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ color: '#441da0' }}>
                    Hình ảnh
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <ImageGalleryCustom />
                  </Box>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default CompanyDetailPage;
