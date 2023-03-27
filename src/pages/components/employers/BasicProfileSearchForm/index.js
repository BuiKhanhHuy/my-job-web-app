import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Grid, Button, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import SingleSelectCustom from '../../../../components/controls/SingleSelectCustom';
import TextFieldCustom from '../../../../components/controls/TextFieldCustom';

const BasicProfileSearchForm = () => {
  const { allConfig } = useSelector((state) => state.config);

  const { control, reset, handleSubmit } = useForm({
    defaultValues: {
      name: '',
    },
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
        <TextFieldCustom
          name="keyword"
          showRequired={true}
          placeholder="Nhập từ khóa"
          control={control}
          icon={<SearchIcon />}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
        <SingleSelectCustom
          name="city"
          control={control}
          options={allConfig?.cityOptions || []}
          showRequired={true}
          placeholder="Chọn Tỉnh/Thành phố"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
        <Stack>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<SearchIcon />}
            sx={{ color: 'white' }}
          >
            Tìm kiếm
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default BasicProfileSearchForm;
