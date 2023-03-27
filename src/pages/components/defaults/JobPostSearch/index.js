import React from 'react';
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
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ClearIcon from '@mui/icons-material/Clear';

import InputBaseSearchHomeCustom from '../../../../components/controls/InputBaseSearchHomeCustom';
import SingleSelectSearchCustom from '../../../../components/controls/SingleSelectSearchCustom';
import { useSelector } from 'react-redux';

const JobPostSearch = () => {
  const { allConfig } = useSelector((state) => state.config);
  const [showAdvanceFilter, setShowAdvanceFilter] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      kw: '',
      careers: '',
      city: '',
      experience: '',
      position: '',
      jobType: '',
      typeOfWorkplace: '',
      genderRequire: '',
    },
  });

  const handleFiter = (data) => {
    console.log('Data: ', data);
  };

  const handleChangeShowFilter = () => {
    setShowAdvanceFilter(!showAdvanceFilter);
  };

  return (
    <Box>
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
              name="careers"
              placeholder="Tất cả ngành nghề"
              control={control}
              options={allConfig?.careerOptions || []}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2} xl={2}>
            <SingleSelectSearchCustom
              name="city"
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
                startIcon={<SearchIcon />}
                color="info"
                onClick={handleSubmit(handleFiter)}
                sx={{ py: 1 }}
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
          visibility: showAdvanceFilter ? 'visible' : 'hidden',
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
              name="position"
              placeholder="Tất cả vị trí"
              control={control}
              options={allConfig?.positionOptions || []}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
            <SingleSelectSearchCustom
              name="experience"
              placeholder="Tất cả kinh nghiệm"
              control={control}
              options={allConfig?.experienceOptions || []}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
            <SingleSelectSearchCustom
              name="jobType"
              placeholder="Tất cả hình thức làm việc"
              control={control}
              options={allConfig?.jobTypeOptions || []}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
            <SingleSelectSearchCustom
              name="typeOfWorkplace"
              placeholder="Tất cả loại hình làm việc"
              control={control}
              options={allConfig?.typeOfWorkplaceOptions || []}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
            <SingleSelectSearchCustom
              name="genderRequire"
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
              <IconButton color="primary" aria-label="add to shopping cart">
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
