import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Divider, Stack, Typography, Fab } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import CVForm from '../CVForm';
import Pdf from '../../../../components/Pdf';
import BackdropLoading from '../../../../components/loading/BackdropLoading';
import errorHandling from '../../../../utils/errorHandling';
import FormPopup from '../../../../components/controls/FormPopup';
import resumeService from '../../../../services/resumeService';
import toastMessages from '../../../../utils/toastMessages';

const CVCard = ({ title }) => {
  const { slug: resumeSlug } = useParams();
  const [openPopup, setOpenPopup] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoadingCv, setIsLoadingCv] = React.useState(true);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [cv, setCv] = React.useState(null);

  React.useEffect(() => {
    const getResumeDetail = async (resumeSlug) => {
      setIsLoadingCv(true);
      try {
        const resData = await resumeService.getCv(resumeSlug);

        setCv(resData.data);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoadingCv(false);
      }
    };

    getResumeDetail(resumeSlug);
  }, [resumeSlug, isSuccess]);

  const handleUpdate = (data) => {
    const updateCV = async (resumeSlug, data) => {
      setIsFullScreenLoading(true);

      var formData = new FormData();
      formData.append('file', data.files[0]);
      try {
        await resumeService.updateCV(resumeSlug, formData);

        setOpenPopup(false);
        setIsSuccess(!isSuccess);
        toastMessages.success('Upload File thành công.');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    updateCV(resumeSlug, data);
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
            <Fab
              size="small"
              color="secondary"
              aria-label="edit"
              onClick={() => setOpenPopup(true)}
            >
              <FileUploadIcon sx={{ color: 'white' }} />
            </Fab>
          </Stack>
        </Box>
        <Divider sx={{ mt: 2, mb: 3 }} />
        <Box sx={{ px: 1 }}>
          {isLoadingCv ? (
            <h1>Loading</h1>
          ) : cv === null ? (
            <h1>Cv null</h1>
          ) : (
            <Stack spacing={4}>
              <Box>
                <Pdf title={cv.title} fileUrl={cv.fileUrl} />
              </Box>
            </Stack>
          )}
        </Box>
      </Stack>

      {/* Start: form  */}
      <FormPopup
        title="Cập nhật CV"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <CVForm handleUpdate={handleUpdate} />
      </FormPopup>
      {/* End: form */}

      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

export default CVCard;
