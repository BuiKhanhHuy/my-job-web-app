/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from "react";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import { TabTitle } from "../../../utils/generalFunction";
import AppIntroductionCard from "../../../components/AppIntroductionCard";
import MuiImageCustom from "../../../components/MuiImageCustom";
import { ABOUT_IMAGES, APP_NAME } from "../../../configs/constants";

const AboutUsPage = () => {
  TabTitle(`Về chúng tôi - Hệ thống giới thiệu việc làm ${APP_NAME}`);

  const features = [
    {
      title: "Chọn đúng việc - Đi đúng hướng",
      icon: WorkOutlineIcon,
      description: "Khám phá công việc phù hợp với định hướng nghề nghiệp. Thông tin chi tiết về yêu cầu công việc, môi trường và cơ hội phát triển tại mỗi công ty.",
      color: "primary.main"
    },
    {
      title: "Tạo CV & Profile",
      icon: PersonOutlineIcon,
      description: "Xây dựng hồ sơ ứng tuyển chuyên nghiệp với công cụ tạo CV thông minh. Tối ưu profile với các mẫu CV đẹp mắt theo từng ngành nghề.",
      color: "primary.main"
    },
    {
      title: "Việc làm xung quanh bạn",
      icon: LocationOnOutlinedIcon,
      description: "Tìm kiếm cơ hội việc làm lý tưởng trong khu vực. Với tính năng định vị thông minh, gợi ý công việc phù hợp gần nơi bạn sinh sống.",
      color: "primary.main"
    },
    {
      title: "Thông báo việc làm mọi lúc",
      icon: NotificationsNoneIcon,
      description: "Không bỏ lỡ cơ hội với hệ thống thông báo thông minh. Nhận thông tin tức thì về các vị trí việc làm mới phù hợp với kỹ năng.",
      color: "primary.main"
    },
  ];

  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto", py: 5, px: 3 }}>
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{
            mb: 2,
            background: (theme) => theme.palette.primary.gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 700,
          }}
        >
          Về chúng tôi
        </Typography>
        <Typography
          sx={{
            maxWidth: "800px",
            margin: "0 auto",
            color: "text.secondary",
            lineHeight: 1.8,
          }}
        >
          {APP_NAME} - Kênh thông tin tuyển dụng và việc làm dành cho mọi Doanh
          nghiệp và Ứng viên. Chúng tôi tin tưởng sẽ đem lại "HY VỌNG" cho Doanh
          nghiệp tìm kiếm nhân tài và cho Ứng viên tìm kiếm cơ hội nghề
          nghiệp.Với 2 hệ thống: Website dành cho Nhà Tuyển Dụng và Ứng dụng
          (Application) dành cho Người Tìm Việc, {APP_NAME} sẽ mang lại những trải
          nghiệm mới mẻ, thú vị; kết nối ước mơ chinh phục công việc của mọi
          nhân tài và giúp doanh nghiệp xây dựng đội ngũ nhân sự vững mạnh.
        </Typography>
      </Box>

      <Box sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: "100%",
                  p: 3,
                  position: 'relative',
                  overflow: 'visible',
                  transition: "all 0.3s ease-in-out",
                  backgroundColor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'grey.100',
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: (theme) => theme.customShadows.card,
                    borderColor: 'primary.light',
                    backgroundColor: (theme) => `${theme.palette.primary.background}`,
                    "& .feature-icon": {
                      color: 'primary.light',
                      transform: "scale(1.1)",
                    }
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    left: 20,
                    backgroundColor: 'background.paper',
                    borderRadius: '12px',
                    p: 1.5,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  }}
                >
                  <feature.icon 
                    className="feature-icon"
                    sx={{
                      fontSize: 32,
                      transition: "all 0.3s ease-in-out",
                      color: 'grey.500'
                    }}
                  />
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      color: 'grey.700',
                      fontWeight: 600,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    sx={{ 
                      lineHeight: 1.7,
                      fontSize: '0.95rem',
                      color: 'grey.600',
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Typography
        variant="h4"
        sx={{
          mb: 4,
          textAlign: "center",
          background: (theme) => theme.palette.primary.gradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: 700,
        }}
      >
        Mobile App {APP_NAME}
      </Typography>

      <Box sx={{ mt: 5 }}>
        <Card sx={{ p: 5 }}>
          <Stack
            direction={{
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
              xl: "row",
            }}
            spacing={2}
          >
            <Box width="100%">
              <Box sx={{ height: 600 }}>
                <MuiImageCustom src={ABOUT_IMAGES.JOB_POST} />
              </Box>
            </Box>
            <Box>
              <Stack spacing={2}>
                <Typography
                  variant="h4"
                  style={{ color: "warning.main", fontSize: 30 }}
                >
                  Chọn đúng việc - Đi đúng hướng
                </Typography>
                <Typography textAlign="justify" color="text.secondary">
                  Khám phá công việc phù hợp với định hướng nghề nghiệp của bạn.
                </Typography>
                <Typography textAlign="justify" color="text.secondary">
                  Chúng tôi cung cấp thông tin chi tiết về yêu cầu công việc,
                  môi trường làm việc và cơ hội phát triển tại mỗi công ty.
                </Typography>
                <Typography textAlign="justify" color="text.secondary">
                  Đánh giá chân thực từ nhân viên sẽ giúp bạn có cái nhìn thực
                  tế nhất trước khi đưa ra quyết định quan trọng cho sự nghiệp.
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Card>
      </Box>

      <Box sx={{ mt: 5 }}>
        <Card sx={{ p: 5 }}>
          <Stack
            direction={{
              xs: "column-reverse",
              sm: "column-reverse",
              md: "row",
              lg: "row",
              xl: "row",
            }}
            spacing={2}
          >
            <Box>
              <Stack spacing={2}>
                <Typography
                  variant="h4"
                  style={{ color: "warning.main", fontSize: 30 }}
                >
                  Tạo CV & Profile
                </Typography>
                <Typography textAlign="justify" color="text.secondary">
                  Xây dựng hồ sơ ứng tuyển chuyên nghiệp với công cụ tạo CV
                  thông minh.
                </Typography>
                <Typography textAlign="justify" color="text.secondary">
                  Tối ưu hóa profile của bạn với các mẫu CV đẹp mắt, phù hợp với
                  từng ngành nghề.
                </Typography>
                <Typography textAlign="justify" color="text.secondary">
                  Dễ dàng cập nhật và điều chỉnh CV theo yêu cầu của nhà tuyển
                  dụng, tăng cơ hội được chú ý và lựa chọn cho vị trí mong muốn.
                </Typography>
              </Stack>
            </Box>
            <Box width="100%">
              <Box sx={{ height: 600 }}>
                <MuiImageCustom src={ABOUT_IMAGES.PROFILE} />
              </Box>
            </Box>
          </Stack>
        </Card>
      </Box>

      <Box sx={{ mt: 5 }}>
        <Card sx={{ p: 5 }}>
          <Stack
            direction={{
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
              xl: "row",
            }}
            spacing={2}
          >
            <Box width="100%">
              <Box sx={{ height: 600 }}>
                <MuiImageCustom src={ABOUT_IMAGES.AROUND_JOB_POST} />
              </Box>
            </Box>
            <Box>
              <Stack spacing={2}>
                <Typography
                  variant="h4"
                  style={{ color: "warning.main", fontSize: 30 }}
                >
                  Việc làm xung quanh bạn
                </Typography>
                <Typography textAlign="justify" color="text.secondary">
                  Tìm kiếm cơ hội việc làm lý tưởng trong khu vực của bạn
                </Typography>
                <Typography textAlign="justify" color="text.secondary">
                  Tìm kiếm cơ hội việc làm lý tưởng trong khu vực của bạn.
                </Typography>
                <Typography textAlign="justify" color="text.secondary">
                  Với tính năng định vị thông minh, chúng tôi gợi ý những công
                  việc phù hợp gần nơi bạn sinh sống.
                </Typography>
                <Typography textAlign="justify" color="text.secondary">
                  Tiết kiệm thời gian di chuyển và tận hưởng sự cân bằng giữa
                  công việc và cuộc sống với các cơ hội việc làm trong bán kính
                  mong muốn.
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Card>
      </Box>

      <Box sx={{ mt: 5 }}>
        <Card sx={{ p: 5 }}>
          <Stack
            direction={{
              xs: "column-reverse",
              sm: "column-reverse",
              md: "row",
              lg: "row",
              xl: "row",
            }}
            spacing={2}
          >
            <Box>
              <Stack spacing={2}>
                <Typography
                  variant="h4"
                  style={{ color: "warning.main", fontSize: 30 }}
                >
                  Thông báo việc làm mọi lúc
                </Typography>
                <Typography textAlign="justify" color="text.secondary">
                  Không bỏ lỡ bất kỳ cơ hội nào với hệ thống thông báo thông
                  minh.
                </Typography>
                <Typography textAlign="justify" color="text.secondary">
                  Nhận thông tin tức thì về các vị trí việc làm mới phù hợp với
                  kỹ năng và mong muốn của bạn.
                </Typography>
                <Typography textAlign="justify" color="text.secondary">
                  Tùy chỉnh các tiêu chí thông báo như mức lương, địa điểm,
                  ngành nghề để đảm bảo bạn luôn cập nhật những cơ hội tốt nhất
                  trên thị trường.
                </Typography>
              </Stack>
            </Box>
            <Box width="100%">
              <Box sx={{ height: 600 }}>
                <MuiImageCustom src={ABOUT_IMAGES.JOB_POST_NOTIFICATION} />
              </Box>
            </Box>
          </Stack>
        </Card>
      </Box>

      <Box sx={{ mt: 5 }}>
        <AppIntroductionCard />
      </Box>
    </Box>
  );
};

export default AboutUsPage;
