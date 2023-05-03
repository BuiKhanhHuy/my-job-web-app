import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';

import {
  Box,
  Chip,
  Grid,
  Stack,
  Typography,
  Button,
  Divider,
  Tooltip,
  Skeleton,
} from '@mui/material';
import dayjs from 'dayjs';

import HelpIcon from '@mui/icons-material/Help';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import {
  faCalendar,
  faDollarSign,
  faMagicWandSparkles,
  faUser,
  faWarning,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CV_TYPES } from '../../../../configs/constants';
import BackdropLoading from '../../../../components/loading/BackdropLoading';
import toastMessages from '../../../../utils/toastMessages';
import errorHandling from '../../../../utils/errorHandling';
import MuiImageCustom from '../../../../components/MuiImageCustom';
import toSlug, { salaryString } from '../../../../utils/customData';
import NoDataCard from '../../../../components/NoDataCard';
import CVDoc from '../../../../components/CVDoc';
import { reloadResume } from '../../../../redux/profileSlice';
import jobSeekerProfileService from '../../../../services/jobSeekerProfileService';
import resumeService from '../../../../services/resumeService';

const Loading = () => {
  return (
    <Grid container spacing={3}>
      <Grid item>
        <Stack direction="row" alignItems="center" spacing={3}>
          <Skeleton width={130} height={130} variant="circular" />
          <Box
            sx={{
              display: {
                xs: 'none',
                sm: 'none',
                md: 'none',
                lg: 'none',
                xl: 'none',
              },
            }}
          >
            <Typography variant="h6">
              <Skeleton />
            </Typography>
            <Typography variant="h6">
              <Skeleton />
            </Typography>
          </Box>
        </Stack>
      </Grid>
      <Grid item flex={1}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Skeleton />
          </Grid>
          <Grid item xs={12}>
            <Skeleton />
          </Grid>
          <Grid item xs={12}>
            <Skeleton />
          </Grid>
          <Grid item xs={12}>
            <Skeleton />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <Skeleton />
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
          <Skeleton width={120} height={60} />
        </Stack>
      </Grid>
    </Grid>
  );
};

const BoxProfile = ({ title }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const {
    resume: { isReloadResume },
  } = useSelector((state) => state.profile);
  const { currentUser } = useSelector((state) => state.user);
  const { allConfig } = useSelector((state) => state.config);
  const [isLoadingResume, setIsLoadingResume] = React.useState(false);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);

  const [resume, setResume] = React.useState(null);

  React.useEffect(() => {
    const getOnlineProfile = async (jobSeekerProfileId, params) => {
      setIsLoadingResume(true);
      try {
        const resData = await jobSeekerProfileService.getResumes(
          jobSeekerProfileId,
          params
        );

        setResume(resData.data);
      } catch (error) {
      } finally {
        setIsLoadingResume(false);
      }
    };

    getOnlineProfile(currentUser?.jobSeekerProfileId, {
      resumeType: CV_TYPES.cvWebsite,
    });
  }, [currentUser, isReloadResume]);

  const handleActive = (slug) => {
    const activeResume = async (resumeSlug) => {
      setIsFullScreenLoading(true);
      try {
        await resumeService.activeResume(resumeSlug);

        dispatch(reloadResume());
        toastMessages.success('Thay đổi trạng thái hồ sơ thành công.');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    activeResume(slug);
  };

  return (
    <>
      <Stack>
        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">{title}</Typography>

            {resume != null && (
              <Stack direction="row" spacing={1} alignItems="center">
                <Stack direction="row">
                  {resume.isActive ? (
                    <Chip
                      sx={{ ml: 1 }}
                      size="small"
                      icon={<StarIcon color="warning" />}
                      color="success"
                      label="Cho phép tìm kiếm"
                      onClick={() => handleActive(resume.slug)}
                    />
                  ) : (
                    <Chip
                      variant="filled"
                      sx={{ ml: 1 }}
                      size="small"
                      icon={<StarOutlineIcon color="warning" />}
                      color="default"
                      label="Cho phép tìm kiếm"
                      onClick={() => handleActive(resume.slug)}
                    />
                  )}
                  <Tooltip
                    title={`Bật "Cho phép tìm kiếm" sẽ giúp nhà tuyển dụng tìm thấy hồ sơ của bạn và họ có thể liên hệ với bạn về công việc mới. Chỉ có duy nhất một hồ được bật trạng thái "cho phép tìm kiếm" trong tất cả hồ sơ của bạn.`}
                    arrow
                  >
                    <HelpIcon color="disabled" />
                  </Tooltip>
                </Stack>
                <PDFDownloadLink
                  document={<CVDoc />}
                  fileName={`MyJob_CV-${toSlug(resume?.title || 'title')}.pdf`}
                  style={{ textDecoration: 'none' }}
                >
                  {() => (
                    <Chip
                      sx={{ ml: 1, color: 'white' }}
                      size="small"
                      icon={<DownloadIcon />}
                      color="secondary"
                      label="Tải xuống"
                      onClick={() => {}}
                    />
                  )}
                </PDFDownloadLink>
              </Stack>
            )}
          </Stack>
        </Box>
        <Divider sx={{ mt: 2, mb: 3 }} />
        <Box sx={{ px: 1 }}>
          {isLoadingResume ? (
            <Loading />
          ) : resume === null ? (
            <h1>
              <NoDataCard />
            </h1>
          ) : (
            <Grid container spacing={3}>
              <Grid item>
                <Stack direction="row" alignItems="center" spacing={3}>
                  <MuiImageCustom
                    width={130}
                    height={130}
                    src={resume?.user?.avatarUrl}
                    sx={{ borderRadius: '50%' }}
                  />
                  <Box
                    sx={{
                      display: {
                        xs: 'block',
                        sm: 'block',
                        md: 'none',
                        lg: 'none',
                        xl: 'none',
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        textTransform: 'uppercase',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}
                    >
                      {resume?.user?.fullName}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="#5d677a"
                      sx={{ fontSize: 16 }}
                    >
                      {resume.title || (
                        <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
                          Chưa cập nhật
                        </span>
                      )}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                <Grid container spacing={1}>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: {
                        xs: 'none',
                        sm: 'none',
                        md: 'block',
                        lg: 'block',
                        xl: 'block',
                      },
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          textTransform: 'uppercase',
                          fontSize: 20,
                          fontWeight: 'bold',
                        }}
                      >
                        {resume?.user?.fullName}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: 16,
                          color:
                            theme.palette.mode === 'light'
                              ? '#121212'
                              : 'white',
                        }}
                      >
                        {resume.title || (
                          <span
                            style={{ color: '#9e9e9e', fontStyle: 'italic' }}
                          >
                            Chưa cập nhật
                          </span>
                        )}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={{ color: 'gray' }}>
                      <FontAwesomeIcon
                        icon={faMagicWandSparkles}
                        style={{ marginRight: 10 }}
                      />
                      Kinh nghiệm:{' '}
                      <span
                        style={{
                          color:
                            theme.palette.mode === 'light'
                              ? '#121212'
                              : 'white',
                          fontWeight: 'bold',
                        }}
                      >
                        {allConfig.experienceDict[resume.experience] || (
                          <span
                            style={{ color: '#9e9e9e', fontStyle: 'italic' }}
                          >
                            Chưa cập nhật
                          </span>
                        )}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={{ color: 'gray' }}>
                      <FontAwesomeIcon
                        icon={faUser}
                        style={{ marginRight: 10 }}
                      />
                      Cấp bậc:{' '}
                      <span
                        style={{
                          color:
                            theme.palette.mode === 'light'
                              ? '#121212'
                              : 'white',
                          fontWeight: 'bold',
                        }}
                      >
                        {allConfig.positionDict[resume.position] || (
                          <span
                            style={{ color: '#9e9e9e', fontStyle: 'italic' }}
                          >
                            Chưa cập nhật
                          </span>
                        )}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={{ color: 'gray' }}>
                      <FontAwesomeIcon
                        icon={faDollarSign}
                        style={{ marginRight: 10 }}
                      />
                      Mức lương mong muốn:{' '}
                      <span
                        style={{
                          color:
                            theme.palette.mode === 'light'
                              ? '#121212'
                              : 'white',
                          fontWeight: 'bold',
                        }}
                      >
                        {salaryString(resume.salaryMin, resume.salaryMax)}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={{ color: 'gray' }}>
                      <FontAwesomeIcon
                        icon={faCalendar}
                        style={{ marginRight: 10 }}
                      />
                      Ngày cập nhật:{' '}
                      <span
                        style={{
                          color:
                            theme.palette.mode === 'light'
                              ? '#121212'
                              : 'white',
                          fontWeight: 'bold',
                        }}
                      >
                        {dayjs(resume.updateAt).format('DD/MM/YYYY HH:mm:ss')}
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <FontAwesomeIcon
                    icon={faWarning}
                    style={{ marginRight: 5 }}
                    color="gray"
                  />
                  Vui lòng thêm tất cả các thông tin cần thiết để hoàn thành hồ
                  sơ của bạn.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() =>
                      nav(`/ung-vien/ho-so-tung-buoc/${resume.slug}`)
                    }
                  >
                    Chỉnh sửa hồ sơ
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          )}
        </Box>
      </Stack>

      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

export default BoxProfile;
