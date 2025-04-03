import React from 'react';
import { useSelector } from 'react-redux';
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RefreshIcon from '@mui/icons-material/Refresh';

import errorHandling from '../../../../utils/errorHandling';
import BackdropLoading from '../../../../components/loading/BackdropLoading';
import xlsxUtils from '../../../../utils/xlsxUtils';

import toastMessages from '../../../../utils/toastMessages';
import { confirmModal } from '../../../../utils/sweetalert2Modal';
import FormPopup from '../../../../components/controls/FormPopup';
import AppliedResumeFilterForm from '../AppliedResumeFilterForm';
import AppliedResumeTable from '../AppliedResumeTable';
import jobPostActivityService from '../../../../services/jobPostActivityService';
import jobService from '../../../../services/jobService';

const headCells = [
  {
    id: 'title',
    showOrder: false,
    numeric: false,
    disablePadding: true,
    label: 'Tên hồ sơ',
  },
  {
    id: 'jobName',
    showOrder: false,
    numeric: false,
    disablePadding: false,
    label: 'Vị trí ứng tuyển',
  },
  {
    id: 'appliedDate',
    showOrder: false,
    numeric: false,
    disablePadding: false,
    label: 'Thời gian nộp',
  },
  {
    id: 'type',
    showOrder: false,
    numeric: false,
    disablePadding: false,
    label: 'Loại hồ sơ',
  },
  {
    id: 'city',
    showOrder: false,
    numeric: true,
    disablePadding: false,
    label: 'Trạng thái tuyển dụng',
  },
  {
    id: 'action',
    showOrder: false,
    numeric: true,
    disablePadding: false,
    label: 'Hành động',
  },
];

const pageSize = 5;

const defaultFilterData = {
  cityId: '',
  careerId: '',
  experienceId: '',
  positionId: '',
  academicLevelId: '',
  typeOfWorkplaceId: '',
  jobTypeId: '',
  genderId: '',
  maritalStatusId: '',
  jobPostId: '',
};

const AppliedResumeCard = ({ title }) => {
  const { allConfig } = useSelector((state) => state.config);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(pageSize);
  const [filterData, setFilterData] = React.useState(defaultFilterData);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [jobPostOptions, setJobPostOptions] = React.useState([]);
  const [jobPostIdSelect, setJobPostIdSelect] = React.useState('');
  const [applicationStatusSelect, setApplicationStatusSelect] =
    React.useState('');
  const [resumes, retResumes] = React.useState([]);

  let numbersFilter = React.useMemo(() => {
    let count = 0;
    let keys = Object.keys(filterData);

    for (let i = 0; i < keys.length; i++) {
      if (
        keys[i] !== 'jobPostId' &&
        keys[i] !== 'pageSize' &&
        filterData[keys[i]] !== ''
      ) {
        count = count + 1;
      }
    }

    return count;
  }, [filterData]);

  React.useEffect(() => {
    const loadJobPostOptions = async (params) => {
      try {
        const resData = await jobService.getJobPostOptions(params);

        setJobPostOptions(resData.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadJobPostOptions();
  }, []);

  React.useEffect(() => {
    const loadJobPostActivity = async (params) => {
      setIsLoading(true);

      try {
        const resData = await jobPostActivityService.getAppliedResume(params);

        const data = resData.data;

        setCount(data.count);
        retResumes(data.results);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadJobPostActivity({
      page: page + 1,
      pageSize: rowsPerPage,
      ...filterData,
      jobPostId: jobPostIdSelect,
      status: applicationStatusSelect,
    });
  }, [
    page,
    rowsPerPage,
    filterData,
    jobPostIdSelect,
    applicationStatusSelect,
    isSuccess,
  ]);

  const handleFilter = (data) => {
    setOpenPopup(false);
    setFilterData({
      ...data,
      pageSize: pageSize,
    });
    setPage(0);
  };

  const handleExport = () => {
    const exportJobPostsActivity = async (params) => {
      setIsFullScreenLoading(true);

      try {
        const resData = await jobPostActivityService.exportAppliedResume(
          params
        );
        const data = resData.data;

        // export
        xlsxUtils.exportToXLSX(data, 'DanhSachHoSoUngTuyen');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    exportJobPostsActivity({
      page: page + 1,
      pageSize: rowsPerPage,
      ...filterData,
      jobPostId: jobPostIdSelect,
      status: applicationStatusSelect,
    });
  };

  const handleChangeApplicationStatus = (id, value, callback) => {
    const changeStatus = async (id, data) => {
      setIsFullScreenLoading(true);
      try {
        await jobPostActivityService.changeApplicationStatus(id, data);

        toastMessages.success('Cập nhật thành công.');

        // success
        callback(true);
      } catch (error) {
        // Failed
        errorHandling(error);
        callback(false);
      } finally {
        setIsFullScreenLoading(false);
      }
    };
    changeStatus(id, { status: value });
  };

  const handleDelete = (id) => {
    const del = async (id) => {
      try {
        await jobPostActivityService.deleteJobPostActivity(id);
        setIsSuccess(!isSuccess);
        toastMessages.success('Xóa hồ sơ ứng tuyển thành công.');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    confirmModal(
      () => del(id),
      'Xóa hồ sơ ứng tuyển',
      'Hồ sơ ứng tuyển này sẽ được xóa vĩnh viễn và không thể khôi phục. Bạn có chắc chắn?',
      'warning'
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleResetFilterData = () => {
    setFilterData(defaultFilterData);
    setJobPostIdSelect('');
    setApplicationStatusSelect('');
  };

  return (
    <Box sx={{ 
      px: { xs: 1, sm: 2 }, 
      py: { xs: 2, sm: 2 }, 
      backgroundColor: 'background.paper', 
      borderRadius: 2 
    }}>
      {/* Header Section */}
      <Stack 
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
        spacing={{ xs: 2, sm: 0 }}
        mb={4}
      >
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 600,
            background: 'primary.gradient',
            WebkitBackgroundClip: 'text',
            fontSize: { xs: '1.25rem', sm: '1.5rem' }
          }}
        >
          {title}
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<FileDownloadOutlinedIcon />}
          onClick={handleExport}
          sx={{
            borderRadius: 2,
            px: 3,
            width: { xs: '100%', sm: 'auto' },
            '&:hover': {
              backgroundColor: 'secondary.backgroundHover'
            }
          }}
        >
          Tải danh sách
        </Button>
      </Stack>

      {/* Filter Section */}
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: 'text.secondary',
            fontWeight: 600,
            mb: 2
          }}
        >
          Bộ lọc:
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} xl={5}>
            <Autocomplete
              getOptionLabel={(option) => option.jobName}
              value={jobPostOptions.find((o) => o.id === jobPostIdSelect) || null}
              onChange={(e, value) => setJobPostIdSelect(value?.id || '')}
              disablePortal
              size="small"
              options={jobPostOptions}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  placeholder="Tất cả tin đăng"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: 'background.paper'
                    }
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} xl={3}>
            <Autocomplete
              getOptionLabel={(option) => option.name}
              value={
                allConfig?.applicationStatusOptions.find(
                  (o) => o.id === applicationStatusSelect
                ) || null
              }
              onChange={(e, value) => setApplicationStatusSelect(value?.id || '')}
              disablePortal
              size="small"
              options={allConfig?.applicationStatusOptions || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Tất cả trạng thái tuyển dụng"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: 'background.paper'
                    }
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Stack
              direction="row"
              justifyContent={{ xs: 'flex-start', md: 'flex-start' }}
              spacing={1}
            >
              <Tooltip title="Đặt lại" arrow>
                <IconButton 
                  onClick={handleResetFilterData}
                  sx={{
                    backgroundColor: 'grey.100',
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: 'grey.200'
                    }
                  }}
                >
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
              <Button
                variant="contained"
                color="primary"
                startIcon={<FilterListIcon />}
                endIcon={<ExpandMoreIcon />}
                onClick={() => setOpenPopup(true)}
                sx={{
                  borderRadius: 2,
                  background: 'primary.gradient',
                  boxShadow: 'custom.small',
                  '&:hover': {
                    boxShadow: 'custom.medium'
                  }
                }}
              >
                Lọc nâng cao ({numbersFilter})
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {/* Loading Progress */}
      {isLoading ? (
        <Box sx={{ width: '100%', mb: 2 }}>
          <LinearProgress 
            color="primary"
            sx={{
              height: { xs: 4, sm: 6 },
              borderRadius: 3,
              backgroundColor: 'primary.background'
            }}
          />
        </Box>
      ) : (
        <Divider sx={{ mb: 2 }} />
      )}

      {/* Table Section */}
      <Box sx={{
        backgroundColor: 'background.paper',
        borderRadius: 2,
        boxShadow: 'custom.card',
        overflow: 'hidden',
        width: '100%',
        '& .MuiTableContainer-root': {
          overflowX: 'auto'
        }
      }}>
        <AppliedResumeTable
          headCells={headCells}
          rows={resumes}
          isLoading={isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          count={count}
          handleChangeApplicationStatus={handleChangeApplicationStatus}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleDelete={handleDelete}
        />
      </Box>

      {/* Popup and Loading remain unchanged */}
      <FormPopup
        title="Lọc nâng cao"
        buttonText="Lọc"
        buttonIcon={<FilterListIcon />}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <AppliedResumeFilterForm
          handleFilter={handleFilter}
          filterData={filterData}
        />
      </FormPopup>

      {isFullScreenLoading && <BackdropLoading />}
    </Box>
  );
};

export default AppliedResumeCard;
