import React from 'react';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import AppIntroductionCard from '../../../components/AppIntroductionCard';
import MuiImageCustom from '../../../components/MuiImageCustom';

const AboutUsPage = () => {
  return (
    <>
      <Box sx={{ my: 3 }}>
        <Typography variant="h4" sx={{ mb: 2, color: '#441da0' }}>
          Về chúng tôi
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography>
              MyJob - Kênh thông tin tuyển dụng và việc làm dành cho mọi Doanh
              nghiệp và Ứng viên. Chúng tôi tin tưởng sẽ đem lại “HY VỌNG” cho
              Doanh nghiệp tìm kiếm nhân tài và cho Ứng viên tìm kiếm cơ hội
              nghề nghiệp.Với 2 hệ thống: Website dành cho Nhà Tuyển Dụng và Ứng
              dụng (Application) dành cho Người Tìm Việc, MyJob sẽ mang lại
              những trải nghiệm mới mẻ, thú vị; kết nối ước mơ chinh phục công
              việc của mọi nhân tài và giúp doanh nghiệp xây dựng đội ngũ nhân
              sự vững mạnh.
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
                    của 3 lĩnh vực: Công nghệ thông tin, Quảng cáo trực tuyến,
                    PR - Marketing, Người Tìm việc hay Nhà Tuyển dụng sẽ kết nối
                    được đúng với đối tượng, phù hợp với nhu cầu.
                  </Typography>
                </Stack>
              </Grid>
              <Grid xs={12} sm={12} md={6} lg={3} xl={3} item>
                <Stack spacing={1}>
                  <Typography variant="h6" sx={{ color: '#fca34d' }}>
                    Tiết kiệm chi phí
                  </Typography>
                  <Typography sx={{ textAlign: 'justify' }}>
                    Tiết kiệm chi phí, thời gian, đạt được hiệu quả, đáp ứng
                    được mọi nhu cầu tìm việc và tìm nhân tài.
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Box>
      <Box sx={{ my: 3 }}>
        <Typography variant="h4" sx={{ mb: 2, color: '#441da0' }}>
          Mobile App MyJob
        </Typography>
        <Box sx={{ mt: 5 }}>
          <Card sx={{ p: 5 }}>
            <Stack
              direction={{
                xs: 'column',
                sm: 'column',
                md: 'row',
                lg: 'row',
                xl: 'row',
              }}
              spacing={2}
            >
              <Box
                width={{
                  xs: '100%',
                  sm: '100%',
                  md: '120vh',
                  lg: '120vh',
                  xl: '120vh',
                }}
              >
                <MuiImageCustom
                  src={
                    'https://www.topcv.vn/v4/image/welcome/mobile-app/select_truejob.png'
                  }
                />
              </Box>
              <Box>
                <Stack spacing={2}>
                  <Typography
                    variant="h4"
                    style={{ color: '#fca34d', fontSize: 30 }}
                  >
                    Chọn đúng việc - Đi đúng hướng
                  </Typography>
                  <Typography textAlign="justify">
                    Cá nhân hoá trải nghiệm tìm việc theo nhu cầu ứng viên gồm
                    các tính năng Gợi ý việc làm phù hợp, Tìm kiếm việc làm, Tìm
                    kiếm công ty và Chatbot hỗ trợ tìm việc làm một cách nhanh
                    chóng.
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
                xs: 'column-reverse',
                sm: 'column-reverse',
                md: 'row',
                lg: 'row',
                xl: 'row',
              }}
              spacing={2}
            >
              <Box>
                <Stack spacing={2}>
                  <Typography
                    variant="h4"
                    style={{ color: '#fca34d', fontSize: 30 }}
                  >
                    Tạo CV & Profile
                  </Typography>
                  <Typography textAlign="justify">
                    CV online và có thể tải lên cv đính kèm. Thuận tiện, nhanh
                    chóng, chuyên nghiệp và khác biệt. Tăng 80% tỉ lệ ứng tuyển
                    thành công.
                  </Typography>
                </Stack>
              </Box>
              <Box
                width={{
                  xs: '100%',
                  sm: '100%',
                  md: '90vh',
                  lg: '90vh',
                  xl: '90vh',
                }}
              >
                <MuiImageCustom
                  src={
                    'https://www.topcv.vn/v4/image/welcome/mobile-app/cv_profile.png'
                  }
                />
              </Box>
            </Stack>
          </Card>
        </Box>
        <Box sx={{ mt: 5 }}>
          <Card sx={{ p: 5 }}>
            <Stack
              direction={{
                xs: 'column',
                sm: 'column',
                md: 'row',
                lg: 'row',
                xl: 'row',
              }}
              spacing={2}
            >
              <Box
                width={{
                  xs: '100%',
                  sm: '100%',
                  md: '120vh',
                  lg: '120vh',
                  xl: '120vh',
                }}
              >
                <MuiImageCustom
                  src={
                    'https://www.topcv.vn/v4/image/welcome/mobile-app/cv_profile.png'
                  }
                />
              </Box>
              <Box>
                <Stack spacing={2}>
                  <Typography
                    variant="h4"
                    style={{ color: '#fca34d', fontSize: 30 }}
                  >
                    Việc làm xung quanh bạn
                  </Typography>
                  <Typography textAlign="justify">
                    Tính năng VIỆC LÀM GẦN BẠN trên app MyJob. Tính năng này
                    giúp ứng viên có thể dễ dàng lựa chọn được một công việc phù
                    hợp, đồng thời đảm bảo được tiêu chí gần nhà, thuận tiện đi
                    lại mà không cần mất công tìm kiếm giữa hàng trăm tin tuyển
                    dụng.
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
                xs: 'column-reverse',
                sm: 'column-reverse',
                md: 'row',
                lg: 'row',
                xl: 'row',
              }}
              spacing={2}
            >
              <Box>
                <Stack spacing={2}>
                  <Typography
                    variant="h4"
                    style={{ color: '#fca34d', fontSize: 30 }}
                  >
                    Thông báo việc làm mọi lúc
                  </Typography>
                  <Typography textAlign="justify">
                    Tạo thông báo việc làm để việc làm tìm đến bạn. Việc làm mới
                    nhất từ các nhà tuyển dụng hàng đầu sẽ được gửi đến email
                    của bạn hàng tuần.
                  </Typography>
                </Stack>
              </Box>
              <Box
                width={{
                  xs: '100%',
                  sm: '100%',
                  md: '90vh',
                  lg: '90vh',
                  xl: '90vh',
                }}
              >
                <MuiImageCustom
                  src={
                    'https://www.topcv.vn/v4/image/welcome/mobile-app/cv_profile.png'
                  }
                />
              </Box>
            </Stack>
          </Card>
        </Box>
        <Box sx={{ mt: 5 }}>
          {/* Start: AppIntroductionCard */}
          <AppIntroductionCard />
          {/* End: AppIntroductionCard */}
        </Box>
      </Box>
    </>
  );
};

export default AboutUsPage;
