import React from 'react';
import { useSelector } from 'react-redux';
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
import LanguageSkillForm from '../LanguageSkillForm';

import resumeService from '../../../../services/resumeService';
import languageSkillService from '../../../../services/languageSkillService';

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

const LanguageSkillCard = ({ title }) => {
  const { slug: resumeSlug } = useParams();
  const { allConfig } = useSelector((state) => state.config);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoadingLanguageSkills, setIsLoadingLanguageSkills] =
    React.useState(true);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [languageSkills, setLanguageSkills] = React.useState([]);
  const [editData, setEditData] = React.useState(null);
  const [serverErrors, setServerErrors] = React.useState(null);

  React.useEffect(() => {
    const loadLanguageSkills = async (resumeSlug) => {
      setIsLoadingLanguageSkills(true);
      try {
        const resData = await resumeService.getLanguageSkills(resumeSlug);

        setLanguageSkills(resData.data);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoadingLanguageSkills(false);
      }
    };

    loadLanguageSkills(resumeSlug);
  }, [resumeSlug, isSuccess]);

  const handleShowUpdate = (id) => {
    setServerErrors(null);

    const loadLanguageSkillById = async (id) => {
      setIsFullScreenLoading(true);
      try {
        const resData = await languageSkillService.getLanguageSkillById(id);

        setEditData(resData.data);
        setOpenPopup(true);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    loadLanguageSkillById(id);
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
        await languageSkillService.addLanguageSkills(data);

        setOpenPopup(false);
        setIsSuccess(!isSuccess);
        toastMessages.success('Thêm kỹ năng ngôn ngữ thành công.');
      } catch (error) {
        errorHandling(error, setServerErrors);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    const update = async (data) => {
      setIsFullScreenLoading(true);
      try {
        await languageSkillService.updateLanguageSkillById(data.id, data);

        setOpenPopup(false);
        setIsSuccess(!isSuccess);
        toastMessages.success('Cập nhật kỹ năng ngôn ngữ thành công.');
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

  const handleDeleteLanguageSkill = (id) => {
    const del = async (id) => {
      try {
        await languageSkillService.deleteLanguageSkillById(id);

        setIsSuccess(!isSuccess);
        toastMessages.success('Xóa kỹ năng ngôn ngữ thành công.');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    confirmModal(
      () => del(id),
      'Xóa kỹ năng ngôn ngữ',
      'Kỹ năng ngôn ngữ này sẽ được xóa vĩnh viễn và không thể khôi phục. Bạn có chắc chắn?',
      'warning'
    );
  };

  return (
    <>
      <Box>
        {isLoadingLanguageSkills ? (
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
              {languageSkills.length === 0 ? (
                <EmptyCard
                  content="Bạn hãy thêm kỹ năng ngôn ngữ của mình để nhà tuyển dụng tham khảo"
                  onClick={handleShowAdd}
                />
              ) : (
                <TableContainer component={Box}>
                  <Table aria-label="simple table" size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Ngoại ngữ</TableCell>
                        <TableCell align="left">Trình độ</TableCell>
                        <TableCell align="right">Hành động</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {languageSkills.map((value) => (
                        <TableRow
                          key={value.id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell align="left">
                            {allConfig.languageDict[value?.language]}
                          </TableCell>
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
                                aria-label="edit language-skills"
                                onClick={() => handleShowUpdate(value.id)}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                color="error"
                                aria-label="delete language-skills"
                                onClick={() =>
                                  handleDeleteLanguageSkill(value.id)
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
        title="Kỹ năng ngôn ngữ"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <LanguageSkillForm
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

export default LanguageSkillCard;
