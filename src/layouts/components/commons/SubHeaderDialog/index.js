import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {
  Alert,
  Box,
  Chip,
  Dialog,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Container } from '@mui/system';
import { useSelector } from 'react-redux';

const DesktopContent = (setOpen, careers, handleFilter) => {
  const theme = useTheme();

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
          <Grid item sm={5} md={3}>
            <Alert
              icon={false}
              variant="outlined"
              severity="info"
              sx={{
                color:  theme.palette.mode === 'light'
                ? 'black'
                : 'white',
                bgcolor:
                  theme.palette.mode === 'light'
                    ? 'rgba(247,251,255,1)'
                    : 'rgba(0,0,0,0.2)',
              }}
            >
              <Stack>
                <Typography variant="h6">Top 10 nghề nghiệp</Typography>
                <Divider sx={{ my: 2 }} />
                <Grid container spacing={2}>
                  {careers
                    .filter((value) => value.isHot === true)
                    .map((career) => (
                      <Grid key={career.id} xs={12} item>
                        <Typography
                          sx={{
                            cursor: 'pointer',
                            '&:hover': {
                              color: '#fca34d',
                              fontWeight: 'bold',
                            },
                          }}
                          onClick={() => handleFilter(career.id)}
                        >
                          {career?.name}
                        </Typography>
                      </Grid>
                    ))}
                </Grid>
              </Stack>
            </Alert>
          </Grid>
          <Grid item sm={7} md={9}>
            <Stack sx={{ p: 2 }}>
              <Typography variant="h6">Ngành nghề khác</Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                {careers
                  .filter((value) => value.isHot !== true)
                  .map((career) => (
                    <Grid
                      key={career.id}
                      xs={4}
                      sm={6}
                      md={6}
                      lg={4}
                      xl={4}
                      item
                    >
                      <Typography
                        sx={{
                          cursor: 'pointer',
                          '&:hover': {
                            color: '#fca34d',
                            fontWeight: 'bold',
                          },
                        }}
                        onClick={() => handleFilter(career.id)}
                      >
                        {career?.name}
                      </Typography>
                    </Grid>
                  ))}
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const MobileContent = (setOpen, careers, handleFilter) => {
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
          {careers.map((career) => (
            <Grid key={career.id} xs={12} sm={6} md={6} item>
              <Typography
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#fca34d',
                    fontWeight: 'bold',
                  },
                }}
                onClick={() => handleFilter(career.id)}
              >
                {career?.name}{' '}
                {career.isHot && (
                  <Chip label="Hot" size="small" color="error" />
                )}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

const SubHeaderDialog = ({ open, setOpen, topCareers, handleFilter }) => {
  const { allConfig } = useSelector((state) => state.config);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const customCareers = (allCareers, topCareers) => {
    var topCarrersId = topCareers.map((value) => value.id);
    var careerResult = [];

    for (let i = 0; i < (allConfig?.careerOptions || []).length; i++) {
      if (topCarrersId.includes(allConfig?.careerOptions[i].id)) {
        careerResult.push({ ...allConfig?.careerOptions[i], isHot: true });
      } else {
        careerResult.push({ ...allConfig?.careerOptions[i], isHot: false });
      }
    }
    console.log(careerResult);
    return careerResult;
  };

  const careers = React.useMemo(
    () => customCareers(allConfig?.careerOptions || [], topCareers),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [topCareers]
  );

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
        {fullScreen
          ? MobileContent(setOpen, careers, handleFilter)
          : DesktopContent(setOpen, careers, handleFilter)}
      </Container>
    </Dialog>
  );
};

export default SubHeaderDialog;
