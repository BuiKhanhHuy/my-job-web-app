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
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import CheckboxCustom from '../../../../components/controls/CheckboxCustom';

const SettingForm = ({ editData, handleUpdate }) => {
  const schema = yup.object().shape({
    emailNotificationActive: yup.boolean().default(false),
    smsNotificationActive: yup.boolean().default(false),
  });

  const { control, reset, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    if (editData) {
      reset((formValues) => ({
        ...formValues,
        ...editData,
      }));
    } else {
      reset();
    }
  }, [editData, reset]);

  return (
    <form id="setting-form" onSubmit={handleSubmit(handleUpdate)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CheckboxCustom
            name="emailNotificationActive"
            control={control}
            title="Cho phép gửi email"
          />
        </Grid>
        <Grid item xs={12}>
          <CheckboxCustom
            name="smsNotificationActive"
            control={control}
            title="Cho phép gửi tin nhắn SMS"
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default SettingForm;
