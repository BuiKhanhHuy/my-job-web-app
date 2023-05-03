import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Slider,
  Button,
  Stack,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  DialogActions,
} from '@mui/material';
import AvatarEditor from 'react-avatar-editor';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CloseIcon from '@mui/icons-material/Close';

import { confirmModal } from '../../../../utils/sweetalert2Modal';
import BackdropLoading from '../../../../components/loading/BackdropLoading';
import toastMessages from '../../../../utils/toastMessages';
import MuiImageCustom from '../../../../components/MuiImageCustom';
import { deleteAvatar, updateAvatar } from '../../../../redux/userSlice';

const modalStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const CropperModal = ({ src, modalOpen, setModalOpen, handleUpload }) => {
  const [slideValue, setSlideValue] = React.useState(10);
  const cropRef = React.useRef(null);

  //handle save
  const handleSave = async () => {
    if (cropRef.current) {
      const canvas = cropRef.current.getImage();
      canvas.toBlob((blob) => {
        handleUpload(blob);
      }, 'image/png');
    }
  };

  return (
    <>
      <Dialog
        sx={modalStyle}
        open={modalOpen}
        onClose={(e) => setModalOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ p: 1.5 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">Chỉnh sửa hình ảnh</Typography>
            <IconButton color="error" onClick={() => setModalOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <AvatarEditor
            ref={cropRef}
            image={src}
            style={{ width: '100%', height: '100%' }}
            border={50}
            borderRadius={150}
            color={[0, 0, 0, 0.6]}
            scale={slideValue / 10}
            rotate={0}
          />
          <Slider
            min={10}
            max={50}
            size="medium"
            defaultValue={slideValue}
            value={slideValue}
            onChange={(e) => setSlideValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ py: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Chọn
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const AvatarCard = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [src, setSrc] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const inputRef = React.useRef(null);

  const handleInputClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleImgChange = (e) => {
    setSrc(URL.createObjectURL(e.target.files[0]));
    setModalOpen(true);
  };

  const handleUpload = async (blob) => {
    var formData = new FormData();
    formData.append('file', blob, 'avatar.png');

    setIsFullScreenLoading(true);
    setModalOpen(false);

    dispatch(updateAvatar(formData))
      .unwrap()
      .then(() => {
        toastMessages.success('Cập nhật ảnh đại diện thành công.');
      })
      .catch(() => {
        toastMessages.error('Đã xảy ra lỗi, vui lòng thử lại.');
      })
      .finally(() => setIsFullScreenLoading(false));
  };

  const handleDelete = () => {
    const del = async () => {
      setIsFullScreenLoading(true);

      dispatch(deleteAvatar())
        .unwrap()
        .then(() => {
          toastMessages.success('Xóa ảnh đại diện thành công.');
        })
        .catch((err) => {
          toastMessages.error();
        })
        .finally(() => setIsFullScreenLoading(false));
    };

    confirmModal(
      () => del(),
      'Xóa ảnh đại diện',
      'Ảnh đại diện này sẽ được xóa và không thể khôi phục. Bạn có chắc chắn?',
      'warning'
    );
  };

  return (
    <>
      <Stack alignItems="center">
        <CropperModal
          modalOpen={modalOpen}
          src={src}
          setModalOpen={setModalOpen}
          handleUpload={handleUpload}
        />
        <input
          hidden
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleImgChange}
        />
        <Box>
          <MuiImageCustom
            src={currentUser?.avatarUrl}
            width={120}
            height={120}
            sx={{ borderRadius: '50%' }}
          />
        </Box>
        <Box>
          <IconButton
            color="warning"
            aria-label="upload"
            component="label"
            onClick={handleInputClick}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            aria-label="upload"
            component="label"
            onClick={handleDelete}
          >
            <HighlightOffIcon />
          </IconButton>
        </Box>
        <Typography variant="subtitle2" gutterBottom sx={{ mt: 1 }}>
          Ảnh đại diện
        </Typography>
      </Stack>

      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

export default React.memo(AvatarCard);
