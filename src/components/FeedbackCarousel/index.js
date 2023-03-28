import 'swiper/css';
import 'swiper/css/pagination';

import React from 'react';
import { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box } from '@mui/material';

import FeedbackCard from '../FeedbackCard';
import myjobService from '../../services/myjobService';
import NoDataCard from '../NoDataCard';

const FeedbackCarousel = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [feedbacks, setFeedbacks] = React.useState([]);

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
    <Box>
      {isLoading ? (
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
          {Array.from(Array(5).keys()).map((item) => (
            <SwiperSlide key={item}>
              <FeedbackCard.Loading></FeedbackCard.Loading>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : feedbacks.length === 0 ? (
        <NoDataCard title='Chưa có người dùng nào đánh giá'/>
      ) : (
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
  );
};

export default FeedbackCarousel;
