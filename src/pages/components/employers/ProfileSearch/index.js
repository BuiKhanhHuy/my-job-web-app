import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';

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
    console.log(data);
  };

  const handleReset = () => {
    dispatch(resetSearchResume());
  };

  return (
    <>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={5} lg={6} xl={6}>
            <TextFieldCustom
              name="kw"
              showRequired={true}
              placeholder="Nhập từ khóa"
              control={control}
              icon={<SearchIcon />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <SingleSelectCustom
              name="cityId"
              control={control}
              options={allConfig?.cityOptions || []}
              showRequired={true}
              placeholder="Chọn Tỉnh/Thành phố"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
            <Stack>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<SearchIcon />}
                sx={{ color: 'white', height: '100%' }}
                onClick={handleSubmit(handleFilter)}
              >
                Tìm kiếm
              </Button>
            </Stack>
          </Grid>
        </Grid>{' '}
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Bộ lọc nâng cao: </Typography>
            <Button
              variant="text"
              color="error"
              size="small"
              startIcon={<RefreshIcon />}
              sx={{textTransform: 'inherit'}}
              onClick={handleReset}
            >
              Xóa lọc
            </Button>
          </Stack>
          <Stack spacing={1}>
            <Box>
              <Typography variant="subtitle2">
                <FontAwesomeIcon
                  icon={faBriefcase}
                  style={{ marginRight: 3 }}
                />{' '}
                Ngành nghề
              </Typography>
            </Box>
            <SingleSelectCustom
              name="careerId"
              control={control}
              options={allConfig?.careerOptions || []}
              placeholder="Tất cả ngành nghề"
            />
          </Stack>
          <Stack spacing={1}>
            <Box>
              <Typography variant="subtitle2">
                <FontAwesomeIcon
                  icon={faMagicWandSparkles}
                  style={{ marginRight: 3 }}
                />{' '}
                Kinh nghiệm
              </Typography>
            </Box>
            <SingleSelectCustom
              name="experienceId"
              control={control}
              options={allConfig?.experienceOptions || []}
              placeholder="Tất cả kinh nghiệm"
            />
          </Stack>
          <Stack spacing={1}>
            <Box>
              <Typography variant="subtitle2">
                <FontAwesomeIcon icon={faUsers} style={{ marginRight: 3 }} />{' '}
                Cấp bậc
              </Typography>
            </Box>
            <SingleSelectCustom
              name="positionId"
              control={control}
              options={allConfig?.positionOptions || []}
              placeholder="Tất cả cấp bậc"
            />
          </Stack>
          <Stack spacing={1}>
            <Box>
              <Typography variant="subtitle2">
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  style={{ marginRight: 3 }}
                />{' '}
                Học vấn
              </Typography>
            </Box>
            <SingleSelectCustom
              name="academicLevelId"
              control={control}
              options={allConfig?.academicLevelOptions || []}
              placeholder="Tất cả học vấn"
            />
          </Stack>
          <Stack spacing={1}>
            <Box>
              <Typography variant="subtitle2">
                <FontAwesomeIcon icon={faBuilding} style={{ marginRight: 3 }} />{' '}
                Nơi làm việc
              </Typography>
            </Box>
            <SingleSelectCustom
              name="typeOfWorkplaceId"
              control={control}
              options={allConfig?.typeOfWorkplaceOptions || []}
              placeholder="Tất cả nơi làm việc"
            />
          </Stack>
          <Stack spacing={1}>
            <Box>
              <Typography variant="subtitle2">
                <FontAwesomeIcon
                  icon={faPersonDigging}
                  style={{ marginRight: 3 }}
                />{' '}
                Hình thức làm việc
              </Typography>
            </Box>
            <SingleSelectCustom
              name="jobTypeId"
              control={control}
              options={allConfig?.jobTypeOptions || []}
              placeholder="Tất cả hình thức làm việc"
            />
          </Stack>
          <Stack spacing={1}>
            <Box>
              <Typography variant="subtitle2">
                <FontAwesomeIcon
                  icon={faVenusMars}
                  style={{ marginRight: 3 }}
                />{' '}
                Giới tính
              </Typography>
            </Box>
            <SingleSelectCustom
              name="genderId"
              control={control}
              options={allConfig?.genderOptions || []}
              placeholder="Tất cả giới tính"
            />
          </Stack>
          <Stack spacing={1}>
            <Box>
              <Typography variant="subtitle2">
                <FontAwesomeIcon
                  icon={faPeopleRoof}
                  style={{ marginRight: 3 }}
                />{' '}
                Tình trạng hôn nhân
              </Typography>
            </Box>
            <SingleSelectCustom
              name="maritalStatusId"
              control={control}
              options={allConfig?.maritalStatusOptions || []}
              placeholder="Tất cả tình trạng hôn nhân"
            />
          </Stack>
        </Stack>
      </Grid>
    </>
  );
};

export default ProfileSearch;
