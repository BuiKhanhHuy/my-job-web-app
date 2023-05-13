import React from 'react';
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { confirmModal } from '../../../../utils/sweetalert2Modal';
import toastMessages from '../../../../utils/toastMessages';
import errorHandling from '../../../../utils/errorHandling';
import BackdropLoading from '../../../../components/loading/BackdropLoading';
import EmptyCard from '../../../../components/EmptyCard';
import FormPopup from '../../../../components/controls/FormPopup';
import ExperienceDetaiForm from '../ExperienceDetailForm';

import resumeService from '../../../../services/resumeService';
import expericenDetailService from '../../../../services/expericenDetailService';

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
        toastMessages.success('Thêm kinh nghiệm làm việc thành công.');
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
        toastMessages.success('Cập nhật kinh nghiệm làm việc thành công.');
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

  const handleDeleteExperiencesDetail = (id) => {
    const del = async (id) => {
      try {
        await expericenDetailService.deleteExperienceDetailById(id);

        setIsSuccess(!isSuccess);
        toastMessages.success('Xóa kinh nghiệm làm việc thành công.');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    confirmModal(
      () => del(id),
      'Xóa kinh nghiệm làm việc',
      'Kinh nghiệm làm việc này sẽ được xóa vĩnh viễn và không thể khôi phục. Bạn có chắc chắn?',
      'warning'
    );
  };

  return (
    <>
      <Box>
        {isLoadingExperiencesDetail ? (
          Loading
        ) : (
          <Stack>
            <Box>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6">{title}</Typography>
                <Fab
                  size="small"
                  color="primary"
                  aria-label="add"
                  onClick={handleShowAdd}
                >
                  <AddIcon sx={{ color: 'white', fontSize: 30 }} />
                </Fab>
              </Stack>
            </Box>
            <Divider sx={{ mt: 2, mb: 3 }} />
            <Box sx={{ px: 1 }}>
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
                  }}
                >
                  {experiencesDetail.map((value) => (
                    <TimelineItem key={value.id}>
                      <TimelineSeparator>
                        <TimelineDot color="warning" />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography variant="body1" gutterBottom>
                          <Moment format="DD/MM/yyyy">{value.startDate}</Moment>{' '}
                          -{' '}
                          {value.endDate ? (
                            <Moment format="DD/MM/yyyy">{value.endDate}</Moment>
                          ) : (
                            'Hiện tại'
                          )}
                        </Typography>
                        <Typography
                          variant="body1"
                          gutterBottom
                          sx={{ fontWeight: 'bold' }}
                        >
                          {value.jobName}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {value.companyName}
                        </Typography>

                        <Stack direction="row" spacing={1}>
                          <IconButton
                            color="warning"
                            aria-label="edit experience detail"
                            onClick={() => handleShowUpdate(value.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            aria-label="delete experience detail"
                            onClick={() =>
                              handleDeleteExperiencesDetail(value.id)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>

                        <Accordion sx={{ boxShadow: 0 }}>
                          <AccordionSummary
                            sx={{ p: 0, m: 0 }}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography color="gray">Mô tả chi tiết</Typography>
                          </AccordionSummary>
                          <AccordionDetails sx={{ p: 0, m: 0 }}>
                            <Typography>
                              {value.description || (
                                <span
                                  style={{
                                    color: '#9e9e9e',
                                    fontStyle: 'italic',
                                  }}
                                >
                                  Chưa cập nhật
                                </span>
                              )}
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
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
