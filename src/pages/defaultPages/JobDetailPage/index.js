import React from 'react';
import { useParams } from 'react-router-dom';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faCalendarDay,
  faEye,
  faClockFour,
} from '@fortawesome/free-solid-svg-icons';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';

import { salaryString } from '../../../utils/customData';
import NoDataCard from '../../../components/NoDataCard';
import JobPosts from '../../../components/JobPosts';
import jobService from '../../../services/jobService';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

const Loading = (
  <>
    <h1>Loading</h1>
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

const JobDetailPage = () => {
  const { slug } = useParams();
  const { allConfig } = useSelector((state) => state.config);
  const [isLoading, setIsLoading] = React.useState(true);
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

  return isLoading ? (
    Loading
  ) : jobPostDetail === null ? (
    <NoDataCard />
  ) : (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
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
                    <Typography variant="h6">
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
                    Lượt xem: {jobPostDetail?.viewedNumber}
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
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" size="large">
                    Nộp hồ sơ
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<FavoriteBorderIcon />}
                  >
                    Lưu
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<ShareIcon />}
                  >
                    Chia sẻ
                  </Button>
                </Stack>
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
            <Stack direction="row" spacing={2}>
              <Button variant="contained" size="large">
                Nộp hồ sơ
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<FavoriteBorderIcon />}
              >
                Lưu
              </Button>
              <Button variant="outlined" size="large" startIcon={<ShareIcon />}>
                Chia sẻ
              </Button>
            </Stack>
          </Card>
          {/* End: mo ta chi tiet */}

          {/* Start: thong tin lien he */}
          <Card sx={{ p: 4, mt: 3 }}>
            <Stack spacing={4}>
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
                  <Box>{item('Địa chỉ', jobPostDetail?.location?.address)}</Box>
                </Stack>
              </Box>
            </Stack>
          </Card>
          {/* End: thong tin lien he */}

          {/* Start: ban do */}
          <Card sx={{ p: 4, mt: 3 }}>
            <Stack spacing={4}>
              <Box>
                <Typography variant="h5">Bản đồ</Typography>
                <Stack sx={{ pt: 1 }} spacing={2}>
                  <Box>Map</Box>
                </Stack>
              </Box>
            </Stack>
          </Card>
          {/* End: ban do */}
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <Stack spacing={2}>
            <Card sx={{ p: 2, border: 1, borderColor: '#441da0' }}>
              <Stack direction="row">
                <FontAwesomeIcon
                  icon={faBell}
                  color="#441da0"
                  size="2x"
                  style={{ marginRight: 8 }}
                />
                <Typography variant="h6" color="#441da0">
                  Gửi tôi công việc tương tự
                </Typography>
              </Stack>
            </Card>
            <Card sx={{ py: 1, px: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6">Việc tương tự cho bạn</Typography>
              </Box>
              <Box>
                <JobPosts />
              </Box>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JobDetailPage;
