import React from 'react';

import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBell } from '@fortawesome/free-solid-svg-icons';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';

import JobPosts from '../../../components/JobPosts';

const JobDetailPage = () => {
  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
          <Card sx={{ py: 2, px: 4, boxShadow: 0 }}>
            <Stack>
              <Box>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box>
                    <Avatar
                      sx={{
                        bgcolor: 'white',
                        boxShadow: 2,
                        p: 0.5,
                        width: 65,
                        height: 65,
                      }}
                      variant="rounded"
                      src="https://cdn1.vieclam24h.vn/file_uploads/employer/5c89db4850bbc_1552538440.jpg"
                    />
                  </Box>
                  <Box>
                    <Typography variant="h6">
                      Ngân Hàng TNHH Một Thành Viên Shinhan Việt Nam
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      color="GrayText"
                    >
                      Trên 300 người
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Stack spacing={1}>
                <Box>
                  <Typography variant="h5">
                    Chuyên Viên Tư Vấn Tín Dụng Làm Tại Hồ Chí Minh Và Hà Nội
                  </Typography>
                </Box>
                <Stack direction="row" spacing={3}>
                  <Typography variant="subtitle2">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      style={{ marginRight: 6 }}
                    />{' '}
                    khuy220@gmail.com
                  </Typography>
                  <Typography variant="subtitle2">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      style={{ marginRight: 6 }}
                    />{' '}
                    khuy220@gmail.com
                  </Typography>
                  <Typography variant="subtitle2">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      style={{ marginRight: 6 }}
                    />{' '}
                    khuy220@gmail.com
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" size="large">
                    Nộp hồ sơ
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<FavoriteBorderIcon />}
                  >
                    Lưu
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<ShareIcon />}
                  >
                    Chia sẻ
                  </Button>
                </Stack>
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Typography variant="body2" gutterBottom>
                      Yêu cầu kinh nghiệm
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      Dưới 1 năm
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Typography variant="body2" gutterBottom>
                      Mức lương
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      15 - 20 triệu
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Typography variant="body2" gutterBottom>
                      Cấp bậc
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      Chuyên viên- nhân viên
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Typography variant="body2" gutterBottom>
                      Hình thức làm việc
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      Toàn thời gian cố định
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box>
                <Stack>
                  <Typography variant="h6" gutterBottom>
                    Thông tin
                  </Typography>
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Typography variant="body2" gutterBottom>
                          Yêu cầu kinh nghiệm
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Typography variant="body2" gutterBottom>
                          Yêu cầu kinh nghiệm
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Typography variant="body2" gutterBottom>
                          Yêu cầu kinh nghiệm
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Typography variant="body2" gutterBottom>
                          Yêu cầu kinh nghiệm
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Typography variant="body2" gutterBottom>
                          Yêu cầu kinh nghiệm
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Typography variant="body2" gutterBottom>
                          Yêu cầu kinh nghiệm
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Stack>
              </Box>
              <Box></Box>
            </Stack>
          </Card>

          <Card sx={{ p: 4, mt: 3, boxShadow: 0 }}>
            <Stack spacing={4}>
              <Box>
                <Typography variant="h6">Mô tả công việc</Typography>
                <Box sx={{ pt: 1 }}>
                  - Chủ động tìm kiếm khách hàng mới, tư vấn giới thiệu cho
                  Khách hàng sản phẩm cho vay Tín chấp và thẻ tín dụng của
                  Shinhan Bank - Chăm sóc khách hàng tiềm năng và mở rộng mạng
                  lưới khách hàng từ danh sách khách hàng hiện hữu - Trực tiếp
                  thiết lập cuộc hẹn với khách hàng nhằm tư vấn sản phẩm, dịch
                  vụ và chăm sóc khách hàng theo đúng quy trình và quy định của
                  Ngân hàng - Tham gia hoạt động phát triển thị trường với
                  Trưởng nhóm nhằm tiếp cận khách hàng và giới thiệu sản phẩm,
                  dịch vụ - Đảm bảo sự chuyên nghiệp và lịch thiệp từ quá trình
                  tiếp cận đến dịch vụ hậu mãi nhằm nâng cao hình ảnh Shinhan -
                  Thực hiện các công việc khác theo sự phân công của Trưởng nhóm
                  - Địa điểm làm việc: (được tùy chọn nơi làm việc) 1. Tòa nhà
                  Dali, 24C Phan Đăng Lưu, Quận Bình Thạnh 2. Tòa Nhà Pico, 20
                  Cộng Hòa, Quận Tân Bình 3. Tòa nhà Minh Sang Plaza, 888 Đại lộ
                  Bình Dương, Bình Dương 4. Golden Palace, 99 Mễ Trì, Nam Từ
                  Liêm, Hà Nội.
                </Box>
              </Box>
              <Box>
                <Typography variant="h6">Yêu cầu công việc</Typography>
                <Box sx={{ pt: 1 }}>
                  - Chủ động tìm kiếm khách hàng mới, tư vấn giới thiệu cho
                  Khách hàng sản phẩm cho vay Tín chấp và thẻ tín dụng của
                  Shinhan Bank - Chăm sóc khách hàng tiềm năng và mở rộng mạng
                  lưới khách hàng từ danh sách khách hàng hiện hữu - Trực tiếp
                  thiết lập cuộc hẹn với khách hàng nhằm tư vấn sản phẩm, dịch
                  vụ và chăm sóc khách hàng theo đúng quy trình và quy định của
                  Ngân hàng - Tham gia hoạt động phát triển thị trường với
                  Trưởng nhóm nhằm tiếp cận khách hàng và giới thiệu sản phẩm,
                  dịch vụ - Đảm bảo sự chuyên nghiệp và lịch thiệp từ quá trình
                  tiếp cận đến dịch vụ hậu mãi nhằm nâng cao hình ảnh Shinhan -
                  Thực hiện các công việc khác theo sự phân công của Trưởng nhóm
                  - Địa điểm làm việc: (được tùy chọn nơi làm việc) 1. Tòa nhà
                  Dali, 24C Phan Đăng Lưu, Quận Bình Thạnh 2. Tòa Nhà Pico, 20
                  Cộng Hòa, Quận Tân Bình 3. Tòa nhà Minh Sang Plaza, 888 Đại lộ
                  Bình Dương, Bình Dương 4. Golden Palace, 99 Mễ Trì, Nam Từ
                  Liêm, Hà Nội.
                </Box>
              </Box>
              <Box>
                <Typography variant="h6">Quyền lợi</Typography>
                <Box sx={{ pt: 1 }}>
                  - Chủ động tìm kiếm khách hàng mới, tư vấn giới thiệu cho
                  Khách hàng sản phẩm cho vay Tín chấp và thẻ tín dụng của
                  Shinhan Bank - Chăm sóc khách hàng tiềm năng và mở rộng mạng
                  lưới khách hàng từ danh sách khách hàng hiện hữu - Trực tiếp
                  thiết lập cuộc hẹn với khách hàng nhằm tư vấn sản phẩm, dịch
                  vụ và chăm sóc khách hàng theo đúng quy trình và quy định của
                  Ngân hàng - Tham gia hoạt động phát triển thị trường với
                  Trưởng nhóm nhằm tiếp cận khách hàng và giới thiệu sản phẩm,
                  dịch vụ - Đảm bảo sự chuyên nghiệp và lịch thiệp từ quá trình
                  tiếp cận đến dịch vụ hậu mãi nhằm nâng cao hình ảnh Shinhan -
                  Thực hiện các công việc khác theo sự phân công của Trưởng nhóm
                  - Địa điểm làm việc: (được tùy chọn nơi làm việc) 1. Tòa nhà
                  Dali, 24C Phan Đăng Lưu, Quận Bình Thạnh 2. Tòa Nhà Pico, 20
                  Cộng Hòa, Quận Tân Bình 3. Tòa nhà Minh Sang Plaza, 888 Đại lộ
                  Bình Dương, Bình Dương 4. Golden Palace, 99 Mễ Trì, Nam Từ
                  Liêm, Hà Nội.
                </Box>
              </Box>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack direction="row" spacing={2}>
              <Button variant="contained" size="large">
                Nộp hồ sơ
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<FavoriteBorderIcon />}
              >
                Lưu
              </Button>
              <Button variant="outlined" size="large" startIcon={<ShareIcon />}>
                Chia sẻ
              </Button>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <Stack spacing={2}>
            <Card
              sx={{ p: 2, boxShadow: 0, border: 1, borderColor: '#441da0' }}
            >
              <Stack direction="row">
                <FontAwesomeIcon
                  icon={faBell}
                  color="#441da0"
                  size="2x"
                  style={{ marginRight: 8 }}
                />
                <Typography variant="h6" color="#441da0">
                  Gửi tôi công việc tương tự
                </Typography>
              </Stack>
            </Card>
            <Card sx={{ boxShadow: 0, py: 1, px: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6">Việc tương tự cho bạn</Typography>
              </Box>
              <Box>
                <JobPosts />
              </Box>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JobDetailPage;
