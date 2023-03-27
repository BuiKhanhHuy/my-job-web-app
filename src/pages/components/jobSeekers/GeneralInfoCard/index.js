import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Box,
  Divider,
  Fab,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import FormPopup from '../../../../components/controls/FormPopup';
import GeneralInfoForm from '../GeneralInfoForm';
import toastMessages from '../../../../utils/toastMessages';
import errorHandling from '../../../../utils/errorHandling';
import BackdropLoading from '../../../../components/loading/BackdropLoading';

import resumeService from '../../../../services/resumeService';
import { salaryString } from '../../../../utils/customData';

const Loading = (
  <>
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Typography variant="h6" flex={1}>
          <Skeleton />
        </Typography>
        <Box>
          <Skeleton variant="circular" width={50} height={50} />
        </Box>
      </Stack>
    </Box>
    <Box sx={{ px: 1 }}>
      <Box sx={{ py: 2 }}>
        <Skeleton height={5} />
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          {Array(8)
            .fill(0)
            .map((item, index) => (
              <Typography component="div" variant="h5" key={index}>
                <Skeleton />
              </Typography>
            ))}
        </Grid>
        <Grid item xs={6}>
          {Array(8)
            .fill(0)
            .map((item, index) => (
              <Typography component="div" variant="h5" key={index}>
                <Skeleton />
              </Typography>
            ))}
        </Grid>
      </Grid>
    </Box>
  </>
);

const item = (title, value) => {
  return (
    <Box>
      <Typography sx={{ fontWeight: 'bold' }}>{title}</Typography>
      <Typography sx={{textAlign: 'justify'}}>
        {value || (
          <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
            Chưa cập nhật
          </span>
        )}
      </Typography>
    </Box>
  );
};

const GeneralInfoCard = ({ title }) => {
  const { slug: resumeSlug } = useParams();
  const { allConfig } = useSelector((state) => state.config);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoadingResumeDetail, setIsLoadingResumeDetail] =
    React.useState(true);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [resumeDetail, setResumeDetail] = React.useState({});

  React.useEffect(() => {
    const getResumeDetail = async (resumeSlug) => {
      try {
        const resData = await resumeService.getResumeOwner(resumeSlug);

        console.log(resData.data);
        setResumeDetail(resData.data);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoadingResumeDetail(false);
      }
    };

    getResumeDetail(resumeSlug);
  }, [isSuccess, resumeSlug]);

  const handleUpdateResumeDetail = (data) => {
    const updateResume = async (resumeSlug, data) => {
      setIsFullScreenLoading(true);
      try {
        await resumeService.updateResume(resumeSlug, data);

        setIsSuccess(!isSuccess);
        setOpenPopup(false);
        toastMessages.success('Cập nhật thông tin hồ sơ thành công.');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    updateResume(resumeSlug, data);
  };

  return (
    <>
      <Box>
        <Stack>
          {isLoadingResumeDetail ? (
            Loading
          ) : resumeDetail === null ? (
            <h1>PRofile detail null</h1>
          ) : (
            <>
              <Box>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6">{title}</Typography>
                  <Fab
                    size="small"
                    color="secondary"
                    aria-label="edit"
                    onClick={() => setOpenPopup(true)}
                  >
                    <EditIcon sx={{ color: 'white' }} />
                  </Fab>
                </Stack>
              </Box>
              <Divider sx={{ mt: 2, mb: 3 }} />
              <Box sx={{ px: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    {item('Mục tiêu nghề nghiệp', resumeDetail?.description)}
                    <Divider sx={{ pt: 2, pb: 2 }} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Stack spacing={2}>
                      {item('Vị trí mong muốn', resumeDetail?.title)}
                      {item(
                        'Cấp bậc mong muốn',
                        allConfig.positionDict[resumeDetail?.position]
                      )}
                      {item(
                        'Trình độ học vấn',
                        allConfig.academicLevelDict[resumeDetail?.academicLevel]
                      )}
                      {item(
                        'Kinh nghiệm',
                        allConfig.experienceDict[resumeDetail?.experience]
                      )}
                      {item(
                        'Nghề nghiệp',
                        allConfig.careerDict[resumeDetail?.career]
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Stack spacing={2}>
                      {item(
                        'Địa điểm làm việc',
                        allConfig.cityDict[resumeDetail?.city]
                      )}
                      {item(
                        'Mức lương mong muốn',
                        salaryString(
                          resumeDetail?.salaryMin,
                          resumeDetail?.salaryMax
                        )
                      )}
                      {item(
                        'Nơi làm việc',
                        allConfig.typeOfWorkplaceDict[
                          resumeDetail?.typeOfWorkplace
                        ]
                      )}
                      {item(
                        'Hình thức làm việc',
                        allConfig.jobTypeDict[resumeDetail?.jobType]
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
        </Stack>
      </Box>

      {/* Start: form  */}
      <FormPopup
        title="Thông tin hồ sơ"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <GeneralInfoForm
          handleUpdate={handleUpdateResumeDetail}
          editData={resumeDetail}
        />
      </FormPopup>
      {/* End: form */}

      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

export default GeneralInfoCard;
