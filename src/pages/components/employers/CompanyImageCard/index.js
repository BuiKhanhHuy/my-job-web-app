import React, { useState } from 'react';
import { Upload, Modal } from 'antd';

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
    <>
      <Upload
        multiple={true}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onRemove={handleDelete}
        customRequest={handleCustomRequest}
      >
        {fileList.length < 15 && '+ Tải lên'}
      </Upload>
      <Modal
        style={{ zIndex: 2000 }}
        open={previewVisible}
        title="Xem hình ảnh"
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>

      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

export default CompanyImageCard;
