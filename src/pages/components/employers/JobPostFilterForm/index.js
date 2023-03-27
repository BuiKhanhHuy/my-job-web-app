import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid, Button, Box, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import CheckboxCustom from '../../../../components/controls/CheckboxCustom';

const JobPostFilterForm = ({ handleFilter }) => {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Tên chứng chỉ là bắt buộc.')
      .max(200, 'Tên chứng chỉ vượt quá độ dài cho phép.'),
    trainingPlace: yup
      .string()
      .required('Nơi đào tạo là bắt buộc.')
      .max(255, 'Nơi đào tạo vượt quá độ dài cho phép.'),
    startDate: yup
      .date()
      .required('Ngày bắt đầu là bắt buộc.')
      .typeError('Ngày bắt đầu là bắt buộc.'),
    expirationDate: yup.date().nullable(),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(handleFilter)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <TextFieldCustom
            name="name"
            placeholder="Nhập tên tin đăng"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={5} xl={5}>
          <Stack direction="row" spacing={2}>
            <CheckboxCustom
              name="isUrgent"
              control={control}
              title="Tuyển gấp"
            />
            <Button
              sx={{ color: 'white' }}
              variant="contained"
              color="secondary"
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
