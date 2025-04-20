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
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid } from '@mui/material';

import { DATE_OPTIONS } from '../../../../configs/constants';
import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import MultilineTextFieldCustom from '../../../../components/controls/MultilineTextFieldCustom';
import DatePickerCustom from '../../../../components/controls/DatePickerCustom';

const ExperienceDetaiForm = ({ handleAddOrUpdate, editData }) => {
  const schema = yup.object().shape({
    jobName: yup
      .string()
      .required('Tên công việc là bắt buộc.')
      .max(200, 'Tên công việc vượt quá độ dài cho phép.'),
    companyName: yup
      .string()
      .required('Tên công ty là bắt buộc.')
      .max(255, 'Tên công ty vượt quá độ dài cho phép.'),
    startDate: yup
      .date()
      .required('Ngày bắt đầu là bắt buộc.')
      .typeError('Ngày bắt đầu là bắt buộc.')
      .max(DATE_OPTIONS.yesterday, 'Ngày bắt đầu phải nhỏ hơn ngày hôm nay.')
      .test(
        'start-date-comparison',
        'Ngày bắt đầu phải nhỏ hơn ngày kết thúc.',
        function (value) {
          return !(value >= this.parent.endDate);
        }
      ),
    endDate: yup
      .date()
      .required('Ngày kết thúc là bắt buộc.')
      .typeError('Ngày kết thúc là bắt buộc.')
      .max(
        DATE_OPTIONS.today,
        'Ngày kết thúc phải nhỏ hơn hoặc bằng ngày hôm nay.'
      )
      .test(
        'end-date-comparison',
        'Ngày kết thúc phải lớn hơn ngày bắt đầu.',
        function (value) {
          return !(value <= this.parent.startDate);
        }
      ),
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
    <form id="modal-form" onSubmit={handleSubmit(handleAddOrUpdate)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextFieldCustom
            name="jobName"
            control={control}
            placeholder="VD: Kỹ sư phần mềm"
            title="Chức danh/vị trí công việc"
            showRequired={true}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="companyName"
            title="Tên công ty"
            placeholder="Nhập tên công ty"
            control={control}
            showRequired={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePickerCustom
            name="startDate"
            control={control}
            title="Ngày bắt đầu"
            showRequired={true}
            maxDate={DATE_OPTIONS.yesterday}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePickerCustom
            name="endDate"
            control={control}
            title="Ngày kết thúc"
            showRequired={true}
            maxDate={DATE_OPTIONS.today}
          />
        </Grid>
        <Grid item xs={12}>
          <MultilineTextFieldCustom
            name="description"
            title="Mô tả thêm"
            placeholder="Nhập nội dung mô tả tại đây"
            control={control}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default ExperienceDetaiForm;
