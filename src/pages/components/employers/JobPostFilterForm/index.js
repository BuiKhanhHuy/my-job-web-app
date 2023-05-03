import React from 'react';
import { useForm } from 'react-hook-form';
import { Grid, Button, Stack, Tooltip, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import SingleSelectCustom from '../../../../components/controls/SingleSelectCustom';

const JobPostFilterForm = ({ handleFilter }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { defaultValues },
  } = useForm({
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
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
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
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <Stack direction="row" spacing={2}>
            <Tooltip title="Đặt lại" arrow>
              <IconButton
                aria-label="refresh"
                onClick={() => {
                  reset();
                  handleSubmit(handleFilter(defaultValues));
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
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
