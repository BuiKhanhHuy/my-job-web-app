import 'swiper/css';
import 'swiper/css/pagination';

import React from 'react';
import { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Avatar, Box, Card, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

const FeedbackCarousel = () => {
  return (
    <Box>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
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
                boxShadow: 3,
              }}
            >
              <Avatar
                src="https://jobsgo.vn/teks/img/avatar/6.jpg"
                sx={{ width: 110, height: 110, margin: '0 auto', my: 2 }}
              />
              <Typography
                variant="h6"
                component="h6"
                gutterBottom={true}
                sx={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                Như Quỳnh
              </Typography>
              <Typography textAlign="center">
                <FontAwesomeIcon
                  icon={faQuoteLeft}
                  fontSize={25}
                  color="#fca34d"
                />
              </Typography>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                sx={{ textAlign: 'center', color: '#757575' }}
              >
                MyJob giúp em tìm thấy công việc phù hợp với mình thông qua các
                đề xuất được cập nhật qua email mỗi ngày. Em đã tìm thấy nhiều
                cơ hội thực tập uy tín để xây dựng kinh nghiệm
              </Typography>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default FeedbackCarousel;
