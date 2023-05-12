import React from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import AppIntroductionCard from '../../../components/AppIntroductionCard';

const AboutUsPage = () => {
  return (
    <Box sx={{ my: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Về chúng tôi
      </Typography>
      <Stack spacing={3}>
        <Box>
          <Typography>
            MyJob - Kênh thông tin tuyển dụng và việc làm dành cho mọi Doanh
            nghiệp và Ứng viên. Chúng tôi tin tưởng sẽ đem lại “HY VỌNG” cho
            Doanh nghiệp tìm kiếm nhân tài và cho Ứng viên tìm kiếm cơ hội nghề
            nghiệp.Với 2 hệ thống: Website dành cho Nhà Tuyển Dụng và Ứng dụng
            (Application) dành cho Người Tìm Việc, MyJob sẽ mang lại những trải
            nghiệm mới mẻ, thú vị; kết nối ước mơ chinh phục công việc của mọi
            nhân tài và giúp doanh nghiệp xây dựng đội ngũ nhân sự vững mạnh.
          </Typography>
        </Box>
        <Box>
          <Grid container spacing={3}>
            <Grid xs={12} sm={12} md={6} lg={3} xl={3} item>
              <Stack spacing={1}>
                <Typography variant="h6" sx={{ color: '#fca34d' }}>
                  Website
                </Typography>
                <Typography sx={{ textAlign: 'justify' }}>
                  Website hỗ trợ Nhà Tuyển Dụng tìm kiếm nhân sự, quản lý công
                  việc, ứng viên, xây dựng nguồn dữ liệu phong phú.
                </Typography>
              </Stack>
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={3} xl={3} item>
              <Stack spacing={1}>
                <Typography variant="h6" sx={{ color: '#fca34d' }}>
                  Mobile
                </Typography>
                <Typography sx={{ textAlign: 'justify' }}>
                  Ứng dụng tìm kiếm việc làm giúp Người Tìm Việc tiếp cận được
                  công việc phù hợp nhất ở mọi nơi và mọi thời điểm
                </Typography>
              </Stack>
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={3} xl={3} item>
              <Stack spacing={1}>
                <Typography variant="h6" sx={{ color: '#fca34d' }}>
                  Ngành tập trung
                </Typography>
                <Typography sx={{ textAlign: 'justify' }}>
                  Với việc chuyên sâu vào mảng tuyển dụng và tìm kiếm việc làm
                  của 3 lĩnh vực: Công nghệ thông tin, Quảng cáo trực tuyến, PR
                  - Marketing, Người Tìm việc hay Nhà Tuyển dụng sẽ kết nối được
                  đúng với đối tượng, phù hợp với nhu cầu.
                </Typography>
              </Stack>
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={3} xl={3} item>
              <Stack spacing={1}>
                <Typography variant="h6" sx={{ color: '#fca34d' }}>
                  Tiết kiệm chi phí
                </Typography>
                <Typography sx={{ textAlign: 'justify' }}>
                  Tiết kiệm chi phí, thời gian, đạt được hiệu quả, đáp ứng được
                  mọi nhu cầu tìm việc và tìm nhân tài.
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Stack>
      <Box sx={{ mt: 5 }}>
        {/* Start: AppIntroductionCard */}
        <AppIntroductionCard />
        {/* End: AppIntroductionCard */}
      </Box>
    </Box>
  );
};

export default AboutUsPage;
