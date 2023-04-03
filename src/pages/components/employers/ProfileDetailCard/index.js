import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  Card,
  Divider,
  Grid,
  IconButton,
  Rating,
  Stack,
  Typography,
  Button,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import DownloadIcon from '@mui/icons-material/Download';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PrintIcon from '@mui/icons-material/Print';
import errorHandling from '../../../../utils/errorHandling';
import resumeService from '../../../../services/resumeService';
import { CV_TYPES } from '../../../../configs/constants';
import dayjs from 'dayjs';
import { salaryString } from '../../../../utils/customData';

const item = (title, value) => {
  return (
    <Box>
      <Typography sx={{ fontWeight: 'bold', fontSize: 15 }}>{title}</Typography>
      <Typography sx={{ textAlign: 'justify' }}>
        {value || (
          <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
            Chưa cập nhật
          </span>
        )}
      </Typography>
    </Box>
  );
};

const Loading = (
  <>
    <h1>Loading</h1>
  </>
);

const ProfileDetailCard = () => {
  const { slug: resumeSlug } = useParams();
  const { allConfig } = useSelector((state) => state.config);
  const [isLoading, setIsLoading] = React.useState(true);
  const [profileDetail, setProfileDetail] = React.useState(null);

  React.useEffect(() => {
    const getProfileDetail = async (resumeSlug) => {
      setIsLoading(true);

      try {
        const resData = await resumeService.getResumeDetail(resumeSlug);

        setProfileDetail(resData.data);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoading(false);
      }
    };

    getProfileDetail(resumeSlug);
  }, [resumeSlug]);

  return isLoading ? (
    Loading
  ) : profileDetail === null ? (
    <h1>NO DATA</h1>
  ) : (
    <Stack>
      <>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box>
              <Avatar
                src="https://res.cloudinary.com/dtnpj540t/image/upload/v1680550408/my-job/images_default/avatar_default.jpg"
                sx={{ width: 110, height: 110 }}
              />
            </Box>
            <Stack flex={1}>
              <Typography variant="h4">
                {profileDetail?.user?.fullName}
              </Typography>
              <Typography
                sx={{ fontWeight: 'bold', fontSize: 16, color: 'Gray' }}
              >
                {profileDetail?.title || (
                  <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
                    Chưa cập nhật
                  </span>
                )}
              </Typography>
              <Typography>
                Thời gian cập nhật:{' '}
                {dayjs(profileDetail?.updateAt).format('DD/MM/YYYY')}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" spacing={1} alignItems="center">
              <Button
                variant="contained"
                color="inherit"
                size="small"
                sx={{ color: 'Gray' }}
              >
                <PrintIcon />
              </Button>
              <Button
                variant="contained"
                color="inherit"
                size="small"
                sx={{ color: 'Gray' }}
              >
                <FavoriteBorderIcon />
              </Button>
            </Stack>
            {profileDetail?.type &&
              profileDetail.type === CV_TYPES.cvWebsite && (
                <Stack>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography sx={{ fontWeight: 'bold', color: 'Gray' }}>
                      CV đính kèm
                    </Typography>
                    <IconButton>
                      <DownloadIcon />
                    </IconButton>
                  </Stack>
                  <Box
                    sx={{ px: 1, backgroundColor: '#f2f3f7', borderRadius: 1 }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <FontAwesomeIcon icon={faFilePdf} color="red" />
                      <Typography>
                        1680540302_null_cv_vieclam24h_vn_16681736
                      </Typography>
                      <IconButton color="primary">
                        <RemoveRedEyeIcon />
                      </IconButton>
                    </Stack>
                  </Box>
                </Stack>
              )}
          </Stack>
        </Stack>
        <Divider sx={{ my: 2 }} />
        {/* Start: Personal Profile */}
        <Box>
          <Typography variant="h6" sx={{ mb: 1.5 }}>
            Thông tin cá nhân
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              {item(
                'Email',
                profileDetail?.user?.email || (
                  <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
                    Chưa cập nhật
                  </span>
                )
              )}
            </Grid>
            <Grid item xs={4}>
              {item(
                'Số điện thoại',
                profileDetail?.jobSeekerProfile?.phone || (
                  <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
                    Chưa cập nhật
                  </span>
                )
              )}
            </Grid>
            <Grid item xs={4}>
              {item(
                'Giới tính',
                allConfig?.genderDict[
                  profileDetail?.jobSeekerProfile?.gender
                ] || (
                  <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
                    Chưa cập nhật
                  </span>
                )
              )}
            </Grid>
            <Grid item xs={4}>
              {item(
                'Ngày sinh',
                dayjs(profileDetail?.jobSeekerProfile?.birthday).format(
                  'DD/MM/YYYY'
                ) || (
                  <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
                    Chưa cập nhật
                  </span>
                )
              )}
            </Grid>
            <Grid item xs={4}>
              {item(
                'Tình trạng hôn nhân',
                allConfig?.maritalStatusDict[
                  profileDetail?.jobSeekerProfile?.maritalStatus
                ] || (
                  <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
                    Chưa cập nhật
                  </span>
                )
              )}
            </Grid>
            <Grid item xs={4}>
              {item(
                'Tỉnh/Thành phố',
                allConfig?.cityDict[
                  profileDetail?.jobSeekerProfile?.location?.city
                ] || (
                  <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
                    Chưa cập nhật
                  </span>
                )
              )}
            </Grid>
            <Grid item xs={4}>
              {item(
                'Quận/Huyện',
                profileDetail?.jobSeekerProfile?.location?.districtDict
                  ?.name || (
                  <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
                    Chưa cập nhật
                  </span>
                )
              )}
            </Grid>
            <Grid item xs={4}>
              {item(
                'Địa chỉ',
                profileDetail?.jobSeekerProfile?.location?.address || (
                  <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
                    Chưa cập nhật
                  </span>
                )
              )}
            </Grid>
          </Grid>
        </Box>
        {/* End: Personal Profile */}
        <Divider sx={{ my: 2 }} />

        {/* Start: General Profile */}
        <Box>
          <Typography variant="h6" sx={{ mb: 1.5 }}>
            Thông tin chung
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              {item(
                'Vị trí mong muốn',
                profileDetail?.title || (
                  <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
                    Chưa cập nhật
                  </span>
                )
              )}
            </Grid>
            <Grid item xs={4}>
              {item(
                'Cấp bậc mong muốn',
                allConfig?.positionDict[profileDetail?.position] || (
                  <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
                    Chưa cập nhật
                  </span>
                )
              )}
            </Grid>
            <Grid item xs={4}>
              {item(
                'Trình độ học vấn',
                allConfig?.academicLevelDict[profileDetail?.academicLevel] || (
                  <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
                    Chưa cập nhật
                  </span>
                )
              )}
            </Grid>
            <Grid item xs={4}>
              {item(
                'Kinh nghiệm',
                allConfig?.experienceDict[profileDetail?.experience] || (
                  <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
                    Chưa cập nhật
                  </span>
                )
              )}
            </Grid>
            <Grid item xs={4}>
              {item(
                'Nghề nghiệp',
                allConfig?.careerDict[profileDetail?.career] || (
                  <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
                    Chưa cập nhật
                  </span>
                )
              )}
            </Grid>
            <Grid item xs={4}>
              {item(
                'Địa điểm làm việc',
                allConfig?.cityDict[profileDetail?.city] || (
                  <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
                    Chưa cập nhật
                  </span>
                )
              )}
            </Grid>
            <Grid item xs={4}>
              {item(
                'Mức lương mong muốn',
                salaryString(profileDetail?.salaryMin, profileDetail?.salaryMax)
              )}
            </Grid>
            <Grid item xs={4}>
              {item(
                'Nơi làm việc',
                allConfig?.typeOfWorkplaceDict[
                  profileDetail?.typeOfWorkplace
                ] || (
                  <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
                    Chưa cập nhật
                  </span>
                )
              )}
            </Grid>
            <Grid item xs={4}>
              {item(
                'Hình thức làm việc',
                allConfig?.jobTypeDict[profileDetail?.jobType] || (
                  <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
                    Chưa cập nhật
                  </span>
                )
              )}
            </Grid>
          </Grid>
        </Box>
        {/* End: General Profile */}
        <Divider sx={{ my: 2 }} />

        {/* Start: Career Goals */}
        <Box>
          <Typography variant="h6" sx={{ mb: 1.5 }}>
            Mục tiêu nghề nghiệp
          </Typography>
          <Box>
            <Card variant="outlined" sx={{ p: 2, borderWidth: 2 }}>
              <Typography>
                {profileDetail?.description || (
                  <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
                    Chưa cập nhật
                  </span>
                )}
              </Typography>
            </Card>
          </Box>
        </Box>
        {/* End: Career Goals */}
      </>

      {profileDetail?.type && profileDetail.type === CV_TYPES.cvWebsite && (
        <>
          {/* Start: Experience */}{' '}
          {(profileDetail?.experiencesDetails || []).length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Kinh nghiệm làm việc
              </Typography>
              <Box>
                <Card variant="outlined" sx={{ p: 2, borderWidth: 2 }}>
                  <Grid container spacing={1}>
                    {profileDetail.experiencesDetails.map((value, index) => (
                      <>
                        <Grid item xs={5} key={value.id}>
                          <Typography
                            sx={{ fontSize: 17.5, fontWeight: 'bold', mb: 0.5 }}
                          >
                            Nhân Viên Kế Toán
                          </Typography>
                          <Typography sx={{ fontWeight: 'bold', fontSize: 15 }}>
                            Dntn Tân Văn Lang Chiến Thắng
                          </Typography>
                          <Typography sx={{ color: 'gray' }}>
                            3/2015 - 4/2018
                          </Typography>
                        </Grid>
                        <Grid item xs={7}>
                          <Typography>
                            Kết toán sổ sách Báo cáo thuế, báo cáo tài chính
                            hàng quý, hàng năm.... Các công việc kế toán liên
                            quan
                          </Typography>
                        </Grid>
                        {index < profileDetail.educationDetails.length - 1 && (
                          <Grid item xs={12}>
                            <Divider />
                          </Grid>
                        )}
                      </>
                    ))}
                  </Grid>
                </Card>
              </Box>
            </Box>
          )}
          {/* End: Experience */}
          {/* Start: Education */}
          {(profileDetail?.educationDetails || []).length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Học vấn
              </Typography>
              <Box>
                <Card variant="outlined" sx={{ p: 2, borderWidth: 2 }}>
                  <Grid container spacing={1}>
                    {profileDetail.educationDetails.map((value, index) => (
                      <>
                        <Grid item xs={12} key={value.id}>
                          <Typography
                            sx={{ fontSize: 17.5, fontWeight: 'bold', mb: 0.5 }}
                          >
                            Cao đẳng-Chuyên ngành: Kế Toán
                          </Typography>
                          <Typography sx={{ fontWeight: 'bold', fontSize: 15 }}>
                            Đại Học Hùng Vương
                          </Typography>
                          <Typography sx={{ color: 'gray' }}>
                            8/2009 – 9/2012
                          </Typography>
                        </Grid>
                        {index < profileDetail.educationDetails.length - 1 && (
                          <Grid item xs={12}>
                            <Divider />
                          </Grid>
                        )}
                      </>
                    ))}
                  </Grid>
                </Card>
              </Box>
            </Box>
          )}
          {/* End: Education */}
          {/* Start: Cerfiticate */}
          {(profileDetail?.certificates || []).length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Chứng chỉ
              </Typography>
              <Box>
                <Card variant="outlined" sx={{ p: 2, borderWidth: 2 }}>
                  <Grid container spacing={1}>
                    {profileDetail.certificates.map((value, index) => (
                      <>
                        <Grid item xs={12} key={value.id}>
                          <Typography
                            sx={{ fontSize: 17.5, fontWeight: 'bold', mb: 0.5 }}
                          >
                            Chứng chỉ B
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 'bold',
                              fontSize: 13,
                              color: 'gray',
                            }}
                          >
                            Mức độ thành thạo
                          </Typography>
                          <Rating value={4} size="medium" />
                        </Grid>
                        {index < profileDetail.certificates.length - 1 && (
                          <Grid item xs={12}>
                            <Divider />
                          </Grid>
                        )}
                      </>
                    ))}
                  </Grid>
                </Card>
              </Box>
            </Box>
          )}
          {/* End: Cerfiticate */}
          {/* Start: Language */}
          {(profileDetail?.languageSkills || []).length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Ngôn ngữ
              </Typography>
              <Box>
                <Card variant="outlined" sx={{ p: 2, borderWidth: 2 }}>
                  <Grid container spacing={1}>
                    {profileDetail.languageSkills.map((value, index) => (
                      <>
                        <Grid item xs={12} key={value.id}>
                          <Typography
                            sx={{ fontSize: 17.5, fontWeight: 'bold', mb: 0.5 }}
                          >
                            Tiếng Anh
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 'bold',
                              fontSize: 13,
                              color: 'gray',
                            }}
                          >
                            Mức độ thành thạo
                          </Typography>
                          <Rating value={4} size="medium" />
                        </Grid>
                        {index < profileDetail.languageSkills.length - 1 && (
                          <Grid item xs={12}>
                            <Divider />
                          </Grid>
                        )}
                      </>
                    ))}
                  </Grid>
                </Card>
              </Box>
            </Box>
          )}
          {/* End: Language */}
          {/* Start: Skill advanced */}
          {(profileDetail?.advancedSkills || []).length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Kỹ năng chuyên môn
              </Typography>
              <Box>
                <Card variant="outlined" sx={{ p: 2, borderWidth: 2 }}>
                  <Grid container spacing={1}>
                    {profileDetail.advancedSkills.map((value, index) => (
                      <>
                        <Grid item xs={12} key={value.id}>
                          <Typography
                            sx={{ fontSize: 17.5, fontWeight: 'bold', mb: 0.5 }}
                          >
                            Java
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 'bold',
                              fontSize: 13,
                              color: 'gray',
                            }}
                          >
                            Mức độ thành thạo
                          </Typography>
                          <Rating value={4} readOnly size="medium" />
                        </Grid>
                        {index < profileDetail.advancedSkills.length - 1 && (
                          <Grid item xs={12}>
                            <Divider />
                          </Grid>
                        )}
                      </>
                    ))}
                  </Grid>
                </Card>
              </Box>
            </Box>
          )}
          {/* End: Skill advanced */}
        </>
      )}
    </Stack>
  );
};

export default ProfileDetailCard;
