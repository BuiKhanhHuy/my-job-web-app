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
import Moment from "react-moment";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Fab,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  timelineItemClasses,
  TimelineSeparator,
} from "@mui/lab";

import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { confirmModal } from "../../../../utils/sweetalert2Modal";
import toastMessages from "../../../../utils/toastMessages";
import errorHandling from "../../../../utils/errorHandling";
import BackdropLoading from "../../../../components/loading/BackdropLoading";
import EmptyCard from "../../../../components/EmptyCard";
import FormPopup from "../../../../components/controls/FormPopup";
import ExperienceDetaiForm from "../ExperienceDetailForm";

import resumeService from "../../../../services/resumeService";
import expericenDetailService from "../../../../services/expericenDetailService";

const Loading = (
  <Stack>
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Typography variant="h6" flex={1}>
          <Skeleton />
        </Typography>
        <Box>
          <Skeleton variant="circular" width={50} height={50} />
        </Box>
      </Stack>
    </Box>
    <Box sx={{ px: 1 }}>
      <Box sx={{ py: 2 }}>
        <Skeleton height={5} />
      </Box>
      {Array(2)
        .fill(0)
        .map((item, index) => (
          <Box sx={{ py: 1 }} key={index}>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </Box>
        ))}
    </Box>
  </Stack>
);

const ExperienceDetailCard = ({ title }) => {
  const { slug: resumeSlug } = useParams();
  const [openPopup, setOpenPopup] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoadingExperiencesDetail, setIsLoadingExperiencesDetail] =
    React.useState(true);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [experiencesDetail, setExperiencesDetail] = React.useState([]);
  const [editData, setEditData] = React.useState(null);

  React.useEffect(() => {
    const loadExperiencesDetail = async (resumeSlug) => {
      setIsLoadingExperiencesDetail(true);
      try {
        const resData = await resumeService.getExperiencesDetail(resumeSlug);

        setExperiencesDetail(resData.data);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoadingExperiencesDetail(false);
      }
    };

    loadExperiencesDetail(resumeSlug);
  }, [resumeSlug, isSuccess]);

  const handleShowUpdate = (id) => {
    const loadExperienceDetailById = async (experienceId) => {
      setIsFullScreenLoading(true);
      try {
        const resData = await expericenDetailService.getExperienceDetailById(
          experienceId
        );

        setEditData(resData.data);
        setOpenPopup(true);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    loadExperienceDetailById(id);
  };

  const handleShowAdd = () => {
    setEditData(null);
    setOpenPopup(true);
  };

  const handleAddOrUpdate = (data) => {
    const create = async (data) => {
      setIsFullScreenLoading(true);
      try {
        await expericenDetailService.addExperienceDetail(data);

        setOpenPopup(false);
        setIsSuccess(!isSuccess);
        toastMessages.success("Thêm kinh nghiệm làm việc thành công.");
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    const update = async (data) => {
      setIsFullScreenLoading(true);
      try {
        await expericenDetailService.updateExperienceDetailById(data.id, data);

        setOpenPopup(false);
        setIsSuccess(!isSuccess);
        toastMessages.success("Cập nhật kinh nghiệm làm việc thành công.");
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
      const dataCustom = {
        ...data,
        resume: resumeSlug,
      };
      create(dataCustom);
    }
  };

  const handleDeleteExperiencesDetail = (id) => {
    const del = async (id) => {
      try {
        await expericenDetailService.deleteExperienceDetailById(id);

        setIsSuccess(!isSuccess);
        toastMessages.success("Xóa kinh nghiệm làm việc thành công.");
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    confirmModal(
      () => del(id),
      "Xóa kinh nghiệm làm việc",
      "Kinh nghiệm làm việc này sẽ được xóa vĩnh viễn và không thể khôi phục. Bạn có chắc chắn?",
      "warning"
    );
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 3,
          p: 3,
          boxShadow: (theme) => theme.customShadows.card,
        }}
      >
        {isLoadingExperiencesDetail ? (
          Loading
        ) : (
          <Stack spacing={3}>
            <Box>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  {title}
                </Typography>
                <Fab
                  size="small"
                  color="primary"
                  aria-label="add"
                  onClick={handleShowAdd}
                  sx={{
                    boxShadow: (theme) => theme.customShadows.medium,
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  <AddIcon />
                </Fab>
              </Stack>
            </Box>
            <Divider sx={{ my: 0, borderColor: "grey.500" }} />
            <Box>
              {experiencesDetail.length === 0 ? (
                <EmptyCard
                  content="Bạn hãy thêm kinh nghiệm làm việc của mình để nhà tuyển dụng tham khảo"
                  onClick={handleShowAdd}
                />
              ) : (
                <Timeline
                  sx={{
                    [`& .${timelineItemClasses.root}:before`]: {
                      flex: 0,
                      padding: 0,
                    },
                    mt: 0,
                  }}
                >
                  {experiencesDetail.map((value) => (
                    <TimelineItem key={value.id}>
                      <TimelineSeparator>
                        <TimelineDot
                          sx={{
                            background: (theme) =>
                              theme.palette.primary.gradient,
                            boxShadow: (theme) => theme.customShadows.small,
                          }}
                        />
                        <TimelineConnector sx={{ bgcolor: "primary.light" }} />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Box
                          sx={{
                            p: 1,
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="primary.main"
                            sx={{ fontWeight: 600, mb: 1 }}
                          >
                            <Moment format="DD/MM/yyyy">
                              {value.startDate}
                            </Moment>{" "}
                            -{" "}
                            {value.endDate ? (
                              <Moment format="DD/MM/yyyy">
                                {value.endDate}
                              </Moment>
                            ) : (
                              "Hiện tại"
                            )}
                          </Typography>
                          <Typography
                            variant="h6"
                            gutterBottom
                            sx={{
                              fontWeight: "bold",
                              color: "text.primary",
                            }}
                          >
                            {value.jobName}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              color: "text.secondary",
                              mb: 2,
                            }}
                          >
                            {value.companyName}
                          </Typography>

                          <Stack direction="row" spacing={1}>
                            <IconButton
                              size="small"
                              sx={{
                                color: "secondary.main",
                                bgcolor: "secondary.background",
                                "&:hover": {
                                  bgcolor: "secondary.light",
                                  color: "white",
                                },
                              }}
                              onClick={() => handleShowUpdate(value.id)}
                            >
                              <ModeEditOutlineOutlinedIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              sx={{
                                color: "error.main",
                                bgcolor: "error.background",
                                "&:hover": {
                                  bgcolor: "error.main",
                                  color: "white",
                                },
                              }}
                              onClick={() =>
                                handleDeleteExperiencesDetail(value.id)
                              }
                            >
                              <DeleteOutlineOutlinedIcon fontSize="small" />
                            </IconButton>
                          </Stack>

                          <Accordion
                            sx={{
                              boxShadow: "none",
                              bgcolor: "transparent",
                              "&:before": {
                                display: "none",
                              },
                            }}
                          >
                            <AccordionSummary
                              expandIcon={
                                <ExpandMoreIcon
                                  sx={{
                                    color: "primary.main",
                                    fontSize: 20,
                                  }}
                                />
                              }
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "text.secondary",
                                  fontWeight: 500,
                                }}
                              >
                                Mô tả chi tiết
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: value.description
                                    ? "text.primary"
                                    : "text.placeholder",
                                  fontStyle: value.description
                                    ? "normal"
                                    : "italic",
                                }}
                              >
                                {value.description || "Chưa cập nhật"}
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        </Box>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              )}
            </Box>
          </Stack>
        )}
      </Box>

      {/* Start: form  */}
      <FormPopup
        title="Kinh nghiệm làm việc"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ExperienceDetaiForm
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

export default ExperienceDetailCard;
