import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import { Box, Link } from '@mui/material';

import HomeSearch from '../../../../pages/components/defaults/HomeSearch';
import MuiImageCustom from '../../../../components/MuiImageCustom';
import myjobService from '../../../../services/myjobService';

const RenderItem = ({ item }) => {
  const [location, setLocation] = React.useState({
    position: 'absolute',
    left: 10,
    bottom: 20,
    right: null,
    top: null,
  });

  React.useMemo(() => {
    switch (item.descriptionLocation) {
      case 1:
        setLocation({
          position: 'absolute',
          left: 10,
          bottom: null,
          right: null,
          top: 20,
        });
        break;
      case 2:
        setLocation({
          position: 'absolute',
          left: null,
          bottom: null,
          right: 10,
          top: 20,
        });
        break;
      case 3:
        setLocation({
          position: 'absolute',
          left: 10,
          bottom: 20,
          right: null,
          top: null,
        });
        break;
      case 4:
        setLocation({
          position: 'absolute',
          left: null,
          bottom: 20,
          right: 10,
          top: null,
        });
        break;
      default:
        break;
    }
  }, [item]);

  return (
    <MuiImageCustom
      width="100%"
      height={320}
      src={item.imageUrl}
      sx={{
        borderRadius: 1.5,
      }}
      fit="cover"
    />
  );
};

const TopSlide = () => {
  const [banners, setBanners] = React.useState([]);

  React.useEffect(() => {
    const getBanners = async () => {
      try {
        const resData = await myjobService.getBanners();

        const data = resData?.data || [];

        setBanners(data);
      } catch (error) {
        console.log(error);
      }
    };

    getBanners();
  }, []);

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
          {banners.map((value) => (
            <Box key={value.id}>
              <SwiperSlide style={{ cursor: 'pointer' }}>
                <Link href={value?.buttonLink} target="_blank">
                  <RenderItem item={value} />{' '}
                </Link>
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
