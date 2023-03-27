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
import EducationDetaiForm from '../EducationDetailForm';
import resumeService from '../../../../services/resumeService';
import educationDetailService from '../../../../services/educationDetailService';

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
          <Box sx={{ py: 1 }}>
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
      <Box>
        {isLoadingEducationsDetail ? (
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
                  aria-label="edit"
                  onClick={handleShowAdd}
                >
                  <AddIcon sx={{ color: 'white', fontSize: 30 }} />
                </Fab>
              </Stack>
            </Box>
            <Divider sx={{ mt: 2, mb: 3 }} />
            <Box sx={{ px: 1 }}>
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
                  }}
                >
                  {educationsDetail.map((value) => (
                    <TimelineItem key={value.id}>
                      <TimelineSeparator>
                        <TimelineDot color="warning" />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography variant="body1" gutterBottom>
                          <Moment format="DD/MM/yyyy">{value.startDate}</Moment>{' '}
                          -{' '}
                          {value.completedDate ? (
                            <Moment format="DD/MM/yyyy">
                              {value.completedDate}
                            </Moment>
                          ) : (
                            'Hiện tại'
                          )}
                        </Typography>
                        <Typography
                          variant="body1"
                          gutterBottom
                          sx={{ fontWeight: 'bold' }}
                        >
                          {value?.degreeName}
                        </Typography>
                        <Typography variant="body1">
                          {value?.trainingPlaceName}
                        </Typography>
                        <Typography
                          variant="body1"
                          gutterBottom
                          sx={{ color: 'gray', fontStyle: 'italic' }}
                        >
                          {value?.major}
                        </Typography>

                        <Stack direction="row" spacing={1}>
                          <IconButton
                            color="warning"
                            aria-label="edit education detail"
                            onClick={() => handleShowUpdate(value.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            aria-label="delete education detail"
                            onClick={() =>
                              handleDeleteducationsDetail(value.id)
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
                              {value?.description || (
                                <span style={{ color: '#9e9e9e' }}>
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
