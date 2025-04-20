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

import SingleSelectCustom from '../../../../components/controls/SingleSelectCustom';
import RatingCustom from '../../../../components/controls/RatingCustom';

const LanguageSkillForm = ({
  handleAddOrUpdate,
  editData,
  serverErrors = null,
}) => {
  const { allConfig } = useSelector((state) => state.config);
  const schema = yup.object().shape({
    language: yup
      .number()
      .required('Ngôn ngữ là bắt buộc.')
      .typeError('Ngôn ngữ là bắt buộc.'),
    level: yup.number().required('Trình độ là bắt buộc.'),
  });

  const { control, reset, setError, handleSubmit } = useForm({
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
    <form id="modal-form" onSubmit={handleSubmit(handleAddOrUpdate)}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12} md={12}>
          <SingleSelectCustom
            name="language"
            control={control}
            options={allConfig?.languageOptions || []}
            title="Ngôn ngữ"
            showRequired={true}
            placeholder="Chọn ngôn ngữ"
          />
        </Grid>
        <Grid item xs={12}>
          <RatingCustom name="level" control={control} title="Trình độ" />
        </Grid>
      </Grid>
    </form>
  );
};

export default LanguageSkillForm;
