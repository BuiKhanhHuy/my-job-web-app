import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid } from '@mui/material';

import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import SingleSelectCustom from '../../../../components/controls/SingleSelectCustom';
import RadioCustom from '../../../../components/controls/RadioCustom';

const JobPostNotificationForm = ({ handleAddOrUpdate, editData }) => {
  const { allConfig } = useSelector((state) => state.config);

  const schema = yup.object().shape({
    jobName: yup
      .string()
      .required('Từ khóa là bắt buộc.')
      .max(200, 'Từ khóa là bắt buộc.'),
    career: yup
      .number()
      .required('Ngành/nghề là bắt buộc.')
      .typeError('Ngành/nghề là bắt buộc.'),
    city: yup
      .number()
      .required('Tỉnh/Thành phố là bắt buộc.')
      .typeError('Tỉnh/Thành phố là bắt buộc.'),
    position: yup.number().notRequired().nullable(),
    experience: yup.number().notRequired().nullable(),
    salary: yup
      .number()
      .nullable()
      .typeError('Mức lương mong muốn không hợp lệ.')
      .transform((value, originalValue) => {
        if (originalValue === '') {
          return null;
        }
        return value;
      }),
  });

  const {
    control,
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      frequency:
        (allConfig?.frequencyNotificationOptions || []).length > 0
          ? allConfig?.frequencyNotificationOptions[0].id
          : null,
    },
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
            title="Từ khóa"
            showRequired={true}
            placeholder="Nhập từ khoá là tên công việc hoặc liên quan đến tên công việc mà bạn đang tìm."
            control={control}
          />
        </Grid>
        <Grid item xs={6}>
          <SingleSelectCustom
            name="career"
            control={control}
            options={allConfig?.careerOptions || []}
            title="Ngành nghề"
            showRequired={true}
            placeholder="Chọn ngành nghề cần tuyển"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <SingleSelectCustom
            name="city"
            control={control}
            options={allConfig?.cityOptions || []}
            title="Tỉnh/Thành phố"
            showRequired={true}
            placeholder="Chọn tỉnh thành phố"
          />
        </Grid>
        <Grid item xs={6}>
          <SingleSelectCustom
            name="position"
            control={control}
            options={allConfig?.positionOptions || []}
            title="Vị trí/chức vụ"
            placeholder="Chọn vị trí/chức vụ"
          />
        </Grid>
        <Grid item xs={6}>
          <SingleSelectCustom
            name="experience"
            control={control}
            options={allConfig?.experienceOptions || []}
            title="Kinh nghiệm"
            placeholder="Chọn kinh nghiệm yêu cầu"
          />
        </Grid>
        <Grid item xs={6}>
          <TextFieldCustom
            name="salary"
            title="Mức lương mong muốn"
            placeholder="Nhập mức lương mong muốn của bạn"
            control={control}
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <RadioCustom
            name="frequency"
            control={control}
            options={allConfig?.frequencyNotificationOptions || []}
            title="Tần suất thông báo"
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default JobPostNotificationForm;
