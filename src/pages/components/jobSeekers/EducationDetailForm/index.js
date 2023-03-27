import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid } from '@mui/material';

import { DATE_OPTIONS } from '../../../../configs/constants';
import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import MultilineTextFieldCustom from '../../../../components/controls/MultilineTextFieldCustom';
import DatePickerCustom from '../../../../components/controls/DatePickerCustom';

const EducationDetaiForm = ({ handleAddOrUpdate, editData }) => {
  const schema = yup.object().shape({
    degreeName: yup
      .string()
      .required('Tên bằng cấp/Chứng chỉ là bắt buộc.')
      .max(200, 'Tên bằng cấp/Chứng chỉ vượt quá độ dài cho phép.'),
    major: yup
      .string()
      .required('Chuyên ngành đào tạo là bắt buộc.')
      .max(255, 'Chuyên ngành đào tạo vượt quá độ dài cho phép.'),
    trainingPlaceName: yup
      .string()
      .required('Trường/Trung tâm đào tạo là bắt buộc.')
      .max(255, 'Trường/Trung tâm đào tạo vượt quá độ dài cho phép.'),
    startDate: yup
      .date()
      .required('Ngày bắt đầu là bắt buộc.')
      .typeError('Ngày bắt đầu là bắt buộc.'),
    completedDate: yup.date().nullable(),
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
            name="degreeName"
            title="Tên bằng cấp/Chứng chỉ"
            showRequired={true}
            placeholder="VD: Bằng Cao Đẳng CNTT, Chứng chỉ nghề điện công nghiệp"
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="major"
            title="Chuyên ngành đào tạo"
            showRequired={true}
            placeholder="Nhập chuyên ngành đào tạo"
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="trainingPlaceName"
            title="Trường/Trung tâm đào tạo"
            showRequired={true}
            placeholder="Nhập tên trường/Trung tâm đào tạo"
            control={control}
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
            name="completedDate"
            control={control}
            title="Ngày hoàn thành (Để trống nếu đang học tại đây)"
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

export default EducationDetaiForm;
