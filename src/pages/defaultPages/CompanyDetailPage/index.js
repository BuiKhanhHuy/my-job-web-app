/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  Box,
  Card,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
  Button,
  Skeleton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faUsers,
  faCalendarDays,
  faGlobe,
  faEnvelope,
  faPhoneVolume,
  faHashtag,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import { QRCode } from "antd";

import { TabTitle } from "../../../utils/generalFunction";
import { ICONS, IMAGES, ROLES_NAME } from "../../../configs/constants";
import errorHandling from "../../../utils/errorHandling";
import toastMessages from "../../../utils/toastMessages";
import Map from "../../../components/Map";
import SocialNetworkSharingPopup from "../../../components/SocialNetworkSharingPopup/SocialNetworkSharingPopup";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MuiImageCustom from "../../../components/MuiImageCustom";
import NoDataCard from "../../../components/NoDataCard";
import ImageGalleryCustom from "../../../components/ImageGalleryCustom";
import companyService from "../../../services/companyService";

import FilterJobPostCard from "../../components/defaults/FilterJobPostCard";

const LoadingComponent = () => {
  return (
    <Stack>
      <Card>
        <Box height={250}>
          <Skeleton variant="rounded" width={"100%"} height={"100%"} />
        </Box>
        <Box sx={{ p: 3, pt: 1 }}>
          <Stack
            direction={{
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
              xl: "row",
            }}
            spacing={2}
            alignItems="center"
          >
            <Box>
              <Skeleton variant="rounded" width={120} height={120} />
            </Box>
            <Stack flex={1} spacing={2}>
              <Skeleton variant="rounded" />
              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                  md: "row",
                  lg: "row",
                  xl: "row",
                }}
                spacing={{ xs: 0.5, sm: 2, md: 3, lg: 3, xl: 3 }}
              >
                <Skeleton variant="rounded" width={"100%"} />
                <Skeleton variant="rounded" width={"100%"} />
                <Skeleton variant="rounded" width={"100%"} />
              </Stack>
            </Stack>
            <Skeleton height={80} width={80} variant="rounded" />
          </Stack>
        </Box>
      </Card>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
          <Card sx={{ p: { xs: 2, sm: 2, md: 3, lg: 3, xl: 3 } }}>
            <Stack spacing={2}>
              <Skeleton variant="rounded" />
              <Skeleton height={150} variant="rounded" />
              <Skeleton variant="rounded" />
              <Skeleton height={300} variant="rounded" />
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <Card sx={{ p: { xs: 2, sm: 2, md: 3, lg: 3, xl: 3 } }}>
            <Stack spacing={3}>
              <Box>
                <Skeleton variant="rounded" />
                <Box sx={{ mt: 1 }}>
                  <Skeleton variant="rounded" />
                </Box>
              </Box>
              <Box>
                <Skeleton variant="rounded" />
                <Box sx={{ mt: 1 }}>
                  <Skeleton variant="rounded" />
                </Box>
              </Box>
              <Box>
                <Skeleton variant="rounded" />
                <Box sx={{ mt: 1 }}>
                  <Skeleton variant="rounded" />
                </Box>
                <Box sx={{ mt: 1 }}>
                  <Skeleton variant="rounded" />
                </Box>
                <Box sx={{ mt: 1 }}>
                  <Skeleton variant="rounded" />
                </Box>
                <Box sx={{ mt: 1 }}>
                  <Skeleton variant="rounded" />
                </Box>
              </Box>
              <Box>
                <Skeleton variant="rounded" />
                <Box sx={{ mt: 1, height: 200 }}>
                  <Skeleton variant="rounded" height="100%" />
                </Box>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};

const CompanyDetailPage = () => {
  const { slug } = useParams();
  const { allConfig } = useSelector((state) => state.config);
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const [openSharePopup, setOpenSharePopup] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadingFollow, setIsLoadingFollow] = React.useState(false);
  const [companyDetail, setCompanyDetail] = React.useState(null);
  const [imageList, setImageList] = React.useState([]);

  React.useEffect(() => {
    const getCompanyDetail = async (companySlug) => {
      try {
        const resData = await companyService.getCompanyDetailById(companySlug);
        const data = resData.data;
        const companyImages = data?.companyImages || [];

        setCompanyDetail(data);
        TabTitle(data?.companyName);

        var imagelistNew = [];
        for (let i = 0; i < companyImages.length; i++) {
          imagelistNew.push({
            original: companyImages[i].imageUrl,
            thumbnail: companyImages[i].imageUrl,
          });
        }
        setImageList(imagelistNew);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    getCompanyDetail(slug);
  }, [slug]);

  const handleFollow = () => {
    const follow = async () => {
      setIsLoadingFollow(true);
      try {
        const resData = await companyService.followCompany(slug);
        const isFollowed = resData.data.isFollowed;
        setCompanyDetail({
          ...companyDetail,
          isFollowed: isFollowed,
          followNumber: isFollowed
            ? companyDetail.followNumber + 1
            : companyDetail.followNumber - 1,
        });
        toastMessages.success(
          isFollowed ? "Theo dõi thành công." : "Hủy theo dõi thành công."
        );
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoadingFollow(false);
      }
    };

    follow();
  };

  return isLoading ? (
    <LoadingComponent />
  ) : companyDetail === null ? (
    <NoDataCard />
  ) : (
    <>
      <Box>
        <Stack spacing={2}>
          <Card
            sx={{
              overflow: "visible",
              boxShadow: (theme) => theme.customShadows.medium,
            }}
          >
            <Box>
              <MuiImageCustom
                src={
                  companyDetail?.companyCoverImageUrl ||
                  IMAGES.coverImageDefault
                }
                sx={{
                  maxHeight: 250,
                  minHeight: 200,
                }}
                duration={1500}
                width="100%"
                fit="cover"
              />
            </Box>
            <Box sx={{ p: 3, pt: 1 }}>
              <Stack
                direction={{
                  xs: "column",
                  sm: "column",
                  md: "row",
                  lg: "row",
                  xl: "row",
                }}
                spacing={3}
                alignItems="center"
              >
                <Box>
                  <MuiImageCustom
                    src={companyDetail.companyImageUrl}
                    sx={{
                      borderRadius: 2,
                      mt: -7,
                      p: 1,
                      bgcolor: "white",
                      boxShadow: (theme) => theme.customShadows.small,
                      border: "2px solid #fff",
                    }}
                    duration={1500}
                    width={120}
                    height={120}
                  />
                </Box>
                <Box flex={1}>
                  <Box>
                    <Typography
                      variant="h4"
                      gutterBottom
                      sx={{
                        textAlign: {
                          xs: "center",
                          sm: "center",
                          md: "left",
                        },
                        color: "primary.main",
                        fontWeight: 600,
                      }}
                    >
                      {companyDetail.companyName}
                    </Typography>
                  </Box>
                  <Stack
                    direction={{
                      xs: "column",
                      sm: "row",
                    }}
                    spacing={3}
                    sx={{
                      "& .MuiTypography-root": {
                        color: "text.secondary",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        "& svg": {
                          color: "primary.main",
                          fontSize: "1.2rem",
                        },
                      },
                    }}
                  >
                    <Typography variant="subtitle1">
                      <FontAwesomeIcon icon={faBriefcase} />
                      {companyDetail.fieldOperation}
                    </Typography>
                    <Typography variant="subtitle1">
                      <FontAwesomeIcon icon={faUsers} />
                      {allConfig?.employeeSizeDict[
                        companyDetail.employeeSize
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
                    <Typography variant="subtitle1">
                      <FontAwesomeIcon icon={faCalendarDays} />
                      {dayjs(companyDetail?.since).format("DD/MM/YYYY")}
                    </Typography>
                  </Stack>
                </Box>
                <Box sx={{ pt: 1 }}>
                  <QRCode
                    value={window.location.href || "-"}
                    size={75}
                    style={{
                      padding: "8px",
                      background: "#fff",
                      borderRadius: "8px",
                      boxShadow: (theme) => theme.customShadows.small,
                    }}
                  />
                </Box>
                <Stack spacing={1.5} justifyContent="center">
                  {isAuthenticated &&
                    currentUser?.roleName === ROLES_NAME.JOB_SEEKER && (
                      <LoadingButton
                        onClick={handleFollow}
                        startIcon={
                          companyDetail.isFollowed ? (
                            <BookmarkIcon />
                          ) : (
                            <BookmarkBorderIcon />
                          )
                        }
                        loading={isLoadingFollow}
                        loadingPosition="start"
                        variant={
                          companyDetail.isFollowed ? "contained" : "outlined"
                        }
                        color="primary"
                        sx={{
                          minWidth: 160,
                          borderRadius: 2,
                          boxShadow: "none",
                        }}
                      >
                        <span>
                          {companyDetail.isFollowed
                            ? "Đang theo dõi"
                            : "Theo dõi"}{" "}
                          ({companyDetail.followNumber})
                        </span>
                      </LoadingButton>
                    )}
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<ShareIcon />}
                    onClick={() => setOpenSharePopup(true)}
                    sx={{
                      minWidth: 160,
                      borderRadius: 2,
                      boxShadow: "none",
                    }}
                  >
                    Chia sẻ
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Card>

          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card
                  sx={{
                    p: 3,
                    boxShadow: (theme) => theme.customShadows.small,
                  }}
                >
                  <Stack spacing={4}>
                    <Box>
                      <Typography
                        variant="h5"
                        gutterBottom
                        sx={{
                          color: "primary.main",
                          fontWeight: 600,
                          mb: 3,
                        }}
                      >
                        Về công ty
                      </Typography>
                      <Box
                        sx={{
                          p: 2.5,
                          borderRadius: 2,
                          bgcolor: "grey.50",
                        }}
                      >
                        <Typography
                          sx={{
                            textAlign: "justify",
                            color: "text.secondary",
                            lineHeight: 1.8,
                          }}
                        >
                          {companyDetail?.description ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: companyDetail?.description,
                              }}
                            ></div>
                          ) : (
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
                    </Box>

                    <Box>
                      <Typography
                        variant="h5"
                        gutterBottom
                        sx={{
                          color: "primary.main",
                          fontWeight: 600,
                          mb: 3,
                        }}
                      >
                        Việc làm đang tuyển
                      </Typography>
                      <FilterJobPostCard
                        params={{
                          companyId: companyDetail.id,
                        }}
                      />
                    </Box>
                  </Stack>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    p: 3,
                    boxShadow: (theme) => theme.customShadows.small,
                  }}
                >
                  <Stack spacing={3}>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "primary.main",
                          mb: 2,
                        }}
                      >
                        Website
                      </Typography>
                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          color: "text.secondary",
                          "& svg": {
                            color: "primary.main",
                          },
                        }}
                      >
                        <FontAwesomeIcon icon={faGlobe} />
                        {companyDetail.websiteUrl ? (
                          <Link
                            target="_blank"
                            href={companyDetail.websiteUrl}
                            sx={{
                              color: "primary.main",
                              textDecoration: "none",
                              "&:hover": {
                                textDecoration: "underline",
                              },
                            }}
                          >
                            {companyDetail.websiteUrl}
                          </Link>
                        ) : (
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

                    {/* Social Media Links */}
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "primary.main",
                          mb: 2,
                        }}
                      >
                        Theo dõi tại
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          "& .MuiIconButton-root": {
                            bgcolor: "grey.50",
                            transition: "all 0.2s",
                            "&:hover": {
                              transform: "translateY(-2px)",
                            },
                          },
                        }}
                      >
                        {companyDetail?.facebookUrl && (
                          <IconButton color="primary" aria-label="facebook">
                            <img width="30" src={ICONS.FACEBOOK} alt="" />
                          </IconButton>
                        )}
                        {companyDetail?.youtubeUrl && (
                          <IconButton color="primary" aria-label="youtube">
                            <img width="30" src={ICONS.YOUTUBE} alt="" />
                          </IconButton>
                        )}
                        {companyDetail?.linkedinUrl && (
                          <IconButton color="primary" aria-label="linked">
                            <img width="30" src={ICONS.LINKEDIN} alt="" />
                          </IconButton>
                        )}
                      </Stack>
                    </Box>

                    {/* Company Info */}
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "primary.main",
                          mb: 2,
                        }}
                      >
                        Thông tin chung
                      </Typography>
                      <Stack
                        spacing={2}
                        sx={{
                          "& .MuiTypography-root": {
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            color: "text.secondary",
                            "& svg": {
                              color: "primary.main",
                            },
                          },
                        }}
                      >
                        <Typography>
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            style={{ marginRight: 6 }}
                          />{" "}
                          {companyDetail.companyEmail}
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                          <FontAwesomeIcon
                            icon={faPhoneVolume}
                            style={{ marginRight: 6 }}
                          />{" "}
                          {companyDetail.companyPhone}
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                          <FontAwesomeIcon
                            icon={faHashtag}
                            style={{ marginRight: 6 }}
                          />{" "}
                          {companyDetail.taxCode}
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            style={{ marginRight: 6 }}
                          />{" "}
                          {companyDetail.location?.address || (
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
                      </Stack>
                    </Box>

                    {/* Map */}
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "primary.main",
                          mb: 2,
                        }}
                      >
                        Bản đồ
                      </Typography>
                      <Box
                        sx={{
                          borderRadius: 2,
                          overflow: "hidden",
                          border: "1px solid",
                          borderColor: "grey.200",
                        }}
                      >
                        <Map
                          title={companyDetail?.companyName}
                          subTitle={companyDetail?.location?.address}
                          latitude={companyDetail?.location?.lat}
                          longitude={companyDetail?.location?.lng}
                        />
                      </Box>
                    </Box>

                    {/* Image Gallery */}
                    {imageList.length > 0 && (
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            color: "primary.main",
                            mb: 2,
                          }}
                        >
                          Hình ảnh
                        </Typography>
                        <Box
                          sx={{
                            borderRadius: 2,
                            overflow: "hidden",
                            border: "1px solid",
                            borderColor: "grey.200",
                          }}
                        >
                          <ImageGalleryCustom images={imageList} />
                        </Box>
                      </Box>
                    )}
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Box>

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

export default CompanyDetailPage;
