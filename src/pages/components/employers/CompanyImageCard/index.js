import * as React from 'react';
import { Box, Grid, IconButton, Button, Skeleton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import NoDataCard from '../../../../components/NoDataCard';
import errorHandling from '../../../../utils/errorHandling';
import BackdropLoading from '../../../../components/loading/BackdropLoading';
import MuiImageCustom from '../../../../components/MuiImageCustom';
import DropzoneDialogCustom from '../../../../components/DropzoneDialogCustom';
import companyImageService from '../../../../services/companyImageService';
import toastMessages from '../../../../utils/toastMessages';
import { confirmModal } from '../../../../utils/sweetalert2Modal';

const CompanyImageCard = () => {
  const [open, setOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [companyImages, setCompanyImages] = React.useState([]);

  React.useEffect(() => {
    const getImages = async () => {
      setIsLoading(true);

      try {
        const resData = await companyImageService.getCompanyImages();
        const data = resData.data;

        setCompanyImages(data.results);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [isSuccess]);

  const handleUpload = (files) => {
    const upload = async (data) => {
      setIsFullScreenLoading(true);

      try {
        await companyImageService.addCompanyImage(data);

        setIsSuccess(!isSuccess);
      } catch (error) {
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    var formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name);
    }

    upload(formData);
  };

  const handleDelete = (id) => {
    const deleteCompanyImage = async (id) => {
      setIsFullScreenLoading(true);

      try {
        await companyImageService.deleteCompanyImage(id);

        setIsSuccess(!isSuccess);
        toastMessages.success('Xóa hình ảnh thành công.');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    confirmModal(
      () => deleteCompanyImage(id),
      'Xóa hình ảnh',
      'Hình ảnh này sẽ được xóa vĩnh viễn và không thể khôi phục. Bạn có chắc chắn?',
      'warning'
    );
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        startIcon={<CloudUploadIcon />}
        onClick={() => setOpen(true)}
        disabled={isLoading}
      >
        Tải ảnh lên
      </Button>

      {isLoading ? (
        <Grid container spacing={2}>
          {Array.from(Array(12).keys()).map((value) => (
            <Grid key={value.id} item xs={3}>
              <Skeleton height={222} width="100%" />
            </Grid>
          ))}
        </Grid>
      ) : companyImages.length === 0 ? (
        <NoDataCard title="Chưa có hình ảnh nào được tải lên." />
      ) : (
        <Grid container spacing={2}>
          {companyImages.map((value) => (
            <Grid key={value.id} item xs={3}>
              <Box>
                <IconButton
                  aria-label="delte"
                  onClick={() => handleDelete(value.id)}
                  sx={{ color: 'white', bottom: -40, zIndex: 1 }}
                >
                  <DeleteOutlineIcon />
                </IconButton>
                <MuiImageCustom
                  src={value?.imageUrl}
                  height={222}
                  sx={{ borderRadius: 2 }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Start: DropzoneDialog */}
      <DropzoneDialogCustom
        open={open}
        setOpen={setOpen}
        handleUpload={handleUpload}
        title={'Tải ảnh'}
      />
      {/* End: DropzoneDialog */}

      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </Box>
  );
};
export default CompanyImageCard;
