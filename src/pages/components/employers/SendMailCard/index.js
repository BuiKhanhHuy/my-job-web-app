import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import BackdropLoading from '../../../../components/loading/BackdropLoading';
import FormPopup from '../../../../components/controls/FormPopup';
import errorHandling from '../../../../utils/errorHandling';
import { convertEditorStateToHTMLString } from '../../../../utils/customData';
import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import RichTextEditorCustom from '../../../../components/controls/RichTextEditorCustom';
import CheckboxCustom from '../../../../components/controls/CheckboxCustom';
import toastMessages from '../../../../utils/toastMessages';
import emailService from '../../../../services/emailService';

const SendMailCard = ({ openPopup, setOpenPopup, sendMailData }) => {
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);

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
    isUrgent: yup.boolean().default(false),
  });

  const { control, reset, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

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

  const handleSendEmail = (data) => {
    const sendEmail = async (data) => {
      setIsFullScreenLoading(true);
      try {
        await emailService.sendEmailReplyToJobSeeker(data);

        setOpenPopup(false);
        reset();
        toastMessages.success('Gửi email thành công.');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    let newData = {
      ...data,
      content: convertEditorStateToHTMLString(data.content),
    };

    sendEmail(newData);
  };

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
      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

export default SendMailCard;
