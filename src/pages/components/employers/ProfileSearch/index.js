/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button, Grid, Stack, Typography } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faMagicWandSparkles,
  faUsers,
  faGraduationCap,
  faBuilding,
  faPersonDigging,
  faVenusMars,
  faPeopleRoof,
} from '@fortawesome/free-solid-svg-icons';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import SingleSelectCustom from '../../../../components/controls/SingleSelectCustom';

import { resetSearchResume, searchResume } from '../../../../redux/filterSlice';

const ProfileSearch = () => {
  const dispatch = useDispatch();
  const { allConfig } = useSelector((state) => state.config);
  const { resumeFilter } = useSelector((state) => state.filter);

  const { control, reset, handleSubmit } = useForm();

  React.useEffect(() => {
    reset((formValues) => ({
      ...formValues,
      ...resumeFilter,
    }));
  }, [resumeFilter, reset]);

  const handleFilter = (data) => {
    dispatch(searchResume(data));
  };

  const handleReset = () => {
    dispatch(resetSearchResume());
  };

  return (
    <>
      <Grid item xs={12} component="form" onSubmit={handleSubmit(handleFilter)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={5} lg={6} xl={6}>
            <TextFieldCustom
              name="kw"
              showRequired={true}
              placeholder="Nhập từ khóa tìm kiếm..."
              control={control}
              icon={<SearchIcon sx={{ color: 'grey.500' }} />}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'background.paper',
                  borderRadius: '12px',
                  '&:hover': {
                    backgroundColor: 'grey.50',
                  },
                  '& fieldset': {
                    borderColor: 'grey.200',
                  },
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <SingleSelectCustom
              name="cityId"
              control={control}
              options={allConfig?.cityOptions || []}
              showRequired={true}
              placeholder="Chọn Tỉnh/Thành phố"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'background.paper',
                  borderRadius: '12px',
                  '&:hover': {
                    backgroundColor: 'grey.50',
                  },
                  '& fieldset': {
                    borderColor: 'grey.200',
                  },
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
            <Stack>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<SearchIcon />}
                sx={{
                  height: '100%',
                  borderRadius: '12px',
                  boxShadow: 'none',
                  background: (theme) => theme.palette.secondary.gradient,
                  '&:hover': {
                    boxShadow: (theme) => theme.customShadows.medium,
                  }
                }}
                type="submit"
              >
                Tìm kiếm
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={3}
        xl={3}
        component="form"
        onSubmit={handleSubmit(handleFilter)}
      >
        <Stack 
          spacing={2.5}
          sx={{
            backgroundColor: 'background.paper',
            borderRadius: '16px',
            padding: 3,
            border: '1px solid',
            borderColor: 'grey.100',
            boxShadow: (theme) => theme.customShadows.card
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Bộ lọc nâng cao</Typography>
            <Button
              variant="text"
              color="error"
              size="small"
              startIcon={<RefreshIcon />}
              sx={{ 
                textTransform: 'inherit',
                '&:hover': {
                  backgroundColor: 'error.background'
                }
              }}
              onClick={handleReset}
            >
              Xóa lọc
            </Button>
          </Stack>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', color: 'grey.700' }}>
                <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: 8, color: '#441da0' }} />
                Ngành nghề
              </Typography>
              <SingleSelectCustom
                name="careerId"
                control={control}
                options={allConfig?.careerOptions || []}
                placeholder="Tất cả ngành nghề"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'background.paper',
                    borderRadius: '10px',
                    '&:hover': {
                      backgroundColor: 'grey.50',
                    },
                    '& fieldset': {
                      borderColor: 'grey.200',
                    }
                  }
                }}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', color: 'grey.700' }}>
                <FontAwesomeIcon icon={faMagicWandSparkles} style={{ marginRight: 8, color: '#441da0' }} />
                Kinh nghiệm
              </Typography>
              <SingleSelectCustom
                name="experienceId"
                control={control}
                options={allConfig?.experienceOptions || []}
                placeholder="Tất cả kinh nghiệm"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'background.paper',
                    borderRadius: '10px',
                    '&:hover': {
                      backgroundColor: 'grey.50',
                    },
                    '& fieldset': {
                      borderColor: 'grey.200',
                    }
                  }
                }}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', color: 'grey.700' }}>
                <FontAwesomeIcon icon={faUsers} style={{ marginRight: 8, color: '#441da0' }} />
                Cấp bậc
              </Typography>
              <SingleSelectCustom
                name="positionId"
                control={control}
                options={allConfig?.positionOptions || []}
                placeholder="Tất cả cấp bậc"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'background.paper',
                    borderRadius: '10px',
                    '&:hover': {
                      backgroundColor: 'grey.50',
                    },
                    '& fieldset': {
                      borderColor: 'grey.200',
                    }
                  }
                }}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', color: 'grey.700' }}>
                <FontAwesomeIcon icon={faGraduationCap} style={{ marginRight: 8, color: '#441da0' }} />
                Học vấn
              </Typography>
              <SingleSelectCustom
                name="academicLevelId"
                control={control}
                options={allConfig?.academicLevelOptions || []}
                placeholder="Tất cả học vấn"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'background.paper',
                    borderRadius: '10px',
                    '&:hover': {
                      backgroundColor: 'grey.50',
                    },
                    '& fieldset': {
                      borderColor: 'grey.200',
                    }
                  }
                }}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', color: 'grey.700' }}>
                <FontAwesomeIcon icon={faBuilding} style={{ marginRight: 8, color: '#441da0' }} />
                Nơi làm việc
              </Typography>
              <SingleSelectCustom
                name="typeOfWorkplaceId"
                control={control}
                options={allConfig?.typeOfWorkplaceOptions || []}
                placeholder="Tất cả nơi làm việc"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'background.paper',
                    borderRadius: '10px',
                    '&:hover': {
                      backgroundColor: 'grey.50',
                    },
                    '& fieldset': {
                      borderColor: 'grey.200',
                    }
                  }
                }}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', color: 'grey.700' }}>
                <FontAwesomeIcon icon={faPersonDigging} style={{ marginRight: 8, color: '#441da0' }} />
                Hình thức làm việc
              </Typography>
              <SingleSelectCustom
                name="jobTypeId"
                control={control}
                options={allConfig?.jobTypeOptions || []}
                placeholder="Tất cả hình thức làm việc"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'background.paper',
                    borderRadius: '10px',
                    '&:hover': {
                      backgroundColor: 'grey.50',
                    },
                    '& fieldset': {
                      borderColor: 'grey.200',
                    }
                  }
                }}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', color: 'grey.700' }}>
                <FontAwesomeIcon icon={faVenusMars} style={{ marginRight: 8, color: '#441da0' }} />
                Giới tính
              </Typography>
              <SingleSelectCustom
                name="genderId"
                control={control}
                options={allConfig?.genderOptions || []}
                placeholder="Tất cả giới tính"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'background.paper',
                    borderRadius: '10px',
                    '&:hover': {
                      backgroundColor: 'grey.50',
                    },
                    '& fieldset': {
                      borderColor: 'grey.200',
                    }
                  }
                }}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', color: 'grey.700' }}>
                <FontAwesomeIcon icon={faPeopleRoof} style={{ marginRight: 8, color: '#441da0' }} />
                Tình trạng hôn nhân
              </Typography>
              <SingleSelectCustom
                name="maritalStatusId"
                control={control}
                options={allConfig?.maritalStatusOptions || []}
                placeholder="Tất cả tình trạng hôn nhân"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'background.paper',
                    borderRadius: '10px',
                    '&:hover': {
                      backgroundColor: 'grey.50',
                    },
                    '& fieldset': {
                      borderColor: 'grey.200',
                    }
                  }
                }}
              />
            </Stack>
          </Stack>
        </Stack>
      </Grid>
    </>
  );
};

export default ProfileSearch;
