/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from 'react';
import {
  Box,
  Button,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
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

        <Box sx={{
          backgroundColor: 'background.paper',
          borderRadius: 2,
          width: '100%'
        }}>
          <SavedResumeFilterForm 
            handleFilter={handleFilter}
          />
        </Box>
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
        <SavedResumeTable
          headCells={headCells}
          isLoading={isLoading}
          rows={resumes}
          page={page}
          rowsPerPage={rowsPerPage}
          count={count}
          handleUnsave={handleSave}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>

      {/* Loading Backdrop */}
      {isFullScreenLoading && <BackdropLoading />}
    </Box>
  );
};

export default SavedResumeCard;
