/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardMedia,
  InputBase,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { IMAGES, LINKS } from '../../configs/constants';
import toastMessages from '../../utils/toastMessages';
import myjobService from '../../services/myjobService';
import BackdropLoading from '../loading/BackdropLoading';

const AppIntroductionCard = () => {
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [value, setValue] = React.useState('');

  const handleSendSMS = (event) => {
    event.preventDefault();
    
    const sendSMS = async (data) => {
      setIsFullScreenLoading(true);

      try {
        await myjobService.sendSMSDownloadApp(data);

        toastMessages.success('Gửi thành công. Vui lòng kiểm tra tin nhắn');
        setValue('');
      } catch (error) {
        console.log(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    if (value !== '')
      if (
        /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(
          value
        )
      ) {
        sendSMS({ phone: value });
      } else {
        toastMessages.error('Số điện thoại không hợp lệ!');
      }
  };

  return (
    <>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3} alignItems="center">
          <Box>
            <Typography variant="h5">Tải ứng dụng miễn phí</Typography>
          </Box>
          <Box>
            <Typography>
              Tìm việc hiệu quả bằng cách tải MyJob về di động của bạn và sẵn
              sàng nhận việc làm ngay hôm nay!
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSendSMS}>
            <Paper
              sx={{
                boxShadow: 0,
                p: '3.5px 4px',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                border: 1,
                borderColor: 'GrayText',
                borderRadius: 10,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                inputProps={{ 'aria-label': 'search' }}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Nhập số điện thoại"
              />
              <Button
                variant="contained"
                color="warning"
                style={{ borderRadius: 20, color: 'white' }}
                type="submit"
              >
                gửi đi
              </Button>
            </Paper>
          </Box>
          <Box>
            <Stack direction="row" spacing={2}>
              <Link href={LINKS.CHPLAY_LINK} target="_blank">
                <CardMedia
                  height="50"
                  width="150"
                  component="img"
                  image={IMAGES.chPlayDownload}
                  alt="Paella dish"
                />
              </Link>
              <Link href={LINKS.APPSTORE_LINK} target="_blank">
                <CardMedia
                  height="50"
                  width="150"
                  component="img"
                  image={IMAGES.appStoreDownload}
                  alt="Paella dish"
                />
              </Link>
            </Stack>
          </Box>
        </Stack>
      </Card>
      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

export default AppIntroductionCard;
