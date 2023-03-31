import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid } from '@mui/material';

import { REGEX_VATIDATE } from '../../configs/constants';
import TextFieldCustom from '../controls/TextFieldCustom';
import { useSelector } from 'react-redux';

const ApplyForm = ({ handleApply }) => {
  const { currentUser } = useSelector((state) => state.user);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email là bắt buộc.')
      .email('Email không hợp lệ.')
      .max(100, 'Email vượt quá độ dài cho phép.'),
    phone: yup
      .string()
      .required('Số điện thoại là bắt buộc.')
      .matches(REGEX_VATIDATE.phoneRegExp, 'Số điện thoại không hợp lệ.')
      .max(15, 'Số điện thoại vượt quá độ dài cho phép.'),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: currentUser.email,
      phone: '',
    },
    resolver: yupResolver(schema),
  });

  return (
    <form id="modal-form" onSubmit={handleSubmit(handleApply)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextFieldCustom
            name="email"
            title="Email"
            showRequired={true}
            placeholder="Nhập email"
            control={control}
            disabled={true}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="phone"
            title="Số điện thoại"
            showRequired={true}
            placeholder="Nhập số điện thoại"
            control={control}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default ApplyForm;
