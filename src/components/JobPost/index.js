import React from 'react';
import {
  Avatar,
  Box,
  Card,
  Chip,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
// import { makeStyles } from '@material-ui/core/styles';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import RoomIcon from '@mui/icons-material/Room';
import AlarmIcon from '@mui/icons-material/Alarm';

// const useStyles = makeStyles((theme) => ({
//   customHoverFocus: {
//     textDecoration: 'inherit',
//     color: 'inherit',
//     '&:hover, &.Mui-focusVisible': { borderColor: '#308edb' },
//   },
// }));

const JobPost = () => {
  // const classes = useStyles();

  return (
    <Card variant="outlined" sx={{ p: 1 }} 
    // className={classes.customHoverFocus}
    >
      <Stack direction="row" spacing={1}>
        <Box>
          <Avatar
            sx={{
              width: 60,
              height: 60,
              border: 0.5,
              borderColor: '#e0e0e0',
              borderRadius: 1.5,
              p: 0.5,
            }}
            src="https://cdn1.vieclam24h.vn/images/employer_avatar/2023/02/27/fc86c14afad9208779c8_167748592630.w-62.h-62.padding-1.jpg?v=220513"
            alt="H"
          />
        </Box>
        <Box flex={1}>
          <Typography variant="subtitle2" sx={{ fontSize: 15 }} gutterBottom>
            Hồ Chí Minh - Thư Ký Phó Tổng
          </Typography>
          <Typography variant="subtitle2" color="gray">
            Công Ty Cổ Phần Thiết Bị Y Sinh
          </Typography>
        </Box>
        <Box>
          <span
            style={{
              padding: 0,
              fontSize: 12,
              fontWeight: 'bold',
              color: 'red',
            }}
          >
            HOT
          </span>
          <span style={{ color: '#bdbdbd' }}> | </span>
          <span
            style={{
              padding: 0,
              fontSize: 12,
              fontWeight: 'bold',
              color: 'orange',
            }}
          >
            Tuyển gấp
          </span>
        </Box>
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        sx={{ mt: 0.75 }}
        justifyContent="space-between"
      >
        <Box>
          <Chip
            sx={{ mr: 0.75, fontSize: 12 }}
            size="small"
            icon={<MonetizationOnIcon />}
            label="15tr - 20tr"
          />
          <Chip
            sx={{ mr: 0.75, fontSize: 12 }}
            size="small"
            icon={<RoomIcon />}
            label="Thừa Thiên Huế"
          />
          <Chip
            sx={{ fontSize: 12 }}
            size="small"
            icon={<AlarmIcon />}
            label="27/02/2001"
          />
        </Box>
      </Stack>
    </Card>
  );
};

const Loading = () => (
  <>
    <Card sx={{ p: 1, boxShadow: 0 }}>
      <Stack direction="row" spacing={1}>
        <Box>
          <Skeleton variant="rounded" width={60} height={60} />
        </Box>
        <Box flex={1}>
          <Typography variant="subtitle2" sx={{ fontSize: 15 }} gutterBottom>
            <Skeleton height={30} />
          </Typography>
          <Typography variant="subtitle2" color="gray">
            <Skeleton />
          </Typography>
        </Box>
        <Box>
          <Skeleton height={30} width={60} />
        </Box>
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        sx={{ mt: 0.75 }}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Skeleton width={80} />
          <Skeleton width={80} />
          <Skeleton width={80} />
        </Stack>
      </Stack>
    </Card>
  </>
);

JobPost.Loading = Loading;

export default JobPost;
