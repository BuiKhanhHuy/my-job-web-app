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
import {
  Avatar,
  Box,
  Card,
  Divider,
  Grid,
  Rating,
  Stack,
  Typography,
  Button,
  Skeleton,
  Chip,
} from "@mui/material";
import ReactToPrint from "react-to-print";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";
import DownloadIcon from "@mui/icons-material/Download";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PrintIcon from "@mui/icons-material/Print";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";
import { useMediaQuery } from "@mui/material";

import defaultTheme from "../../../../themeConfigs/defaultTheme";
import { CV_TYPES } from "../../../../configs/constants";
import BackdropLoading from "../../../../components/loading/BackdropLoading";
import {
  convertEditorStateToHTMLString,
  salaryString,
} from "../../../../utils/customData";
import NoDataCard from "../../../../components/NoDataCard";
import downloadPdf from "../../../../utils/funcUtils";
import toastMessages from "../../../../utils/toastMessages";
import FormPopup from "../../../../components/controls/FormPopup";
import errorHandling from "../../../../utils/errorHandling";
import resumeService from "../../../../services/resumeService";
import Pdf from "../../../../components/Pdf";
import SendMailCard from "../SendMailCard";
import TimeAgo from '../../../../components/TimeAgo';

const item = (title, value) => {
  return (
    <Box sx={{ p: 1 }}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "0.9rem",
          color: (theme) => theme.palette.grey[700],
          mb: 1,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          textAlign: "justify",
          color: (theme) =>
            value ? theme.palette.text.primary : theme.palette.grey[400],
          fontStyle: value ? "normal" : "italic",
          fontSize: value ? "0.95rem" : "0.813rem",
        }}
      >
        {value || "Chưa cập nhật"}
      </Typography>
    </Box>
  );
};

const Loading = (
  <>
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Box>
          <Skeleton width={110} height={110} variant="circular" />
        </Box>
        <Stack flex={1}>
          <Typography variant="h4">
            <Skeleton />
          </Typography>
          <Typography>
            <Skeleton />
          </Typography>
          <Typography>
            <Skeleton />
          </Typography>
          <Typography>
            <Skeleton />
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="space-between" spacing={4}>
        <Skeleton width={"100%"} />
        <Skeleton width={"100%"} />
        <Skeleton width={"100%"} />
        <Skeleton width={"100%"} />
      </Stack>
    </Stack>
    <Box sx={{ my: 2 }}></Box>
    {/* Start: Personal Profile */}
    <Box>
      <Typography variant="h6" sx={{ mb: 1.5 }}>
        <Skeleton />
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
      </Grid>
    </Box>
    {/* End: Personal Profile */}
    <Box sx={{ my: 2 }}></Box>

    {/* Start: General Profile */}
    <Box>
      <Typography variant="h6" sx={{ mb: 1.5 }}>
        <Skeleton />
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
        <Grid item xs={4}>
          <Skeleton />
        </Grid>
      </Grid>
    </Box>
    {/* End: General Profile */}
    <Box sx={{ my: 2 }}></Box>
    <Box>
      <Typography variant="h6" sx={{ mb: 1.5 }}>
        <Skeleton />
      </Typography>
      <Box sx={{ py: 2 }}>
        <Skeleton height={200} />
      </Box>
    </Box>
  </>
);

const SendEmailComponent = ({ resumeSlug, email, fullName, isSentEmail }) => {
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [openSendMailPopup, setOpenSendMailPopup] = React.useState(false);
  const [sendMailData, setSendMailData] = React.useState(null);
  const [sentEmail, setSentEmail] = React.useState(isSentEmail);
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleOpenSendMail = (email, fullName) => {
    setSendMailData({
      fullName: fullName,
      email: email,
    });
    setOpenSendMailPopup(true);
  };

  const handleSendEmail = (data) => {
    const sendEmail = async (slug, data) => {
      setIsFullScreenLoading(true);
      try {
        await resumeService.sendEmail(slug, data);

        if (!sentEmail) {
          setSentEmail(true);
        }
        setOpenSendMailPopup(false);
        toastMessages.success("Gửi email thành công.");
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    let newData = {
      ...data,
      content: convertEditorStateToHTMLString(data.content),
    };
    // execute
    sendEmail(resumeSlug, newData);
  };

  return (
    <>
      <Button
        variant="contained"
        size="medium"
        color={sentEmail ? "inherit" : "secondary"}
        sx={{
          color: sentEmail ? "secondary" : "white",
          width: { xs: "100%", sm: "auto" },
        }}
        onClick={() => handleOpenSendMail(email, fullName)}
        fullWidth={matches}
        startIcon={
          sentEmail ? (
            <MarkEmailReadRoundedIcon color="white" />
          ) : (
            <ForwardToInboxIcon />
          )
        }
      >
        {sentEmail ? "Gửi lại Email" : "Gửi Email"}
      </Button>
      <SendMailCard
        openPopup={openSendMailPopup}
        setOpenPopup={setOpenSendMailPopup}
        sendMailData={sendMailData}
        handleSendEmail={handleSendEmail}
      />
      {isFullScreenLoading && <BackdropLoading />}
    </>
  );
};

const ProfileDetailCard = () => {
  const { slug: resumeSlug } = useParams();
  const { allConfig } = useSelector((state) => state.config);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [profileDetail, setProfileDetail] = React.useState(null);
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  let printComponentRef = React.useRef();
  let actionRef = React.useRef();
  let printContainerRef = React.useRef();

  React.useEffect(() => {
    const viewResume = async (resumeSlug) => {
      try {
        await resumeService.viewResume(resumeSlug);
      } catch (error) {
        console.error("Lỗi khi xem CV! ", error);
      }
    };

    viewResume(resumeSlug);
  }, [resumeSlug]);

  React.useEffect(() => {
    const getProfileDetail = async (resumeSlug) => {
      setIsLoading(true);

      try {
        const resData = await resumeService.getResumeDetail(resumeSlug);

        setProfileDetail(resData.data);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoading(false);
      }
    };

    getProfileDetail(resumeSlug);
  }, [resumeSlug]);

  const handleSave = (slug) => {
    const save = async (slugResume) => {
      try {
        const resData = await resumeService.saveResume(slugResume);
        const isSaved = resData.data.isSaved;

        setProfileDetail({ ...profileDetail, isSaved: isSaved });
        toastMessages.success(
          isSaved ? "Lưu thành công." : "Hủy lưu thành công."
        );
      } catch (error) {
        errorHandling(error);
      }
    };

    save(slug);
  };

  return isLoading ? (
    Loading
  ) : profileDetail === null ? (
    <NoDataCard
      title={
        <p>
          Không tìm thấy thông tin hồ sơ.
          <br /> Có thể hồ sơ này đã được đặt chế độ không cho phép tìm kiếm.
        </p>
      }
    />
  ) : (
    <>
      <Box ref={(el) => (printComponentRef = el)}>
        <Stack ref={printContainerRef}>
          <>
            <Stack spacing={3}>
              <Card
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 3 },
                  background: (theme) => theme.palette.primary.gradient,
                  color: "white",
                }}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={3}
                  alignItems={{ xs: "center", sm: "flex-start" }}
                >
                  <Avatar
                    src={profileDetail?.user?.avatarUrl}
                    sx={{
                      width: { xs: 100, sm: 120 },
                      height: { xs: 100, sm: 120 },
                      border: "4px solid white",
                      boxShadow: (theme) => theme.customShadows.medium,
                    }}
                  />
                  <Stack
                    flex={1}
                    alignItems={{ xs: "center", sm: "flex-start" }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        color: "white",
                        mb: 1,
                        fontSize: { xs: "1.75rem", sm: "2rem" },
                        textAlign: { xs: "center", sm: "left" },
                      }}
                    >
                      {profileDetail?.user?.fullName}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 500,
                        fontSize: { xs: "1rem", sm: "1.1rem" },
                        color: "white",
                        opacity: 0.9,
                        mb: 1,
                        textAlign: { xs: "center", sm: "left" },
                      }}
                    >
                      {profileDetail?.title || "Chưa cập nhật"}
                    </Typography>
                    <Typography
                      sx={{
                        color: "white",
                        opacity: 0.8,
                        textAlign: { xs: "center", sm: "left" },
                      }}
                    >
                      Cập nhật:{" "}
                      {dayjs(profileDetail?.updateAt).format("DD/MM/YYYY")}
                    </Typography>
                    {profileDetail?.lastViewedDate && (
                      <Chip
                        sx={{
                          mt: 1,
                          maxWidth: "fit-content",
                          background: "rgba(255,255,255,0.2)",
                          color: "white",
                          "& .MuiChip-icon": {
                            color: "white",
                          },
                        }}
                        icon={<CheckCircleRoundedIcon />}
                        label={`Xem lần cuối: ${dayjs(
                          profileDetail?.lastViewedDate
                        ).format("DD/MM/YYYY HH:mm")}`}
                        size="small"
                      />
                    )}
                  </Stack>
                </Stack>
              </Card>

              {/* Action buttons */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
                ref={actionRef}
              >
                <Box>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1}
                    width={{ xs: "100%", sm: "auto" }}
                  >
                    <ReactToPrint
                      trigger={() => (
                        <Button
                          variant="outlined"
                          size="medium"
                          startIcon={<PrintIcon />}
                          fullWidth={matches}
                        >
                          In hồ sơ
                        </Button>
                      )}
                      content={() => printComponentRef}
                      onBeforeGetContent={() => {
                        actionRef.current.style.display = "none";
                        printContainerRef.current.style.padding = "30px";
                      }}
                      onAfterPrint={() => {
                        actionRef.current.style.display = "inherit";
                        printContainerRef.current.style.padding = "inherit";
                      }}
                    />
                    <Button
                      variant={
                        profileDetail?.isSaved ? "contained" : "outlined"
                      }
                      size="medium"
                      startIcon={
                        profileDetail?.isSaved ? (
                          <FavoriteIcon />
                        ) : (
                          <FavoriteBorderIcon />
                        )
                      }
                      onClick={() => handleSave(profileDetail?.slug)}
                      color={profileDetail?.isSaved ? "success" : "primary"}
                      fullWidth={matches}
                    >
                      {profileDetail?.isSaved ? "Đã lưu" : "Lưu hồ sơ"}
                    </Button>
                    {/* SendEmailComponent with responsive */}
                    <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
                      <SendEmailComponent
                        resumeSlug={resumeSlug}
                        email={profileDetail?.user?.email}
                        fullName={profileDetail?.user?.fullName}
                        isSentEmail={profileDetail?.isSentEmail}
                      />
                    </Box>
                  </Stack>
                </Box>

                {/* CV đính kèm section */}
                {profileDetail?.type &&
                  profileDetail.type === CV_TYPES.cvUpload && (
                    <Card
                      variant="outlined"
                      sx={{
                        p: 2,
                        background: (theme) => theme.palette.grey[50],
                        border: "1px solid",
                        borderColor: (theme) => theme.palette.grey[200],
                        width: { xs: "100%", sm: "auto" },
                      }}
                    >
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                        alignItems="center"
                      >
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="center"
                          width={{ xs: "100%", sm: "auto" }}
                        >
                          <FontAwesomeIcon
                            icon={faFilePdf}
                            color="#d32f2f"
                            size="lg"
                          />
                          <Typography sx={{ fontWeight: 500, flex: 1 }}>
                            {profileDetail?.filePublicId}.pdf
                          </Typography>
                        </Stack>
                        <Stack
                          direction="row"
                          spacing={1}
                          width={{ xs: "100%", sm: "auto" }}
                        >
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<DownloadIcon />}
                            onClick={() =>
                              downloadPdf(
                                profileDetail?.fileUrl,
                                profileDetail?.title
                              )
                            }
                            fullWidth={matches}
                          >
                            Tải xuống
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<RemoveRedEyeIcon />}
                            onClick={() => setOpenPopup(true)}
                            fullWidth={matches}
                          >
                            Xem
                          </Button>
                        </Stack>
                      </Stack>
                    </Card>
                  )}
              </Stack>

              {/* Information sections */}
              <Card elevation={0} sx={{ p: { xs: 2, sm: 3 } }}>
                <Stack spacing={4}>
                  {/* Personal info section */}
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        mb: 2,
                        color: (theme) => theme.palette.primary.main,
                        borderBottom: "2px solid",
                        borderColor: (theme) => theme.palette.primary.light,
                        pb: 1,
                        fontSize: { xs: "1.25rem", sm: "1.5rem" },
                      }}
                    >
                      Thông tin cá nhân
                    </Typography>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={4}>
                        {item("Email", profileDetail?.user?.email)}
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        {item(
                          "Số điện thoại",
                          profileDetail?.jobSeekerProfile?.phone
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        {item(
                          "Giới tính",
                          allConfig?.genderDict[
                            profileDetail?.jobSeekerProfile?.gender
                          ]
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        {item(
                          "Ngày sinh",
                          <TimeAgo date={profileDetail?.jobSeekerProfile?.birthday} type="format" />
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        {item(
                          "Tình trạng hôn nhân",
                          allConfig?.maritalStatusDict[
                            profileDetail?.jobSeekerProfile?.maritalStatus
                          ]
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        {item(
                          "Tỉnh/Thành phố",
                          allConfig?.cityDict[
                            profileDetail?.jobSeekerProfile?.location?.city
                          ]
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        {item(
                          "Quận/Huyện",
                          profileDetail?.jobSeekerProfile?.location
                            ?.districtDict?.name
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        {item(
                          "Địa chỉ",
                          profileDetail?.jobSeekerProfile?.location?.address
                        )}
                      </Grid>
                    </Grid>
                  </Box>

                  {/* General info section - similar responsive pattern */}
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        mb: 2,
                        color: (theme) => theme.palette.primary.main,
                        borderBottom: "2px solid",
                        borderColor: (theme) => theme.palette.primary.light,
                        pb: 1,
                        fontSize: { xs: "1.25rem", sm: "1.5rem" },
                      }}
                    >
                      Thông tin chung
                    </Typography>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={4}>
                        {item("Vị trí mong muốn", profileDetail?.title)}
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        {item(
                          "Cấp bậc mong muốn",
                          allConfig?.positionDict[profileDetail?.position]
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        {item(
                          "Trình độ học vấn",
                          allConfig?.academicLevelDict[
                            profileDetail?.academicLevel
                          ]
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        {item(
                          "Kinh nghiệm",
                          allConfig?.experienceDict[profileDetail?.experience]
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        {item(
                          "Nghề nghiệp",
                          allConfig?.careerDict[profileDetail?.career]
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        {item(
                          "Địa điểm làm việc",
                          allConfig?.cityDict[profileDetail?.city]
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        {item(
                          "Mức lương mong muốn",
                          salaryString(
                            profileDetail?.salaryMin,
                            profileDetail?.salaryMax
                          )
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        {item(
                          "Nơi làm việc",
                          allConfig?.typeOfWorkplaceDict[
                            profileDetail?.typeOfWorkplace
                          ]
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        {item(
                          "Hình thức làm việc",
                          allConfig?.jobTypeDict[profileDetail?.jobType]
                        )}
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Career goals section */}
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        mb: 2,
                        color: (theme) => theme.palette.primary.main,
                        borderBottom: "2px solid",
                        borderColor: (theme) => theme.palette.primary.light,
                        pb: 1,
                        fontSize: { xs: "1.25rem", sm: "1.5rem" },
                      }}
                    >
                      Mục tiêu nghề nghiệp
                    </Typography>
                    <Card
                      variant="outlined"
                      sx={{
                        p: 3,
                        background: (theme) => theme.palette.grey[50],
                        border: "1px solid",
                        borderColor: (theme) => theme.palette.grey[200],
                        boxShadow: 0,
                      }}
                    >
                      <Typography
                        sx={{
                          color: profileDetail?.description
                            ? defaultTheme.palette.text.primary
                            : defaultTheme.palette.text.disabled,
                          fontStyle: profileDetail?.description
                            ? "normal"
                            : "italic",
                          fontSize: profileDetail?.description
                            ? "0.95rem"
                            : defaultTheme.palette.text.disabled.fontSize,
                          lineHeight: 1.6,
                        }}
                      >
                        {profileDetail?.description || "Chưa cập nhật"}
                      </Typography>
                    </Card>
                  </Box>
                </Stack>
              </Card>
            </Stack>
          </>

          {profileDetail?.type && profileDetail.type === CV_TYPES.cvWebsite ? (
            <>
              {/* Start: Experience */}{" "}
              {(profileDetail?.experiencesDetails || []).length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h5" sx={{ mb: 1.5 }}>
                    Kinh nghiệm làm việc
                  </Typography>
                  <Box>
                    <Card
                      variant="outlined"
                      sx={{ p: 2, borderWidth: 2, boxShadow: 0 }}
                    >
                      <Grid container spacing={1}>
                        {profileDetail.experiencesDetails.map(
                          (value, index) => (
                            <>
                              <Grid item xs={5} key={value.id}>
                                <Typography
                                  sx={{
                                    fontSize: 17.5,
                                    fontWeight: "bold",
                                    mb: 0.5,
                                  }}
                                >
                                  {value?.jobName}
                                </Typography>
                                <Typography
                                  sx={{ fontWeight: "bold", fontSize: 15 }}
                                >
                                  {value?.companyName}
                                </Typography>
                                <Typography sx={{ color: "gray" }}>
                                  {<TimeAgo date={value?.startDate} type="format" />}{" "}
                                  - {<TimeAgo date={value?.endDate} type="format" />}
                                </Typography>
                              </Grid>
                              <Grid item xs={7}>
                                <Typography>
                                  {value?.description || (
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
                              </Grid>
                              {index <
                                profileDetail.educationDetails.length - 1 && (
                                <Grid item xs={12}>
                                  <Divider />
                                </Grid>
                              )}
                            </>
                          )
                        )}
                      </Grid>
                    </Card>
                  </Box>
                </Box>
              )}
              {/* End: Experience */}
              {/* Start: Education */}
              {(profileDetail?.educationDetails || []).length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h5" sx={{ mb: 1.5 }}>
                    Học vấn
                  </Typography>
                  <Box>
                    <Card
                      variant="outlined"
                      sx={{ p: 2, borderWidth: 2, boxShadow: 0 }}
                    >
                      <Grid container spacing={1}>
                        {profileDetail.educationDetails.map((value, index) => (
                          <>
                            <Grid item xs={12} key={value.id}>
                              <Typography
                                sx={{
                                  fontSize: 17.5,
                                  fontWeight: "bold",
                                  mb: 0.5,
                                }}
                              >
                                {value?.degreeName} - Chuyên ngành:{" "}
                                {value?.major}
                              </Typography>
                              <Typography
                                sx={{ fontWeight: "bold", fontSize: 15 }}
                              >
                                {value?.trainingPlaceName}
                              </Typography>
                              <Typography sx={{ color: "gray" }}>
                                <TimeAgo date={value?.startDate} type="format" />{" "}
                                -{" "}
                                {value.completedDate ? (
                                  <TimeAgo date={value?.completedDate} type="format" />
                                ) : (
                                  "Hiện tại"
                                )}
                              </Typography>
                            </Grid>
                            {index <
                              profileDetail.educationDetails.length - 1 && (
                              <Grid item xs={12}>
                                <Divider />
                              </Grid>
                            )}
                          </>
                        ))}
                      </Grid>
                    </Card>
                  </Box>
                </Box>
              )}
              {/* End: Education */}
              {/* Start: Cerfiticate */}
              {(profileDetail?.certificates || []).length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h5" sx={{ mb: 1.5 }}>
                    Chứng chỉ
                  </Typography>
                  <Box>
                    <Card
                      variant="outlined"
                      sx={{ p: 2, borderWidth: 2, boxShadow: 0 }}
                    >
                      <Grid container spacing={1}>
                        {profileDetail.certificates.map((value, index) => (
                          <>
                            <Grid item xs={12} key={value.id}>
                              <Typography
                                sx={{
                                  fontSize: 17.5,
                                  fontWeight: "bold",
                                  mb: 0.5,
                                }}
                              >
                                {value?.name}
                              </Typography>
                              <Typography
                                sx={{ fontWeight: "bold", fontSize: 15 }}
                              >
                                {value?.trainingPlace}
                              </Typography>
                              <Typography sx={{ color: "gray" }}>
                                {value.expirationDate ? (
                                  <>
                                    <TimeAgo date={value.startDate} type="format" />{" "}
                                    -{" "}
                                    <TimeAgo date={value.expirationDate} type="format" />
                                  </>
                                ) : (
                                  "Không thời hạn"
                                )}
                              </Typography>
                            </Grid>
                            {index < profileDetail.certificates.length - 1 && (
                              <Grid item xs={12}>
                                <Divider />
                              </Grid>
                            )}
                          </>
                        ))}
                      </Grid>
                    </Card>
                  </Box>
                </Box>
              )}
              {/* End: Cerfiticate */}
              {/* Start: Language */}
              {(profileDetail?.languageSkills || []).length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h5" sx={{ mb: 1.5 }}>
                    Ngôn ngữ
                  </Typography>
                  <Box>
                    <Card
                      variant="outlined"
                      sx={{ p: 2, borderWidth: 2, boxShadow: 0 }}
                    >
                      <Grid container spacing={1}>
                        {profileDetail.languageSkills.map((value, index) => (
                          <>
                            <Grid item xs={12} key={value.id}>
                              <Typography
                                sx={{
                                  fontSize: 17.5,
                                  fontWeight: "bold",
                                  mb: 0.5,
                                }}
                              >
                                {allConfig?.languageDict[value?.language]}
                              </Typography>
                              <Typography
                                sx={{
                                  fontWeight: "bold",
                                  fontSize: 13,
                                  color: "gray",
                                }}
                              >
                                Mức độ thành thạo
                              </Typography>
                              <Rating
                                value={value?.level || 0}
                                size="medium"
                                readOnly
                              />
                            </Grid>
                            {index <
                              profileDetail.languageSkills.length - 1 && (
                              <Grid item xs={12}>
                                <Divider />
                              </Grid>
                            )}
                          </>
                        ))}
                      </Grid>
                    </Card>
                  </Box>
                </Box>
              )}
              {/* End: Language */}
              {/* Start: Skill advanced */}
              {(profileDetail?.advancedSkills || []).length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h5" sx={{ mb: 1.5 }}>
                    Kỹ năng chuyên môn
                  </Typography>
                  <Box>
                    <Card
                      variant="outlined"
                      sx={{ p: 2, borderWidth: 2, boxShadow: 0 }}
                    >
                      <Grid container spacing={1}>
                        {profileDetail.advancedSkills.map((value, index) => (
                          <>
                            <Grid item xs={12} key={value.id}>
                              <Typography
                                sx={{
                                  fontSize: 17.5,
                                  fontWeight: "bold",
                                  mb: 0.5,
                                }}
                              >
                                {value?.name}
                              </Typography>
                              <Typography
                                sx={{
                                  fontWeight: "bold",
                                  fontSize: 13,
                                  color: "gray",
                                }}
                              >
                                Mức độ thành thạo
                              </Typography>
                              <Rating
                                value={value?.level || 0}
                                readOnly
                                size="medium"
                              />
                            </Grid>
                            {index <
                              profileDetail.advancedSkills.length - 1 && (
                              <Grid item xs={12}>
                                <Divider />
                              </Grid>
                            )}
                          </>
                        ))}
                      </Grid>
                    </Card>
                  </Box>
                </Box>
              )}
              {/* End: Skill advanced */}
            </>
          ) : (
            <>
              {/* Start: Popup  */}
              <FormPopup
                title="Xem CV đính kèm"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                showDialogAction={false}
              >
                <Pdf
                  fileUrl={profileDetail?.fileUrl}
                  title={profileDetail?.title}
                />
              </FormPopup>
              {/* End: Popup */}
            </>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default ProfileDetailCard;
