import React from "react";
import { Box, Button, Stack, Typography, Paper } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

import {
  convertEditorStateToHTMLString,
  createEditorStateFromHTMLString,
} from "../../../../utils/customData";
import toastMessages from "../../../../utils/toastMessages";
import errorHandling from "../../../../utils/errorHandling";
import BackdropLoading from "../../../../components/loading/BackdropLoading";
import CompanyForm from "../CompanyForm";
import companyService from "../../../../services/companyService";
import MuiImageCustom from "../../../../components/MuiImageCustom";

import { Upload } from "antd";
import ImgCrop from "antd-img-crop";

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
        var data = resData.data;

        data = {
          ...data,
          description: createEditorStateFromHTMLString(data?.description || ""),
        };
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
        toastMessages.success("Cập nhật thông tin công ty thành công.");
      } catch (error) {
        errorHandling(error, setServerErrors);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    const dataCustom = {
      ...data,
      description: convertEditorStateToHTMLString(data.description),
    };

    update(dataCustom?.id, dataCustom);
  };

  const handleUpdateCompanyImageUrl = (options) => {
    const { file } = options;
    const update = async (formData) => {
      setIsFullScreenLoading(true);
      try {
        const resData = await companyService.updateCompanyImageUrl(formData);
        const data = resData.data;

        toastMessages.success("Cập nhật logo công ty thành công.");
        setCompanyImageUrl(data?.companyImageUrl);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    var formData = new FormData();
    formData.append("file", file);
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

        toastMessages.success("Cập nhật ảnh bìa công ty thành công.");
        setCompanyCoverImageUrl(data?.companyCoverImageUrl);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    var formData = new FormData();
    formData.append("file", file);
    update(formData);
  };

  return (
    <Paper elevation={0}>
      <Stack spacing={4}>
        <Box>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 2,
              fontWeight: 600,
              color: "text.primary",
            }}
          >
            Logo công ty
          </Typography>
          <Box sx={{ position: "relative" }}>
            <MuiImageCustom
              src={companyImageUrl}
              width={120}
              height={120}
              sx={{
                borderRadius: 2,
                border: (theme) => `1px solid ${theme.palette.grey[200]}`,
                boxShadow: (theme) => theme.customShadows.small,
              }}
            />
            <Box sx={{ mt: 2 }}>
              <ImgCrop
                rotationSlider
                modalProps={{
                  zIndex: 2000,
                  style: { borderRadius: 16 },
                }}
                modalTitle="Chỉnh sửa ảnh"
                modalOk="Tải lên"
                modalCancel="Hủy"
                showReset={true}
                resetText="Đặt lại"
              >
                <Upload
                  listType="picture"
                  maxCount={1}
                  customRequest={handleUpdateCompanyImageUrl}
                  showUploadList={false}
                >
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<CameraAltOutlinedIcon />}
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      boxShadow: "none",
                    }}
                  >
                    Thay logo
                  </Button>
                </Upload>
              </ImgCrop>
            </Box>
          </Box>
        </Box>

        <Box>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 2,
              fontWeight: 600,
              color: "text.primary",
            }}
          >
            Ảnh bìa công ty
          </Typography>
          <Box sx={{ position: "relative" }}>
            <MuiImageCustom
              src={companyCoverImageUrl}
              height={160}
              width="60%"
              sx={{
                borderRadius: 2,
                border: (theme) => `1px solid ${theme.palette.grey[200]}`,
                boxShadow: (theme) => theme.customShadows.small,
              }}
              fit="cover"
            />
            <Box sx={{ mt: 2 }}>
              <Upload
                listType="picture"
                maxCount={1}
                customRequest={handleUpdateCompanyCoverImageUrl}
                showUploadList={false}
              >
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<CameraAltOutlinedIcon />}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    boxShadow: "none",
                  }}
                >
                  Thay ảnh bìa
                </Button>
              </Upload>
            </Box>
          </Box>
        </Box>

        <Box>
          {isLoadingCompany ? (
            <CompanyForm.Loading />
          ) : (
            <>
              <CompanyForm
                handleUpdate={handleUpdate}
                editData={editData}
                serverErrors={serverErrors}
              />
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveOutlinedIcon />}
                  type="submit"
                  form="company-form"
                  sx={{
                    px: 4,
                    py: 1,
                    fontSize: "0.9rem",
                    background: (theme) => theme.palette.primary.gradient,
                    "&:hover": {
                      background: (theme) => theme.palette.primary.gradient,
                      opacity: 0.9,
                      boxShadow: (theme) => theme.customShadows.medium,
                    },
                  }}
                >
                  Cập nhật
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Stack>

      {isFullScreenLoading && <BackdropLoading />}
    </Paper>
  );
};

export default CompanyCard;
