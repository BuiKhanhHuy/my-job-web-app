import React from 'react';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import {
  Avatar,
  Box,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { ICONS, IMAGES, LINKS } from '../../../../configs/constants';

const Footer = () => {
  const nav = useNavigate();

  return (
    <Box>
      <Grid container>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3} item>
          <List dense={true}>
            <ListItem>
              <Avatar
                onClick={() => nav('/')}
                src={IMAGES.getTextLogo('light')}
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  mr: 1,
                  width: 150,
                  height: 50,
                }}
                variant="square"
                alt="LOGO"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/ve-chung-toi')}
                primary="Về MyJob"
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
        <Grid xs={12} sm={12} md={6} lg={3} xl={3} item>
          <List dense={true}>
            <ListItem>
              <Typography
                variant="button"
                display="block"
                gutterBottom
                style={{ fontWeight: 'bold' }}
              >
                Dành cho nhà tuyển dụng
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/nha-tuyen-dung/tin-tuyen-dung')}
                primary="Đăng Tin Tuyển Dụng"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/nha-tuyen-dung/danh-sach-ung-vien')}
                primary="Tìm Kiếm Hồ Sơ"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/nha-tuyen-dung')}
                primary="Quản Lý Nhà Tuyển Dụng"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/tro-chuyen')}
                primary="Tin Nhắn"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/thong-bao')}
                primary="Thông Báo"
              />
            </ListItem>
          </List>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3} item>
          <List dense={true}>
            <ListItem>
              <Typography
                variant="button"
                display="block"
                gutterBottom
                style={{ fontWeight: 'bold' }}
              >
                Dành cho ứng viên
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/viec-lam')}
                primary="Việc Làm"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/cong-ty')}
                primary="Công ty"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/ung-vien')}
                primary="Quản Lý Ứng Viên"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/ung-vien/tin-nhan')}
                primary="Tin Nhắn"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ cursor: 'pointer' }}
                onClick={() => nav('/ung-vien/thong-bao')}
                primary="Thông Báo"
              />
            </ListItem>
          </List>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3} item>
          <List dense={true}>
            <ListItem>
              <Typography
                variant="button"
                display="block"
                gutterBottom
                style={{ fontWeight: 'bold' }}
              >
                Ứng dụng di động
              </Typography>
            </ListItem>
            <ListItem>
              <Stack direction="row" spacing={2}>
                <Link href={LINKS.CHPLAY_LINK} target="_blank">
                  <CardMedia
                    height="50"
                    width="150"
                    component="img"
                    image={require('../../../../assets/images/app-android-download.png')}
                    alt="Paella dish"
                  />
                </Link>
                <Link href={LINKS.APPSTORE_LINK} target="_blank">
                  <CardMedia
                    height="50"
                    width="150"
                    component="img"
                    image={require('../../../../assets/images/app-ios-download.png')}
                    alt="Paella dish"
                  />
                </Link>
              </Stack>
            </ListItem>
            <ListItem>
              <Typography
                variant="button"
                display="block"
                gutterBottom
                style={{ fontWeight: 'bold' }}
              >
                Chứng nhận bởi
              </Typography>
            </ListItem>
            <ListItem>
              <Stack direction="row" spacing={2}>
                <Link href={LINKS.CERTIFICATE_LINK} target="_blank">
                  <CardMedia
                    height="50"
                    width="100"
                    component="img"
                    image={require('../../../../assets/images/certification-logo.png')}
                    alt="Paella dish"
                  />
                </Link>
              </Stack>
            </ListItem>
            <ListItem>
              <Typography
                variant="button"
                display="block"
                gutterBottom
                style={{ fontWeight: 'bold' }}
              >
                Kết nối với MyJob
              </Typography>
            </ListItem>
            <ListItem>
              <Stack direction="row" spacing={1}>
                <Link href={LINKS.FACEBOOK_LINK} target="_blank">
                  <img height="40" width="40" src={ICONS.FACEBOOK} alt="" />
                </Link>
                <Link href={LINKS.FACEBOOK_MESSENGER_LINK} target="_blank">
                  <img
                    height="40"
                    width="40"
                    src={ICONS.FACEBOOK_MESSENGER}
                    alt=""
                  />
                </Link>
                <Link href={LINKS.INSTAGRAM_LINK} target="_blank">
                  <img height="40" width="40" src={ICONS.INSTAGRAM} alt="" />
                </Link>
                <Link href={LINKS.LINKEDIN_LINK} target="_blank">
                  <img height="40" width="40" src={ICONS.LINKEDIN} alt="" />
                </Link>
                <Link href={LINKS.YOUTUBE_LINK} target="_blank">
                  <img height="40" width="40" src={ICONS.YOUTUBE} alt="" />
                </Link>
                <Link href={LINKS.TWITTER_LINK} target="_blank">
                  <img height="40" width="40" src={ICONS.TWITTER} alt="" />
                </Link>
              </Stack>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
