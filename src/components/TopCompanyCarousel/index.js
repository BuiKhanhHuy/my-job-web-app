import 'swiper/css';
import 'swiper/css/pagination';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Card, Skeleton, Stack, Typography } from '@mui/material';

import MuiImageCustom from '../MuiImageCustom';
import companyService from '../../services/companyService';

const Loading = (
  <>
    <Card
      sx={{
        alignItems: 'center',
        boxShadow: 0,
        p: 1,
        mb: 0.5,
        minHeight: 165,
      }}
    >
      <Stack direction="row" justifyContent="center">
        <Skeleton
          variant="rounded"
          width={100}
          height={100}
          style={{ margin: '0 auto' }}
        />
      </Stack>
      <Typography
        variant="h6"
        component="h6"
        gutterBottom={true}
        sx={{
          textAlign: 'center',

          mt: 1,
        }}
      >
        <Skeleton />
      </Typography>
    </Card>
  </>
);

const TopCompanyCarousel = () => {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  const [companies, setCompanies] = React.useState([]);

  React.useEffect(() => {
    const getTopCompanies = async () => {
      setIsLoading(true);
      try {
        const resData = await companyService.getTopCompanies();

        setCompanies(resData?.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getTopCompanies();
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
              <SwiperSlide key={value}>{Loading}</SwiperSlide>
            ))
          : companies.map((value) => (
              <SwiperSlide key={value.id}>
                <Card
                  sx={{
                    alignItems: 'center',
                    p: 1,
                    mb: 0.5,
                    cursor: 'pointer',
                    '&:hover': {
                      color: '#fca34d',
                      boxShadow: 9
                    },
                    minHeight: 165,
                  }}
                  variant="outlined"
                  onClick={() => nav(`/cong-ty/${value.slug}`)}
                >
                  <Stack direction="row" justifyContent="center">
                    <MuiImageCustom
                      width={100}
                      height={100}
                      src={value?.companyImageUrl}
                      duration={1500}
                      sx={{ margin: '0 auto' }}
                    />
                  </Stack>
                  <Typography
                    variant="h6"
                    component="h6"
                    gutterBottom={true}
                    sx={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: 16,
                      mt: 1,
                    }}
                  >
                    {value?.companyName}
                  </Typography>
                </Card>
              </SwiperSlide>
            ))}
      </Swiper>
    </Box>
  );
};

export default TopCompanyCarousel;
