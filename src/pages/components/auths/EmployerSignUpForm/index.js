import React from 'react';
import { useSelector } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  Grid,
  Stack,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';

import { REGEX_VATIDATE } from '../../../../configs/constants';

import errorHandling from '../../../../utils/errorHandling';

import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import PasswordTextFieldCustom from '../../../../components/controls/PasswordTextFieldCustom';
import SingleSelectCustom from '../../../../components/controls/SingleSelectCustom';
import DatePickerCustom from '../../../../components/controls/DatePickerCustom';
import commonService from '../../../../services/commonService';

const steps = ['Thông tin đăng nhập', 'Thông tin công ty'];

const EmployerSignUpForm = ({ onSignUp, serverErrors = {}, checkCreds }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const { allConfig } = useSelector((state) => state.config);
  const [districtOptions, setDistrictOptions] = React.useState([]);

  // schema
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Họ và tên là bắt buộc!')
      .max(100, 'Họ và tên vượt quá độ dài cho phép.'),
    email: yup
      .string()
      .required('Email là bắt buộc!')
      .email('Email không đúng định dạng')
      .max(100, 'Email vượt quá độ dài cho phép.'),
    password: yup
      .string()
      .required('Mật khẩu là bắt buộc!')
      .max(128, 'Mật khẩu vượt quá độ dài cho phép.'),
    confirmPassword: yup
      .string()
      .required('Mật khẩu xác nhận là bắt buộc.')
      .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không chính xác.'),
    company: yup.object().shape({
      companyName: yup
        .string()
        .required('Tên công ty là bắt buộc!')
        .max(255, 'Tên công ty vượt quá độ dài cho phép.'),
      companyEmail: yup
        .string()
        .required('Email công ty là bắt buộc')
        .email('Email công ty không đúng định dạng')
        .max(100, 'Email công ty vượt quá độ dài cho phép.'),
      companyPhone: yup
        .string()
        .required('Số điện thoại công ty là bắt buộc')
        .matches(REGEX_VATIDATE.phoneRegExp, 'Số điện thoại không hợp lệ.')
        .max(15, 'Số điện thoại công ty vượt quá độ dài cho phép.'),
      taxCode: yup
        .string()
        .required('Mã số thuế công ty là bắt buộc')
        .max(30, 'Mã số thuế công ty vượt quá độ dài cho phép.'),
      since: yup.date().nullable().typeError(),
      fieldOperation: yup
        .string()
        .max(255, 'Lĩnh vực hoạt động công ty vượt quá độ dài cho phép.'),
      employeeSize: yup
        .number()
        .required('Số lượng nhân viên là bắt buộc.')
        .typeError('Số lượng nhân viên là bắt buộc.'),
      websiteUrl: yup
        .string()
        .max(300, 'Đường dẫn website công ty vượt quá độ dài cho phép.'),
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
          .required('Địa chỉ công ty là bắt buộc!')
          .max(255, 'Địa chỉ công ty vượt quá độ dài cho phép.'),
      }),
    }),
  });

  // use form
  const { control, setError, setValue, getValues, handleSubmit } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      company: {
        companyName: '',
        companyEmail: '',
        companyPhone: '',
        taxCode: '',
        fieldOperation: '',
        employeeSize: '',
        websiteUrl: '',
        location: {
          city: '',
          district: '',
          address: '',
        },
      },
    },
    resolver: yupResolver(schema),
  });

  const cityId = useWatch({
    control,
    name: 'company.location.city',
  });

  // show server errors
  React.useEffect(() => {
    for (let err in serverErrors) {
      if (err === 'company') {
        for (let companyErr in serverErrors['company']) {
          if (companyErr === 'location') {
            for (let locationErr in serverErrors[err]['location']) {
              setError(`${err}.${'location'}.${locationErr}`, {
                type: 400,
                message: serverErrors[err]['location'][locationErr]?.join(' '),
              });
            }
          } else {
            setError(`${err}.${companyErr}`, {
              type: 400,
              message: serverErrors[err][companyErr]?.join(' '),
            });
          }
        }
      } else {
        setError(err, {
          type: 400,
          message: serverErrors[err]?.join(' '),
        });
      }
    }
  }, [serverErrors, setError]);

  // fetch districts by city
  React.useEffect(() => {
    const loadDistricts = async (cityId) => {
      try {
        const resData = await commonService.getDistrictsByCityId(cityId);

        if (districtOptions.length > 0)
          setValue('company.location.district', '');
        setDistrictOptions(resData.data);
      } catch (error) {
        errorHandling(error);
      } finally {
      }
    };

    if (cityId) {
      loadDistricts(cityId);
    }
  }, [cityId, setValue]);

  const handleSubmtNextSuccess = (data) => {
    handleNext(data.email);
  };

  const handleSubmitNextError = async (errors, e) => {
    if (
      !('fullName' in errors) &&
      !('email' in errors) &&
      !('password' in errors) &&
      !('confirmPassword' in errors)
    ) {
      const email = getValues('email');
      handleNext(email);
    }
  };

  const handleNext = async (email) => {
    const checkCredsResult = await checkCreds(email, null);
    if (checkCredsResult === true) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const formContent = (actStep) => (
    <>
      <Stack
        spacing={1.5}
        sx={{ mb: 2, display: actStep === 0 ? 'block' : 'none' }}
      >
        <TextFieldCustom
          name="fullName"
          control={control}
          title="Họ và tên"
          placeholder="Nhập họ và tên"
        />
        <TextFieldCustom
          name="email"
          control={control}
          title="Email"
          placeholder="Nhập email"
        />
        <PasswordTextFieldCustom
          name="password"
          control={control}
          title="Mật khẩu"
          placeholder="Nhập mật khẩu"
        />
        <PasswordTextFieldCustom
          name="confirmPassword"
          control={control}
          title="Mật khẩu xác nhận"
          placeholder="Nhập mật khẩu xác nhận"
        />
      </Stack>

      <Box sx={{ mb: 2, display: actStep !== 0 ? 'block' : 'none' }}>
        <Grid container spacing={1.5}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextFieldCustom
              name="company.companyName"
              control={control}
              title="Tên công ty"
              placeholder="Nhập tên công ty"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextFieldCustom
              name="company.companyEmail"
              control={control}
              title="Email công ty"
              placeholder="Nhập email công ty"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextFieldCustom
              name="company.companyPhone"
              control={control}
              title="Số điện thoại"
              placeholder="Nhập số điện thoại công ty"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextFieldCustom
              name="company.taxCode"
              control={control}
              title="Mã số thuế"
              placeholder="Nhập mã số thuế công ty"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <DatePickerCustom
              name="company.since"
              control={control}
              title="Ngày thành lập"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <TextFieldCustom
              name="company.fieldOperation"
              control={control}
              title="Lĩnh vực hoạt động"
              placeholder="Nhập lĩnh vực hoạt động của công ty"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <SingleSelectCustom
              options={allConfig?.employeeSizeOptions || []}
              name="company.employeeSize"
              control={control}
              title="Quy mô công ty"
              placeholder="Nhập quy mô công ty"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <TextFieldCustom
              name="company.websiteUrl"
              control={control}
              title="Website"
              placeholder="Nhập địa chỉ website công ty"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <SingleSelectCustom
              options={allConfig?.cityOptions || []}
              name="company.location.city"
              control={control}
              title="Tỉnh/Thành phố"
              placeholder="Chọn tỉnh thành phố"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <SingleSelectCustom
              options={districtOptions}
              name="company.location.district"
              control={control}
              title="Quận/Huyện"
              placeholder="Chọn Quận/Huyện"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextFieldCustom
              name="company.location.address"
              control={control}
              title="Địa chỉ"
              placeholder="Nhập địa chỉ chi tiết của công ty"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );

  return (
    <Box>
      <Stepper activeStep={activeStep} sx={{ pb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <>
        {formContent(activeStep)}
        <Stack
          sx={{ mt: 3, mb: 2 }}
          spacing={1.5}
          direction="row"
          justifyContent="flex-end"
        >
          {activeStep !== 0 && (
            <Button variant="outlined" onClick={handleBack}>
              Quay lại
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            <Button variant="contained" onClick={handleSubmit(onSignUp)}>
              Đăng ký
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmit(
                handleSubmtNextSuccess,
                handleSubmitNextError
              )}
            >
              Tiếp tục
            </Button>
          )}
        </Stack>
      </>
    </Box>
  );
};

export default EmployerSignUpForm;
