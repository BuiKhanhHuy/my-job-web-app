import React from 'react';
import { useSelector } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Alert, Grid } from '@mui/material';

import { DATE_OPTIONS, REGEX_VATIDATE } from '../../../../configs/constants';
import useDebounce from '../../../../hooks/useDebounce';
import errorHandling from '../../../../utils/errorHandling';
import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import SingleSelectCustom from '../../../../components/controls/SingleSelectCustom';
import DatePickerCustom from '../../../../components/controls/DatePickerCustom';
import CheckboxCustom from '../../../../components/controls/CheckboxCustom';
import commonService from '../../../../services/commonService';
import RichTextEditorCustom from '../../../../components/controls/RichTextEditorCustom';
import TextFieldAutoCompleteCustom from '../../../../components/controls/TextFieldAutoCompleteCustom';

import goongService from '../../../../services/goongService';

const JobPostForm = ({ handleAddOrUpdate, editData, serverErrors }) => {
  const { allConfig } = useSelector((state) => state.config);
  const [districtOptions, setDistrictOptions] = React.useState([]);
  const [locationOptions, setLocationOptions] = React.useState([]);

  const schema = yup.object().shape({
    jobName: yup
      .string()
      .required('Tên công việc là bắt buộc.')
      .max(200, 'Tên công việc vượt quá độ dài cho phép.'),
    career: yup
      .number()
      .required('Ngành/nghề là bắt buộc.')
      .typeError('Ngành/nghề là bắt buộc.'),
    position: yup
      .number()
      .required('Vị trí công việc là bắt buộc.')
      .typeError('Vị trí công việc là bắt buộc.'),
    experience: yup
      .number()
      .required('Kinh nghiệm làm việc là bắt buộc.')
      .typeError('Kinh nghiệm làm việc là bắt buộc.'),
    typeOfWorkplace: yup
      .number()
      .required('Nơi làm việc là bắt buộc.')
      .typeError('Nơi làm việc là bắt buộc.'),
    jobType: yup
      .number()
      .required('Hình thức làm việc là bắt buộc.')
      .typeError('Hình thức làm việc là bắt buộc.'),
    quantity: yup
      .number()
      .required('Số lượng tuyển là bắt buộc.')
      .typeError('Số lượng tuyển không hợp lệ.')
      .min(1, 'Số lượng tuyển ít nhất là một ứng viên.'),
    genderRequired: yup
      .string()
      .required('Yêu cầu giới tính là bắt buộc.')
      .typeError('Yêu cầu giới tính là bắt buộc.'),
    salaryMin: yup
      .number()
      .required('Lương tối thiểu là bắt buộc.')
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
      .required('Lương tối đa là bắt buộc.')
      .typeError('Lương tối đa không hợp lệ.')
      .min(0, 'Lương tối đa không hợp lệ.')
      .test(
        'maximum-wage-comparison',
        'Lương tối đa phải lớn hơn lương tối thiểu.',
        function (value) {
          return !(value <= this.parent.salaryMin);
        }
      ),
    academicLevel: yup
      .number()
      .required('Bằng cấp là bắt buộc.')
      .typeError('Bằng cấp là bắt buộc.'),
    deadline: yup
      .date()
      .required('Hạn nộp hồ sơ là bắt buộc.')
      .typeError('Hạn nộp hồ sơ không hợp lệ.')
      .min(new Date() + 1, 'Hạn nộp hồ sơ phải lớn hơn ngày hôm nay.'),
    jobDescription: yup
      .mixed()
      .test('editorContent', 'Mô tả công việc là bắt buộc.', (value) =>
        value.getCurrentContent().hasText()
      ),
    jobRequirement: yup
      .mixed()
      .test('editorContent', 'Yêu cầu công việc là bắt buộc.', (value) =>
        value.getCurrentContent().hasText()
      ),
    benefitsEnjoyed: yup
      .mixed()
      .test('editorContent', 'Quyền lợi là bắt buộc.', (value) =>
        value.getCurrentContent().hasText()
      ),
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
        .required('Vĩ độ trên bản đồ là bắt buộc.')
        .typeError('Vĩ độ trên bản đồ không hợp lệ.'),
      lng: yup
        .number()
        .required('Kinh độ trên bản đồ là bắt buộc.')
        .typeError('Kinh độ trên bản đồ không hợp lệ.'),
    }),
    contactPersonName: yup
      .string()
      .required('Tên người liên hệ là bắt buộc.')
      .max(100, 'Tên người liên hệ vượt quá độ dài cho phép.'),
    contactPersonPhone: yup
      .string()
      .required('Số điện thoại người liên hệ là bắt buộc.')
      .matches(REGEX_VATIDATE.phoneRegExp, 'Số điện thoại không hợp lệ.')
      .max(15, 'Số điện thoại người liên hệ vượt quá độ dài cho phép.'),
    contactPersonEmail: yup
      .string()
      .required('Email người liên hệ là bắt buộc.')
      .email('Email không hợp lệ.')
      .max(100, 'Email người liên hệ vượt quá độ dài cho phép.'),
    isUrgent: yup.boolean().default(false),
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
      } catch (error) {}
    };

    loadLocation(addressDebounce);
  }, [addressDebounce]);

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
    } catch (error) {}
  };

  return (
    <form id="modal-form" onSubmit={handleSubmit(handleAddOrUpdate)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Alert severity="warning">
            Khi bạn cập nhật bài đăng, nó sẽ ở trạng thái chờ kiểm duyệt!
          </Alert>
        </Grid>

        <Grid item xs={12}>
          <TextFieldCustom
            name="jobName"
            title="Tên công việc"
            showRequired={true}
            placeholder="Nhập tên công việc"
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <SingleSelectCustom
            name="career"
            control={control}
            options={allConfig?.careerOptions || []}
            title="Ngành nghề"
            showRequired={true}
            placeholder="Chọn ngành nghề cần tuyển"
          />
        </Grid>
        <Grid item xs={6}>
          <SingleSelectCustom
            name="position"
            control={control}
            options={allConfig?.positionOptions || []}
            title="Vị trí/chức vụ"
            showRequired={true}
            placeholder="Chọn vị trí/chức vụ"
          />
        </Grid>
        <Grid item xs={6}>
          <SingleSelectCustom
            name="experience"
            control={control}
            options={allConfig?.experienceOptions || []}
            title="Kinh nghiệm"
            showRequired={true}
            placeholder="Chọn kinh nghiệm yêu cầu"
          />
        </Grid>
        <Grid item xs={6}>
          <SingleSelectCustom
            name="typeOfWorkplace"
            control={control}
            options={allConfig?.typeOfWorkplaceOptions || []}
            title="Nơi làm việc"
            showRequired={true}
            placeholder="Chọn vị nơi làm việc"
          />
        </Grid>
        <Grid item xs={6}>
          <SingleSelectCustom
            name="jobType"
            control={control}
            options={allConfig?.jobTypeOptions || []}
            title="Hình thức làm việc"
            showRequired={true}
            placeholder="Chọn hình thức làm việc"
          />
        </Grid>
        <Grid item xs={6}>
          <TextFieldCustom
            name="quantity"
            title="Số lượng tuyển"
            showRequired={true}
            placeholder="Nhập số lượng nhân sự cần tuyển"
            control={control}
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <SingleSelectCustom
            name="genderRequired"
            control={control}
            options={allConfig?.genderOptions || []}
            title="Yêu cầu giới tính"
            showRequired={true}
            placeholder="Chọn giới tính yêu cầu"
          />
        </Grid>
        <Grid item xs={6}>
          <TextFieldCustom
            name="salaryMin"
            title="Mức lương tối thiểu"
            showRequired={true}
            placeholder="Nhập mức lương tối thiểu"
            control={control}
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <TextFieldCustom
            name="salaryMax"
            title="Mức lương tối đa"
            showRequired={true}
            placeholder="Nhập mức lương tối đa"
            control={control}
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <SingleSelectCustom
            name="academicLevel"
            control={control}
            options={allConfig?.academicLevelOptions || []}
            title="Bằng cấp"
            showRequired={true}
            placeholder="Chọn bằng cấp"
          />
        </Grid>
        <Grid item xs={6}>
          <DatePickerCustom
            name="deadline"
            control={control}
            showRequired={true}
            title="Hạn nộp hồ sơ"
            minDate={DATE_OPTIONS.tomorrow}
          />
        </Grid>
        <Grid item xs={12}>
          <RichTextEditorCustom
            name="jobDescription"
            control={control}
            title="Mô tả công việc"
            showRequired={true}
          />
        </Grid>
        <Grid item xs={12}>
          <RichTextEditorCustom
            name="jobRequirement"
            control={control}
            title="Yêu cầu công việc"
            showRequired={true}
          />
        </Grid>
        <Grid item xs={12}>
          <RichTextEditorCustom
            name="benefitsEnjoyed"
            control={control}
            title="Quyền lợi"
            showRequired={true}
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
            name="location.district"
            control={control}
            options={districtOptions}
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
            loading={true}
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
            type="number"
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
            type="number"
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="contactPersonName"
            title="Tên người liên hệ"
            showRequired={true}
            placeholder="Nhập tên người liên hệ"
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="contactPersonPhone"
            title="Số điện thoại người liên hệ"
            showRequired={true}
            placeholder="Nhập số điện thoại người liên hệ"
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="contactPersonEmail"
            title="Email người liên hệ"
            showRequired={true}
            placeholder="Nhập email người liên hệ"
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <CheckboxCustom name="isUrgent" control={control} title="Tuyển gấp" />
        </Grid>
      </Grid>
    </form>
  );
};

export default JobPostForm;
