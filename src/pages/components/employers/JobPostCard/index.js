import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
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
import FormPopup from '../../../../components/controls/FormPopup';
import JobPostFilterForm from '../JobPostFilterForm';
import JobPostForm from '../JobPostForm';

import companyService from '../../../../services/companyService';
import jobService from '../../../../services/jobService';
import JobPostsTable from '../JobPostsTable';

const headCells = [
  {
    id: 'jobName',
    numeric: false,
    disablePadding: true,
    label: 'Tên tin đăng',
  },
  {
    id: 'createAt',
    numeric: false,
    disablePadding: false,
    label: 'Ngày đăng',
  },
  {
    id: 'deadline',
    numeric: false,
    disablePadding: false,
    label: 'Thời hạn nộp',
  },
  {
    id: 'appliedNumber',
    numeric: false,
    disablePadding: false,
    label: 'Lượt nộp',
  },
  {
    id: 'viewedNumber',
    numeric: false,
    disablePadding: false,
    label: 'Lượt xem',
  },
  {
    id: 'isUrgent',
    numeric: false,
    disablePadding: false,
    label: 'Trạng thái',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Hành động',
  },
];

const JobPostCard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
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

    console.log(isAsc ? 'desc' : 'asc');
    console.log(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    const loadJobPosts = async () => {
      setIsLoadingJobPost(true);

      try {
        const resData = await companyService.getJobPosts();

        console.log(resData.data);
        setJobPosts(resData.data);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoadingJobPost(false);
      }
    };

    loadJobPosts();
  }, [isSuccess]);

  const handleShowUpdate = (id) => {
    const loadJobPostDetailById = async (jobPostId) => {
      setIsFullScreenLoading(true);
      try {
        const resData = await companyService.getJobPostDetailById(jobPostId);

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
          <JobPostFilterForm />
        </Box>
        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<FileDownloadOutlinedIcon />}
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
      <Divider />
      <JobPostsTable
        headCells={headCells}
        rows={JobPosts}
        order={order}
        orderBy={orderBy}
        page={page}
        rowsPerPage={rowsPerPage}
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
