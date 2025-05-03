/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

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
import EditIcon from "@mui/icons-material/Edit";

import FormPopup from '../../../../components/controls/FormPopup';
import GeneralInfoForm from '../GeneralInfoForm';
import toastMessages from '../../../../utils/toastMessages';
import errorHandling from '../../../../utils/errorHandling';
import BackdropLoading from '../../../../components/loading/BackdropLoading';

import resumeService from '../../../../services/resumeService';
import { salaryString } from '../../../../utils/customData';

const Loading = (
  <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 'custom.info' }}>
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
  </Box>
);

const item = (title, value) => {
  return (
    <Box sx={{
      p: 1,
      backgroundColor: 'background.paper',
    }}>
      <Typography 
        sx={{ 
          fontWeight: 600,
          color: 'primary.main',
          fontSize: '0.875rem',
          mb: 1
        }}
      >
        {title}
      </Typography>
      <Typography sx={{
        color: value ? 'text.primary' : 'text.disabled',
        fontStyle: value ? 'normal' : 'italic',
        fontSize: value ? '1rem' : '0.875rem',
      }}>
        {value || 'Chưa cập nhật'}
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
    <Box sx={{ 
      backgroundColor: 'background.paper', 
      borderRadius: 3,
      p: 3,
      boxShadow: (theme) => theme.customShadows.card,
    }}>
      <Stack spacing={3}>
        {isLoadingResumeDetail ? (
          Loading
        ) : resumeDetail === null ? (
          <Typography variant="h6" color="error.main" textAlign="center">
            Không tìm thấy thông tin hồ sơ
          </Typography>
        ) : (
          <>
            <Box>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography 
                  variant="h5"
                  sx={{ 
                    fontWeight: 600,
                  }}
                >
                  {title}
                </Typography>
                <Fab
                  size="small"
                  color="secondary"
                  aria-label="edit"
                  onClick={() => setOpenPopup(true)}
                  sx={{
                    boxShadow: (theme) => theme.customShadows.medium,
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <EditIcon />
                </Fab>
              </Stack>
            </Box>

            <Divider sx={{ my: 0, borderColor: 'grey.500' }}/>

            <Stack sx={{ px: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {item('Mục tiêu nghề nghiệp', resumeDetail?.description)}
                  <Divider sx={{ my: 1, borderColor: 'grey.300' }} />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.5}>
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

                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.5}>
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
            </Stack>
          </>
        )}
      </Stack>

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
    </Box>
  );
};

export default GeneralInfoCard;
