import React from 'react';

import {
  Avatar,
  Box,
  Card,
  CardMedia,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faUsers,
  faCalendarDays,
  faGlobe,
  faEnvelope,
  faPhoneVolume,
  faHashtag,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';

import JobPosts from '../../../components/JobPosts';
import ImageGalleryCustom from '../../../components/ImageGalleryCustom';
import facebookIconSvg from '../../../assets/icons/facebook-icon.svg';
import youtubeIconSvg from '../../../assets/icons/youtube-icon.svg';
import linkedinIconSvg from '../../../assets/icons/linkedin-icon.svg';

const CompanyDetailPage = () => {
  return (
    <Box>
      <Stack>
        <Card sx={{ boxShadow: 0 }}>
          <Box>
            <CardMedia
              component="img"
              width="100%"
              image="https://www.vietnamworks.com/_next/image?url=https%3A%2F%2Fimages02.vietnamworks.com%2Fcompanyprofile%2FEY-Vietnam%2Fen%2Fbanner_final.jpg&w=1920&q=75"
              alt="Paella dish"
              sx={{ borderRadius: 1.5 }}
            />
          </Box>
          <Box sx={{ p: 3, pt: 1 }}>
            <Stack direction="row" spacing={2}>
              <Box>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    bgcolor: 'white',
                    boxShadow: 5,
                    p: 1,
                    mt: -7,
                  }}
                  variant="rounded"
                  src="https://dxwd4tssreb4w.cloudfront.net/image/8ff0a39cc9f8b40853826f26a6fa60d6"
                />
              </Box>
              <Box>
                <Box>
                  <Typography variant="h5" gutterBottom>
                    SAPO Technology., JSC
                  </Typography>
                </Box>
                <Stack direction="row" spacing={3}>
                  <Box>
                    <Typography variant="subtitle1" gutterBottom>
                      <FontAwesomeIcon
                        icon={faBriefcase}
                        style={{ marginRight: 6 }}
                      />
                      Mạng viễn thông
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" gutterBottom>
                      <FontAwesomeIcon
                        icon={faUsers}
                        style={{ marginRight: 6 }}
                      />
                      5000+ nhân viên
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" gutterBottom>
                      <FontAwesomeIcon
                        icon={faCalendarDays}
                        style={{ marginRight: 6 }}
                      />
                      12/12/2010
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Card>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <Card sx={{ boxShadow: 0, p: 3 }}>
              <Stack spacing={4}>
                {/* Start: mo ta cong ty */}
                <Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: '#441da0' }}
                  >
                    Về công ty
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography>
                      Được thành lập ngày 20/08/2008 với sứ mệnh "Làm cho việc
                      bán hàng trở nên dễ dàng". Nhờ chiến lược rõ ràng và hướng
                      đi đúng, Sapo nhanh chóng phát triển và đạt được những
                      thành công nhất định. Giai đoạn từ 2010 - 2015, chúng tôi
                      liên tục đạt mức tăng trưởng 300%. Tính đến tháng 1 năm
                      2019, Sapo có hơn 67,000 khách hàng là các doanh nghiệp,
                      cửa hàng và mục tiêu sẽ đạt 200,000 khách hàng vào năm
                      2023. Để đạt được những mục tiêu này, chúng tôi cần bạn:
                      những người trẻ tài năng, có đam mê và khát vọng thành
                      công, cùng chúng tôi giúp cho cuộc sống tốt đẹp hơn nhờ
                      thương mại điện tử! Hiện nay, Sapo đang mang đến cho các
                      doanh nghiệp bán lẻ một nền tảng quản lý và bán hàng tổng
                      thể từ online đến offline: Sapo POS - Phần mềm quản lý bán
                      hàng, Sapo GO - Giải pháp quản lý bán hàng online dành
                      riêng cho nhà bán hàng trên Facebook và sàn TMĐT Sapo FnB
                      - Phần mềm quản lý nhà hàng, quán cafe, Sapo Web - Giải
                      pháp thiết kế website bán hàng và Sapo Omnichannel - giải
                      pháp quản lý và bán hàng từ Online đến Offline
                    </Typography>
                  </Box>
                </Box>
                {/* End: mo ta cong ty */}

                {/* Start: viec lam */}
                <Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: '#441da0' }}
                  >
                    Việc làm đang tuyển
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <JobPosts />
                  </Box>
                </Box>
                {/* End: viec lam */}
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Card sx={{ boxShadow: 0, p: 3 }}>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="h6" sx={{ color: '#441da0' }}>
                    Website
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Typography>
                      <FontAwesomeIcon
                        icon={faGlobe}
                        style={{ marginRight: 6 }}
                      />{' '}
                      <Link href="https://tuyendung.sapo.vn/">
                        https://tuyendung.sapo.vn/
                      </Link>
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ color: '#441da0' }}>
                    Theo dõi tại
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <IconButton color="primary" aria-label="facebook">
                      <img width="30" src={facebookIconSvg} alt="" />
                    </IconButton>
                    <IconButton color="primary" aria-label="youtube">
                      <img width="30" src={youtubeIconSvg} alt="" />
                    </IconButton>
                    <IconButton color="primary" aria-label="linked">
                      <img width="30" src={linkedinIconSvg} alt="" />
                    </IconButton>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ color: '#441da0' }}>
                    Thông tin chung
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Typography>
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        style={{ marginRight: 6 }}
                      />{' '}
                      khuy220@gmail.com
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                      <FontAwesomeIcon
                        icon={faPhoneVolume}
                        style={{ marginRight: 6 }}
                      />{' '}
                      0888425094
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                      <FontAwesomeIcon
                        icon={faHashtag}
                        style={{ marginRight: 6 }}
                      />{' '}
                      12345678954321
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        style={{ marginRight: 6 }}
                      />{' '}
                      1242 QL1A, Tân Tạo A, Bình Tân, TP. Hồ Chí Minh
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ color: '#441da0' }}>
                    Bản đồ
                  </Typography>
                  <Box sx={{ mt: 1 }}>Bản đồ</Box>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ color: '#441da0' }}>
                    Hình ảnh
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <ImageGalleryCustom />
                  </Box>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default CompanyDetailPage;
