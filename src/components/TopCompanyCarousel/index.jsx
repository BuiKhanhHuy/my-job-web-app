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
import { useNavigate } from 'react-router-dom';
import { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Card, Skeleton, Stack, Typography } from '@mui/material';

import MuiImageCustom from '../MuiImageCustom';
import companyService from '../../services/companyService';
import { ROUTES } from '../../configs/constants';
import { formatRoute } from '../../utils/funcUtils';

const styles = {
  ".swiper-pagination": {
    bottom: "-5px !important",
  },
  ".swiper-wrapper": {
    paddingBottom: "30px",
    paddingTop: "4px",
  },
  ".swiper-pagination-bullet": {
    width: 12,
    height: 12,
    opacity: 0.5,
    backgroundColor: (theme) => theme.palette.primary.main,
    transition: "all 0.3s ease",
  },
  ".swiper-pagination-bullet-active": {
    width: 24,
    height: 12,
    opacity: 1,
    borderRadius: "6px",
  },
};

const Loading = () => {
  return (
    <>
      <div id="top-company-carousel-loading">
        <Card
          sx={{
            alignItems: 'center',
            boxShadow: 0,
            p: 2,
            mb: 0.5,
            minHeight: 165,
            borderRadius: 3,
            bgcolor: 'background.paper',
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
      </div>
    </>
  );
};

const TopCompanyCarousel = () => {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  const [companies, setCompanies] = React.useState([]);
  const [parentWidth, setParentWidth] = React.useState(0);
  const [col, setCol] = React.useState(5);

  React.useEffect(() => {
    const handleResize = () => {
      const newWidth = document.getElementById(
        'top-company-carousel'
      ).offsetWidth;
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
      setCol(5);
    }
  }, [parentWidth]);

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
    <div id="top-company-carousel">
      <Box sx={styles}>
        <Swiper
          slidesPerView={col}
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
                <SwiperSlide key={value}>
                  <Loading />
                </SwiperSlide>
              ))
            : companies.map((value) => (
                <SwiperSlide key={value.id}>
                  <Card
                    sx={{
                      boxShadow: 0,
                      alignItems: 'center',
                      p: 2,
                      mb: 0.5,
                      mt: 1,
                      cursor: 'pointer',
                      minHeight: 165,
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      border: '1px solid',
                      borderColor: 'grey.200',
                      bgcolor: 'background.paper',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: (theme) => theme.customShadows.medium,
                        borderColor: 'primary.main',
                        '& .company-name': {
                          color: 'primary.main',
                        }
                      },
                    }}
                    onClick={() => nav(`/${formatRoute(ROUTES.JOB_SEEKER.COMPANY_DETAIL, value.slug)}`)}
                  >
                    <Stack direction="row" justifyContent="center">
                      <MuiImageCustom
                        width={120}
                        height={120}
                        src={value?.companyImageUrl}
                        duration={1500}
                        sx={{ 
                          margin: '0 auto',
                          borderRadius: 2,
                          p: 1,
                          bgcolor: 'grey.50',
                          objectFit: 'contain',
                        }}
                      />
                    </Stack>
                    <Typography
                      variant="h6"
                      component="h6"
                      className="company-name"
                      sx={{
                        textAlign: 'center',
                        fontWeight: 600,
                        fontSize: 16,
                        mt: 2,
                        color: 'grey.800',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {value?.companyName}
                    </Typography>
                  </Card>
                </SwiperSlide>
              ))}
        </Swiper>
      </Box>
    </div>
  );
};

export default TopCompanyCarousel;
