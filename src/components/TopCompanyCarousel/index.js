import 'swiper/css';
import 'swiper/css/pagination';

import React from 'react';
import { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Box, Card, Stack, Typography } from '@mui/material';
import MuiImageCustom from '../MuiImageCustom';

const TopCompanyCarousel = () => {
  return (
    <Box>
      <Swiper
        slidesPerView={5}
        spaceBetween={15}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        modules={[Pagination, Autoplay]}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
          <SwiperSlide key={value}>
            <Card
              sx={{
                alignItems: 'center',
                p: 1,
                mb: 0.5,
              }}
              variant="outlined"
            >
              <Stack direction="row" justifyContent="center">
                <MuiImageCustom
                  width={100}
                  height={100}
                  src="https://vieclam24h.vn/_next/image?url=https%3A%2F%2Fcdn1.vieclam24h.vn%2Fupload%2Ffiles_cua_nguoi_dung%2Flogo%2F2019%2F02%2F12%2F1549951205_57a95198dda12_1470714264_300x300.w-150.h-150.png&w=96&q=75"
                  duration={1500}
                  sx={{ margin: '0 auto' }}
                />
              </Stack>
              <Typography
                variant="h6"
                component="h6"
                gutterBottom={true}
                sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}
              >
                Công ty TNHH MTV DV Viễn Thông Phương Nam
              </Typography>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default TopCompanyCarousel;
