import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDay,
  faEye,
  faClockFour,
} from '@fortawesome/free-solid-svg-icons';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import toastMessages from '../../../utils/toastMessages';
import errorHandling from '../../../utils/errorHandling';
import { salaryString } from '../../../utils/customData';
import NoDataCard from '../../../components/NoDataCard';
import Map from '../../../components/Map';
import FilterJobPostCard from '../../components/defaults/FilterJobPostCard';
import jobService from '../../../services/jobService';

const Loading = (
  <>
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
          {/* Start: thong tin chung */}
          <Card sx={{ py: 2, px: 4 }}>
            <Stack>
              <Box>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Skeleton variant="circular" width={65} height={65} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">
                      <Skeleton />
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      <Skeleton width={200} />
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              <Box sx={{ my: 1 }}></Box>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="h5">
                    <Skeleton height={50} />
                  </Typography>
                </Box>
                <Stack direction="row" spacing={3}>
                  <Typography variant="subtitle2" sx={{ flex: 1 }}>
                    <Skeleton />
                  </Typography>
                  <Typography variant="subtitle2" sx={{ flex: 1 }}>
                    <Skeleton />
                  </Typography>
                  <Typography variant="subtitle2" sx={{ flex: 1 }}>
                    <Skeleton />
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Skeleton variant="rounded" width={100} height={40} />
                  <Skeleton variant="rounded" width={100} height={40} />
                  <Skeleton variant="rounded" width={100} height={40} />
                </Stack>
              </Stack>
              <Box sx={{ my: 1 }}></Box>
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Skeleton />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Skeleton />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Skeleton />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Skeleton />
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ my: 1 }}></Box>
              <Box>
                <Stack>
                  <Typography variant="h5" gutterBottom>
                    <Skeleton />
                  </Typography>
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Skeleton />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Skeleton />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Skeleton />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Skeleton />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Skeleton />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Skeleton />
                      </Grid>
                    </Grid>
                  </Box>
                </Stack>
              </Box>
              <Box></Box>
            </Stack>
          </Card>
          {/* End: thong tin chung */}

          {/* Start: mo ta chi tiet */}
          <Card sx={{ p: 4, mt: 3 }}>
            <Stack spacing={4}>
              <Box>
                <Typography variant="h5">
                  <Skeleton />
                </Typography>
                <Box sx={{ pt: 1 }}>
                  <Skeleton variant="rounded" height={100} />
                </Box>
              </Box>
              <Box>
                <Typography variant="h5">
                  <Skeleton />
                </Typography>
                <Box sx={{ pt: 1 }}>
                  <Skeleton variant="rounded" height={100} />
                </Box>
              </Box>
              <Box>
                <Typography variant="h5">
                  <Skeleton />
                </Typography>
                <Box sx={{ pt: 1 }}>
                  <Skeleton variant="rounded" height={100} />
                </Box>
              </Box>
            </Stack>
            <Box sx={{ my: 1 }}></Box>
            <Stack direction="row" spacing={2}>
              <Skeleton variant="rounded" width={100} height={40} />
              <Skeleton variant="rounded" width={100} height={40} />
              <Skeleton variant="rounded" width={100} height={40} />
            </Stack>
          </Card>
          {/* End: mo ta chi tiet */}

          {/* Start: thong tin lien he */}
          <Card sx={{ p: 4, mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Box>
                  <Typography variant="h5">
                    <Skeleton />
                  </Typography>
                  <Stack sx={{ pt: 1 }} spacing={2}>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </Stack>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box>
                  <Typography variant="h5">
                    <Skeleton />
                  </Typography>
                  <Stack sx={{ pt: 1 }} spacing={2}>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Card>
          {/* End: thong tin lien he */}
        </Grid>
      </Grid>
    </Box>
  </>
);

const item = (title, value) => {
  return (
    <Box>
      <Typography variant="body2" color="#bdbdbd" sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        sx={{ fontWeight: 'bold', textAlign: 'justify' }}
      >
        {value || (
          <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
            Chưa cập nhật
          </span>
        )}
      </Typography>
    </Box>
  );
};

const action = (
  isApplied,
  isSaved,
  isLoadingApply,
  isLoadingSave,
  handleSave
) => (
  <Stack direction="row" spacing={2}>
    <Button
      variant="contained"
      size="large"
      sx={{ textTransform: 'inherit' }}
      disabled={isApplied}
    >
      {isApplied ? 'Đã ứng tuyển' : 'Nộp hồ sơ'}
    </Button>
    <LoadingButton
      onClick={handleSave}
      startIcon={isSaved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      loading={isLoadingSave}
      loadingPosition="start"
      variant="outlined"
      sx={{ textTransform: 'inherit' }}
    >
      <span>{isSaved ? 'Đã lưu' : 'Lưu'}</span>
    </LoadingButton>
    <Button
      variant="outlined"
      size="large"
      startIcon={<ShareIcon />}
      sx={{ textTransform: 'inherit' }}
    >
      Chia sẻ
    </Button>
  </Stack>
);

const JobDetailPage = () => {
  const { slug } = useParams();
  const { allConfig } = useSelector((state) => state.config);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadingApply, setIsLoadingApply] = React.useState(false);
  const [isLoadingSave, setIsLoadingSave] = React.useState(false);
  const [jobPostDetail, setJobPostDetail] = React.useState(null);

  React.useEffect(() => {
    const getJobPostDetail = async (jobPostSlug) => {
      try {
        const resData = await jobService.getJobPostDetailById(jobPostSlug);

        setJobPostDetail(resData.data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    getJobPostDetail(slug);
  }, [slug]);

  const handleSave = () => {
    const saveJobPost = async () => {
      setIsLoadingSave(true);
      try {
        const resData = await jobService.saveJobPost(slug);
        const isSaved = resData.data.isSaved;

        setJobPostDetail({ ...jobPostDetail, isSaved: isSaved });
        toastMessages.success(
          isSaved ? 'Lưu thành công.' : 'Hủy lưu thành công.'
        );
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoadingSave(false);
      }
    };

    saveJobPost();
  };

  return isLoading ? (
    Loading
  ) : jobPostDetail === null ? (
    <NoDataCard />
  ) : (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
          {/* Start: thong tin chung */}
          <Card sx={{ py: 2, px: 4 }}>
            <Stack>
              <Box>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box>
                    <Avatar
                      sx={{
                        bgcolor: 'white',
                        boxShadow: 2,
                        p: 0.5,
                        width: 65,
                        height: 65,
                      }}
                      variant="rounded"
                      src={jobPostDetail?.companyDict?.companyImageUrl}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      component={Link}
                      to={`/cong-ty/${jobPostDetail?.companyDict?.slug}`}
                      sx={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      {jobPostDetail?.companyDict?.companyName}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      color="GrayText"
                    >
                      {allConfig?.employeeSizeDict[
                        jobPostDetail?.companyDict?.employeeSize
                      ] || (
                        <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
                          Chưa cập nhật
                        </span>
                      )}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Stack spacing={2}>
                <Box>
                  <Typography variant="h5" sx={{ fontSize: 26 }}>
                    {jobPostDetail?.jobName}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={3}>
                  <Typography variant="subtitle2">
                    <FontAwesomeIcon
                      icon={faCalendarDay}
                      style={{ marginRight: 6, fontSize: 15, color: '#bdbdbd' }}
                    />{' '}
                    Hạn nộp hồ sơ:{' '}
                    {dayjs(jobPostDetail?.deadline).format('DD/MM/YYYY')}
                  </Typography>
                  <Typography variant="subtitle2">
                    <FontAwesomeIcon
                      icon={faEye}
                      style={{ marginRight: 6, fontSize: 15, color: '#bdbdbd' }}
                    />{' '}
                    Lượt xem: {jobPostDetail?.views}
                  </Typography>
                  <Typography variant="subtitle2">
                    <FontAwesomeIcon
                      icon={faClockFour}
                      style={{ marginRight: 6, fontSize: 15, color: '#bdbdbd' }}
                    />{' '}
                    Đăng ngày:{' '}
                    {dayjs(jobPostDetail?.createAt).format('DD/MM/YYYY')}
                  </Typography>
                </Stack>
                {action(
                  jobPostDetail.isApplied,
                  jobPostDetail.isSaved,
                  isLoadingApply,
                  isLoadingSave,
                  handleSave
                )}
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Typography
                      variant="body2"
                      gutterBottom
                      color="#bdbdbd"
                      sx={{ fontWeight: 'bold' }}
                    >
                      Yêu cầu kinh nghiệm
                    </Typography>
                    <Typography
                      variant="body1"
                      gutterBottom
                      sx={{ fontWeight: 'bold' }}
                    >
                      {allConfig?.experienceDict[jobPostDetail?.experience] || (
                        <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
                          Chưa cập nhật
                        </span>
                      )}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Typography
                      variant="body2"
                      gutterBottom
                      color="#bdbdbd"
                      sx={{ fontWeight: 'bold' }}
                    >
                      Mức lương
                    </Typography>
                    <Typography
                      variant="body1"
                      gutterBottom
                      sx={{ fontWeight: 'bold' }}
                    >
                      {salaryString(
                        jobPostDetail?.salaryMin,
                        jobPostDetail?.salaryMax
                      )}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Typography
                      variant="body2"
                      gutterBottom
                      color="#bdbdbd"
                      sx={{ fontWeight: 'bold' }}
                    >
                      Cấp bậc
                    </Typography>
                    <Typography
                      variant="body1"
                      gutterBottom
                      sx={{ fontWeight: 'bold' }}
                    >
                      {allConfig?.positionDict[jobPostDetail?.position] || (
                        <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
                          Chưa cập nhật
                        </span>
                      )}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Typography
                      variant="body2"
                      gutterBottom
                      color="#bdbdbd"
                      sx={{ fontWeight: 'bold' }}
                    >
                      Hình thức làm việc
                    </Typography>
                    <Typography
                      variant="body1"
                      gutterBottom
                      sx={{ fontWeight: 'bold' }}
                    >
                      {allConfig?.jobTypeDict[jobPostDetail?.jobType] || (
                        <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
                          Chưa cập nhật
                        </span>
                      )}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box>
                <Stack>
                  <Typography variant="h5" gutterBottom>
                    Thông tin
                  </Typography>
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        {item(
                          'Nghề nghiệp',
                          allConfig.careerDict[jobPostDetail?.career]
                        )}
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        {item(
                          'Nơi làm việc',
                          allConfig.typeOfWorkplaceDict[
                            jobPostDetail?.typeOfWorkplace
                          ]
                        )}
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        {item(
                          'Học vấn',
                          allConfig.academicLevelDict[
                            jobPostDetail?.academicLevel
                          ]
                        )}
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        {item('Số lượng tuyển', jobPostDetail?.quantity)}
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        {item(
                          'Khu vực tuyển',
                          allConfig.cityDict[jobPostDetail?.location?.city]
                        )}
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        {item(
                          'Yêu cầu giới tính',
                          allConfig.genderDict[jobPostDetail?.genderRequired]
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                </Stack>
              </Box>
              <Box></Box>
            </Stack>
          </Card>
          {/* End: thong tin chung */}

          {/* Start: mo ta chi tiet */}
          <Card sx={{ p: 4, mt: 3 }}>
            <Stack spacing={4}>
              <Box>
                <Typography variant="h5">Mô tả công việc</Typography>
                <Box sx={{ pt: 1 }}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: jobPostDetail?.jobDescription,
                    }}
                  ></div>
                </Box>
              </Box>
              <Box>
                <Typography variant="h5">Yêu cầu công việc</Typography>
                <Box sx={{ pt: 1 }}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: jobPostDetail?.jobRequirement,
                    }}
                  ></div>
                </Box>
              </Box>
              <Box>
                <Typography variant="h5">Quyền lợi</Typography>
                <Box sx={{ pt: 1 }}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: jobPostDetail?.benefitsEnjoyed,
                    }}
                  ></div>
                </Box>
              </Box>
            </Stack>
            <Divider sx={{ my: 2 }} />
            {action(
              jobPostDetail.isApplied,
              jobPostDetail.isSaved,
              isLoadingApply,
              isLoadingSave,
              handleSave
            )}
          </Card>
          {/* End: mo ta chi tiet */}

          {/* Start: thong tin lien he */}
          <Card sx={{ p: 4, mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Box>
                  <Typography variant="h5">Thông tin liên hệ</Typography>
                  <Stack sx={{ pt: 1 }} spacing={2}>
                    <Box>
                      {item('Người liên hệ', jobPostDetail?.contactPersonName)}
                    </Box>
                    <Box>
                      {item('Email liên hệ', jobPostDetail?.contactPersonEmail)}
                    </Box>
                    <Box>
                      {item('SĐT liên hệ', jobPostDetail?.contactPersonPhone)}
                    </Box>
                    <Box>
                      {item('Địa chỉ', jobPostDetail?.location?.address)}
                    </Box>
                  </Stack>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box>
                  <Typography
                    variant="body2"
                    color="#bdbdbd"
                    sx={{ fontWeight: 'bold' }}
                  >
                    Bản đồ
                  </Typography>
                  <Stack sx={{ pt: 1 }} spacing={2}>
                    <Box>{/* <Map /> */}</Box>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Card>
          {/* End: thong tin lien he */}
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Card sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Typography variant="h5">Việc làm tương tự</Typography>
              <Box
                sx={{ width: 120, height: 5, backgroundColor: '#441da0' }}
              ></Box>
              <Box>
                {/* Start: FilterJobPostCard */}
                {/* <FilterJobPostCard
                  params={{
                    excludeSlug: jobPostDetail?.slug,
                  }}
                /> */}
                {/* End: FilterJobPostCard */}
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JobDetailPage;
