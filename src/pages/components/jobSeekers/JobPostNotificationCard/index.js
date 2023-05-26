import React from 'react';
import { useSelector } from 'react-redux';
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faCalendarAlt,
  faCircleDollarToSlot,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';

import { ImageSvg10 } from '../../../../configs/constants';
import toastMessages from '../../../../utils/toastMessages';
import BackdropLoading from '../../../../components/loading/BackdropLoading';
import { confirmModal } from '../../../../utils/sweetalert2Modal';
import { convertMoney } from '../../../../utils/customData';
import NoDataCard from '../../../../components/NoDataCard';
import MuiImageCustom from '../../../../components/MuiImageCustom';
import FormPopup from '../../../../components/controls/FormPopup';
import JobPostNotificationForm from '../JobPostNotificationForm';
import errorHandling from '../../../../utils/errorHandling';
import jobPostNotificationService from '../../../../services/jobPostNotificationService';

const ItemLoading = () => {
  const [parentWidth, setParentWidth] = React.useState(0);
  const [stackDirection, setStackDirection] = React.useState('column');

  React.useEffect(() => {
    const handleResize = () => {
      const newWidth = document.getElementById(
        'job-post-notification-loading'
      ).offsetWidth;
      setParentWidth(newWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    if (parentWidth < 600) {
      setStackDirection('column');
    } else {
      setStackDirection('row');
    }
  }, [parentWidth]);

  return (
    <div id="job-post-notification-loading">
      <Box>
        <Stack direction="row" spacing={3} alignItem="center">
          <Box flex={1}>
            <Stack spacing={1}>
              <Box>
                <Typography fontSize={18} fontWeight={'bold'}>
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
  const [stackDirection, setStackDirection] = React.useState('column');

  React.useEffect(() => {
    const handleResize = () => {
      const newWidth = document.getElementById(
        'job-post-notification'
      ).offsetWidth;
      setParentWidth(newWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    if (parentWidth < 600) {
      setStackDirection('column');
    } else {
      setStackDirection('row');
    }
  }, [parentWidth]);

  return (
    <div id="job-post-notification">
      <Box>
        <Stack direction="row" spacing={3} alignItem="center">
          <Box flex={1}>
            <Stack spacing={1}>
              <Box>
                <Typography fontSize={16} fontWeight={'bold'}>
                  {jobName}
                </Typography>
              </Box>
              <Stack
                direction={stackDirection}
                spacing={stackDirection === 'column' ? 1 : 2}
              >
                <Box>
                  <Typography fontWeight="bold" color="#e0e0e0" fontSize={14}>
                    <FontAwesomeIcon
                      icon={faCircleDollarToSlot}
                      style={{ marginRight: 5 }}
                    />

                    {salary ? (
                      <span style={{ color: 'orange' }}>
                        {convertMoney(salary)}
                      </span>
                    ) : (
                      <span
                        style={{
                          color: '#e0e0e0',
                          fontStyle: 'italic',
                          fontSize: 13,
                        }}
                      >
                        Chưa cập nhật
                      </span>
                    )}
                  </Typography>
                </Box>
                <Box>
                  <Typography fontWeight="bold" color="#e0e0e0" fontSize={14}>
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      style={{ marginRight: 5 }}
                    />
                    {allConfig?.cityDict[city] ? (
                      <span style={{ color: 'black', fontWeight: 'normal' }}>
                        {allConfig?.cityDict[city]}
                      </span>
                    ) : (
                      <span
                        style={{
                          color: '#e0e0e0',
                          fontStyle: 'italic',
                          fontSize: 13,
                        }}
                      >
                        Chưa cập nhật
                      </span>
                    )}
                  </Typography>
                </Box>
                <Box>
                  <Typography fontWeight="bold" color="#e0e0e0" fontSize={14}>
                    <FontAwesomeIcon
                      icon={faBriefcase}
                      style={{ marginRight: 5 }}
                    />
                    {allConfig?.careerDict[career] ? (
                      <span style={{ color: 'black', fontWeight: 'normal' }}>
                        {allConfig?.careerDict[career]}
                      </span>
                    ) : (
                      <span
                        style={{
                          color: '#e0e0e0',
                          fontStyle: 'italic',
                          fontSize: 13,
                        }}
                      >
                        Chưa cập nhật
                      </span>
                    )}
                  </Typography>
                </Box>
                <Box>
                  <Typography fontWeight="bold" color="#e0e0e0" fontSize={14}>
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      style={{ marginRight: 5 }}
                    />
                    {allConfig?.frequencyNotificationDict[frequency] ? (
                      <span style={{ color: 'black', fontWeight: 'normal' }}>
                        {allConfig?.frequencyNotificationDict[frequency]}
                      </span>
                    ) : (
                      <span
                        style={{
                          color: '#e0e0e0',
                          fontStyle: 'italic',
                          fontSize: 13,
                        }}
                      >
                        Chưa cập nhật
                      </span>
                    )}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box>
              {/* Start: ActiveButtonComponent */}
              <ActiveButtonComponent id={id} isActive={isActive} />
              {/* End: ActiveButtonComponent */}
            </Box>
            <Box>
              <IconButton
                aria-label="edit"
                color="warning"
                onClick={() => handleShowUpdate(id)}
              >
                <EditIcon />
              </IconButton>
            </Box>
            <Box>
              <IconButton
                aria-label="delete"
                color="error"
                onClick={() => handleDelete(id)}
              >
                <DeleteIcon />
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
        toastMessages.success('Thêm thông báo việc làm thành công.');
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
        toastMessages.success('Cập nhật thông báo việc làm thành công.');
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
        toastMessages.success('Xóa thông báo việc làm thành công.');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    confirmModal(
      () => del(id),
      'Xóa thông báo việc làm',
      'Thông báo việc làm này sẽ được xóa vĩnh viễn và không thể khôi phục. Bạn có chắc chắn?',
      'warning'
    );
  };

  return (
    <>
      <Box>
        <Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <Stack flex={1}>
              <Box>
                <Typography variant="h6">Thông báo việc làm</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="#757575">
                  Tối đa 3 thông báo việc làm được bật
                </Typography>
              </Box>
            </Stack>
            <Box>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleShowAdd}
              >
                Tạo thông báo
              </Button>
            </Box>
          </Stack>
        </Box>
        <Divider sx={{ mt: 2, mb: 2 }} />
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
                      sx={{ margin: '0 auto', mt: 5 }}
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
                src={'https://vieclam24h.vn/img/mail-bro%202.png'}
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
        buttonText={editData ? 'Lưu' : 'Tạo thông báo'}
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
