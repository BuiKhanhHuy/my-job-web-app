import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Stack, IconButton, Typography } from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { confirmModal } from '../../../../utils/sweetalert2Modal';
import BackdropLoading from '../../../../components/loading/BackdropLoading';
import toastMessages from '../../../../utils/toastMessages';
import MuiImageCustom from '../../../../components/MuiImageCustom';
import { deleteAvatar, updateAvatar } from '../../../../redux/userSlice';

import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

const AvatarCard = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);

  const handleUpload = async (options) => {
    const { file } = options;
    var formData = new FormData();
    formData.append('file', file);

    setIsFullScreenLoading(true);

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
        <Box
          sx={{
            position: 'relative',
            width: 120,
            height: 120,
            padding: '4px',
            borderRadius: '50%',
            background: `linear-gradient(45deg, #441da0, #6b4fd1)`,
            boxShadow: '0 4px 14px 0 rgba(68, 29, 160, 0.15)',
            '&:hover .avatar-actions': {
              opacity: 1,
            },
          }}
        >
          <MuiImageCustom
            src={currentUser?.avatarUrl}
            width="100%"
            height="100%"
            sx={{
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid white',
            }}
          />
          
          {/* Overlay với buttons */}
          <Box
            className="avatar-actions"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0,
              transition: 'opacity 0.2s ease',
            }}
          >
            <Stack direction="row" spacing={1}>
              <ImgCrop
                rotationSlider
                modalProps={{ zIndex: 2000 }}
                modalTitle="Chỉnh sửa ảnh"
                modalOk="Tải lên"
                modalCancel="Hủy"
                showReset={true}
                resetText="Đặt lại"
              >
                <Upload
                  listType="picture"
                  maxCount={1}
                  customRequest={handleUpload}
                  showUploadList={false}
                >
                  <IconButton 
                    size="small"
                    sx={{ 
                      bgcolor: 'white',
                      '&:hover': { bgcolor: 'white', opacity: 0.9 }
                    }}
                  >
                    <ModeEditOutlineOutlinedIcon sx={{ fontSize: 18, color: '#fca34d' }} />
                  </IconButton>
                </Upload>
              </ImgCrop>
              
              {currentUser?.avatarUrl && (
                <IconButton
                  size="small"
                  onClick={handleDelete}
                  sx={{ 
                    bgcolor: 'white',
                    '&:hover': { bgcolor: 'white', opacity: 0.9 }
                  }}
                >
                  <HighlightOffIcon sx={{ fontSize: 18, color: '#d32f2f' }} />
                </IconButton>
              )}
            </Stack>
          </Box>
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
