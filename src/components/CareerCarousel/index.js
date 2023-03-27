import 'swiper/css';
import 'swiper/css/pagination';

import React from 'react';
import { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Avatar, Box, Card, Typography } from '@mui/material';

const CareerCarousel = () => {
  return (
    <Box>
      <Swiper
        slidesPerView={6}
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
          <SwiperSlide>
            <Card
              sx={{
                alignItems: 'center',
                p: 1,
                py: 1,
                mb: 0.5,
                boxShadow: 0,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light' ? '#F4F6FF' : '',
              }}
            >
              <Avatar
                variant="square"
                alt="Logo"
                src="https://cdn-icons-png.flaticon.com/128/1470/1470011.png"
                sx={{ width: 64, height: 64, margin: '0 auto', padding: 2  }}
              />
              <Typography
                variant="h6"
                component="h6"
                gutterBottom={true}
                sx={{ textAlign: 'center', fontWeight: 'bold' }}
              >
                Công nghệ thông tin
              </Typography>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                sx={{ textAlign: 'center',   color: '#9e9e9e' }}
              >
                1720 Việc Làm
              </Typography>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CareerCarousel;
