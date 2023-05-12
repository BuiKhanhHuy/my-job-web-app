import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { Card, Grid, Button, Stack, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InputBaseSearchHomeCustom from '../../../../components/controls/InputBaseSearchHomeCustom';
import SingleSelectSearchCustom from '../../../../components/controls/SingleSelectSearchCustom';
import {
  resetSearchCompany,
  searchCompany,
} from '../../../../redux/filterSlice';

const CompanySearch = () => {
  const dispatch = useDispatch();
  const { allConfig } = useSelector((state) => state.config);
  const { companyFilter } = useSelector((state) => state.filter);

  const { control, handleSubmit, reset } = useForm();

  React.useEffect(() => {
    reset((formValues) => ({
      ...formValues,
      ...companyFilter,
    }));
  }, [companyFilter, reset]);

  const handleFilter = (data) => {
    dispatch(searchCompany(data));
  };

  const handleReset = () => {
    dispatch(resetSearchCompany());
  };

  return (
    <Card sx={{ p: 2, boxShadow: 0, backgroundColor: '#441da0', width: {xs: "100%", sm: "100%", md: '100%', lg: '80%', xl: '80%'} }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
          <InputBaseSearchHomeCustom
            name="kw"
            placeholder="Nhập tên công ty hoặc lĩnh vực cần tìm kiếm"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <SingleSelectSearchCustom
            name="cityId"
            placeholder="Tất cả tỉnh thành"
            control={control}
            options={allConfig?.cityOptions || []}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
          <Stack direction="row" justifyContent="space-between">
            <Button
              variant="contained"
              color="info"
              sx={{ color: 'white' }}
              onClick={handleSubmit(handleFilter)}
            >
              Tìm kiếm
            </Button>
            <IconButton aria-label="delete" onClick={handleReset}>
              <DeleteForeverIcon color="secondary" />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CompanySearch;
