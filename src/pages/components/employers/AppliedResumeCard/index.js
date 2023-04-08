import React from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import errorHandling from '../../../../utils/errorHandling';
import BackdropLoading from '../../../../components/loading/BackdropLoading';
import xlsxUtils from '../../../../utils/xlsxUtils';

import toastMessages from '../../../../utils/toastMessages';
import FormPopup from '../../../../components/controls/FormPopup';
import AppliedResumeFilterForm from '../AppliedResumeFilterForm';
import resumeSavedService from '../../../../services/resumeSavedService';
import resumeService from '../../../../services/resumeService';
import AppliedResumeTable from '../AppliedResumeTable';
import jobPostActivityService from '../../../../services/jobPostActivityService';

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
    numeric: false,
    disablePadding: false,
    label: 'Trạng thái tuyển dụng',
  },
];

const pageSize = 5;

const AppliedResumeCard = ({ title }) => {
  const [openPopup, setOpenPopup] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(pageSize);
  const [filterData, setFilterData] = React.useState({
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
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [resumes, retResumes] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
    });
  }, [page, rowsPerPage, filterData]);

  const handleFilter = (data) => {
    setOpenPopup(false);
    setFilterData({
      ...data,
      pageSize: pageSize,
    });
    setPage(0);
  };

  const handleExport = () => {
    const exportResumes = async (params) => {
      setIsFullScreenLoading(true);

      try {
        const resData = await resumeSavedService.exportResumesSaved(params);
        const data = resData.data;

        // export
        xlsxUtils.exportToXLSX(data, 'DanhSachHoSoUngTuyen');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    exportResumes({
      page: page + 1,
      pageSize: rowsPerPage,
      ...filterData,
    });
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
        <Grid item xs={6}>
          <Autocomplete
            disablePortal
            id="jobPosts"
            size="small"
            options={[]}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<FilterListIcon />}
            endIcon={<ExpandMoreIcon />}
            onClick={() => setOpenPopup(true)}
          >
            Lọc nâng cao
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <AppliedResumeTable
        headCells={headCells}
        rows={resumes}
        page={page}
        rowsPerPage={rowsPerPage}
        count={count}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />

      {/* Start: form  */}
      <FormPopup
        title="Lọc nâng cao"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <AppliedResumeFilterForm
          handleFilter={handleFilter}
          filterData={filterData}
        />
      </FormPopup>
      {/* End: form */}

      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

export default AppliedResumeCard;
