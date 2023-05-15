import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Card, Grid } from '@mui/material';

import InputBaseSearchHomeCustom from '../../../../components/controls/InputBaseSearchHomeCustom';
import SingleSelectSearchCustom from '../../../../components/controls/SingleSelectSearchCustom';

import {
  resetSearchJobPostFilter,
  searchJobPost,
} from '../../../../redux/filterSlice';
import { useNavigate } from 'react-router-dom';

const HomeSearch = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { allConfig } = useSelector((state) => state.config);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      kw: '',
      cityId: '',
      careerId: '',
    },
  });

  React.useEffect(() => {
    dispatch(resetSearchJobPostFilter());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilter = (data) => {
    console.log(data);
    dispatch(searchJobPost(data));
    nav('/viec-lam');
  };

  return (
    <Card
      sx={{
        backgroundColor: 'rgba(0,0,0,.35)',
        borderRadius: 3.5,
        p: 4,
        pt: 5,
      }}
    >
      <form onSubmit={handleSubmit(handleFilter)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <InputBaseSearchHomeCustom
              name="kw"
              control={control}
              placeholder="Tìm kiếm cơ hội việc làm"
              showSubmitButton={true}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <SingleSelectSearchCustom
              name="careerId"
              placeholder="Tất cả ngành nghề"
              control={control}
              options={allConfig?.careerOptions || []}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <SingleSelectSearchCustom
              name="cityId"
              placeholder="Tất cả tỉnh thành"
              control={control}
              options={allConfig?.cityOptions || []}
            />
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default HomeSearch;
