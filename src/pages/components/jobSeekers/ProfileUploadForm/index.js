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
import MultilineTextFieldCustom from '../../../../components/controls/MultilineTextFieldCustom';
import SingleSelectCustom from '../../../../components/controls/SingleSelectCustom';
import FileUploadCustom from '../../../../components/controls/FileUploadCustom';

const ProfileUploadForm = ({ handleAdd }) => {
  const { allConfig } = useSelector((state) => state.config);
  const schema = yup.object().shape({
    file: yup
      .mixed()
      .test(
        'files empty',
        'Tập tin là bắt buộc.',
        (value) =>
          !(
            value === undefined ||
            value === null ||
            value === '' ||
            value.length === 0
          )
      ),
    title: yup
      .string()
      .required('Vị trí mong muốn là bắt buộc.')
      .max(200, 'Vị trí mong muốn vượt quá độ dài cho phép.'),
    position: yup
      .number()
      .required('Cấp bậc mong muốn là bắt buộc.')
      .typeError('Cấp bậc mong muốn là bắt buộc.'),
    academicLevel: yup
      .number()
      .required('Trình độ học vấn là bắt buộc.')
      .typeError('Trình độ học vấn là bắt buộc.'),
    experience: yup
      .number()
      .required('Kinh nghiệm làm việc là bắt buộc.')
      .typeError('Kinh nghiệm làm việc là bắt buộc.'),
    career: yup
      .number()
      .required('Ngành nghề là bắt buộc.')
      .typeError('Ngành nghề là bắt buộc.'),
    city: yup
      .number()
      .required('Tỉnh/Thành phố là bắt buộc.')
      .typeError('Tỉnh/Thành phố là bắt buộc.'),
    salaryMin: yup
      .number()
      .required('Mức lương mong muốn tối thiểu là bắt buộc.')
      .typeError('Lương tối thiểu không hợp lệ.')
      .min(0, 'Lương tối thiểu không hợp lệ.')
      .test(
        'minimum-wage-comparison',
        'Lương tối thiểu phải nhỏ hơn lương tối đa.',
        function (value) {
          return !(value >= this.parent.salaryMax);
        }
      ),
    salaryMax: yup
      .number()
      .required('Mức lương mong muốn tối đa là bắt buộc.')
      .typeError('Lương tối đa không hợp lệ.')
      .min(0, 'Lương tối đa không hợp lệ.')
      .test(
        'maximum-wage-comparison',
        'Lương tối đa phải lớn hơn lương tối thiểu.',
        function (value) {
          return !(value <= this.parent.salaryMin);
        }
      ),
    typeOfWorkplace: yup
      .number()
      .required('Nơi làm việc là bắt buộc.')
      .typeError('Nơi làm việc là bắt buộc.'),
    jobType: yup
      .number()
      .required('Hình thức làm việc là bắt buộc.')
      .typeError('Hình thức làm việc là bắt buộc.'),
    description: yup
      .string()
      .required('Mục tiêu nghề nghiệp là bắt buộc.')
      .max(800, 'Mục tiêu nghề nghiệp vượt quá độ dài cho phép.'),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form id="modal-form" onSubmit={handleSubmit(handleAdd)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FileUploadCustom
            control={control}
            name="file"
            title="Chọn tệp CV của bạn"
            showRequired={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldCustom
            name="title"
            showRequired={true}
            title="Vị trí mong muốn"
            placeholder="VD: Lập trình viên Backend"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="position"
            control={control}
            options={allConfig?.positionOptions || []}
            title="Cấp bậc mong muốn"
            showRequired={true}
            placeholder="Chọn cấp bậc"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="academicLevel"
            control={control}
            options={allConfig?.academicLevelOptions || []}
            title="Trình độ học vấn"
            showRequired={true}
            placeholder="Chọn trình độ học vấn"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="experience"
            control={control}
            options={allConfig?.experienceOptions || []}
            title="Kinh nghiệm làm việc"
            showRequired={true}
            placeholder="Chọn kinh nghiệm làm việc"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="career"
            control={control}
            options={allConfig?.careerOptions || []}
            title="Nghề nghiệp"
            showRequired={true}
            placeholder="Chọn nghề nghiệp"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="city"
            control={control}
            options={allConfig?.cityOptions || []}
            title="Tỉnh/Thành phố"
            showRequired={true}
            placeholder="Chọn tỉnh thành phố"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldCustom
            name="salaryMin"
            title="Mức lương mong muốn tối thiểu"
            showRequired={true}
            placeholder="Nhập mức lương mong muốn tối thiểu"
            control={control}
            icon={'VND'}
            type='number'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldCustom
            name="salaryMax"
            title="Mức lương mong muốn tối đa"
            showRequired={true}
            placeholder="Nhập mức lương mong muốn tối đa"
            control={control}
            icon={'VND'}
            type='number'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="typeOfWorkplace"
            control={control}
            options={allConfig?.typeOfWorkplaceOptions || []}
            title="Nơi làm việc"
            showRequired={true}
            placeholder="Chọn nơi làm việc"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="jobType"
            control={control}
            options={allConfig?.jobTypeOptions || []}
            title="Hình thức làm việc"
            showRequired={true}
            placeholder="Chọn hình thức làm việc"
          />
        </Grid>
        <Grid item xs={12}>
          <MultilineTextFieldCustom
            name="description"
            title="Mục tiêu nghề nghiệp"
            showRequired={true}
            placeholder="Nhập nội dung tại đây"
            control={control}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default ProfileUploadForm;
