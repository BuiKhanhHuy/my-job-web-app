import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faEye,
  faClockFour,
} from "@fortawesome/free-solid-svg-icons";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

import { QRCode, Space } from "antd";

import { TabTitle } from "../../../utils/generalFunction";
import toastMessages from "../../../utils/toastMessages";
import errorHandling from "../../../utils/errorHandling";
import MuiImageCustom from "../../../components/MuiImageCustom";
import { salaryString } from "../../../utils/customData";
import NoDataCard from "../../../components/NoDataCard";
import Map from "../../../components/Map";
import jobService from "../../../services/jobService";
import ApplyCard from "../../../components/ApplyCard";
import SocialNetworkSharingPopup from "../../../components/SocialNetworkSharingPopup/SocialNetworkSharingPopup";
import FilterJobPostCard from "../../components/defaults/FilterJobPostCard";
import { ROLES_NAME, ROUTES } from "../../../configs/constants";
import { formatRoute } from "../../../utils/funcUtils";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Loading = (
  <>
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
          {/* Start: thong tin chung */}
          <Card sx={{ py: 2, px: 4 }}>
            <Stack>
              <Box>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Skeleton variant="circular" width={65} height={65} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">
                      <Skeleton />
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      <Skeleton width={200} />
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              <Box sx={{ my: 1 }}></Box>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="h5">
                    <Skeleton height={50} />
                  </Typography>
                </Box>
                <Stack direction="row" spacing={3}>
                  <Typography variant="subtitle2" sx={{ flex: 1 }}>
                    <Skeleton />
                  </Typography>
                  <Typography variant="subtitle2" sx={{ flex: 1 }}>
                    <Skeleton />
                  </Typography>
                  <Typography variant="subtitle2" sx={{ flex: 1 }}>
                    <Skeleton />
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Skeleton variant="rounded" width={100} height={40} />
                  <Skeleton variant="rounded" width={100} height={40} />
                  <Skeleton variant="rounded" width={100} height={40} />
                </Stack>
              </Stack>
              <Box sx={{ my: 1 }}></Box>
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Skeleton />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Skeleton />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Skeleton />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Skeleton />
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ my: 1 }}></Box>
              <Box>
                <Stack>
                  <Typography variant="h5" gutterBottom>
                    <Skeleton />
                  </Typography>
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Skeleton />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Skeleton />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Skeleton />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Skeleton />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Skeleton />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Skeleton />
                      </Grid>
                    </Grid>
                  </Box>
                </Stack>
              </Box>
              <Box></Box>
            </Stack>
          </Card>
          {/* End: thong tin chung */}

          {/* Start: mo ta chi tiet */}
          <Card sx={{ p: 4, mt: 3 }}>
            <Stack spacing={4}>
              <Box>
                <Typography variant="h5">
                  <Skeleton />
                </Typography>
                <Box sx={{ pt: 1 }}>
                  <Skeleton variant="rounded" height={100} />
                </Box>
              </Box>
              <Box>
                <Typography variant="h5">
                  <Skeleton />
                </Typography>
                <Box sx={{ pt: 1 }}>
                  <Skeleton variant="rounded" height={100} />
                </Box>
              </Box>
              <Box>
                <Typography variant="h5">
                  <Skeleton />
                </Typography>
                <Box sx={{ pt: 1 }}>
                  <Skeleton variant="rounded" height={100} />
                </Box>
              </Box>
            </Stack>
            <Box sx={{ my: 1 }}></Box>
            <Stack direction="row" spacing={2}>
              <Skeleton variant="rounded" width={100} height={40} />
              <Skeleton variant="rounded" width={100} height={40} />
              <Skeleton variant="rounded" width={100} height={40} />
            </Stack>
          </Card>
          {/* End: mo ta chi tiet */}

          {/* Start: thong tin lien he */}
          <Card sx={{ p: 4, mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Box>
                  <Typography variant="h5">
                    <Skeleton />
                  </Typography>
                  <Stack sx={{ pt: 1 }} spacing={2}>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </Stack>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box>
                  <Typography variant="h5">
                    <Skeleton />
                  </Typography>
                  <Stack sx={{ pt: 1 }} spacing={2}>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Card>
          {/* End: thong tin lien he */}
        </Grid>
      </Grid>
    </Box>
  </>
);

const item = (title, value) => {
  return (
    <Box>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontWeight: "normal", pb: 1 }}
      >
        {title}
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ textAlign: "justify" }}>
        {value ? (
          <span style={{ fontWeight: "bold" }}>{value}</span>
        ) : (
          <span style={{ color: "#e0e0e0", fontStyle: "italic", fontSize: 13 }}>
            Chưa cập nhật
          </span>
        )}
      </Typography>
    </Box>
  );
};

const ActionComponent = ({
  isApplied,
  isSaved,
  isLoadingSave,
  handleSave,
  handleShowApplyForm,
  setOpenSharePopup,
  isAuthenticated,
  currentUser,
}) => (
  <Stack direction="row" spacing={2}>
    {isAuthenticated && currentUser?.roleName === ROLES_NAME.JOB_SEEKER && (
      <>
        <Button
          variant="contained"
          size="large"
          sx={{
            textTransform: "none",
            background: "linear-gradient(45deg, #FF9800 30%, #FF5722 90%)",
            color: "white",
            fontWeight: 600,
            "&:hover": {
              background: "linear-gradient(45deg, #FB8C00 30%, #F4511E 90%)",
            },
          }}
          disabled={isApplied}
          onClick={handleShowApplyForm}
        >
          {isApplied ? "Đã ứng tuyển" : "Nộp hồ sơ"}
        </Button>
        <LoadingButton
          onClick={handleSave}
          startIcon={isSaved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          loading={isLoadingSave}
          loadingPosition="start"
          variant={isSaved ? "contained" : "outlined"}
          sx={{
            textTransform: "none",
            ...(isSaved
              ? {
                  backgroundColor: "#9c27b0",
                  "&:hover": {
                    backgroundColor: "#7b1fa2",
                  },
                }
              : {
                  borderColor: "#9c27b0",
                  color: "#9c27b0",
                  "&:hover": {
                    borderColor: "#7b1fa2",
                    backgroundColor: "rgba(156,39,176,0.04)",
                  },
                }),
          }}
        >
          <span>{isSaved ? "Đã lưu" : "Lưu tin"}</span>
        </LoadingButton>
      </>
    )}
    <Button
      variant="outlined"
      size="large"
      startIcon={<ShareIcon />}
      sx={{
        textTransform: "none",
        borderColor: "#9c27b0",
        color: "#9c27b0",
        "&:hover": {
          borderColor: "#7b1fa2",
          backgroundColor: "rgba(156,39,176,0.04)",
        },
      }}
      onClick={() => setOpenSharePopup(true)}
    >
      Chia sẻ
    </Button>
  </Stack>
);

const JobDetailPage = () => {
  const { slug } = useParams();
  const { allConfig } = useSelector((state) => state.config);
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const [openSharePopup, setOpenSharePopup] = React.useState(false);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [isApplySucces, setIsApplySuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadingSave, setIsLoadingSave] = React.useState(false);
  const [jobPostDetail, setJobPostDetail] = React.useState(null);

  React.useEffect(() => {
    const getJobPostDetail = async (jobPostSlug) => {
      try {
        const resData = await jobService.getJobPostDetailById(jobPostSlug);
        const data = resData.data;

        setJobPostDetail(data);
        TabTitle(data?.jobName);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    getJobPostDetail(slug);
  }, [slug]);

  React.useEffect(() => {
    if (isApplySucces) {
      setJobPostDetail({ ...jobPostDetail, isApplied: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isApplySucces]);

  const handleSave = () => {
    const saveJobPost = async () => {
      setIsLoadingSave(true);
      try {
        const resData = await jobService.saveJobPost(slug);
        const isSaved = resData.data.isSaved;

        setJobPostDetail({ ...jobPostDetail, isSaved: isSaved });
        toastMessages.success(
          isSaved ? "Lưu thành công." : "Hủy lưu thành công."
        );
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoadingSave(false);
      }
    };

    saveJobPost();
  };

  const handleShowApplyForm = () => {
    setOpenPopup(true);
  };

  return (
    <>
      {isLoading ? (
        Loading
      ) : jobPostDetail === null ? (
        <NoDataCard />
      ) : (
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
              {/* Start: thong tin chung */}
              <Card
                sx={{
                  py: 2,
                  px: { xs: 1.5, sm: 1.5, md: 2, lg: 4, xl: 4 },
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <Stack>
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Box>
                        <MuiImageCustom
                          width={75}
                          height={75}
                          src={jobPostDetail?.companyDict?.companyImageUrl}
                          sx={{
                            bgcolor: "white",
                            borderRadius: 2,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                            p: 0.5,
                          }}
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          component={Link}
                          to={`/${formatRoute(
                            ROUTES.JOB_SEEKER.COMPANY_DETAIL,
                            jobPostDetail?.companyDict?.slug
                          )}`}
                          sx={{ color: "inherit", textDecoration: "none" }}
                        >
                          {jobPostDetail?.companyDict?.companyName}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          gutterBottom
                          color="GrayText"
                        >
                          {allConfig?.employeeSizeDict[
                            jobPostDetail?.companyDict?.employeeSize
                          ] || (
                            <span
                              style={{
                                color: "#e0e0e0",
                                fontStyle: "italic",
                                fontSize: 13,
                              }}
                            >
                              Chưa cập nhật
                            </span>
                          )}
                        </Typography>
                      </Box>
                      <Box>
                        <Space direction="vertical" align="center">
                          <QRCode
                            value={window.location.href || "-"}
                            size={75}
                          />
                        </Space>
                      </Box>
                    </Stack>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box>
                    <Typography variant="h5" sx={{ fontSize: 26, mb: 2 }}>
                      {jobPostDetail?.jobName}
                    </Typography>

                    <Stack direction="row" spacing={3} sx={{ mb: 2 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "text.secondary",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faCalendarDay}
                          style={{
                            marginRight: 6,
                            fontSize: 15,
                            color: "#9c27b0",
                          }}
                        />
                        Hạn nộp:{" "}
                        {dayjs(jobPostDetail?.deadline).format("DD/MM/YYYY")}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "text.secondary",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faEye}
                          style={{
                            marginRight: 6,
                            fontSize: 15,
                            color: "#9c27b0",
                          }}
                        />
                        {jobPostDetail?.views} lượt xem
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "text.secondary",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faClockFour}
                          style={{
                            marginRight: 6,
                            fontSize: 15,
                            color: "#9c27b0",
                          }}
                        />
                        Đăng ngày:{" "}
                        {dayjs(jobPostDetail?.createAt).format("DD/MM/YYYY")}
                      </Typography>
                    </Stack>

                    <ActionComponent
                      isApplied={jobPostDetail.isApplied}
                      isSaved={jobPostDetail.isSaved}
                      isLoadingSave={isLoadingSave}
                      handleSave={handleSave}
                      handleShowApplyForm={handleShowApplyForm}
                      setOpenSharePopup={setOpenSharePopup}
                      isAuthenticated={isAuthenticated}
                      currentUser={currentUser}
                    />
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      {item(
                        "Mức lương",
                        salaryString(
                          jobPostDetail?.salaryMin,
                          jobPostDetail?.salaryMax
                        )
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      {item(
                        "Kinh nghiệm",
                        allConfig?.experienceDict[jobPostDetail?.experience]
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      {item(
                        "Cấp bậc",
                        allConfig?.positionDict[jobPostDetail?.position]
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      {item(
                        "Hình thức",
                        allConfig?.jobTypeDict[jobPostDetail?.jobType]
                      )}
                    </Grid>
                  </Grid>
                </Stack>
              </Card>
              {/* End: thong tin chung */}

              {/* Start: mo ta chi tiet */}
              <Card
                sx={{
                  p: 4,
                  mt: 3,
                  px: { xs: 1.5, sm: 1.5, md: 2, lg: 4, xl: 4 },
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <Stack spacing={4}>
                  {/* Mô tả công việc */}
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: "1.3rem",
                        fontWeight: 700,
                        mb: 2,
                        "&::after": {
                          content: '""',
                          display: "block",
                          width: "50px",
                          height: "3px",
                          background: "#9c27b0",
                          borderRadius: "2px",
                          mt: 1,
                        },
                      }}
                    >
                      Mô tả công việc
                    </Typography>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: jobPostDetail?.jobDescription,
                      }}
                    />
                  </Box>

                  {/* Yêu cầu công việc */}
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: "1.3rem",
                        fontWeight: 700,
                        mb: 2,
                        "&::after": {
                          content: '""',
                          display: "block",
                          width: "50px",
                          height: "3px",
                          background: "#9c27b0",
                          borderRadius: "2px",
                          mt: 1,
                        },
                      }}
                    >
                      Yêu cầu công việc
                    </Typography>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: jobPostDetail?.jobRequirement,
                      }}
                    />
                  </Box>

                  {/* Quyền lợi */}
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: "1.3rem",
                        fontWeight: 700,
                        mb: 2,
                        "&::after": {
                          content: '""',
                          display: "block",
                          width: "50px",
                          height: "3px",
                          background: "#9c27b0",
                          borderRadius: "2px",
                          mt: 1,
                        },
                      }}
                    >
                      Quyền lợi
                    </Typography>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: jobPostDetail?.benefitsEnjoyed,
                      }}
                    />
                  </Box>

                  {/* Thông tin bổ sung */}
                  <Box sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        {item(
                          "Nghề nghiệp",
                          allConfig.careerDict[jobPostDetail?.career]
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {item(
                          "Nơi làm việc",
                          allConfig.typeOfWorkplaceDict[
                            jobPostDetail?.typeOfWorkplace
                          ]
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {item(
                          "Học vấn",
                          allConfig.academicLevelDict[
                            jobPostDetail?.academicLevel
                          ]
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {item("Số lượng tuyển", jobPostDetail?.quantity)}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {item(
                          "Khu vực tuyển",
                          allConfig.cityDict[jobPostDetail?.location?.city]
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {item(
                          "Yêu cầu giới tính",
                          allConfig.genderDict[jobPostDetail?.genderRequired]
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                </Stack>
              </Card>
              {/* End: mo ta chi tiet */}

              {/* Start: thong tin lien he */}
              <Card
                sx={{
                  py: 4,
                  mt: 3,
                  px: { xs: 1.5, sm: 1.5, md: 2, lg: 4, xl: 4 },
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontSize: "1.3rem",
                          fontWeight: 700,
                          mb: 3,
                          "&::after": {
                            content: '""',
                            display: "block",
                            width: "50px",
                            height: "3px",
                            background: "#9c27b0",
                            borderRadius: "2px",
                            mt: 1,
                          },
                        }}
                      >
                        Thông tin liên hệ
                      </Typography>

                      <Stack spacing={2.5}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            p: 2,
                            borderRadius: 2,
                            bgcolor: "rgba(156,39,176,0.04)",
                            transition: "all 0.2s",
                            "&:hover": {
                              bgcolor: "rgba(156,39,176,0.08)",
                              transform: "translateX(8px)",
                            }
                          }}
                        >
                          <PersonIcon sx={{ color: "#9c27b0", fontSize: 24 }} />
                          <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              Người liên hệ
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {jobPostDetail?.contactPersonName || "Chưa cập nhật"}
                            </Typography>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            display: "flex", 
                            alignItems: "center",
                            gap: 2,
                            p: 2,
                            borderRadius: 2,
                            bgcolor: "rgba(156,39,176,0.04)",
                            transition: "all 0.2s",
                            "&:hover": {
                              bgcolor: "rgba(156,39,176,0.08)", 
                              transform: "translateX(8px)",
                            }
                          }}
                        >
                          <EmailIcon sx={{ color: "#9c27b0", fontSize: 24 }} />
                          <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              Email liên hệ
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {jobPostDetail?.contactPersonEmail || "Chưa cập nhật"}
                            </Typography>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center", 
                            gap: 2,
                            p: 2,
                            borderRadius: 2,
                            bgcolor: "rgba(156,39,176,0.04)",
                            transition: "all 0.2s",
                            "&:hover": {
                              bgcolor: "rgba(156,39,176,0.08)",
                              transform: "translateX(8px)",
                            }
                          }}
                        >
                          <PhoneIcon sx={{ color: "#9c27b0", fontSize: 24 }} />
                          <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              Số điện thoại
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {jobPostDetail?.contactPersonPhone || "Chưa cập nhật"}
                            </Typography>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2, 
                            p: 2,
                            borderRadius: 2,
                            bgcolor: "rgba(156,39,176,0.04)",
                            transition: "all 0.2s",
                            "&:hover": {
                              bgcolor: "rgba(156,39,176,0.08)",
                              transform: "translateX(8px)",
                            }
                          }}
                        >
                          <LocationOnIcon sx={{ color: "#9c27b0", fontSize: 24 }} />
                          <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              Địa chỉ
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {jobPostDetail?.location?.address || "Chưa cập nhật"}
                            </Typography>
                          </Box>
                        </Box>
                      </Stack>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontSize: "1.3rem",
                          fontWeight: 700,
                          mb: 3,
                          "&::after": {
                            content: '""',
                            display: "block",
                            width: "50px", 
                            height: "3px",
                            background: "#9c27b0",
                            borderRadius: "2px",
                            mt: 1,
                          },
                        }}
                      >
                        Bản đồ
                      </Typography>
                      <Box sx={{ 
                        borderRadius: 2,
                        overflow: "hidden",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                      }}>
                        <Map
                          title={jobPostDetail?.jobName}
                          subTitle={jobPostDetail?.location?.address}
                          latitude={jobPostDetail?.location?.lat}
                          longitude={jobPostDetail?.location?.lng}
                        />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Card>
              {/* End: thong tin lien he */}
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Card sx={{ p: { xs: 1.5, sm: 1.5, md: 2, lg: 2, xl: 2 } }}>
                <Stack spacing={2}>
                  <Typography variant="h5">Việc làm tương tự</Typography>
                  <Box
                    sx={{ width: 120, height: 5, backgroundColor: "#441da0" }}
                  ></Box>
                  <Box>
                    {/* Start: FilterJobPostCard */}
                    <FilterJobPostCard
                      params={{
                        excludeSlug: jobPostDetail?.slug,
                        // cityId: jobPostDetail?.location?.city,
                        // careerId: jobPostDetail?.career
                      }}
                      fullWidth={true}
                    />
                    {/* End: FilterJobPostCard */}
                  </Box>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
      {/* Start: ApplyCard */}
      <ApplyCard
        title={jobPostDetail?.jobName}
        jobPostId={jobPostDetail?.id}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        setIsApplySuccess={setIsApplySuccess}
      />
      {/* End: ApplyCard */}

      {/* Start: SocialNetworkSharingPopup */}
      <SocialNetworkSharingPopup
        open={openSharePopup}
        setOpenPopup={setOpenSharePopup}
        facebook={{
          url: window.location.href,
        }}
        facebookMessenger={{
          url: window.location.href,
        }}
        linkedin={{
          url: window.location.href,
          source: "",
          title: "",
          summary: "",
        }}
        twitter={{
          url: window.location.href,
          title: "",
          via: "",
          hashtags: [],
          related: [],
        }}
        email={{
          url: window.location.href,
          subject: "",
          body: "",
        }}
      />
      {/* End: SocialNetworkSharingPopup */}
    </>
  );
};

export default JobDetailPage;
