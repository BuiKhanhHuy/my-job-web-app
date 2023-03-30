import * as React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Chip,
  Grid,
  Stack,
  Typography,
  Button,
  Divider,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import ReplyIcon from '@mui/icons-material/Reply';
import DownloadIcon from '@mui/icons-material/Download';
import {
  faCalendar,
  faDollarSign,
  faMagicWandSparkles,
  faUser,
  faWarning,
} from '@fortawesome/free-solid-svg-icons';

import jobSeekerProfileService from '../../../../services/jobSeekerProfileService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CV_TYPES } from '../../../../configs/constants';
import dayjs from 'dayjs';
import { salaryString } from '../../../../utils/customData';
import NoDataCard from '../../../../components/NoDataCard';
import MuiImageCustom from '../../../../components/MuiImageCustom';

const BoxProfile = ({ title }) => {
  const nav = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { allConfig } = useSelector((state) => state.config);
  const [isLoadingResume, setIsLoadingResume] = React.useState(false);
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
  }, [currentUser]);

  return (
    <Stack>
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">{title}</Typography>

          {resume && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip
                sx={{ color: 'white' }}
                size="small"
                icon={<ReplyIcon />}
                color="secondary"
                label="Chia sẻ"
                onClick={() => {}}
              />
              <Chip
                sx={{ ml: 1, color: 'white' }}
                size="small"
                icon={<DownloadIcon />}
                color="secondary"
                label="Tải xuống"
                onClick={() => {}}
              />
            </Stack>
          )}
        </Stack>
      </Box>
      <Divider sx={{ mt: 2, mb: 3 }} />
      <Box sx={{ px: 1 }}>
        {isLoadingResume ? (
          <h1>Loading...</h1>
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
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ color: 'gray' }}>
                    <FontAwesomeIcon
                      icon={faMagicWandSparkles}
                      style={{ marginRight: 10 }}
                    />
                    Kinh nghiệm:{' '}
                    <span style={{ color: 'black', fontWeight: 'bold' }}>
                      {allConfig.experienceDict[resume.experience] || (
                        <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
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
                    <span style={{ color: 'black', fontWeight: 'bold' }}>
                      {allConfig.positionDict[resume.position] || (
                        <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
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
                    <span style={{ color: 'black', fontWeight: 'bold' }}>
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
                    <span style={{ color: 'black', fontWeight: 'bold' }}>
                      {dayjs(resume.updateAt).format('DD/MM/YYYY HH:mm:ss')}
                    </span>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom sx={{ mt: 2 }}>
                Mức độ hoàn thành:{' '}
                <span style={{ fontWeight: 'bold', color: 'orange' }}>
                  Trung bình
                </span>
              </Typography>
              <Typography>
                <FontAwesomeIcon
                  icon={faWarning}
                  style={{ marginRight: 5 }}
                  color="gray"
                />
                Vui lòng thêm tất cả các thông tin cần thiết để hoàn thành hồ sơ
                của bạn.
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
  );
};

export default BoxProfile;
