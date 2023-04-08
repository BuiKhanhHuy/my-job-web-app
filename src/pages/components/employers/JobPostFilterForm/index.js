import React from 'react';
import { useForm } from 'react-hook-form';
import { Grid, Button, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import SingleSelectCustom from '../../../../components/controls/SingleSelectCustom';

const JobPostFilterForm = ({ handleFilter }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      kw: '',
      isUrgent: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(handleFilter)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <TextFieldCustom
            name="kw"
            placeholder="Nhập tên tin đăng"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <SingleSelectCustom
            name="isUrgent"
            control={control}
            options={[
              { id: 1, name: 'Tuyển gấp' },
              { id: 2, name: 'Không tuyển gấp' },
            ]}
            showRequired={true}
            placeholder="Trạng thái tuyển dụng"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={2} xl={2}>
          <Stack direction="row" spacing={2}>
            <Button
              sx={{ color: 'white' }}
              variant="contained"
              color="secondary"
              type="submit"
              startIcon={<SearchIcon />}
            >
              Tìm kiếm
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default JobPostFilterForm;
