import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, Grid } from '@mui/material';

import InputBaseSearchHomeCustom from '../../../../components/controls/InputBaseSearchHomeCustom';
import SingleSelectSearchCustom from '../../../../components/controls/SingleSelectSearchCustom';
import MultiSelectSearchCustom from '../../../../components/controls/MultiSelectSearchCustom';

const HomeSearch = () => {
  const { control, handleSubmit } = useForm({
    default: {
      kw: '',
    },
  });

  const handleFilter = (data) => {
    console.log(data);
  };

  return (
    <Card
      sx={{
        width: 600,
        height: 180,
        backgroundColor: 'rgba(0,0,0,.35)',
        borderRadius: 3.5,
        p: 4,
        pt: 5,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <InputBaseSearchHomeCustom
            name="kw"
            control={control}
            onHandleSubmit={handleSubmit(handleFilter)}
            placeholder="Tìm kiếm cơ hội việc làm"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <MultiSelectSearchCustom
            name="careers"
            placeholder="Tất cả nghề nghiệp"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <SingleSelectSearchCustom
            name="city"
            control={control}
            placeholder="Tất cả tỉnh thành"
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default HomeSearch;
