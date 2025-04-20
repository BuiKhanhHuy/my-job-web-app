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
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid, Skeleton } from '@mui/material';

import errorHandling from '../../../../utils/errorHandling';
import { REGEX_VATIDATE } from '../../../../configs/constants';
import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import SingleSelectCustom from '../../../../components/controls/SingleSelectCustom';
import DatePickerCustom from '../../../../components/controls/DatePickerCustom';

import commonService from '../../../../services/commonService';
import useDebounce from '../../../../hooks/useDebounce';
import TextFieldAutoCompleteCustom from '../../../../components/controls/TextFieldAutoCompleteCustom';
import goongService from '../../../../services/goongService';
import RichTextEditorCustom from '../../../../components/controls/RichTextEditorCustom';

const CompanyForm = ({ handleUpdate, editData, serverErrors = null }) => {
  const { allConfig } = useSelector((state) => state.config);
  const [districtOptions, setDistrictOptions] = React.useState([]);
  const [locationOptions, setLocationOptions] = React.useState([]);

  const schema = yup.object().shape({
    companyName: yup
      .string()
      .required('Tên công ty là bắt buộc.')
      .max(255, 'Tên công ty vượt quá độ dài cho phép.'),
    taxCode: yup
      .string()
      .required('Mã số thuế là bắt buộc.')
      .max(30, 'Mã số thuế vượt quá độ dài cho phép.'),
    employeeSize: yup
      .number()
      .required('Quy mô nhân sự là bắt buộc.')
      .typeError('Quy mô nhân sự là bắt buộc.'),
    fieldOperation: yup
      .string()
      .required('Lĩnh vực hoạt động là bắt buộc.')
      .max(255, 'Tên công ty vượt quá độ dài cho phép.'),
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
      lat: yup
        .number()
        .required('Vĩ độ trên bản đồ của công ty là bắt buộc.')
        .typeError('Vĩ độ trên bản đồ của công ty không hợp lệ.'),
      lng: yup
        .number()
        .required('Kinh độ trên bản đồ của công ty là bắt buộc.')
        .typeError('Kinh độ trên bản đồ của công ty không hợp lệ.'),
    }),
    since: yup.date().nullable(),
    companyEmail: yup
      .string()
      .required('Email công ty là bắt buộc.')
      .email('Email không hợp lệ.')
      .max(100, 'Email công ty vượt quá độ dài cho phép.'),
    companyPhone: yup
      .string()
      .required('Số điện thoại công ty là bắt buộc.')
      .matches(REGEX_VATIDATE.phoneRegExp, 'Số điện thoại không hợp lệ.')
      .max(15, 'Số điện thoại công ty vượt quá độ dài cho phép.'),
  });

  const { control, reset, setValue, setError, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const cityId = useWatch({
    control,
    name: 'location.city',
  });

  const address = useWatch({
    control,
    name: 'location.address',
  });

  const addressDebounce = useDebounce(address, 500);

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

  React.useEffect(() => {
    const loadLocation = async (input) => {
      try {
        const resData = await goongService.getPlaces(input);

        if (resData.predictions) setLocationOptions(resData.predictions);
      } catch (error) {
        errorHandling(error);
      }
    };

    loadLocation(addressDebounce);
  }, [addressDebounce]);

  React.useEffect(() => {
    if (editData !== null)
      reset((formValues) => ({
        ...formValues,
        ...editData,
      }));
    else reset();
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

  const handleSelectLocation = async (e, value) => {
    try {
      const resData = await goongService.getPlaceDetailByPlaceId(
        value.place_id
      );
      setValue('location.lat', resData?.result?.geometry.location.lat || '');
      setValue('location.lng', resData?.result?.geometry.location.lng || '');
    } catch (error) {
      errorHandling(error);
    }
  };

  return (
    <form id="company-form" onSubmit={handleSubmit(handleUpdate)}>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextFieldCustom
                name="companyName"
                title="Tên công ty"
                showRequired={true}
                placeholder="Nhập tên công ty"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="taxCode"
                title="Mã số thuế"
                showRequired={true}
                placeholder="Nhập mã số thuế công ty"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <SingleSelectCustom
                name="employeeSize"
                control={control}
                options={allConfig?.employeeSizeOptions || []}
                title="Quy mô công ty"
                showRequired={true}
                placeholder="Chọn quy mô công ty"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="fieldOperation"
                title="Lĩnh vực hoạt động"
                showRequired={true}
                placeholder="Nhập lĩnh vực hoạt động của công ty"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <DatePickerCustom
                name="since"
                control={control}
                title="Ngày thành lập công ty"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="websiteUrl"
                title="Đường dẫn website"
                placeholder="Nhập URL website của công ty"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="facebookUrl"
                title="Đường dẫn Facebook"
                placeholder="Nhập URL Facebook"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="youtubeUrl"
                title="Đường dẫn Youtube"
                placeholder="Nhập URL Youtube"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="linkedinUrl"
                title="Đường dẫn Linkedin"
                placeholder="Nhập URL Linkedin"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="companyEmail"
                title="Email công ty"
                showRequired={true}
                placeholder="Nhập email của công ty"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="companyPhone"
                title="Số điện thoại"
                showRequired={true}
                placeholder="Nhập số điện thoại của công ty"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <SingleSelectCustom
                name="location.city"
                control={control}
                options={allConfig?.cityOptions || []}
                title="Tỉnh/Thành phố"
                showRequired={true}
                placeholder="Chọn tỉnh thành phố"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <SingleSelectCustom
                options={districtOptions}
                name="location.district"
                control={control}
                title="Quận/Huyện"
                showRequired={true}
                placeholder="Chọn Quận/Huyện"
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldAutoCompleteCustom
                name="location.address"
                title="Địa chỉ"
                showRequired={true}
                placeholder="Nhập địa chỉ"
                control={control}
                options={locationOptions}
                handleSelect={handleSelectLocation}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="location.lat"
                title="Vĩ độ"
                showRequired={true}
                placeholder="Nhập vĩ độ tọa độ trên bản đồ của công ty."
                helperText="Tự động điền nếu bạn chọn địa chỉ được gợi ý."
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="location.lng"
                title="Kinh độ"
                showRequired={true}
                placeholder="Nhập kinh độ tọa độ trên bản đồ của công ty."
                helperText="Tự động điền nếu bạn chọn địa chỉ được gợi ý."
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <RichTextEditorCustom
                name="description"
                control={control}
                title="Mô tả thêm"
              />
              {/* <MultilineTextFieldCustom
                name="description"
                title="Mô tả thêm (thêm <br/> để xuống dòng)"
                placeholder="Nhập nội dung mô tả tại đây"
                control={control}
              /> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

const Loading = () => {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Skeleton height={50} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Skeleton height={50} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Skeleton height={50} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Skeleton height={50} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Skeleton height={50} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Skeleton height={50} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Skeleton height={50} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Skeleton height={50} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Skeleton height={50} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Skeleton height={50} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Skeleton height={50} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Skeleton height={50} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton height={50} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton height={50} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

CompanyForm.Loading = Loading;

export default CompanyForm;
