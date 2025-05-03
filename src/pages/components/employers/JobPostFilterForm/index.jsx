/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Grid, Button, Stack, Tooltip, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import SingleSelectCustom from '../../../../components/controls/SingleSelectCustom';

const JobPostFilterForm = ({ handleFilter }) => {
  const { allConfig } = useSelector((state) => state.config);
  const {
    control,
    handleSubmit,
    reset,
    formState: { defaultValues },
  } = useForm({
    defaultValues: {
      kw: '',
      isUrgent: '',
      statusId: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(handleFilter)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
          <TextFieldCustom
            name="kw"
            placeholder="Nhập tên tin đăng"
            control={control}
          />
        </Grid>
        <Grid item flex={1}>
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
        <Grid item flex={1}>
          <SingleSelectCustom
            name="statusId"
            control={control}
            options={allConfig?.jobPostStatusOptions || []}
            showRequired={true}
            placeholder="Trạng thái duyệt"
          />
        </Grid>
        <Grid item>
          <Stack
            direction="row"
            spacing={2}
            justifyContent={{
              xs: 'flex-end',
              sm: 'center',
              md: 'center',
              lg: 'center',
              xl: 'center',
            }}
          >
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
