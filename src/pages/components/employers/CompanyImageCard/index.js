import React, { useState } from 'react';
import { Upload, Modal } from 'antd';
import { Box, Typography} from "@mui/material";
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';

import toastMessages from '../../../../utils/toastMessages';
import errorHandling from '../../../../utils/errorHandling';
import BackdropLoading from '../../../../components/loading/BackdropLoading';
import companyImageService from '../../../../services/companyImageService';
import { confirmModal } from '../../../../utils/sweetalert2Modal';

const CompanyImageCard = () => {
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  React.useEffect(() => {
    const getImages = async () => {
      try {
        const resData = await companyImageService.getCompanyImages();
        const data = resData.data;
        const results = data.results;

        let newResults = [];
        for (let i = 0; i < results.length; i++) {
          newResults.push({
            uid: results[i].id,
            url: results[i].imageUrl,
          });
        }
        setFileList(newResults);
      } catch (error) {
        console.log(error)
      }  
    };

    getImages();
  }, []);

  const handleCustomRequest = (options) => {
    const { file } = options;
    const upload = async (data) => {
      setIsFullScreenLoading(true);
      try {
        const resData = await companyImageService.addCompanyImage(data);
        const results = resData.data;

        let newResults = [];
        for (let i = 0; i < results.length; i++) {
          newResults.push({
            uid: results[i].id,
            url: results[i].imageUrl,
          });
        }
        setFileList([...fileList, ...newResults]);
        toastMessages.success('Tải ảnh lên thành công.');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    const formData = new FormData();
    formData.append('files', file);
    upload(formData);
  };

  const handleDelete = (file) => {
    const deleteCompanyImage = async (id) => {
      setIsFullScreenLoading(true);

      try {
        await companyImageService.deleteCompanyImage(id);

        const newFileList = [...fileList];
        const index = newFileList.indexOf(file);
        if (index > -1) {
          newFileList.splice(index, 1);
          setFileList(newFileList);
        }

        toastMessages.success('Xóa hình ảnh thành công.');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    confirmModal(
      () => deleteCompanyImage(file.uid),
      'Xóa hình ảnh',
      'Hình ảnh này sẽ được xóa vĩnh viễn và không thể khôi phục. Bạn có chắc chắn?',
      'warning'
    );
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await toBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <Box>
      <Typography 
        variant="subtitle1" 
        sx={{ 
          mb: 2,
          fontWeight: 600,
          color: 'text.primary'
        }}
      >
        Thư viện ảnh công ty
      </Typography>

      <Upload
        multiple={true}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onRemove={handleDelete}
        customRequest={handleCustomRequest}
        className="company-image-upload"
        sx={{
          '& .ant-upload-list-picture-card .ant-upload-list-item': {
            borderRadius: 2,
            border: `1px solid ${theme => theme.palette.grey[200]}`,
            overflow: 'hidden',
          },
          '& .ant-upload.ant-upload-select': {
            borderRadius: 2,
            border: `2px dashed ${theme => theme.palette.grey[300]}`,
            backgroundColor: theme => theme.palette.grey[50],
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: 'primary.background'
            }
          }
        }}
      >
        {fileList.length < 15 && (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 1
          }}>
            <CameraAltOutlinedIcon sx={{ 
              fontSize: 24, 
              color: 'primary.main',
              mb: 1 
            }} />
            <Typography 
              variant="body2"
              sx={{ 
                color: 'text.secondary',
                textAlign: 'center'
              }}
            >
              Tải lên
            </Typography>
          </Box>
        )}
      </Upload>

      <Modal
        zIndex={8000}
        open={previewVisible}
        title={
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Xem hình ảnh
          </Typography>
        }
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        style={{
          borderRadius: 16,
          overflow: 'hidden'
        }}
        bodyStyle={{
          padding: 24
        }}
      >
        <Box
          component="img"
          src={previewImage}
          alt="Preview"
          sx={{
            width: '100%',
            borderRadius: 2,
            boxShadow: theme => theme.customShadows.small
          }}
        />
      </Modal>

      {isFullScreenLoading && <BackdropLoading />}
    </Box>
  );
};

export default CompanyImageCard;
