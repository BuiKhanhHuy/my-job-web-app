import * as React from 'react';
import {
  Alert,
  Box,
  Dialog,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Container } from '@mui/system';

const DesktopContent = (setOpen) => {
  return (
    <Box>
      <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => setOpen(false)}
          aria-label="close"
          sx={{ mr: 0.5 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="div">
          Danh sách tất cả nghề nghiệp
        </Typography>
      </Stack>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Alert
              icon={false}
              variant="outlined"
              severity="info"
              style={{
                color: 'black',
                backgroundColor: 'rgba(247,251,255,1)',
              }}
            >
              <Stack>
                <Typography variant="h6">Top 10 nghề nghiệp</Typography>
                <Divider sx={{ my: 2 }} />
                <Grid container spacing={3}>
                  <Grid item>
                    <Typography>
                      Bán buôn - Bán lẻ - Quản lý cửa hàng
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                      Bán buôn - Bán lẻ - Quản lý cửa hàng
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                      Bán buôn - Bán lẻ - Quản lý cửa hàng
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                      Bán buôn - Bán lẻ - Quản lý cửa hàng
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                      Bán buôn - Bán lẻ - Quản lý cửa hàng
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                      Bán buôn - Bán lẻ - Quản lý cửa hàng
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                      Bán buôn - Bán lẻ - Quản lý cửa hàng
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                      Bán buôn - Bán lẻ - Quản lý cửa hàng
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                      Bán buôn - Bán lẻ - Quản lý cửa hàng
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                      Bán buôn - Bán lẻ - Quản lý cửa hàng
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
            </Alert>
          </Grid>
          <Grid item xs={9}>
            <Stack sx={{ p: 2 }}>
              <Typography variant="h6">Tất cả ngành nghề</Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Typography>Bán buôn - Bán lẻ - Quản lý cửa hàng</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Bán buôn - Bán lẻ - Quản lý cửa hàng</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Bán buôn - Bán lẻ - Quản lý cửa hàng</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Bán buôn - Bán lẻ - Quản lý cửa hàng</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Bán buôn - Bán lẻ - Quản lý cửa hàng</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Bán buôn - Bán lẻ - Quản lý cửa hàng</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Bán buôn - Bán lẻ - Quản lý cửa hàng</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Bán buôn - Bán lẻ - Quản lý cửa hàng</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Bán buôn - Bán lẻ - Quản lý cửa hàng</Typography>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const MobileContent = (setOpen) => {};

const SubHeaderDialog = ({ open, setOpen }) => {
  return (
    <Dialog
      PaperProps={{
        sx: {
          top: window.document.getElementById('common-header')?.clientHeight,
          position: 'absolute',
        },
      }}
      hideBackdrop={true}
      fullScreen
      open={open}
      onClose={() => setOpen(false)}
    >
      <Container maxWidth="xl" sx={{ mt: 1 }}>
        {DesktopContent(setOpen)}
      </Container>
    </Dialog>
  );
};

export default SubHeaderDialog;
