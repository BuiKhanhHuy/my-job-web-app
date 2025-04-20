/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import "swiper/css";
import "swiper/css/pagination";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Card, Skeleton, Stack, Typography } from "@mui/material";
import commonService from "../../services/commonService";
import MuiImageCustom from "../MuiImageCustom";
import { searchJobPost } from "../../redux/filterSlice";
import { ROUTES } from "../../configs/constants";

// Cập nhật styles cho pagination
const styles = {
  ".swiper-pagination": {
    bottom: "-5px !important",
  },
  ".swiper-wrapper": {
    paddingBottom: "35px",
  },
  ".swiper-pagination-bullet": {
    width: 8,
    height: 8,
    opacity: 0.5,
    backgroundColor: (theme) => theme.palette.primary.main,
    transition: "all 0.3s ease",
  },
  ".swiper-pagination-bullet-active": {
    width: 24,
    height: 8,
    opacity: 1,
    borderRadius: "4px",
  },
};

// Cập nhật component Loading
const Loading = (
  <Card
    sx={{
      alignItems: "center",
      p: 2,
      mb: 0.5,
      boxShadow: 0,
      backgroundColor: (theme) => theme.palette.background.paper,
      transition: "transform 0.2s ease-in-out",
      borderRadius: "16px",
    }}
  >
    <Skeleton
      variant="rounded"
      width={72}
      height={72}
      style={{ margin: "0 auto", borderRadius: "12px" }}
    />
    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
      <Skeleton width="80%" style={{ margin: "0 auto" }} />
    </Typography>
    <Typography variant="caption">
      <Skeleton width="60%" style={{ margin: "0 auto" }} />
    </Typography>
  </Card>
);

const CareerCarousel = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { jobPostFilter } = useSelector((state) => state.filter);
  const [isLoading, setIsLoading] = React.useState(true);
  const [topCareers, setTopCareers] = React.useState([]);
  const [parentWidth, setParentWidth] = React.useState(0);
  const [col, setCol] = React.useState(5);

  React.useEffect(() => {
    const handleResize = () => {
      const newWidth = document.getElementById("career-carousel").offsetWidth;
      setParentWidth(newWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  const handleFilter = (id) => {
    dispatch(searchJobPost({ ...jobPostFilter, careerId: id }));
    nav(`/${ROUTES.JOB_SEEKER.JOBS}`);
  };

  return (
    <div id="career-carousel">
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
                <SwiperSlide key={value}>{Loading}</SwiperSlide>
              ))
            : topCareers.map((value) => (
                <SwiperSlide key={value.id}>
                  <Card
                    sx={{
                      alignItems: "center",
                      p: 2,
                      mb: 0.5,
                      cursor: "pointer",
                      boxShadow: 0,
                      backgroundColor: (theme) => theme.palette.background.paper,
                      borderRadius: "16px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: (theme) => theme.customShadows.medium,
                        "& .career-icon": {
                          transform: "scale(1.05)",
                        },
                        "& .career-name": {
                          color: (theme) => theme.palette.primary.main,
                        },
                      },
                    }}
                    onClick={() => handleFilter(value.id)}
                  >
                    <Stack
                      direction="row"
                      justifyContent="center"
                      sx={{
                        p: 2,
                        "& .career-icon": {
                          transition: "transform 0.3s ease",
                        },
                      }}
                    >
                      <MuiImageCustom
                        width={72}
                        height={72}
                        src={value?.iconUrl}
                        className="career-icon"
                        sx={{
                          borderRadius: "12px",
                          p: 1,
                          backgroundColor: (theme) => theme.palette.primary.background,
                        }}
                      />
                    </Stack>
                    <Typography
                      className="career-name"
                      variant="h6"
                      component="h6"
                      gutterBottom={true}
                      sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        transition: "color 0.3s ease",
                        px: 1,
                      }}
                    >
                      {value?.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      sx={{
                        textAlign: "center",
                        color: (theme) => theme.palette.text.secondary,
                        backgroundColor: (theme) => theme.palette.primary.background,
                        px: 2,
                        py: 0.5,
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                      }}
                    >
                      {value.jobPostTotal} Việc Làm
                    </Typography>
                  </Card>
                </SwiperSlide>
              ))}
        </Swiper>
      </Box>
    </div>
  );
};

export default CareerCarousel;
