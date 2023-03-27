import React from 'react';
import { useSelector } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid } from '@mui/material';

import errorHandling from '../../../../utils/errorHandling';
import { DATE_OPTIONS, REGEX_VATIDATE } from '../../../../configs/constants';
import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import SingleSelectCustom from '../../../../components/controls/SingleSelectCustom';
import DatePickerCustom from '../../../../components/controls/DatePickerCustom';

import commonService from '../../../../services/commonService';

const PersonalProfileForm = ({ handleUpdateProfile, editData }) => {
  const { allConfig } = useSelector((state) => state.config);
  const schema = yup.object().shape({
    user: yup.object().shape({
      fullName: yup
        .string()
        .required('Họ và tên là bắt buộc.')
        .max(100, 'Họ và tên vượt quá độ dài cho phép.'),
    }),
    phone: yup
      .string()
      .required('Số điện thoại là bắt buộc.')
      .matches(REGEX_VATIDATE.phoneRegExp, 'Số điện thoại không hợp lệ.')
      .max(15, 'Số điện thoại vượt quá độ dài cho phép.'),
    birthday: yup
      .date()
      .required('Ngày sinh là bắt buộc.')
      .typeError('Ngày sinh không hợp lệ.')
      .max(DATE_OPTIONS.yesterday, 'Ngày sinh không hợp lệ.'),
    gender: yup
      .string()
      .required('Giới tính là bắt buộc.')
      .max(1, 'Giới tính vượt quá độ dài cho phép.'),
    maritalStatus: yup
      .string()
      .required('Tình trạng hôn nhân là bắt buộc.')
      .max(1, 'Tình trạng hôn nhân vượt quá độ dài cho phép.'),
    location: yup.object().shape({
      city: yup
        .number()
        .required('Tỉnh/Thành phố là bắt buộc.')
        .typeError('Tỉnh/Thành phố là bắt buộc.'),
      district: yup
        .number()
        .required('Quận/Huyện là bắt buộc.')
        .typeError('Quận/Huyện là bắt buộc.'),
      address: yup
        .string()
        .required('Địa chỉ là bắt buộc.')
        .max(255, 'Địa chỉ vượt quá độ dài cho phép.'),
    }),
  });
  const [districtOptions, setDistrictOptions] = React.useState([]);

  const { control, setValue, reset, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const cityId = useWatch({
    control,
    name: 'location.city',
  });

  React.useEffect(() => {
    reset((formValues) => ({
      ...formValues,
      phone: editData?.phone || '',
      birthday: editData?.birthday,
      gender: editData?.gender || '',
      maritalStatus: editData?.maritalStatus || '',
      user: {
        fullName: editData.user?.fullName || '',
      },
      location: {
        city: editData.location?.city || '',
        district: editData.location?.district || '',
        address: editData.location?.address || '',
      },
    }));
  }, [editData, reset]);

  React.useEffect(() => {
    const loadDistricts = async (cityId) => {
      try {
        const resData = await commonService.getDistrictsByCityId(cityId);

        if (districtOptions.length > 0) setValue('location.district', '');
        setDistrictOptions(resData.data); 
      } catch (error) {
        errorHandling(error);
      } finally {
      }
    };

    if (cityId) {
      loadDistricts(cityId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityId, setValue]);

  return (
    <form id="modal-form" onSubmit={handleSubmit(handleUpdateProfile)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextFieldCustom
            name="user.fullName"
            title="Họ và tên"
            showRequired={true}
            placeholder="Nhập họ và tên"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldCustom
            name="phone"
            title="Số điện thoại"
            showRequired={true}
            placeholder="Nhập số điện thoại"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePickerCustom
            name="birthday"
            control={control}
            title="Ngày sinh"
            showRequired={true}
            maxDate={DATE_OPTIONS.yesterday}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="gender"
            control={control}
            options={allConfig?.genderOptions || []}
            title="Giới tính"
            showRequired={true}
            placeholder="Chọn giới tính"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="maritalStatus"
            control={control}
            options={allConfig?.maritalStatusOptions || []}
            title="Tình trạng hôn nhân"
            showRequired={true}
            placeholder="Chọn tình trạng hôn nhân"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="location.city"
            control={control}
            options={allConfig?.cityOptions || []}
            title="Tỉnh/Thành phố"
            showRequired={true}
            placeholder="Chọn tỉnh thành phố"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            options={districtOptions || []}
            name="location.district"
            control={control}
            title="Quận/Huyện"
            showRequired={true}
            placeholder="Chọn Quận/Huyện"
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="location.address"
            title="Địa chỉ"
            showRequired={true}
            placeholder="Nhập địa chỉ"
            control={control}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default PersonalProfileForm;
