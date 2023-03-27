import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Divider,
  Fab,
  IconButton,
  Rating,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { confirmModal } from '../../../../utils/sweetalert2Modal';
import toastMessages from '../../../../utils/toastMessages';
import errorHandling from '../../../../utils/errorHandling';
import BackdropLoading from '../../../../components/loading/BackdropLoading';
import EmptyCard from '../../../../components/EmptyCard';
import FormPopup from '../../../../components/controls/FormPopup';
import AdvancedSkillForm from '../AdvancedSkillForm';

import resumeService from '../../../../services/resumeService';
import advancedSkillService from '../../../../services/advancedSkillService';

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
      {Array(4)
        .fill(0)
        .map((item, index) => (
          <Box sx={{ py: 0.5 }}>
            <Skeleton height={30} />
          </Box>
        ))}
    </Box>
  </Stack>
);

const AdvancedSkillCard = ({ title }) => {
  const { slug: resumeSlug } = useParams();
  const [openPopup, setOpenPopup] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoadingAdvancedSkills, setIsLoadingAdvancedSkills] =
    React.useState(true);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [advancedSkills, setAdvancedSkills] = React.useState([]);
  const [editData, setEditData] = React.useState(null);
  const [serverErrors, setServerErrors] = React.useState(null);

  React.useEffect(() => {
    const loadAdvancedSkills = async (resumeSlug) => {
      setIsLoadingAdvancedSkills(true);
      try {
        const resData = await resumeService.getAdvancedSkills(resumeSlug);

        setAdvancedSkills(resData.data);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoadingAdvancedSkills(false);
      }
    };

    loadAdvancedSkills(resumeSlug);
  }, [resumeSlug, isSuccess]);

  const handleShowUpdate = (id) => {
    setServerErrors(null);

    const loadAdvancedSkillById = async (id) => {
      setIsFullScreenLoading(true);
      try {
        const resData = await advancedSkillService.getAdvancedSkillById(id);

        setEditData(resData.data);
        setOpenPopup(true);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    loadAdvancedSkillById(id);
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
        await advancedSkillService.addAdvancedSkills(data);

        setOpenPopup(false);
        setIsSuccess(!isSuccess);
        toastMessages.success('Thêm kỹ năng chuyên môn thành công.');
      } catch (error) {
        errorHandling(error, setServerErrors);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    const update = async (data) => {
      setIsFullScreenLoading(true);
      try {
        await advancedSkillService.updateAdvancedSkillById(data.id, data);

        setOpenPopup(false);
        setIsSuccess(!isSuccess);
        toastMessages.success('Cập nhật kỹ năng chuyên môn thành công.');
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

  const handleDeleteAdvancedSkill = (id) => {
    const del = async (id) => {
      try {
        await advancedSkillService.deleteAdvancedSkillById(id);

        setIsSuccess(!isSuccess);
        toastMessages.success('Xóa kỹ năng chuyên môn thành công.');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    confirmModal(
      () => del(id),
      'Xóa kỹ năng chuyên môn',
      'Kỹ năng chuyên môn này sẽ được xóa vĩnh viễn và không thể khôi phục. Bạn có chắc chắn?',
      'warning'
    );
  };

  return (
    <>
      <Box>
        {isLoadingAdvancedSkills ? (
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
              {advancedSkills.length === 0 ? (
                <EmptyCard
                  content="Bạn hãy thêm kỹ năng chuyên môn của mình để nhà tuyển dụng tham khảo"
                  onClick={handleShowAdd}
                />
              ) : (
                <TableContainer component={Box}>
                  <Table aria-label="simple table" size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Kỹ năng</TableCell>
                        <TableCell align="left">Trình độ</TableCell>
                        <TableCell align="right">Hành động</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {advancedSkills.map((value) => (
                        <TableRow
                          key={value.id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell align="left">{value?.name}</TableCell>
                          <TableCell align="left">
                            <Rating
                              name="level-read-only"
                              value={value?.level || 0}
                              size="large"
                              readOnly
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Stack
                              direction="row"
                              spacing={1}
                              justifyContent="flex-end"
                            >
                              <IconButton
                                color="warning"
                                aria-label="edit advanced-skills"
                                onClick={() => handleShowUpdate(value.id)}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                color="error"
                                aria-label="delete advanced-skills"
                                onClick={() =>
                                  handleDeleteAdvancedSkill(value.id)
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          </Stack>
        )}
      </Box>

      {/* Start: form  */}
      <FormPopup
        title="Kỹ năng chuyên môn"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <AdvancedSkillForm
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

export default AdvancedSkillCard;
