import React from 'react';
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';
import {
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

import { confirmModal } from '../../../../utils/sweetalert2Modal';
import toastMessages from '../../../../utils/toastMessages';
import errorHandling from '../../../../utils/errorHandling';
import BackdropLoading from '../../../../components/loading/BackdropLoading';
import EmptyCard from '../../../../components/EmptyCard';
import FormPopup from '../../../../components/controls/FormPopup';
import CertificateForm from '../CertificateForm';

import resumeService from '../../../../services/resumeService';
import certificateService from '../../../../services/certificateService';

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

const CertificateCard = ({ title }) => {
  const { slug: resumeSlug } = useParams();
  const [openPopup, setOpenPopup] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoadingCertificates, setIsLoadingCertificatesl] =
    React.useState(true);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [certificates, setCertificates] = React.useState([]);
  const [editData, setEditData] = React.useState(null);
  const [serverErrors, setServerErrors] = React.useState(null);

  React.useEffect(() => {
    const loadCertificates = async (resumeSlug) => {
      setIsLoadingCertificatesl(true);
      try {
        const resData = await resumeService.getCertificates(resumeSlug);

        setCertificates(resData.data);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoadingCertificatesl(false);
      }
    };

    loadCertificates(resumeSlug);
  }, [resumeSlug, isSuccess]);

  const handleShowUpdate = (id) => {
    setServerErrors(null);

    const loadCertificateById = async (id) => {
      setIsFullScreenLoading(true);
      try {
        const resData = await certificateService.getCertificateById(id);

        setEditData(resData.data);
        setOpenPopup(true);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    loadCertificateById(id);
  };

  const handleShowAdd = () => {
    setServerErrors(null);

    setEditData(null);
    setOpenPopup(true);
  };

  const handleAddOrUpdate = (data) => {
    const create = async (data) => {
      setIsFullScreenLoading(true);
      try {
        await certificateService.addCertificates(data);

        setOpenPopup(false);
        setIsSuccess(!isSuccess);
        toastMessages.success('Thêm thông tin chứng chỉ thành công.');
      } catch (error) {
        errorHandling(error, setServerErrors);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    const update = async (data) => {
      setIsFullScreenLoading(true);
      try {
        await certificateService.updateCertificateById(data.id, data);

        setOpenPopup(false);
        setIsSuccess(!isSuccess);
        toastMessages.success('Cập nhật thông tin chứng chỉ thành công.');
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

  const handleDeleteCertificates = (id) => {
    const del = async (id) => {
      try {
        await certificateService.deleteCertificateById(id);

        setIsSuccess(!isSuccess);
        toastMessages.success('Xóa thông tin chứng chỉ thành công.');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    confirmModal(
      () => del(id),
      'Xóa thông tin chứng chỉ',
      'Thông tin chứng chỉ này sẽ được xóa vĩnh viễn và không thể khôi phục. Bạn có chắc chắn?',
      'warning'
    );
  };

  return (
    <>
      <Box>
        {isLoadingCertificates ? (
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
              {certificates.length === 0 ? (
                <EmptyCard
                  content="Bạn hãy thêm chứng chỉ của mình để nhà tuyển dụng tham khảo"
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
                  {certificates.map((value) => (
                    <TimelineItem key={value.id}>
                      <TimelineSeparator>
                        <TimelineDot color="warning" />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography variant="body1" gutterBottom>
                          {value.expirationDate ? (
                            <>
                              <Moment format="DD/MM/yyyy">
                                {value.startDate}
                              </Moment>{' '}
                              -{' '}
                              <Moment format="DD/MM/yyyy">
                                {value.expirationDate}
                              </Moment>
                            </>
                          ) : (
                            'Không thời hạn'
                          )}
                        </Typography>
                        <Typography
                          variant="body1"
                          gutterBottom
                          sx={{ fontWeight: 'bold' }}
                        >
                          {value?.name}
                        </Typography>
                        <Typography variant="body1">
                          {value?.trainingPlace}
                        </Typography>

                        <Stack direction="row" spacing={1}>
                          <IconButton
                            color="warning"
                            aria-label="edit certificate detail"
                            onClick={() => handleShowUpdate(value.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            aria-label="delete certificate detail"
                            onClick={() => handleDeleteCertificates(value.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
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
        title="Chứng chỉ"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <CertificateForm
          handleAddOrUpdate={handleAddOrUpdate}
          editData={editData}
          serverErrors={serverErrors}
        />
      </FormPopup>
      {/* End: form */}

      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

export default CertificateCard;
