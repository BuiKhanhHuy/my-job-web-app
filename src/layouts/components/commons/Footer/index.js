import React from 'react';
import {
  Box,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';

const Footer = () => {
  return (
    <Box>
      <Grid container>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3} item>
          <List dense={true}>
            <ListItem>
              <Typography
                variant="button"
                display="block"
                gutterBottom
                style={{ fontWeight: 'bold' }}
              >
                MyJob
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="Single-line item" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Single-line item" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Single-line item" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Single-line item" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Single-line item" />
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
              <ListItemText primary="Single-line item" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Single-line item" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Single-line item" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Single-line item" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Single-line item" />
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
              <ListItemText primary="Single-line item" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Single-line item" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Single-line item" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Single-line item" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Single-line item" />
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
                <CardMedia
                  component="img"
                  height="50"
                  width="150"
                  image={require('../../../../assets/images/app-android-download.png')}
                  alt="Paella dish"
                />
                <CardMedia
                  component="img"
                  height="50"
                  width="150"
                  image={require('../../../../assets/images/app-ios-download.png')}
                  alt="Paella dish"
                />
              </Stack>
            </ListItem>
            <ListItem>
              <ListItemText primary="Single-line item" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Single-line item" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Single-line item" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Single-line item" />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
