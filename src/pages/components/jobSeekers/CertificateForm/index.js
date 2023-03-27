import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid } from '@mui/material';

import { DATE_OPTIONS } from '../../../../configs/constants';
import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import DatePickerCustom from '../../../../components/controls/DatePickerCustom';

const CertificateForm = ({
  handleAddOrUpdate,
  editData,
  serverErrors = null,
}) => {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Tên chứng chỉ là bắt buộc.')
      .max(200, 'Tên chứng chỉ vượt quá độ dài cho phép.'),
    trainingPlace: yup
      .string()
      .required('Tên trường/Trung tâm đào tạo là bắt buộc.')
      .max(255, 'Tên trường/Trung tâm đào tạo vượt quá độ dài cho phép.'),
    startDate: yup
      .date()
      .required('Ngày bắt đầu là bắt buộc.')
      .typeError('Ngày bắt đầu là bắt buộc.'),
    expirationDate: yup.date().nullable(),
  });

  const { control, reset, setError, handleSubmit } = useForm({
    defaultValues: {
      name: '',
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
        <Grid item xs={12}>
          <TextFieldCustom
            name="name"
            title="Tên chứng chỉ"
            showRequired={true}
            placeholder="Nhập tên chứng chỉ"
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="trainingPlace"
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
            name="expirationDate"
            control={control}
            title="Ngày hết hạn (Để trống nếu chứng chỉ vô thời hạn)"
            maxDate={DATE_OPTIONS.today}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default CertificateForm;
