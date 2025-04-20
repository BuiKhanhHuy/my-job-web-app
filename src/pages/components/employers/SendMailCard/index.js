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
import SendIcon from '@mui/icons-material/Send';

import FormPopup from '../../../../components/controls/FormPopup';
import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import RichTextEditorCustom from '../../../../components/controls/RichTextEditorCustom';
import CheckboxCustom from '../../../../components/controls/CheckboxCustom';

const SendMailCard = ({
  openPopup,
  setOpenPopup,
  sendMailData,
  handleSendEmail,
}) => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email người nhận là bắt buộc.')
      .email('Email người nhận không hợp lệ.')
      .max(100, 'Email người nhận vượt quá độ dài cho phép.'),
    fullName: yup
      .string()
      .required('Tên người nhận.')
      .max(100, 'Tên người nhận vượt quá độ dài cho phép.'),
    title: yup
      .string()
      .required('Tiêu đề email là bắt buộc.')
      .max(200, 'Tiêu đề email vượt quá độ dài cho phép.'),
    content: yup
      .mixed()
      .test('content', 'Nội dung email là bắt buộc.', (value) =>
        value.getCurrentContent().hasText()
      ),
    isSendMe: yup.boolean().default(false),
  });

  const { control, reset, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    if (openPopup) {
      reset();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openPopup]);

  React.useEffect(() => {
    if (sendMailData) {
      reset((formValues) => ({
        ...formValues,
        ...sendMailData,
      }));
    } else {
      reset();
    }
  }, [sendMailData, reset]);

  return (
    <>
      <FormPopup
        title="Gửi mail"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        buttonText="Gửi"
        buttonIcon={<SendIcon />}
      >
        <form id="modal-form" onSubmit={handleSubmit(handleSendEmail)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextFieldCustom
                name="fullName"
                title="Tên người nhận"
                showRequired={true}
                placeholder="Nhập tên người nhận"
                control={control}
                disabled={true}
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldCustom
                name="email"
                title="Email người nhận"
                showRequired={true}
                placeholder="Nhập email người nhận"
                control={control}
                disabled={true}
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldCustom
                name="title"
                title="Tiêu đề"
                showRequired={true}
                placeholder="Nhập tiêu đề email"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <RichTextEditorCustom
                name="content"
                control={control}
                title="Nội dung email"
                showRequired={true}
              />
            </Grid>
            <Grid item xs={12}>
              <CheckboxCustom
                name="isSendMe"
                control={control}
                title="Gửi một bản sao đến địa chỉ email nhà tuyển dụng của tôi."
              />
            </Grid>
          </Grid>
        </form>
      </FormPopup>
    </>
  );
};

export default SendMailCard;
