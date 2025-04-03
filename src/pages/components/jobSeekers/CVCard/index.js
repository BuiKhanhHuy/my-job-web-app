import React from "react";
import { useParams } from "react-router-dom";
import { Box, Divider, Stack, Typography, Fab } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import CVForm from "../CVForm";
import Pdf from "../../../../components/Pdf";
import BackdropLoading from "../../../../components/loading/BackdropLoading";
import errorHandling from "../../../../utils/errorHandling";
import FormPopup from "../../../../components/controls/FormPopup";
import resumeService from "../../../../services/resumeService";
import toastMessages from "../../../../utils/toastMessages";

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
      formData.append("file", data.files[0]);
      try {
        await resumeService.updateCV(resumeSlug, formData);

        setOpenPopup(false);
        setIsSuccess(!isSuccess);
        toastMessages.success("Upload File thành công.");
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
      <Stack
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 2,
          p: 3,
          boxShadow: (theme) => theme.customShadows.card,
          "&:hover": {
            boxShadow: (theme) => theme.customShadows.medium,
          },
        }}
      >
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
              color="primary"
              aria-label="edit"
              onClick={() => setOpenPopup(true)}
              sx={{
                boxShadow: (theme) => theme.customShadows.medium,
                "&:hover": {
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s ease-in-out",
              }}
            >
              <FileUploadIcon />
            </Fab>
          </Stack>
        </Box>
        <Divider sx={{ my: 3, borderColor: 'grey.500' }}/>
        <Box>
          {isLoadingCv ? (
            <Stack alignItems="center" justifyContent="center" sx={{ py: 8 }}>
              <Typography variant="subtitle1" color="text.secondary">
                Đang tải CV...
              </Typography>
            </Stack>
          ) : cv === null ? (
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                py: 8,
                backgroundColor: "primary.background",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Chưa có CV nào được tải lên
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontStyle: "italic" }}
              >
                Nhấn nút tải lên để thêm CV của bạn
              </Typography>
            </Stack>
          ) : (
            <Stack spacing={3}>
              <Box
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: (theme) => theme.customShadows.small,
                }}
              >
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

      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
    </>
  );
};

export default CVCard;
