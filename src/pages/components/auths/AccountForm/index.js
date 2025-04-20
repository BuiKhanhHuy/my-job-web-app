/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid } from '@mui/material';

import TextFieldCustom from '../../../../components/controls/TextFieldCustom';

const AccountForm = ({ handleUpdate, serverErrors }) => {
  const { currentUser } = useSelector((state) => state.user);

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Họ và tên là bắt buộc.')
      .max(100, 'Họ và tên vượt quá độ dài cho phép.'),
  });

  const { control, reset, setError, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    reset((formValues) => ({
      ...formValues,
      fullName: currentUser?.fullName,
      email: currentUser?.email,
      password: '*****************',
    }));
  }, [currentUser, reset]);

  // show server errors
  React.useEffect(() => {
    if (serverErrors !== null)
      for (let err in serverErrors) {
        setError(err, {
          type: 400,
          message: serverErrors[err]?.join(' '),
        });
      }
    else {
      setError();
    }
  }, [serverErrors, setError]);

  return (
    <form id="account-form" onSubmit={handleSubmit(handleUpdate)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextFieldCustom
            name="fullName"
            title="Họ và tên"
            showRequired={true}
            placeholder="Nhập họ và tên của bạn"
            control={control}
          />
        </Grid>
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
            name="password"
            title="Mật khẩu"
            showRequired={true}
            placeholder="Nhập mật khẩu"
            control={control}
            disabled={true}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default AccountForm;
