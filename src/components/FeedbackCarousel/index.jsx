/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import 'swiper/css';
import 'swiper/css/pagination';

import React from 'react';
import { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box } from '@mui/material';

import FeedbackCard from '../FeedbackCard';
import myjobService from '../../services/myjobService';
import NoDataCard from '../NoDataCard';

const styles = {
  ".swiper-pagination": {
    bottom: "-5px !important", // Move down 10px,
  },
  ".swiper-wrapper": {
    paddingBottom: "30px", // Add padding to avoid being blocked
  },
  ".swiper-pagination-bullet": {
    width: 15,
    height: 15,
    opacity: 0.5,
    backgroundColor: "#8b6bd4",
  },
  ".swiper-pagination-bullet-active": {
    width: 15,
    height: 15,
    opacity: 1,
  },
};

const FeedbackCarousel = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [feedbacks, setFeedbacks] = React.useState([]);
  const [parentWidth, setParentWidth] = React.useState(0);
  const [col, setCol] = React.useState(5);

  React.useEffect(() => {
    const handleResize = () => {
      const newWidth =
        document.getElementById('feed-back-carousel').offsetWidth;
      setParentWidth(newWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    if (parentWidth < 600) {
      setCol(2);
    } else if (parentWidth < 900) {
      setCol(3);
    } else if (parentWidth < 1200) {
      setCol(4);
    } else {
      setCol(4);
    }
  }, [parentWidth]);

  React.useEffect(() => {
    const getFeedbacks = async () => {
      setIsLoading(true);
      const resData = await myjobService.getFeedbacks();

      setFeedbacks(resData.data);
      try {
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    getFeedbacks();
  }, []);

  return (
    <div id="feed-back-carousel">
      <Box sx={styles}>
        {isLoading ? (
          <Swiper
            slidesPerView={col}
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
            {Array.from(Array(5).keys()).map((item) => (
              <SwiperSlide key={item}>
                <FeedbackCard.Loading></FeedbackCard.Loading>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : feedbacks.length === 0 ? (
          <NoDataCard title="Chưa có người dùng nào đánh giá" />
        ) : (
          <Swiper
            slidesPerView={col}
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
            {feedbacks.map((value) => (
              <SwiperSlide key={value.id}>
                <FeedbackCard
                  avatarUrl={value?.userDict?.avatarUrl}
                  fullName={value?.userDict?.fullName}
                  content={value?.content}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Box>
    </div>
  );
};

export default FeedbackCarousel;
