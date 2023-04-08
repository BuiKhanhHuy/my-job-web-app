import React from 'react';
import { Box, Button, Divider, LinearProgress, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

import {
  convertEditorStateToHTMLString,
  createEditorStateFromHTMLString,
} from '../../../../utils/customData';
import toastMessages from '../../../../utils/toastMessages';
import errorHandling from '../../../../utils/errorHandling';
import { confirmModal } from '../../../../utils/sweetalert2Modal';
import BackdropLoading from '../../../../components/loading/BackdropLoading';
import xlsxUtils from '../../../../utils/xlsxUtils';
import FormPopup from '../../../../components/controls/FormPopup';
import JobPostFilterForm from '../JobPostFilterForm';
import JobPostForm from '../JobPostForm';

import jobService from '../../../../services/jobService';
import JobPostsTable from '../JobPostsTable';

const headCells = [
  {
    id: 'jobName',
    showOrder: true,
    numeric: false,
    disablePadding: true,
    label: 'Tên tin đăng',
  },
  {
    id: 'createAt',
    showOrder: true,
    numeric: false,
    disablePadding: false,
    label: 'Ngày đăng',
  },
  {
    id: 'deadline',
    showOrder: true,
    numeric: false,
    disablePadding: false,
    label: 'Thời hạn nộp',
  },
  {
    id: 'appliedTotal',
    showOrder: true,
    numeric: false,
    disablePadding: false,
    label: 'Lượt nộp',
  },
  {
    id: 'viewedTotal',
    showOrder: true,
    numeric: false,
    disablePadding: false,
    label: 'Lượt xem',
  },
  {
    id: 'isVerify',
    showOrder: false,
    numeric: false,
    disablePadding: false,
    label: 'Trạng thái',
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

const JobPostCard = () => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('createAt');
  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(pageSize);
  const [filterData, setFilterData] = React.useState({
    kw: '',
    isUrgent: '',
  });
  const [openPopup, setOpenPopup] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoadingJobPost, setIsLoadingJobPost] = React.useState(true);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [JobPosts, setJobPosts] = React.useState([]);
  const [editData, setEditData] = React.useState(null);
  const [serverErrors, setServerErrors] = React.useState(null);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    const loadJobPosts = async (params) => {
      setIsLoadingJobPost(true);

      try {
        const resData = await jobService.getEmployerJobPost(params);

        const data = resData.data;

        setCount(data.count);
        setJobPosts(data.results);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoadingJobPost(false);
      }
    };

    loadJobPosts({
      page: page + 1,
      pageSize: rowsPerPage,
      ordering: `${order === 'desc' ? '-' : ''}${orderBy}`,
      ...filterData,
    });
  }, [isSuccess, page, rowsPerPage, order, orderBy, filterData]);

  const handleShowUpdate = (id) => {
    const loadJobPostDetailById = async (jobPostId) => {
      setIsFullScreenLoading(true);
      try {
        const resData = await jobService.getEmployerJobPostDetailById(
          jobPostId
        );

        var data = resData.data;
        data = {
          ...data,
          jobDescription: createEditorStateFromHTMLString(
            data?.jobDescription || ''
          ),
          jobRequirement: createEditorStateFromHTMLString(
            data?.jobRequirement || ''
          ),
          benefitsEnjoyed: createEditorStateFromHTMLString(
            data?.benefitsEnjoyed || ''
          ),
        };

        setEditData(data);
        setOpenPopup(true);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    loadJobPostDetailById(id);
  };

  const handleShowAdd = () => {
    setEditData(null);
    setOpenPopup(true);
  };

  const handleAddOrUpdate = (data) => {
    const dataCustom = {
      ...data,
      jobDescription: convertEditorStateToHTMLString(data.jobDescription),
      jobRequirement: convertEditorStateToHTMLString(data.jobRequirement),
      benefitsEnjoyed: convertEditorStateToHTMLString(data.benefitsEnjoyed),
    };

    const create = async (data) => {
      setIsFullScreenLoading(true);
      try {
        await jobService.addJobPost(data);

        setOpenPopup(false);
        setIsSuccess(!isSuccess);
        toastMessages.success('Thêm mới tin tuyển dụng thành công.');
      } catch (error) {
        errorHandling(error, setServerErrors);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    const update = async (data) => {
      setIsFullScreenLoading(true);
      try {
        await jobService.updateJobPostById(data.id, data);
        setOpenPopup(false);
        setIsSuccess(!isSuccess);
        toastMessages.success('Cập nhật tin tuyển dụng thành công.');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    if ('id' in data) {
      // update
      update(dataCustom);
    } else {
      // create
      create(dataCustom);
    }
  };

  const handleDeleteJobPost = (id) => {
    const del = async (id) => {
      try {
        await jobService.deleteJobPostById(id);
        setIsSuccess(!isSuccess);
        toastMessages.success('Xóa tin tuyển dụng thành công.');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    confirmModal(
      () => del(id),
      'Xóa tin tuyển dụng',
      'Tin tuyển dụng này sẽ được xóa vĩnh viễn và không thể khôi phục. Bạn có chắc chắn?',
      'warning'
    );
  };

  const handleFilter = (data) => {
    console.log(data);
    setFilterData({
      ...data,
      isUrgent: data.isUrgent === 1 ? true : data.isUrgent === 2 ? false : '',
      pageSize: pageSize,
    });
    setPage(0);
  };

  const handleExport = () => {
    const exportJobPosts = async (params) => {
      setIsFullScreenLoading(true);

      try {
        const resData = await jobService.exportEmployerJobPosts(params);
        const data = resData.data;

        // export
        xlsxUtils.exportToXLSX(data, 'DanhSachViecLam');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    exportJobPosts({
      page: page + 1,
      pageSize: rowsPerPage,
      ordering: `${order === 'desc' ? '-' : ''}${orderBy}`,
      ...filterData,
    });
  };

  return (
    <>
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
          {/* Start: JobPostFilterForm */}
          <JobPostFilterForm handleFilter={handleFilter} />
          {/* End: JobPostFilterForm */}
        </Box>
        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<FileDownloadOutlinedIcon />}
            onClick={handleExport}
          >
            Tải danh sách
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleShowAdd}
          >
            Tạo tin mới
          </Button>
        </Stack>
      </Stack>
      {isLoadingJobPost ? <LinearProgress color="primary" /> : <Divider />}
      <JobPostsTable
        headCells={headCells}
        rows={JobPosts}
        isLoading={isLoadingJobPost}
        order={order}
        orderBy={orderBy}
        page={page}
        rowsPerPage={rowsPerPage}
        count={count}
        handleRequestSort={handleRequestSort}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleDelete={handleDeleteJobPost}
        handleUpdate={handleShowUpdate}
      />
      {/* <DataTableCustom.Loading /> */}

      {/* Start: form  */}
      <FormPopup
        title="Tin tuyển dụng"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <JobPostForm
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

export default JobPostCard;
