import React from 'react';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  Container,
  Divider,
} from '@mui/material';
import { ICONS, IMAGES, LINKS, ROUTES, APP_NAME } from '../../../../configs/constants';
import MuiImageCustom from '../../../../components/MuiImageCustom';

const Footer = () => {
  const nav = useNavigate();

  return (
    <Box>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid xs={12} sm={6} md={3} item>
            <List disablePadding>
              <ListItem sx={{ pb: 2 }}>
                <MuiImageCustom
                  width={150}
                  src={IMAGES.getTextLogo('light')}
                  sx={{ display: 'block' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.JOB_SEEKER.ABOUT_US}`)}
                  primary={`Về ${APP_NAME}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav('/lien-he')}
                  primary="Liên Hệ"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav('/hoi-dap')}
                  primary="Hỏi Đáp"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav('/thoa-thuan-su-dung')}
                  primary="Thỏa thuận sử dụng"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav('/quy-dinh-bao-mat')}
                  primary="Quy định bảo mật"
                />
              </ListItem>
            </List>
          </Grid>
          <Grid xs={12} sm={6} md={3} item>
            <List disablePadding>
              <ListItem>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  Dành cho nhà tuyển dụng
                </Typography>
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.EMPLOYER.JOB_POST}`)}
                  primary="Đăng Tin Tuyển Dụng"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.EMPLOYER.PROFILE}`)}
                  primary="Tìm Kiếm Hồ Sơ"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.EMPLOYER.DASHBOARD}`)}
                  primary="Quản Lý Nhà Tuyển Dụng"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.EMPLOYER.CHAT}`)}
                  primary="Tin Nhắn"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.EMPLOYER.NOTIFICATION}`)}
                  primary="Thông Báo"
                />
              </ListItem>
            </List>
          </Grid>
          <Grid xs={12} sm={6} md={3} item>
            <List disablePadding>
              <ListItem>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  Dành cho ứng viên
                </Typography>
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.JOB_SEEKER.JOBS}`)}
                  primary="Việc Làm"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.JOB_SEEKER.COMPANY}`)}
                  primary="Công ty"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.JOB_SEEKER.DASHBOARD}`)}
                  primary="Quản Lý Ứng Viên"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.JOB_SEEKER.DASHBOARD}/${ROUTES.JOB_SEEKER.CHAT}`)}
                  primary="Tin Nhắn"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => nav(`/${ROUTES.JOB_SEEKER.DASHBOARD}/${ROUTES.JOB_SEEKER.NOTIFICATION}`)}
                  primary="Thông Báo"
                />
              </ListItem>
            </List>
          </Grid>
          <Grid xs={12} sm={6} md={3} item>
            <List disablePadding>
              <ListItem>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  Ứng dụng di động
                </Typography>
              </ListItem>
              <ListItem>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Link href={LINKS.CHPLAY_LINK} target="_blank">
                    <MuiImageCustom 
                      width={140} 
                      src={IMAGES.chPlayDownload}
                      sx={{ 
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'scale(1.05)' }
                      }} 
                    />
                  </Link>
                  <Link href={LINKS.APPSTORE_LINK} target="_blank">
                    <MuiImageCustom 
                      width={140} 
                      src={IMAGES.appStoreDownload}
                      sx={{ 
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'scale(1.05)' }
                      }} 
                    />
                  </Link>
                </Stack>
              </ListItem>
              
              <ListItem sx={{ mt: 3 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  Kết nối với MyJob
                </Typography>
              </ListItem>
              <ListItem>
                <Stack direction="row" spacing={0} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                  {[
                    { icon: ICONS.FACEBOOK, link: LINKS.FACEBOOK_LINK },
                    { icon: ICONS.FACEBOOK_MESSENGER, link: LINKS.FACEBOOK_MESSENGER_LINK },
                    { icon: ICONS.INSTAGRAM, link: LINKS.INSTAGRAM_LINK },
                    { icon: ICONS.LINKEDIN, link: LINKS.LINKEDIN_LINK },
                    { icon: ICONS.YOUTUBE, link: LINKS.YOUTUBE_LINK },
                    { icon: ICONS.TWITTER, link: LINKS.TWITTER_LINK },
                  ].map((social, index) => (
                    <Link 
                      key={index} 
                      href={social.link} 
                      target="_blank"
                      sx={{
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'scale(1.1)' }
                      }}
                    >
                      <img height="35" width="35" src={social.icon} alt="" />
                    </Link>
                  ))}
                </Stack>
              </ListItem>
            </List>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />
        
        <Typography 
          variant="body2" 
          color="grey.400" 
          align="center"
          sx={{ pt: 2 }}
        >
          © {new Date().getFullYear()} MyJob. Tất cả quyền được bảo lưu.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
