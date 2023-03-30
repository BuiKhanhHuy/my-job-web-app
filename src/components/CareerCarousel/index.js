import 'swiper/css';
import 'swiper/css/pagination';

import React from 'react';
import { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Avatar, Box, Card, Skeleton, Stack, Typography } from '@mui/material';
import commonService from '../../services/commonService';
import MuiImageCustom from '../MuiImageCustom';

const Loading = (
  <>
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
      <Skeleton
        variant="rounded"
        width={64}
        height={64}
        style={{ margin: '0 auto', padding: 2 }}
      />
      <Typography
        variant="h6"
        component="h6"
        gutterBottom={true}
        sx={{ textAlign: 'center', fontWeight: 'bold' }}
      >
        <Skeleton />
      </Typography>
      <Typography
        variant="caption"
        display="block"
        gutterBottom
        sx={{ textAlign: 'center', color: '#9e9e9e' }}
      >
        <Skeleton />
      </Typography>
    </Card>
  </>
);

const CareerCarousel = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [topCareers, setTopCareers] = React.useState([]);

  React.useEffect(() => {
    const getTopCarreers = async () => {
      setIsLoading(true);

      try {
        const resData = await commonService.getTop10Careers();

        setTopCareers(resData.data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    getTopCarreers();
  }, []);

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
        {isLoading
          ? Array.from(Array(10).keys()).map((value) => (
              <SwiperSlide>{Loading}</SwiperSlide>
            ))
          : topCareers.map((value) => (
              <SwiperSlide key={value.id}>
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
                  <Stack direction="row" justifyContent="center" sx={{ p: 2 }}>
                    <MuiImageCustom
                      width={64}
                      height={64}
                      src={value.iconUrl}
                    />
                  </Stack>
                  <Typography
                    variant="h6"
                    component="h6"
                    gutterBottom={true}
                    sx={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: 17,
                    }}
                  >
                    {value?.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    sx={{ textAlign: 'center', color: '#9e9e9e' }}
                  >
                    {value.jobPostTotal} Việc Làm
                  </Typography>
                </Card>
              </SwiperSlide>
            ))}
      </Swiper>
    </Box>
  );
};

export default CareerCarousel;
