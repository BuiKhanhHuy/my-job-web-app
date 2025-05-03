/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from 'react';
import { useParams } from 'react-router-dom';
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
} from '@mui/material';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  timelineItemClasses,
  TimelineSeparator,
} from '@mui/lab';

import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { confirmModal } from '../../../../utils/sweetalert2Modal';
import toastMessages from '../../../../utils/toastMessages';
import errorHandling from '../../../../utils/errorHandling';
import BackdropLoading from '../../../../components/loading/BackdropLoading';
import EmptyCard from '../../../../components/EmptyCard';
import FormPopup from '../../../../components/controls/FormPopup';
import EducationDetaiForm from '../EducationDetailForm';
import resumeService from '../../../../services/resumeService';
import educationDetailService from '../../../../services/educationDetailService';
import TimeAgo from '../../../../components/TimeAgo';

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

const EducationDetailCard = ({ title }) => {
  const { slug: resumeSlug } = useParams();
  const [openPopup, setOpenPopup] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoadingEducationsDetail, setIsLoadingEductionsDetail] =
    React.useState(true);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [educationsDetail, setEducationsDetail] = React.useState([]);
  const [editData, setEditData] = React.useState(null);

  React.useEffect(() => {
    const loadEducationsDetail = async (resumeSlug) => {
      setIsLoadingEductionsDetail(true);
      try {
        const resData = await resumeService.getEducationsDetail(resumeSlug);

        setEducationsDetail(resData.data);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoadingEductionsDetail(false);
      }
    };

    loadEducationsDetail(resumeSlug);
  }, [resumeSlug, isSuccess]);

  const handleShowUpdate = (id) => {
    const loadEducationDetailById = async (id) => {
      setIsFullScreenLoading(true);
      try {
        const resData = await educationDetailService.getEducationDetailById(id);

        setEditData(resData.data);
        setOpenPopup(true);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    loadEducationDetailById(id);
  };

  const handleShowAdd = () => {
    setEditData(null);
    setOpenPopup(true);
  };

  const handleAddOrUpdate = (data) => {
    const create = async (data) => {
      setIsFullScreenLoading(true);
      try {
        await educationDetailService.addEducationsDetail(data);

        setOpenPopup(false);
        setIsSuccess(!isSuccess);
        toastMessages.success('Thêm thông tin học vấn thành công.');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    const update = async (data) => {
      setIsFullScreenLoading(true);
      try {
        await educationDetailService.updateEducationDetailById(data.id, data);

        setOpenPopup(false);
        setIsSuccess(!isSuccess);
        toastMessages.success('Cập nhật thông tin học vấn thành công.');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    if ('id' in data) {
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

  const handleDeleteducationsDetail = (id) => {
    const del = async (id) => {
      try {
        await educationDetailService.deleteEducationDetailById(id);

        setIsSuccess(!isSuccess);
        toastMessages.success('Xóa thông tin học vấn thành công.');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    confirmModal(
      () => del(id),
      'Xóa thông tin học vấn',
      'Thông tin học vấn này sẽ được xóa vĩnh viễn và không thể khôi phục. Bạn có chắc chắn?',
      'warning'
    );
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          borderRadius: 3,
          p: 3,
          boxShadow: (theme) => theme.customShadows.card,
        }}
      >
        {isLoadingEducationsDetail ? (
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
            <Divider sx={{ my: 0, borderColor: 'grey.500' }}/>
            <Box>
              {educationsDetail.length === 0 ? (
                <EmptyCard
                  content="Bạn hãy thêm thông tin học vấn của mình để nhà tuyển dụng tham khảo"
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
                  {educationsDetail.map((value) => (
                    <TimelineItem key={value.id}>
                      <TimelineSeparator>
                        <TimelineDot 
                          sx={{
                            background: (theme) => theme.palette.primary.gradient,
                            boxShadow: (theme) => theme.customShadows.small,
                          }}
                        />
                        <TimelineConnector sx={{ bgcolor: 'primary.light' }} />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Box sx={{ p: 1 }}>
                          <Typography 
                            variant="body2"
                            color="primary.main"
                            sx={{ fontWeight: 600, mb: 1 }}
                          >
                            <TimeAgo date={value.startDate} type="format" format="DD/MM/YYYY"/>{' '}
                            -{' '}
                            {value.completedDate ? (
                              <TimeAgo date={value.completedDate} type="format" format="DD/MM/YYYY"/>
                            ) : (
                              'Hiện tại'
                            )}
                          </Typography>
                          <Typography
                            variant="h6"
                            gutterBottom
                            sx={{ 
                              fontWeight: 'bold',
                              color: 'text.primary'
                            }}
                          >
                            {value?.degreeName}
                          </Typography>
                          <Typography 
                            variant="body1"
                            sx={{ 
                              color: 'text.secondary',
                              mb: 0.5
                            }}
                          >
                            {value?.trainingPlaceName}
                          </Typography>
                          <Typography 
                            variant="body2"
                            sx={{ 
                              color: 'text.secondary',
                              fontStyle: 'italic',
                              mb: 2
                            }}
                          >
                            {value?.major}
                          </Typography>

                          <Stack direction="row" spacing={1}>
                            <IconButton
                              size="small"
                              sx={{
                                color: 'secondary.main',
                                bgcolor: 'secondary.background',
                                '&:hover': {
                                  bgcolor: 'secondary.light',
                                  color: 'white',
                                },
                              }}
                              onClick={() => handleShowUpdate(value.id)}
                            >
                              <ModeEditOutlineOutlinedIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              sx={{
                                color: 'error.main',
                                bgcolor: 'error.background',
                                '&:hover': {
                                  bgcolor: 'error.main',
                                  color: 'white',
                                },
                              }}
                              onClick={() => handleDeleteducationsDetail(value.id)}
                            >
                              <DeleteOutlineOutlinedIcon fontSize="small" />
                            </IconButton>
                          </Stack>

                          <Accordion 
                            sx={{ 
                              boxShadow: 'none',
                              bgcolor: 'transparent',
                              '&:before': {
                                display: 'none',
                              },
                            }}
                          >
                            <AccordionSummary
                              expandIcon={
                                <ExpandMoreIcon 
                                  sx={{ 
                                    color: 'primary.main',
                                    fontSize: 20
                                  }}
                                />
                              }
                            >
                              <Typography 
                                variant="body2"
                                sx={{
                                  color: 'text.secondary',
                                  fontWeight: 500
                                }}
                              >
                                Mô tả chi tiết
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: value.description ? 'text.primary' : 'text.placeholder',
                                  fontStyle: value.description ? 'normal' : 'italic',
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
        title="Học vấn"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EducationDetaiForm
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

export default EducationDetailCard;
