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
  Skeleton,
} from '@mui/material';
import ReactToPrint from 'react-to-print';
import Moment from 'react-moment';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import DownloadIcon from '@mui/icons-material/Download';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PrintIcon from '@mui/icons-material/Print';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';

import { CV_TYPES } from '../../../../configs/constants';
import { salaryString } from '../../../../utils/customData';
import NoDataCard from '../../../../components/NoDataCard';
import downloadPdf from '../../../../utils/funcUtils';
import toastMessages from '../../../../utils/toastMessages';
import FormPopup from '../../../../components/controls/FormPopup';
import errorHandling from '../../../../utils/errorHandling';
import resumeService from '../../../../services/resumeService';
import Pdf from '../../../../components/Pdf';
import SendMailCard from '../SendMailCard';

const item = (title, value) => {
  return (
    <Box>
      <Typography sx={{ fontWeight: 'bold', fontSize: 15 }}>{title}</Typography>
      <Typography sx={{ textAlign: 'justify' }}>
        {value || (
           <span style={{ color: '#e0e0e0', fontStyle: 'italic', fontSize: 13 }}>
           Chưa cập nhật
         </span>
        )}
      </Typography>
    </Box>
  );
};

const Loading = (
  <>
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Box>
          <Skeleton width={110} height={110} variant="circular" />
        </Box>
        <Stack flex={1}>
          <Typography variant="h4">
            <Skeleton />
          </Typography>
          <Typography>
            <Skeleton />
          </Typography>
          <Typography>
            <Skeleton />
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="space-between" spacing={4}>
        <Skeleton width={'100%'} />
        <Skeleton width={'100%'} />
        <Skeleton width={'100%'} />
        <Skeleton width={'100%'} />
      </Stack>
    </Stack>
    <Box sx={{ my: 2 }}></Box>
    {/* Start: Personal Profile */}
    <Box>
      <Typography variant="h6" sx={{ mb: 1.5 }}>
        <Skeleton />
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
      </Grid>
    </Box>
    {/* End: Personal Profile */}
    <Box sx={{ my: 2 }}></Box>

    {/* Start: General Profile */}
    <Box>
      <Typography variant="h6" sx={{ mb: 1.5 }}>
        <Skeleton />
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
      </Grid>
    </Box>
    {/* End: General Profile */}
    <Box sx={{ my: 2 }}></Box>
    <Box>
      <Typography variant="h6" sx={{ mb: 1.5 }}>
        <Skeleton />
      </Typography>
      <Box sx={{ py: 2 }}>
        <Skeleton height={200} />
      </Box>
    </Box>
  </>
);

const ProfileDetailCard = () => {
  const { slug: resumeSlug } = useParams();
  const { allConfig } = useSelector((state) => state.config);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [openSendMailPopup, setOpenSendMailPopup] = React.useState(false);
  const [sendMailData, setSendMailData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [profileDetail, setProfileDetail] = React.useState(null);

  let printComponentRef = React.useRef();
  let actionRef = React.useRef();
  let printContainerRef = React.useRef();

  React.useEffect(() => {
    const viewResume = async (resumeSlug) => {
      try {
        await resumeService.viewResume(resumeSlug);
      } catch (error) {
        console.error('Lỗi khi xem CV! ', error);
      }
    };

    viewResume(resumeSlug);
  }, [resumeSlug]);

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

  const handleSave = (slug) => {
    const save = async (slugResume) => {
      try {
        const resData = await resumeService.saveResume(slugResume);
        const isSaved = resData.data.isSaved;

        setProfileDetail({ ...profileDetail, isSaved: isSaved });
        toastMessages.success(
          isSaved ? 'Lưu thành công.' : 'Hủy lưu thành công.'
        );
      } catch (error) {
        errorHandling(error);
      }
    };

    save(slug);
  };

  const handleSendMail = (email, fullName) => {
    setSendMailData({
      fullName: fullName,
      email: email,
    });
    setOpenSendMailPopup(true);
  };

  return isLoading ? (
    Loading
  ) : profileDetail === null ? (
    <NoDataCard
      title={
        <p>
          Không tìm thấy thông tin hồ sơ.
          <br /> Có thể hồ sơ này đã được đặt chế độ không cho phép tìm kiếm.
        </p>
      }
    />
  ) : (
    <>
      <Box ref={(el) => (printComponentRef = el)}>
        <Stack ref={printContainerRef}>
          <>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box>
                  <Avatar
                    src= {profileDetail?.user?.avatarUrl}
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
                       <span style={{ color: '#e0e0e0', fontStyle: 'italic', fontSize: 13 }}>
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
              <Stack
                direction="row"
                justifyContent="space-between"
                ref={actionRef}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <ReactToPrint
                    trigger={() => (
                      <Button
                        variant="contained"
                        color="inherit"
                        size="small"
                        sx={{ color: 'Gray' }}
                      >
                        <PrintIcon />
                      </Button>
                    )}
                    content={() => printComponentRef}
                    onBeforeGetContent={() => {
                      actionRef.current.style.display = 'none';
                      printContainerRef.current.style.padding = '30px';
                    }}
                    onAfterPrint={() => {
                      actionRef.current.style.display = 'inherit';
                      printContainerRef.current.style.padding = 'inherit';
                    }}
                  />
                  <Button
                    variant="contained"
                    color="inherit"
                    size="small"
                    sx={{ color: 'Gray' }}
                    onClick={() => handleSave(profileDetail?.slug)}
                  >
                    {profileDetail?.isSaved ? (
                      <FavoriteIcon color="error" />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="inherit"
                    sx={{ color: 'Gray' }}
                    onClick={() =>
                      handleSendMail(
                        profileDetail?.user?.email,
                        profileDetail?.user?.fullName
                      )
                    }
                  >
                    <ForwardToInboxIcon />
                  </Button>
                </Stack>
                {profileDetail?.type &&
                  profileDetail.type === CV_TYPES.cvUpload && (
                    <Stack>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography sx={{ fontWeight: 'bold', color: 'Gray' }}>
                          CV đính kèm
                        </Typography>
                        <IconButton
                          onClick={() =>
                            downloadPdf(
                              profileDetail?.fileUrl,
                              profileDetail?.title
                            )
                          }
                        >
                          <DownloadIcon />
                        </IconButton>
                      </Stack>
                      <Box
                        sx={{
                          px: 1,
                          backgroundColor: '#f2f3f7',
                          borderRadius: 1,
                        }}
                      >
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <FontAwesomeIcon icon={faFilePdf} color="red" />
                          <Typography>
                            {profileDetail?.filePublicId}.pdf
                          </Typography>
                          <IconButton
                            color="primary"
                            onClick={() => setOpenPopup(true)}
                          >
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
                      <span style={{ color: '#e0e0e0', fontStyle: 'italic', fontSize: 13 }}>
                      Chưa cập nhật
                    </span>
                    )
                  )}
                </Grid>
                <Grid item xs={4}>
                  {item(
                    'Số điện thoại',
                    profileDetail?.jobSeekerProfile?.phone || (
                      <span style={{ color: '#e0e0e0', fontStyle: 'italic', fontSize: 13 }}>
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
                      <span style={{ color: '#e0e0e0', fontStyle: 'italic', fontSize: 13 }}>
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
                      <span style={{ color: '#e0e0e0', fontStyle: 'italic', fontSize: 13 }}>
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
                      <span style={{ color: '#e0e0e0', fontStyle: 'italic', fontSize: 13 }}>
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
                      <span style={{ color: '#e0e0e0', fontStyle: 'italic', fontSize: 13 }}>
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
                        <span style={{ color: '#e0e0e0', fontStyle: 'italic', fontSize: 13 }}>
                        Chưa cập nhật
                      </span>
                    )
                  )}
                </Grid>
                <Grid item xs={4}>
                  {item(
                    'Địa chỉ',
                    profileDetail?.jobSeekerProfile?.location?.address || (
                      <span style={{ color: '#e0e0e0', fontStyle: 'italic', fontSize: 13 }}>
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
                      <span style={{ color: '#e0e0e0', fontStyle: 'italic', fontSize: 13 }}>
                      Chưa cập nhật
                    </span>
                    )
                  )}
                </Grid>
                <Grid item xs={4}>
                  {item(
                    'Cấp bậc mong muốn',
                    allConfig?.positionDict[profileDetail?.position] || (
                      <span style={{ color: '#e0e0e0', fontStyle: 'italic', fontSize: 13 }}>
                      Chưa cập nhật
                    </span>
                    )
                  )}
                </Grid>
                <Grid item xs={4}>
                  {item(
                    'Trình độ học vấn',
                    allConfig?.academicLevelDict[
                      profileDetail?.academicLevel
                    ] || (
                      <span style={{ color: '#e0e0e0', fontStyle: 'italic', fontSize: 13 }}>
                      Chưa cập nhật
                    </span>
                    )
                  )}
                </Grid>
                <Grid item xs={4}>
                  {item(
                    'Kinh nghiệm',
                    allConfig?.experienceDict[profileDetail?.experience] || (
                      <span style={{ color: '#e0e0e0', fontStyle: 'italic', fontSize: 13 }}>
                      Chưa cập nhật
                    </span>
                    )
                  )}
                </Grid>
                <Grid item xs={4}>
                  {item(
                    'Nghề nghiệp',
                    allConfig?.careerDict[profileDetail?.career] || (
                      <span style={{ color: '#e0e0e0', fontStyle: 'italic', fontSize: 13 }}>
                      Chưa cập nhật
                    </span>
                    )
                  )}
                </Grid>
                <Grid item xs={4}>
                  {item(
                    'Địa điểm làm việc',
                    allConfig?.cityDict[profileDetail?.city] || (
                      <span style={{ color: '#e0e0e0', fontStyle: 'italic', fontSize: 13 }}>
                      Chưa cập nhật
                    </span>
                    )
                  )}
                </Grid>
                <Grid item xs={4}>
                  {item(
                    'Mức lương mong muốn',
                    salaryString(
                      profileDetail?.salaryMin,
                      profileDetail?.salaryMax
                    )
                  )}
                </Grid>
                <Grid item xs={4}>
                  {item(
                    'Nơi làm việc',
                    allConfig?.typeOfWorkplaceDict[
                      profileDetail?.typeOfWorkplace
                    ] || (
                      <span style={{ color: '#e0e0e0', fontStyle: 'italic', fontSize: 13 }}>
                      Chưa cập nhật
                    </span>
                    )
                  )}
                </Grid>
                <Grid item xs={4}>
                  {item(
                    'Hình thức làm việc',
                    allConfig?.jobTypeDict[profileDetail?.jobType] || (
                      <span style={{ color: '#e0e0e0', fontStyle: 'italic', fontSize: 13 }}>
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
                       <span style={{ color: '#e0e0e0', fontStyle: 'italic', fontSize: 13 }}>
                       Chưa cập nhật
                     </span>
                    )}
                  </Typography>
                </Card>
              </Box>
            </Box>
            {/* End: Career Goals */}
          </>

          {profileDetail?.type && profileDetail.type === CV_TYPES.cvWebsite ? (
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
                        {profileDetail.experiencesDetails.map(
                          (value, index) => (
                            <>
                              <Grid item xs={5} key={value.id}>
                                <Typography
                                  sx={{
                                    fontSize: 17.5,
                                    fontWeight: 'bold',
                                    mb: 0.5,
                                  }}
                                >
                                  {value?.jobName}
                                </Typography>
                                <Typography
                                  sx={{ fontWeight: 'bold', fontSize: 15 }}
                                >
                                  {value?.companyName}
                                </Typography>
                                <Typography sx={{ color: 'gray' }}>
                                  {dayjs(value?.startDate).format('DD/MM/YYYY')}{' '}
                                  - {dayjs(value?.endDate).format('DD/MM/YYYY')}
                                </Typography>
                              </Grid>
                              <Grid item xs={7}>
                                <Typography>
                                  {value?.description || (
                                     <span style={{ color: '#e0e0e0', fontStyle: 'italic', fontSize: 13 }}>
                                     Chưa cập nhật
                                   </span>
                                  )}
                                </Typography>
                              </Grid>
                              {index <
                                profileDetail.educationDetails.length - 1 && (
                                <Grid item xs={12}>
                                  <Divider />
                                </Grid>
                              )}
                            </>
                          )
                        )}
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
                                sx={{
                                  fontSize: 17.5,
                                  fontWeight: 'bold',
                                  mb: 0.5,
                                }}
                              >
                                {value?.degreeName} - Chuyên ngành:{' '}
                                {value?.major}
                              </Typography>
                              <Typography
                                sx={{ fontWeight: 'bold', fontSize: 15 }}
                              >
                                {value?.trainingPlaceName}
                              </Typography>
                              <Typography sx={{ color: 'gray' }}>
                                <Moment format="DD/MM/yyyy">
                                  {value?.startDate}
                                </Moment>{' '}
                                -{' '}
                                {value.completedDate ? (
                                  <Moment format="DD/MM/yyyy">
                                    {value?.completedDate}
                                  </Moment>
                                ) : (
                                  'Hiện tại'
                                )}
                              </Typography>
                            </Grid>
                            {index <
                              profileDetail.educationDetails.length - 1 && (
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
                                sx={{
                                  fontSize: 17.5,
                                  fontWeight: 'bold',
                                  mb: 0.5,
                                }}
                              >
                                {value?.name}
                              </Typography>
                              <Typography
                                sx={{ fontWeight: 'bold', fontSize: 15 }}
                              >
                                {value?.trainingPlace}
                              </Typography>
                              <Typography sx={{ color: 'gray' }}>
                                {value.expirationDate ? (
                                  <>
                                    <Moment format="DD/MM/yyyy">
                                      {value.startDate}
                                    </Moment>{' '}
                                    -{' '}
                                    <Moment format="DD/MM/yyyy">
                                      {value.expirationDate}
                                    </Moment>
                                  </>
                                ) : (
                                  'Không thời hạn'
                                )}
                              </Typography>
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
                                sx={{
                                  fontSize: 17.5,
                                  fontWeight: 'bold',
                                  mb: 0.5,
                                }}
                              >
                                {allConfig?.languageDict[value?.language]}
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
                              <Rating value={value?.level || 0} size="medium" readOnly/>
                            </Grid>
                            {index <
                              profileDetail.languageSkills.length - 1 && (
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
                                sx={{
                                  fontSize: 17.5,
                                  fontWeight: 'bold',
                                  mb: 0.5,
                                }}
                              >
                                {value?.name}
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
                              <Rating
                                value={value?.level || 0}
                                readOnly
                                size="medium"
                              />
                            </Grid>
                            {index <
                              profileDetail.advancedSkills.length - 1 && (
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
          ) : (
            <>
              {/* Start: Popup  */}
              <FormPopup
                title="Xem CV đính kèm"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                showDialogAction={false}
              >
                <Pdf
                  fileUrl={profileDetail?.fileUrl}
                  title={profileDetail?.title}
                />
              </FormPopup>
              {/* End: Popup */}
            </>
          )}
        </Stack>
      </Box>
      {/* Start: send mail */}
      <SendMailCard
        openPopup={openSendMailPopup}
        setOpenPopup={setOpenSendMailPopup}
        sendMailData={sendMailData}
      />
      {/* Start:  send mail */}
    </>
  );
};

export default ProfileDetailCard;
