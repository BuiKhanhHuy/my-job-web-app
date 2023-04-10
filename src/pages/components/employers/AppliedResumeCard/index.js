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

import FormPopup from '../../../../components/controls/FormPopup';
import AppliedResumeFilterForm from '../AppliedResumeFilterForm';
import AppliedResumeTable from '../AppliedResumeTable';
import jobPostActivityService from '../../../../services/jobPostActivityService';
import jobService from '../../../../services/jobService';
import toastMessages from '../../../../utils/toastMessages';
import SendMailCard from '../SendMailCard';

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
  const [openSendMailPopup, setOpenSendMailPopup] = React.useState(false);
  const [sendMailData, setSendMailData] = React.useState(null);
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
  }, [page, rowsPerPage, filterData, jobPostIdSelect, applicationStatusSelect]);

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

  const handleChangeApplicationStatus = (id, value) => {
    const changeStatus = async (id, data) => {
      setIsFullScreenLoading(true);
      try {
        await jobPostActivityService.changeApplicationStatus(id, data);

        toastMessages.success('Cập nhật thành công.');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    changeStatus(id, { status: value });
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

  const handleSendMail = (email, fullName) => {
    setSendMailData({
      fullName: fullName,
      email: email
    })
    setOpenSendMailPopup(true);
  };

  return (
    <>
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5">{title}</Typography>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<FileDownloadOutlinedIcon />}
            onClick={handleExport}
          >
            Tải danh sách
          </Button>
        </Stack>
      </Box>

      <Divider sx={{ mt: 2, mb: 3 }} />

      <Grid container sx={{ mb: 3 }} spacing={2}>
        <Grid item xs={1}>
          <Stack justifyContent="center">
            <Typography variant="subtitle2">Bộ lọc: </Typography>
          </Stack>
        </Grid>
        <Grid item xs={5}>
          <Autocomplete
            getOptionLabel={(option) => option.jobName}
            value={jobPostOptions.find((o) => o.id === jobPostIdSelect) || null}
            onChange={(e, value) => setJobPostIdSelect(value?.id || '')}
            disablePortal
            id="jobPosts"
            size="small"
            options={jobPostOptions}
            renderInput={(params) => (
              <TextField {...params} placeholder="Tất cả tin đăng" />
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <Autocomplete
            getOptionLabel={(option) => option.name}
            value={
              allConfig?.applicationStatusOptions.find(
                (o) => o.id === applicationStatusSelect
              ) || null
            }
            onChange={(e, value) => setApplicationStatusSelect(value?.id || '')}
            disablePortal
            id="status"
            size="small"
            options={allConfig?.applicationStatusOptions || []}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Tất cả trạng thái tuyển dụng"
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Tooltip title="Đặt lại" arrow sx={{ mr: 1 }}>
            <IconButton aria-label="refresh" onClick={handleResetFilterData}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            color="primary"
            startIcon={<FilterListIcon />}
            endIcon={<ExpandMoreIcon />}
            onClick={() => setOpenPopup(true)}
          >
            Lọc nâng cao ({numbersFilter})
          </Button>
        </Grid>
      </Grid>
      {isLoading ? <LinearProgress color="primary" /> : <Divider />}
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
        handleSendMail={handleSendMail}
      />

      {/* Start: form  */}
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
      {/* End: form */}

      {/* Start: send mail */}
      <SendMailCard
        openPopup={openSendMailPopup}
        setOpenPopup={setOpenSendMailPopup}
        sendMailData={sendMailData}
      />
      {/* Start:  send mail */}

      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

export default AppliedResumeCard;
