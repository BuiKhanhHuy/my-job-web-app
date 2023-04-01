import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Card,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';

import { REGEX_VATIDATE } from '../../configs/constants';
import TextFieldCustom from '../controls/TextFieldCustom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFile, faFilePdf } from '@fortawesome/free-regular-svg-icons';

const ApplyForm = ({ handleApply }) => {
  const { currentUser } = useSelector((state) => state.user);

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Họ và tên là bắt buộc.')
      .max(100, 'Họ và tên vượt quá độ dài cho phép.'),
    email: yup
      .string()
      .required('Email là bắt buộc.')
      .email('Email không hợp lệ.')
      .max(100, 'Email vượt quá độ dài cho phép.'),
    phone: yup
      .string()
      .required('Số điện thoại là bắt buộc.')
      .matches(REGEX_VATIDATE.phoneRegExp, 'Số điện thoại không hợp lệ.')
      .max(15, 'Số điện thoại vượt quá độ dài cho phép.'),
  });

  const { control, setValue, handleSubmit } = useForm({
    defaultValues: {
      fullName: currentUser.fullName,
      email: currentUser.email,
      phone: '',
      resume: '',
    },
    resolver: yupResolver(schema),
  });

  return (
    <form id="modal-form" onSubmit={handleSubmit(handleApply)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <RadioGroup
            aria-labelledby="resume"
            name="resume"
            onChange={(event) => setValue('resume', event.target.value)}
          >
            <Stack spacing={1}>
              <Card sx={{ p: 1 }} variant="outlined">
                <Stack direction="row" sx={{ width: '100%' }}>
                  <Stack>
                    <Radio value={1} />
                  </Stack>
                  <Stack flex={1}>
                    <Typography variant="h6" sx={{ fontSize: 17 }}>
                      Thực tập sinh Backend
                    </Typography>
                    <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                      <FontAwesomeIcon
                        icon={faFile}
                        style={{ marginRight: 1 }}
                        color="#441da0"
                      />{' '}
                      Hồ sơ trực tuyến
                    </Typography>
                  </Stack>
                  <Stack justifyContent="center">
                    <Typography
                      sx={{ fontWeight: 'bold', cursor: 'pointer' }}
                      color="#441da0"
                    >
                      <FontAwesomeIcon icon={faEye} /> Xem hồ sơ
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
              <Card sx={{ p: 1 }} variant="outlined">
                <Stack direction="row" sx={{ width: '100%' }}>
                  <Stack>
                    <Radio value={2} />
                  </Stack>
                  <Stack flex={1}>
                    <Typography variant="h6" sx={{ fontSize: 17 }}>
                      Python Backend Developer
                    </Typography>
                    <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        style={{ marginRight: 1 }}
                        color="red"
                      />{' '}
                      Hồ sơ đính kèm
                    </Typography>
                  </Stack>
                  <Stack justifyContent="center">
                    <Typography
                      sx={{ fontWeight: 'bold', cursor: 'pointer' }}
                      color="#441da0"
                    >
                      <FontAwesomeIcon icon={faEye} /> Xem hồ sơ
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
            </Stack>
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="fullName"
            title="Họ và tên"
            showRequired={true}
            placeholder="Nhập họ và tên"
            control={control}
            disabled={true}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="email"
            title="Email"
            showRequired={true}
            placeholder="Nhập email"
            control={control}
            disabled={true}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="phone"
            title="Số điện thoại"
            showRequired={true}
            placeholder="Nhập số điện thoại"
            control={control}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default ApplyForm;
