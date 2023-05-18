import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import errorHandling from '../../utils/errorHandling';
import toastMessages from '../../utils/toastMessages';
import BackdropLoading from '../loading/BackdropLoading';
import RatingCustom from '../controls/RatingCustom';
import MultilineTextFieldCustom from '../controls/MultilineTextFieldCustom';
import myjobService from '../../services/myjobService';

const Feedback = () => {
  const [open, setOpen] = React.useState(false);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);

  const schema = yup.object().shape({
    rating: yup.number().required('Đánh giá là bắt buộc.'),
    content: yup
      .string()
      .required('Nội dung đánh giá là bắt buộc.')
      .max(500, 'Nội dung đánh giá vượt quá độ dài cho phép.'),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      rating: 5,
      content: '',
    },
    resolver: yupResolver(schema),
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendFeedback = (data) => {
    const sendFeedback = async (data) => {
      setIsFullScreenLoading(true);
      try {
        await myjobService.createFeedback(data);
        handleClose();
        toastMessages.success('Gửi phản hồi thành công.');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    sendFeedback(data);
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleOpen}
        sx={{
          position: 'fixed',
          bottom: 10,
          left: 10,
          borderBottomLeftRadius: 0,
          textTransform: 'inherit',
          color: 'white',
          zIndex: 1250,
        }}
        startIcon={<SentimentVerySatisfiedIcon />}
      >
        Phản hồi
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">Phản hồi</Typography>
            <IconButton color="error" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Grid spacing={1}>
            <Grid item xs={12}>
              <RatingCustom name="rating" control={control} />
            </Grid>
            <Grid item xs={12}>
              <MultilineTextFieldCustom
                name="content"
                placeholder="Nhập nội dung đánh giá tại đây"
                control={control}
                minRows={7}
                maxRows={30}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleSubmit(handleSendFeedback)}
            color="primary"
            sx={{ margin: '0 auto' }}
          >
            Gửi
          </Button>
        </DialogActions>
      </Dialog>
      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

export default Feedback;
