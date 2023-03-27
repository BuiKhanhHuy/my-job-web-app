import React from 'react';
import {
  Avatar,
  Box,
  Card,
  Chip,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import RoomIcon from '@mui/icons-material/Room';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const JobPost = () => {
  return (
    <Card variant="outlined" sx={{ p: 1 }}>
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
            sx={{ mr: 0.75 }}
            size="small"
            icon={<MonetizationOnIcon />}
            label="15tr - 20tr"
          />
          <Chip size="small" icon={<RoomIcon />} label="Thừa Thiên Huế" />
        </Box>
        <Box>
          <IconButton aria-label="save" size="small" color="primary">
            <BookmarkAddedIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </Stack>
    </Card>
  );
};

export default JobPost;
