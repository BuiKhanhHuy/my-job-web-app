import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import toastMessages from '../../../../utils/toastMessages';
import errorHandling from '../../../../utils/errorHandling';
import BackdropLoading from '../../../../components/loading/BackdropLoading';
import CompanyForm from '../CompanyForm';
import companyService from '../../../../services/companyService';
import MuiImageCustom from '../../../../components/MuiImageCustom';

import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

const CompanyCard = () => {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoadingCompany, setIsLoadingCompany] = React.useState(true);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [editData, setEditData] = React.useState(null);
  const [companyImageUrl, setCompanyImageUrl] = React.useState(null);
  const [companyCoverImageUrl, setCompanyCoverImageUrl] = React.useState(null);
  const [serverErrors, setServerErrors] = React.useState(null);

  React.useEffect(() => {
    const loadCompany = async () => {
      setIsLoadingCompany(true);
      try {
        const resData = await companyService.getCompany();
        const data = resData.data;

        setEditData(data);

        if (companyImageUrl === null) {
          setCompanyImageUrl(data?.companyImageUrl);
        }
        if (companyCoverImageUrl === null) {
          setCompanyCoverImageUrl(data?.companyCoverImageUrl);
        }
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoadingCompany(false);
      }
    };

    loadCompany();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const handleUpdate = (data) => {
    const update = async (id, data) => {
      setIsFullScreenLoading(true);

      try {
        await companyService.updateCompany(id, data);

        setIsSuccess(!isSuccess);
        if (serverErrors !== null) setServerErrors(null);
        toastMessages.success('Cập nhật thông tin công ty thành công.');
      } catch (error) {
        errorHandling(error, setServerErrors);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    update(data.id, data);
  };

  const handleUpdateCompanyImageUrl = (options) => {
    const { file } = options;
    const update = async (formData) => {
      setIsFullScreenLoading(true);
      try {
        const resData = await companyService.updateCompanyImageUrl(formData);
        const data = resData.data;

        toastMessages.success('Cập nhật logo công ty thành công.');
        setCompanyImageUrl(data?.companyImageUrl);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    var formData = new FormData();
    formData.append('file', file);
    update(formData);
  };

  const handleUpdateCompanyCoverImageUrl = (options) => {
    const { file } = options;

    const update = async (formData) => {
      setIsFullScreenLoading(true);
      try {
        const resData = await companyService.updateCompanyCoverImageUrl(
          formData
        );
        const data = resData.data;

        toastMessages.success('Cập nhật ảnh bìa công ty thành công.');
        setCompanyCoverImageUrl(data?.companyCoverImageUrl);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    var formData = new FormData();
    formData.append('file', file);
    update(formData);
  };

  return (
    <>
      <Stack spacing={3}>
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Logo công ty
          </Typography>
          <MuiImageCustom
            src={companyImageUrl}
            width={110}
            height={110}
            sx={{ borderRadius: 2, border: 1, borderColor: '#e0e0e0' }}
          />
          <Box sx={{ mt: 1 }}>
            <ImgCrop
              rotationSlider
              modalProps={{ zIndex: 2000 }}
              modalTitle="Chỉnh sửa ảnh"
              modalOk="Tải lên"
              modalCancel="Hủy"
              showReset={true}
              resetText='Đặt lại'
            >
              <Upload
                listType="picture"
                maxCount={1}
                customRequest={handleUpdateCompanyImageUrl}
                showUploadList={false}
              >
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  sx={{ textTransform: 'inherit' }}
                >
                  Thay logo
                </Button>
              </Upload>
            </ImgCrop>
          </Box>
        </Box>
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Ảnh bìa hiện tại
          </Typography>
          <MuiImageCustom
            src={companyCoverImageUrl}
            height={125}
            width={'50%'}
            sx={{ borderRadius: 2, border: 1, borderColor: '#e0e0e0' }}
            fit="cover"
          />
          <Box sx={{ mt: 1 }}>
            <Upload
              listType="picture"
              maxCount={1}
              customRequest={handleUpdateCompanyCoverImageUrl}
              showUploadList={false}
            >
              <Button
                size="small"
                variant="contained"
                color="primary"
                sx={{ textTransform: 'inherit' }}
              >
                Thay ảnh bìa
              </Button>
            </Upload>
          </Box>
        </Box>
        <Box>
          {isLoadingCompany ? (
            <CompanyForm.Loading />
          ) : (
            <>
              {/* Start: company form */}
              <CompanyForm
                handleUpdate={handleUpdate}
                editData={editData}
                serverErrors={serverErrors}
              />
              {/* End: company form */}
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveOutlinedIcon />}
                  type="submit"
                  form="company-form"
                >
                  Cập nhật
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Stack>

      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

export default CompanyCard;
