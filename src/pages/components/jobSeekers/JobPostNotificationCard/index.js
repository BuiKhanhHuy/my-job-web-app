import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Pagination,
  Skeleton,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faCalendarAlt,
  faCircleDollarToSlot,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import { ImageSvg10 } from "../../../../configs/constants";
import toastMessages from "../../../../utils/toastMessages";
import BackdropLoading from "../../../../components/loading/BackdropLoading";
import { confirmModal } from "../../../../utils/sweetalert2Modal";
import { convertMoney } from "../../../../utils/customData";
import NoDataCard from "../../../../components/NoDataCard";
import MuiImageCustom from "../../../../components/MuiImageCustom";
import FormPopup from "../../../../components/controls/FormPopup";
import JobPostNotificationForm from "../JobPostNotificationForm";
import errorHandling from "../../../../utils/errorHandling";
import jobPostNotificationService from "../../../../services/jobPostNotificationService";

const ItemLoading = () => {
  const [parentWidth, setParentWidth] = React.useState(0);
  const [stackDirection, setStackDirection] = React.useState("column");

  React.useEffect(() => {
    const handleResize = () => {
      const newWidth = document.getElementById(
        "job-post-notification-loading"
      ).offsetWidth;
      setParentWidth(newWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    if (parentWidth < 600) {
      setStackDirection("column");
    } else {
      setStackDirection("row");
    }
  }, [parentWidth]);

  return (
    <div id="job-post-notification-loading">
      <Box>
        <Stack direction="row" spacing={3} alignItem="center">
          <Box flex={1}>
            <Stack spacing={1}>
              <Box>
                <Typography fontSize={18} fontWeight={"bold"}>
                  <Skeleton />
                </Typography>
              </Box>
              <Stack direction={stackDirection} spacing={3}>
                <Box>
                  <Typography fontWeight="bold" color="GrayText" fontSize={14}>
                    <Skeleton width={100} />
                  </Typography>
                </Box>
                <Box>
                  <Typography fontWeight="bold" color="GrayText" fontSize={14}>
                    <Skeleton width={100} />
                  </Typography>
                </Box>
                <Box>
                  <Typography fontWeight="bold" color="GrayText" fontSize={14}>
                    <Skeleton width={100} />
                  </Typography>
                </Box>
                <Box>
                  <Typography fontWeight="bold" color="GrayText" fontSize={14}>
                    <Skeleton width={100} />
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box>
              <Skeleton width={50} height={40} />
            </Box>
            <Box>
              <Skeleton width={50} height={40} />
            </Box>
            <Box>
              <Skeleton width={50} height={40} />
            </Box>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

const ActiveButtonComponent = ({ id, isActive }) => {
  const [checked, setChecked] = React.useState(isActive);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);

  const handleUpdateActive = () => {
    const updateJobPostNotification = async (id) => {
      setIsFullScreenLoading(true);
      try {
        const resData = await jobPostNotificationService.active(id);
        const data = resData.data;

        setChecked(data.isActive);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    updateJobPostNotification(id);
  };

  return (
    <>
      <Switch checked={checked} onChange={handleUpdateActive} />
      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

const ItemComponent = ({
  id,
  jobName,
  salary,
  frequency,
  isActive,
  career,
  city,
  handleShowUpdate,
  handleDelete,
}) => {
  const { allConfig } = useSelector((state) => state.config);
  const [parentWidth, setParentWidth] = React.useState(0);
  const [stackDirection, setStackDirection] = React.useState("column");

  React.useEffect(() => {
    const handleResize = () => {
      const newWidth = document.getElementById(
        "job-post-notification"
      ).offsetWidth;
      setParentWidth(newWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    if (parentWidth < 600) {
      setStackDirection("column");
    } else {
      setStackDirection("row");
    }
  }, [parentWidth]);

  return (
    <div id="job-post-notification">
      <Box
        sx={{
          px: 3,
          py: 2,
          borderRadius: 2,
          bgcolor: "background.paper",
          boxShadow: 0,
          "&:hover": {
            boxShadow: (theme) => theme.customShadows.medium,
            transform: "translateY(-2px)",
            transition: "all 0.3s ease-in-out",
          },
        }}
      >
        <Stack direction="row" spacing={3} alignItems="center">
          <Box flex={1}>
            <Stack spacing={2}>
              <Box>
                <Typography
                  fontSize={18}
                  fontWeight="600"
                  color="text.primary"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {jobName}
                </Typography>
              </Box>
              <Stack
                direction={stackDirection}
                spacing={stackDirection === "column" ? 2 : 3}
                sx={{
                  "& .info-item": {
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "grey.600",
                    "& svg": {
                      fontSize: "1.2rem",
                      color: "grey.500",
                    },
                  },
                }}
              >
                <Box className="info-item">
                  <FontAwesomeIcon icon={faCircleDollarToSlot} />
                  {salary ? (
                    <Typography
                      component="span"
                      color="secondary.main"
                      fontWeight="600"
                    >
                      {convertMoney(salary)}
                    </Typography>
                  ) : (
                    <Typography
                      component="span"
                      fontSize="13px"
                      fontStyle="italic"
                      color="grey.400"
                    >
                      Chưa cập nhật
                    </Typography>
                  )}
                </Box>

                <Box className="info-item">
                  <FontAwesomeIcon icon={faLocationDot} />
                  {allConfig?.cityDict[city] ? (
                    <Typography component="span" fontSize="14px">
                      {allConfig?.cityDict[city]}
                    </Typography>
                  ) : (
                    <Typography
                      component="span"
                      fontSize="13px"
                      fontStyle="italic"
                      color="grey.400"
                    >
                      Chưa cập nhật
                    </Typography>
                  )}
                </Box>

                <Box className="info-item">
                  <FontAwesomeIcon icon={faBriefcase} />
                  {allConfig?.careerDict[career] ? (
                    <Typography component="span" fontSize="14px">
                      {allConfig?.careerDict[career]}
                    </Typography>
                  ) : (
                    <Typography
                      component="span"
                      fontSize="13px"
                      fontStyle="italic"
                      color="grey.400"
                    >
                      Chưa cập nhật
                    </Typography>
                  )}
                </Box>

                <Box className="info-item">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  {allConfig?.frequencyNotificationDict[frequency] ? (
                    <Typography component="span" fontSize="14px">
                      {allConfig?.frequencyNotificationDict[frequency]}
                    </Typography>
                  ) : (
                    <Typography
                      component="span"
                      fontSize="13px"
                      fontStyle="italic"
                      color="grey.400"
                    >
                      Chưa cập nhật
                    </Typography>
                  )}
                </Box>
              </Stack>
            </Stack>
          </Box>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{
              "& .MuiIconButton-root": {
                borderRadius: 2,
                transition: "all 0.2s",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              },
            }}
          >
            <Box>
              <ActiveButtonComponent id={id} isActive={isActive} />
            </Box>
            <Box>
              <IconButton
                aria-label="edit"
                onClick={() => handleShowUpdate(id)}
                sx={{
                  color: "warning.main",
                  bgcolor: "warning.background",
                  "&:hover": {
                    bgcolor: "warning.background",
                  },
                }}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>
            </Box>
            <Box>
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(id)}
                sx={{
                  color: "error.main",
                  bgcolor: "error.background",
                  "&:hover": {
                    bgcolor: "error.background",
                  },
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

const pageSize = 12;

const JobPostNotificationCard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoadingJobPostNotifications, setIsLoadingJobPostNotifications] =
    React.useState(true);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [jobPostNotifications, setJobPostNotifications] = React.useState([]);
  const [editData, setEditData] = React.useState(null);

  React.useEffect(() => {
    const loadJobPostNotification = async (params) => {
      setIsLoadingJobPostNotifications(true);

      try {
        const resData =
          await jobPostNotificationService.getJobPostNotifications(params);
        const data = resData.data;
        setCount(data.count);
        setJobPostNotifications(data.results);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoadingJobPostNotifications(false);
      }
    };

    loadJobPostNotification({
      page: page,
      pageSize: pageSize,
    });
  }, [isSuccess, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleShowUpdate = (id) => {
    const loadJobPostNotificationDetailById = async (id) => {
      setIsFullScreenLoading(true);
      try {
        const resData =
          await jobPostNotificationService.getJobPostNotificationDetailById(id);
        var data = resData.data;
        setEditData(data);
        setOpenPopup(true);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    loadJobPostNotificationDetailById(id);
  };

  const handleShowAdd = () => {
    setEditData(null);
    setOpenPopup(true);
  };

  const handleAddOrUpdate = (data) => {
    const create = async (data) => {
      setIsFullScreenLoading(true);
      try {
        await jobPostNotificationService.addJobPostNotification(data);
        setOpenPopup(false);
        setIsSuccess(!isSuccess);
        toastMessages.success("Thêm thông báo việc làm thành công.");
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    const update = async (data) => {
      setIsFullScreenLoading(true);
      try {
        await jobPostNotificationService.updateJobPostNotificationById(
          data.id,
          data
        );
        setOpenPopup(false);
        setIsSuccess(!isSuccess);
        toastMessages.success("Cập nhật thông báo việc làm thành công.");
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    if ("id" in data) {
      // update
      update(data);
    } else {
      // create
      create(data);
    }
  };

  const handleDeleteJobPostNotification = (id) => {
    const del = async (id) => {
      try {
        await jobPostNotificationService.deleteJobPostNotificationDetailById(
          id
        );
        setIsSuccess(!isSuccess);
        toastMessages.success("Xóa thông báo việc làm thành công.");
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    confirmModal(
      () => del(id),
      "Xóa thông báo việc làm",
      "Thông báo việc làm này sẽ được xóa vĩnh viễn và không thể khôi phục. Bạn có chắc chắn?",
      "warning"
    );
  };

  return (
    <>
      <Box sx={{ boxShadow: 0, p: { xs: 1, sm: 1, md: 2, lg: 2, xl: 2 } }}>
        <Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <Stack flex={1}>
              <Box>
                <Typography variant="h5" fontWeight="600" color="text.primary">
                  Thông báo việc làm
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  Tối đa 3 thông báo việc làm được bật
                </Typography>
              </Box>
            </Stack>
            <Box>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleShowAdd}
                sx={{
                  px: 3,
                  py: 1,
                  background: (theme) => theme.palette.primary.gradient,
                  "&:hover": {
                    background: (theme) => theme.palette.primary.gradient,
                    opacity: 0.9,
                  },
                }}
              >
                Tạo thông báo
              </Button>
            </Box>
          </Stack>
        </Box>
        <Divider sx={{ my: 3 }} />
        <Box>
          {isLoadingJobPostNotifications ? (
            <Stack spacing={4}>
              {Array.from(Array(5).keys()).map((value) => (
                <ItemLoading key={value} />
              ))}
            </Stack>
          ) : jobPostNotifications.length === 0 ? (
            <NoDataCard
              title="Bạn chưa có thông báo việc làm nào"
              imgComponentSgv={<ImageSvg10 />}
            >
              <Button variant="contained" color="primary">
                Tạo thông báo bây giờ
              </Button>
            </NoDataCard>
          ) : (
            <Box>
              <Stack spacing={4}>
                {jobPostNotifications.map((value) => (
                  <ItemComponent
                    key={value.id}
                    id={value.id}
                    jobName={value.jobName}
                    salary={value.salary}
                    frequency={value.frequency}
                    isActive={value.isActive}
                    career={value.career}
                    city={value.city}
                    handleShowUpdate={handleShowUpdate}
                    handleDelete={handleDeleteJobPostNotification}
                  />
                ))}
              </Stack>
              <Box>
                <Stack>
                  {Math.ceil(count / pageSize) > 1 && (
                    <Pagination
                      siblingCount={0}
                      color="primary"
                      size="medium"
                      variant="text"
                      sx={{ margin: "0 auto", mt: 5 }}
                      count={Math.ceil(count / pageSize)}
                      page={page}
                      onChange={handleChangePage}
                    />
                  )}
                </Stack>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      {/* Start: form  */}
      <FormPopup
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box>
              <MuiImageCustom
                width={100}
                height={100}
                src={"https://vieclam24h.vn/img/mail-bro%202.png"}
                shiftDuration={0}
              />
            </Box>
            <Stack>
              <Box>
                <Typography variant="h5">Tạo thông báo việc làm</Typography>
              </Box>
              <Box>
                <Typography color="#757575">{currentUser?.email}</Typography>
              </Box>
            </Stack>
          </Stack>
        }
        buttonText={editData ? "Lưu" : "Tạo thông báo"}
        buttonIcon={null}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <JobPostNotificationForm
          handleAddOrUpdate={handleAddOrUpdate}
          editData={editData}
        />
      </FormPopup>
      {/* End: form */}

      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

export default JobPostNotificationCard;
