/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";

import {
  Box,
  Chip,
  Grid,
  Stack,
  Typography,
  Button,
  Divider,
  Tooltip,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import dayjs from "dayjs";

import HelpIcon from "@mui/icons-material/Help";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import {
  faCalendar,
  faDollarSign,
  faMagicWandSparkles,
  faUser,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CV_TYPES, ROUTES, APP_NAME } from "../../../../configs/constants";
import BackdropLoading from "../../../../components/loading/BackdropLoading";
import toastMessages from "../../../../utils/toastMessages";
import errorHandling from "../../../../utils/errorHandling";
import MuiImageCustom from "../../../../components/MuiImageCustom";
import toSlug, { salaryString } from "../../../../utils/customData";
import NoDataCard from "../../../../components/NoDataCard";
import CVDoc from "../../../../components/CVDoc";
import { reloadResume } from "../../../../redux/profileSlice";
import jobSeekerProfileService from "../../../../services/jobSeekerProfileService";
import resumeService from "../../../../services/resumeService";
import { formatRoute } from "../../../../utils/funcUtils";
import ColorPickerDialog from '../../../../components/ColorPickerDialog';

const Loading = () => {
  return (
    <Grid container spacing={3}>
      <Grid item>
        <Stack direction="row" alignItems="center" spacing={3}>
          <Skeleton width={130} height={130} variant="circular" />
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "none",
                lg: "none",
                xl: "none",
              },
            }}
          >
            <Typography variant="h6">
              <Skeleton />
            </Typography>
            <Typography variant="h6">
              <Skeleton />
            </Typography>
          </Box>
        </Stack>
      </Grid>
      <Grid item flex={1}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Skeleton />
          </Grid>
          <Grid item xs={12}>
            <Skeleton />
          </Grid>
          <Grid item xs={12}>
            <Skeleton />
          </Grid>
          <Grid item xs={12}>
            <Skeleton />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <Skeleton />
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
          <Skeleton width={120} height={60} />
        </Stack>
      </Grid>
    </Grid>
  );
};

const BoxProfile = ({ title }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const {
    resume: { isReloadResume },
  } = useSelector((state) => state.profile);
  const { currentUser } = useSelector((state) => state.user);
  const { allConfig } = useSelector((state) => state.config);
  const [isLoadingResume, setIsLoadingResume] = React.useState(false);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);

  const [resume, setResume] = React.useState(null);
  const [openColorPicker, setOpenColorPicker] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState('#140861');
  const [isGeneratingPDF, setIsGeneratingPDF] = React.useState(false);
  const blobRef = React.useRef(null);

  React.useEffect(() => {
    const getOnlineProfile = async (jobSeekerProfileId, params) => {
      setIsLoadingResume(true);
      try {
        const resData = await jobSeekerProfileService.getResumes(
          jobSeekerProfileId,
          params
        );

        setResume(resData.data);
      } catch (error) {
      } finally {
        setIsLoadingResume(false);
      }
    };

    getOnlineProfile(currentUser?.jobSeekerProfileId, {
      resumeType: CV_TYPES.cvWebsite,
    });
  }, [currentUser, isReloadResume]);

  const handleActive = (slug) => {
    const activeResume = async (resumeSlug) => {
      setIsFullScreenLoading(true);
      try {
        await resumeService.activeResume(resumeSlug);

        dispatch(reloadResume());
        toastMessages.success("Thay đổi trạng thái hồ sơ thành công.");
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    activeResume(slug);
  };

  const handleColorSelect = async (color) => {
    setSelectedColor(color);
    setIsGeneratingPDF(true);
    // Wait for a moment to ensure the PDF is regenerated with the new color
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsGeneratingPDF(false);
  };

  const handleDownloadClick = (e) => {
    e.preventDefault();
    setOpenColorPicker(true);
  };

  return (
    <>
      <Stack>
        <Box>
          <Stack
            direction={{
              xs: "column",
              sm: "row",
              md: "row",
              lg: "row",
              xl: "row",
            }}
            justifyContent="space-between"
            alignItems={{
              xs: "flex-start",
              sm: "center",
              md: "center",
              lg: "center",
              xl: "center",
            }}
            spacing={2}
          >
            <Typography
              variant="h5"
              textAlign="left"
              sx={{
                fontWeight: 600,
              }}
            >
              {title}
            </Typography>

            {resume != null && (
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Stack direction="row" spacing={0.5}>
                  {resume.isActive ? (
                    <Chip
                      size="small"
                      icon={<StarIcon sx={{ color: "warning.main" }} />}
                      color="success"
                      label="Cho phép tìm kiếm"
                      onClick={() => handleActive(resume.slug)}
                      sx={{
                        backgroundColor: "success.background",
                        color: "success.main",
                        "&:hover": {
                          backgroundColor: "success.background",
                          opacity: 0.8,
                        },
                      }}
                    />
                  ) : (
                    <Chip
                      variant="outlined"
                      size="small"
                      icon={<StarOutlineIcon sx={{ color: "warning.main" }} />}
                      label="Cho phép tìm kiếm"
                      onClick={() => handleActive(resume.slug)}
                      sx={{
                        borderColor: "grey.300",
                        "&:hover": {
                          backgroundColor: "grey.50",
                        },
                      }}
                    />
                  )}
                  <Tooltip
                    title={`Bật "Cho phép tìm kiếm" sẽ giúp nhà tuyển dụng tìm thấy hồ sơ của bạn và họ có thể liên hệ với bạn về công việc mới. Chỉ có duy nhất một hồ được bật trạng thái "cho phép tìm kiếm" trong tất cả hồ sơ của bạn.`}
                    arrow
                  >
                    <HelpIcon sx={{ color: "grey.400" }} />
                  </Tooltip>
                </Stack>

                {!isGeneratingPDF && (
                  <PDFDownloadLink
                    document={<CVDoc resume={resume} user={currentUser} themeColor={selectedColor} />}
                    fileName={`${APP_NAME}_CV_${currentUser?.fullName}-${toSlug(resume?.title || "title")}.pdf`}
                    style={{ textDecoration: "none" }}
                  >
                    {({ loading, blob }) => {
                      if (blob) {
                        blobRef.current = blob;
                      }
                      
                      return loading || isGeneratingPDF ? (
                        <Chip
                          size="small"
                          icon={<CircularProgress size={16} />}
                          color="secondary"
                          label="Đang tải..."
                          sx={{
                            boxShadow: (theme) => theme.customShadows.medium,
                          }}
                        />
                      ) : (
                        <Chip
                          size="small"
                          icon={<DownloadIcon />}
                          color="secondary"
                          label="Tải xuống"
                          onClick={handleDownloadClick}
                          sx={{
                            boxShadow: (theme) => theme.customShadows.medium,
                            "&:hover": {
                              transform: "scale(1.03)",
                            },
                            transition: "all 0.2s ease-in-out",
                          }}
                        />
                      );
                    }}
                  </PDFDownloadLink>
                )}

                {isGeneratingPDF && (
                  <Chip
                    size="small"
                    icon={<CircularProgress size={16} />}
                    color="secondary"
                    label="Đang tạo PDF..."
                    sx={{
                      boxShadow: (theme) => theme.customShadows.medium,
                    }}
                  />
                )}
              </Stack>
            )}
          </Stack>
        </Box>
        <Divider sx={{ my: 3, borderColor: "grey.500" }} />
        <Box>
          {isLoadingResume ? (
            <Loading />
          ) : resume === null ? (
            <NoDataCard />
          ) : (
            <Grid container spacing={4}>
              <Grid item>
                <Stack direction="row" alignItems="center" spacing={3}>
                  <Box
                    sx={{
                      position: "relative",
                      width: 130,
                      height: 130,
                      padding: "4px",
                      borderRadius: "50%",
                      background: (theme) => theme.palette.primary.gradient,
                      boxShadow: (theme) => theme.customShadows.medium,
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  >
                    <MuiImageCustom
                      src={currentUser?.avatarUrl}
                      width="100%"
                      height="100%"
                      sx={{
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "3px solid white",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: {
                        xs: "block",
                        sm: "block",
                        md: "none",
                        lg: "none",
                        xl: "none",
                      },
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        color: "primary.main",
                      }}
                    >
                      {resume?.user?.fullName}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: "text.secondary",
                        mt: 0.5,
                      }}
                    >
                      {resume.title || (
                        <Typography
                          component="span"
                          sx={{
                            color: "grey.400",
                            fontStyle: "italic",
                            fontSize: "0.875rem",
                          }}
                        >
                          Chưa cập nhật
                        </Typography>
                      )}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: {
                        xs: "none",
                        sm: "none",
                        md: "block",
                        lg: "block",
                        xl: "block",
                      },
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{
                          textTransform: "uppercase",
                          fontWeight: "bold",
                          color: "primary.main",
                        }}
                      >
                        {resume?.user?.fullName}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: "text.secondary",
                          mt: 0.5,
                        }}
                      >
                        {resume.title || (
                          <Typography
                            component="span"
                            sx={{
                              color: "grey.400",
                              fontStyle: "italic",
                              fontSize: "0.875rem",
                            }}
                          >
                            Chưa cập nhật
                          </Typography>
                        )}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Stack spacing={2}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "text.secondary",
                          "& svg": {
                            fontSize: "1.25rem",
                            mr: 2,
                            color: "primary.main",
                          },
                        }}
                      >
                        <FontAwesomeIcon icon={faMagicWandSparkles} />
                        <Typography>
                          Kinh nghiệm:{" "}
                          <Typography
                            component="span"
                            sx={{
                              color: "text.primary",
                              fontWeight: 600,
                            }}
                          >
                            {allConfig.experienceDict[resume.experience] || (
                              <Typography
                                component="span"
                                sx={{
                                  color: "grey.400",
                                  fontStyle: "italic",
                                  fontSize: "0.875rem",
                                }}
                              >
                                Chưa cập nhật
                              </Typography>
                            )}
                          </Typography>
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "text.secondary",
                          "& svg": {
                            fontSize: "1.25rem",
                            mr: 2,
                            color: "primary.main",
                          },
                        }}
                      >
                        <FontAwesomeIcon icon={faUser} />
                        <Typography>
                          Cấp bậc:{" "}
                          <Typography
                            component="span"
                            sx={{
                              color: "text.primary",
                              fontWeight: 600,
                            }}
                          >
                            {allConfig.positionDict[resume.position] || (
                              <Typography
                                component="span"
                                sx={{
                                  color: "grey.400",
                                  fontStyle: "italic",
                                  fontSize: "0.875rem",
                                }}
                              >
                                Chưa cập nhật
                              </Typography>
                            )}
                          </Typography>
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "text.secondary",
                          "& svg": {
                            fontSize: "1.25rem",
                            mr: 2,
                            color: "primary.main",
                          },
                        }}
                      >
                        <FontAwesomeIcon icon={faDollarSign} />
                        <Typography>
                          Mức lương mong muốn:{" "}
                          <Typography
                            component="span"
                            sx={{
                              color: "text.primary",
                              fontWeight: 600,
                            }}
                          >
                            {salaryString(resume.salaryMin, resume.salaryMax)}
                          </Typography>
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "text.secondary",
                          "& svg": {
                            fontSize: "1.25rem",
                            mr: 2,
                            color: "primary.main",
                          },
                        }}
                      >
                        <FontAwesomeIcon icon={faCalendar} />
                        <Typography>
                          Ngày cập nhật:{" "}
                          <Typography
                            component="span"
                            sx={{
                              color: "text.primary",
                              fontWeight: 600,
                            }}
                          >
                            {dayjs(resume.updateAt).format(
                              "DD/MM/YYYY HH:mm:ss"
                            )}
                          </Typography>
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: "warning.background",
                    "& svg": {
                      color: "warning.main",
                      mr: 1,
                    },
                  }}
                >
                  <FontAwesomeIcon icon={faWarning} />
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Vui lòng thêm tất cả các thông tin cần thiết để hoàn thành
                    hồ sơ của bạn.
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" justifyContent="center">
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() =>
                      nav(
                        `/${ROUTES.JOB_SEEKER.DASHBOARD}/${formatRoute(
                          ROUTES.JOB_SEEKER.STEP_PROFILE,
                          resume.slug
                        )}`
                      )
                    }
                    sx={{
                      px: 4,
                      py: 1,
                      fontSize: "1rem",
                      background: (theme) => theme.palette.primary.gradient,
                      "&:hover": {
                        background: (theme) => theme.palette.primary.gradient,
                        opacity: 0.9,
                        boxShadow: (theme) => theme.customShadows.medium,
                      },
                    }}
                  >
                    Chỉnh sửa hồ sơ
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          )}
        </Box>
      </Stack>

      <ColorPickerDialog
        open={openColorPicker}
        onClose={() => setOpenColorPicker(false)}
        onColorSelect={async (color) => {
          await handleColorSelect(color);
          // Wait for the PDF to be created with the new color
          setTimeout(() => {
            if (blobRef.current) {
              const url = URL.createObjectURL(blobRef.current);
              const link = document.createElement('a');
              link.href = url;
              link.download = `${APP_NAME}_CV-${toSlug(resume?.title || "title")}.pdf`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
            }
          }, 1000);
        }}
      />

      {isFullScreenLoading && <BackdropLoading />}
    </>
  );
};

export default BoxProfile;
