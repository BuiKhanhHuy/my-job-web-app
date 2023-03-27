import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';

const SidebarViewTotal = () => {
  return (
    <Box>
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          CV của bạn đã đủ tốt?
        </Typography>
        <Typography variant="caption">
          Bao nhiêu NTD đang quan tâm tới Hồ sơ của bạn?
        </Typography>
      </Box>
      <Box sx={{ pt: 2 }}>
        <Stack direction="row" spacing={2}>
          <Box>
            <Avatar sx={{ width: 80, height: 80, bgcolor: '#441da0' }}>
              24
            </Avatar>
          </Box>
          <Box>
            <Typography variant="body1">
              Mỗi lượt Nhà tuyển dụng xem CV mang đến một cơ hội để bạn gần hơn
              với công việc phù hợp.
            </Typography>
          </Box>
        </Stack>
      </Box>
      <Stack sx={{ pt: 3 }} direction="row" justifyContent="flex-end">
        <Button variant="contained" size="small">
          Khám phá ngay
        </Button>
      </Stack>
    </Box>
  );
};

export default SidebarViewTotal;
