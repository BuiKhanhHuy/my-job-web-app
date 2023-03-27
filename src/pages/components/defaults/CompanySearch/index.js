import React from 'react';
import { useForm } from 'react-hook-form';

import { Card, Grid } from '@mui/material';
import InputBaseSearchHomeCustom from '../../../../components/controls/InputBaseSearchHomeCustom';
import SingleSelectSearchCustom from '../../../../components/controls/SingleSelectSearchCustom';

const CompanySearch = () => {
  const { control } = useForm({
    default: {
      kw: '',
    },
  });

  return (
    <Card sx={{ p: 2, boxShadow: 0, backgroundColor: '#441da0', width: "60%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
          <InputBaseSearchHomeCustom
            name="kw"
            placeholder="Nhập tên công ty"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <SingleSelectSearchCustom
            name="city"
            placeholder="Tất cả tỉnh thành"
            control={control}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default CompanySearch;
