/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

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
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';  

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
          <Box sx={{ py: 0.5 }} key={index}>
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
      <Box
        sx={{
          backgroundColor: 'background.paper',
          borderRadius: 3,
          p: 3,
          boxShadow: (theme) => theme.customShadows.card,
        }}
      >
        {isLoadingLanguageSkills ? (
          Loading
        ) : (
          <Stack spacing={3}>
            <Box>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  {title}
                </Typography>
                <Fab
                  size="small"
                  color="primary"
                  aria-label="add"
                  onClick={handleShowAdd}
                  sx={{
                    boxShadow: (theme) => theme.customShadows.medium,
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  <AddIcon />
                </Fab>
              </Stack>
            </Box>
            <Divider sx={{ my: 0, borderColor: 'grey.500' }}/>
            <Box>
              {languageSkills.length === 0 ? (
                <EmptyCard
                  content="Bạn hãy thêm kỹ năng ngôn ngữ của mình để nhà tuyển dụng tham khảo"
                  onClick={handleShowAdd}
                />
              ) : (
                <TableContainer 
                  sx={{
                    boxShadow: 'none',
                    bgcolor: 'transparent',
                  }}
                >
                  <Table 
                    aria-label="language skills table" 
                    size="medium"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell 
                          align="left"
                          sx={{
                            color: 'text.secondary',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            borderBottom: '2px solid',
                            borderColor: 'primary.light',
                          }}
                        >
                          Ngoại ngữ
                        </TableCell>
                        <TableCell 
                          align="left"
                          sx={{
                            color: 'text.secondary',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            borderBottom: '2px solid',
                            borderColor: 'primary.light',
                          }}
                        >
                          Trình độ
                        </TableCell>
                        <TableCell 
                          align="right"
                          sx={{
                            color: 'text.secondary',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            borderBottom: '2px solid',
                            borderColor: 'primary.light',
                          }}
                        >
                          Hành động
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {languageSkills.map((value) => (
                        <TableRow
                          key={value.id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                            '&:hover': {
                              bgcolor: 'primary.background',
                            },
                            transition: 'background-color 0.2s ease-in-out',
                          }}
                        >
                          <TableCell 
                            align="left"
                            sx={{
                              color: 'text.primary',
                              fontWeight: 500,
                              fontSize: '0.875rem',
                            }}
                          >
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
                                size="small"
                                sx={{
                                  color: 'secondary.main',
                                  bgcolor: 'secondary.background',
                                  '&:hover': {
                                    bgcolor: 'secondary.light',
                                    color: 'white',
                                  },
                                }}
                                onClick={() => handleShowUpdate(value.id)}
                              >
                                <ModeEditOutlineOutlinedIcon fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                sx={{
                                  color: 'error.main',
                                  bgcolor: 'error.background',
                                  '&:hover': {
                                    bgcolor: 'error.main',
                                    color: 'white',
                                  },
                                }}
                                onClick={() => handleDeleteLanguageSkill(value.id)}
                              >
                                <DeleteOutlineOutlinedIcon fontSize="small" />
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
