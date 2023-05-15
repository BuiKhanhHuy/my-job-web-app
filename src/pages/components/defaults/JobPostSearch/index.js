import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ClearIcon from '@mui/icons-material/Clear';

import InputBaseSearchHomeCustom from '../../../../components/controls/InputBaseSearchHomeCustom';
import SingleSelectSearchCustom from '../../../../components/controls/SingleSelectSearchCustom';

import {
  resetSearchJobPostFilter,
  searchJobPost,
} from '../../../../redux/filterSlice';

const JobPostSearch = () => {
  const dispatch = useDispatch();
  const { allConfig } = useSelector((state) => state.config);
  const { jobPostFilter } = useSelector((state) => state.filter);
  const [showAdvanceFilter, setShowAdvanceFilter] = React.useState(false);

  const { control, handleSubmit, reset } = useForm();

  React.useEffect(() => {
    reset((formValues) => ({
      ...formValues,
      ...jobPostFilter,
    }));
  }, [jobPostFilter, reset]);

  const handleChangeShowFilter = () => {
    setShowAdvanceFilter(!showAdvanceFilter);
  };

  const handleFilter = (data) => {
    dispatch(searchJobPost(data));
  };

  const handleReset = () => {
    dispatch(resetSearchJobPostFilter());
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleFilter)}>
      <Card sx={{ p: 3, boxShadow: 0, backgroundColor: '#441da0' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <InputBaseSearchHomeCustom
              name="kw"
              placeholder="Tìm kiếm cơ hội việc làm"
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
            <SingleSelectSearchCustom
              name="careerId"
              placeholder="Tất cả ngành nghề"
              control={control}
              options={allConfig?.careerOptions || []}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2} xl={2}>
            <SingleSelectSearchCustom
              name="cityId"
              placeholder="Tất cả tỉnh thành"
              control={control}
              options={allConfig?.cityOptions || []}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
            <Stack
              spacing={2}
              direction={{
                xs: 'column',
                sm: 'row',
                md: 'row',
                lg: 'row',
                xl: 'row',
              }}
              justifyContent={{ sm: 'flex-end', lg: 'center' }}
            >
              <Button
                variant="contained"
                color="info"
                sx={{ py: 1 }}
                type="submit"
              >
                Tìm kiếm
              </Button>
              <Button
                variant="contained"
                sx={{ py: 1, color: 'white' }}
                startIcon={
                  showAdvanceFilter ? <FilterAltOffIcon /> : <FilterAltIcon />
                }
                color="secondary"
                onClick={handleChangeShowFilter}
              >
                Lọc nâng cao
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Card>
      <Card
        sx={{
          p: 2,
          boxShadow: 3,
          mt: -1,
          display: showAdvanceFilter ? 'block' : 'none',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={1} xl={1}>
            <Typography
              variant="subtitle2"
              sx={{ pt: 0.5, fontSize: 16 }}
              color="GrayText"
            >
              Lọc nâng cao
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
            <SingleSelectSearchCustom
              name="positionId"
              placeholder="Tất cả vị trí"
              control={control}
              options={allConfig?.positionOptions || []}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
            <SingleSelectSearchCustom
              name="experienceId"
              placeholder="Tất cả kinh nghiệm"
              control={control}
              options={allConfig?.experienceOptions || []}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
            <SingleSelectSearchCustom
              name="jobTypeId"
              placeholder="Tất cả hình thức làm việc"
              control={control}
              options={allConfig?.jobTypeOptions || []}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
            <SingleSelectSearchCustom
              name="typeOfWorkplaceId"
              placeholder="Tất cả loại hình làm việc"
              control={control}
              options={allConfig?.typeOfWorkplaceOptions || []}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
            <SingleSelectSearchCustom
              name="genderId"
              placeholder="Tất cả giới tính"
              control={control}
              options={allConfig?.genderOptions || []}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={1} xl={1}>
            <Stack
              direction="row"
              justifyContent={{ xs: 'flex-end', lg: 'center', xl: 'center' }}
            >
              <IconButton
                color="primary"
                aria-label="add to shopping cart"
                onClick={handleReset}
              >
                <DeleteForeverIcon color="secondary" />
              </IconButton>
              <IconButton
                color="primary"
                aria-label="add to shopping cart"
                onClick={handleChangeShowFilter}
              >
                <ClearIcon color="error" />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default JobPostSearch;
