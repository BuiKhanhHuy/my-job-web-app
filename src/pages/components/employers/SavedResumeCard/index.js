import React from 'react';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

import errorHandling from '../../../../utils/errorHandling';
import BackdropLoading from '../../../../components/loading/BackdropLoading';
import xlsxUtils from '../../../../utils/xlsxUtils';

import SavedResumeTable from '../SavedResumeTable';
import resumeSavedService from '../../../../services/resumeSavedService';
import SavedResumeFilterForm from '../SavedResumeFilterForm';
import resumeService from '../../../../services/resumeService';
import toastMessages from '../../../../utils/toastMessages';

const headCells = [
  {
    id: 'title',
    showOrder: false,
    numeric: false,
    disablePadding: true,
    label: 'Tên hồ sơ',
  },
  {
    id: 'fullName',
    showOrder: false,
    numeric: false,
    disablePadding: false,
    label: 'Tên ứng viên',
  },
  {
    id: 'salary',
    showOrder: false,
    numeric: false,
    disablePadding: false,
    label: 'Mức lương',
  },
  {
    id: 'experience',
    showOrder: false,
    numeric: false,
    disablePadding: false,
    label: 'Kinh nghiệm',
  },
  {
    id: 'city',
    showOrder: false,
    numeric: false,
    disablePadding: false,
    label: 'Tỉnh/Thành phố',
  },
  {
    id: 'createAt',
    showOrder: false,
    numeric: false,
    disablePadding: false,
    label: 'Ngày lưu',
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

const SavedResumeCard = ({ title }) => {
  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(pageSize);
  const [filterData, setFilterData] = React.useState({
    kw: '',
    salaryMax: '',
    experienceId: '',
    cityId: '',
  });
  const [isSuccess, setIsSuccess] = React.useState(false);
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
    const loadResumes = async (params) => {
      setIsLoading(true);

      try {
        const resData = await resumeSavedService.getResumesSaved(params);

        const data = resData.data;

        setCount(data.count);
        retResumes(data.results);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadResumes({
      page: page + 1,
      pageSize: rowsPerPage,
      ...filterData,
    });
  }, [page, rowsPerPage, filterData, isSuccess]);

  const handleFilter = (data) => {
    setFilterData({
      ...data,
      pageSize: pageSize,
    });
    setPage(0);
  };

  const handleSave = (slug) => {
    const save = async (slugResume) => {
      try {
        await resumeService.saveResume(slugResume);

        setIsSuccess(!isSuccess);
        toastMessages.success('Hủy lưu thành công.');
      } catch (error) {
        errorHandling(error);
      }
    };

    save(slug);
  };

  const handleExport = () => {
    const exportResumes = async (params) => {
      setIsFullScreenLoading(true);

      try {
        const resData = await resumeSavedService.exportResumesSaved(params);
        const data = resData.data;

        // export
        xlsxUtils.exportToXLSX(data, 'DanhSachHoSoDaLuu');
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

      <Stack
        direction={{
          xs: 'column',
          sm: 'column',
          md: 'row',
          lg: 'row',
          xl: 'row',
        }}
        alignItems={{
          xs: 'flex-start',
          sm: 'flex-start',
          md: 'center',
          lg: 'center',
          xl: 'center',
        }}
        sx={{ mb: 3 }}
        spacing={2}
      >
        <Box>
          <Typography variant="subtitle2">Bộ lọc: </Typography>
        </Box>
        <Box flex={1}>
          {/* Start: SavedResumeFilterForm */}
          <SavedResumeFilterForm handleFilter={handleFilter} />
          {/* End: SavedResumeFilterForm */}
        </Box>
      </Stack>
      <Divider />
      <Divider />
      <SavedResumeTable
        headCells={headCells}
        rows={resumes}
        page={page}
        rowsPerPage={rowsPerPage}
        count={count}
        handleUnsave={handleSave}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />

      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

export default SavedResumeCard;
