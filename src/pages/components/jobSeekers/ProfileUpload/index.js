import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';

import { CV_TYPES } from '../../../../configs/constants';
import toastMessages from '../../../../utils/toastMessages';
import errorHandling from '../../../../utils/errorHandling';
import BackdropLoading from '../../../../components/loading/BackdropLoading';
import FormPopup from '../../../../components/controls/FormPopup';
import ProfileUploadForm from '../ProfileUploadForm';

import jobSeekerProfileService from '../../../../services/jobSeekerProfileService';
import resumeService from '../../../../services/resumeService';
import ProfileUploadCard from '../../../../components/ProfileUploadCard';
import { confirmModal } from '../../../../utils/sweetalert2Modal';

const ProfileUpload = ({ title }) => {
  const nav = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [isLoadingResumes, setIsLoadingResumes] = React.useState(false);
  const [resumes, setResumes] = React.useState([]);

  const [openPopup, setOpenPopup] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);

  React.useEffect(() => {
    const getOnlineProfile = async (jobSeekerProfileId, params) => {
      setIsLoadingResumes(true);
      try {
        const resData = await jobSeekerProfileService.getResumes(
          jobSeekerProfileId,
          params
        );

        setResumes(resData.data);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoadingResumes(false);
      }
    };

    getOnlineProfile(currentUser?.jobSeekerProfileId, {
      resumeType: CV_TYPES.cvUpload,
    });
  }, [currentUser, isSuccess]);

  const handleAdd = (data) => {
    console.log(data);
    const addResumeUpload = async (formData) => {
      setIsFullScreenLoading(true);
      try {
        await resumeService.addResume(formData);

        setOpenPopup(false);
        setIsSuccess(!isSuccess);
        toastMessages.success('Tải CV thành công.');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    var formData = new FormData();
    for (var key in data) {
      formData.append(key, data[key]);
    }
    addResumeUpload(formData);
  };

  const handleDelete = (slug) => {
    const del = async (slug) => {
      try {
        await resumeService.deleteResume(slug);

        setIsSuccess(!isSuccess);
        toastMessages.success('Xóa thành công.');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    confirmModal(
      () => del(slug),
      'Xóa CV đính kém',
      'CV này sẽ được xóa vĩnh viễn và không thể khôi phục. Bạn có chắc chắn?',
      'warning'
    );
  };

  return (
    <>
      <Stack>
        <Box>
          <Typography variant="h6">{title} (4)</Typography>
        </Box>
        <Divider sx={{ mt: 2, mb: 3 }} />
        <Box sx={{ px: 1 }}>
          <Stack spacing={2}>
            <Box>
              <Grid container spacing={2}>
                {isLoadingResumes ? (
                  Array(3)
                    .fill(0)
                    .map((value, index) => (
                      <Grid
                        key={index}
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={4}
                        xl={4}
                      >
                        <ProfileUploadCard.Loading />
                      </Grid>
                    ))
                ) : resumes.length === 0 ? (
                  <div>[]</div>
                ) : (
                  resumes.map((value) => (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={4}
                      xl={4}
                      key={value.id}
                    >
                      <ProfileUploadCard
                        resumeImage={value?.imageUrl}
                        fileUrl={value?.fileUrl}
                        title={value?.title}
                        updateAt={value?.updateAt}
                        slug={value.slug}
                        id={value.id}
                        handleDelete={handleDelete}
                      />
                    </Grid>
                  ))
                )}
              </Grid>
            </Box>
            <Stack sx={{ pt: 3 }} direction="row" justifyContent="center">
              <Button
                startIcon={<PublishIcon />}
                variant="contained"
                onClick={() => setOpenPopup(true)}
              >
                Upload CV
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      {/* Start: form  */}
      <FormPopup
        title="Thông tin hồ sơ"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ProfileUploadForm handleAdd={handleAdd} />
      </FormPopup>
      {/* End: form */}

      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

export default ProfileUpload;
