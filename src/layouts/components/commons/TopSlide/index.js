import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import { Box } from '@mui/material';

import HomeSearch from '../../../../pages/components/defaults/HomeSearch';
import MuiImageCustom from '../../../../components/MuiImageCustom';

const TopSlide = () => {
  return (
    <Box
      className="justify-content-center"
      style={{ height: 320, position: 'relative' }}
    >
      <Box>
        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
          style={{ height: '100%' }}
        >
          {[
            'https://vieclam24h.vn/_next/image?url=%2Fimg%2Fads-banners%2Fnew-version%2FBanner-Web-JS-PC-2881x641.png&w=1920&q=75',
            'https://vieclam24h.vn/_next/image?url=%2Fimg%2Fads-banners%2Fnew-version%2FBanner-maketers-page-home-pc.png&w=1920&q=75',
            'https://vieclam24h.vn/_next/image?url=%2Fimg%2Fads-banners%2Fnew-version%2Fbanner-go-to-report-pc.jpg&w=1920&q=75',
          ].map((value) => (
            <Box key={value}>
              <SwiperSlide>
                <MuiImageCustom
                  width="100%"
                  height={320}
                  src={value}
                  sx={{
                    borderRadius: 1.5,
                  }}
                  fit="cover"
                />
              </SwiperSlide>
            </Box>
          ))}
        </Swiper>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: {
            xs: 0,
            sm: '20%',
            md: '20%',
            lg: '20%',
            xl: '20%',
          },
          paddingLeft: {
            xs: 0,
            sm: '5%',
            md: '5%',
            lg: '5%',
            xl: '5%',
          },
          paddingRight: {
            xs: 0,
            sm: '5%',
            md: '5%',
            lg: '5%',
            xl: '5%',
          },
          zIndex: 10,
        }}
      >
        <HomeSearch />
      </Box>
    </Box>
  );
};

export default TopSlide;
