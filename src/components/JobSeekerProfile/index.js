import React from 'react';
import {
  Box,
  Card,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import RoomIcon from '@mui/icons-material/Room';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const JobSeekerProfile = () => {
  return (
    <Card sx={{ p: 1.5 }} variant="outlined">
      <Stack direction={{xs: "column", sm: 'column', md: 'row', lg: 'row', xl: 'row'}} justifyContent="space-between" spacing={2}>
        <Stack spacing={0.5}>
          <Typography variant="subtitle2" sx={{ fontSize: 16 }}>
            Bùi Khánh Huy <span style={{ color: 'gray' }}>(22 tuổi)</span>
          </Typography>
          <Typography gutterBottom variant="body1">
            Lập trình viên Python
          </Typography>
          <Stack direction="row" spacing={1}>
            <Box>
              <Chip
                sx={{ mr: 1 }}
                size="small"
                icon={<MonetizationOnIcon />}
                label="15tr - 20tr"
              />
              <Chip
                sx={{ mr: 1 }}
                size="small"
                icon={<WorkOutlineOutlinedIcon />}
                label="Trên 5 năm kinh nghiệm"
              />
              <Chip size="small" icon={<RoomIcon />} label="Thừa Thiên Huế" />
            </Box>
          </Stack>
        </Stack>
        <Stack alignItems={{xs:'flex-start', sm: 'flex-start', md: 'flex-end', lg: 'flex-end', xl: 'flex-end'}}>
          <Box>
            <Tooltip title="Lưu hồ sơ" arrow>
              <IconButton aria-label="save" size="small">
                <FavoriteBorderOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xem hồ sơ" arrow>
              <IconButton aria-label="view" size="small">
                <RemoveRedEyeOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <Box>
            <Typography variant="caption">
              Thời gian cập nhật: 21/03/2023
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption">NTD quan tâm: 55</Typography>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
};

export default JobSeekerProfile;
