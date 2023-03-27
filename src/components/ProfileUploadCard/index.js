import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  Box,
  IconButton,
  Typography,
  Stack,
  Chip,
  Skeleton,
} from '@mui/material';

import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import ReplyIcon from '@mui/icons-material/Reply';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteForever from '@mui/icons-material/DeleteForever';

const ProfileUploadCard = ({
  resumeImage,
  fileUrl,
  title,
  updateAt,
  slug,
  id,
  handleDelete,
}) => {
  const nav = useNavigate();

  return (
    <Box
      sx={{
        height: 310,
        bgcolor: 'lightblue',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 1,
      }}
    >
      <img
        src={resumeImage}
        style={{
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          width: '100%',
        }}
        alt="BG"
      />
      <Box
        sx={{
          height: '100%',
          width: '100%',
          bottom: 0,
          left: 0,
          zIndex: 2,
          position: 'absolute',
          background: 'linear-gradient(180deg,hsla(0,0%,100%,0),#212f3f)',
        }}
      >
        <Box sx={{ position: 'absolute', right: 16, top: 16 }}>
          {' '}
          <Chip
            sx={{ ml: 1 }}
            size="small"
            icon={<StarIcon color="warning" />}
            color="success"
            label="Đặt làm CV chính"
            onClick={() => {}}
          />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            zIndex: 3,
            bottom: 16,
            left: 16,
            color: 'white',
          }}
        >
          <Stack spacing={1}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>{title}</Typography>
              <IconButton
                aria-label="delete"
                color="warning"
                size="small"
                onClick={() => nav(`/ung-vien/ho-so-dinh-kem/${slug}`)}
              >
                <EditIcon />
              </IconButton>
            </Stack>
            <Box>
              <Typography variant="caption">
                Cập nhật lần cuối:{' '}
                {dayjs(updateAt).format('DD/MM/YYYY HH:mm:ss')}
              </Typography>
            </Box>
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  sx={{ color: 'white' }}
                  size="small"
                  icon={<ReplyIcon />}
                  color="secondary"
                  label="Chia sẻ"
                  onClick={() => {}}
                />
                  <Chip
                    sx={{ ml: 1, color: 'white' }}
                    size="small"
                    icon={<DownloadIcon />}
                    color="secondary"
                    label="Tải xuống"
                    onClick={() => {}}
                  />
              </Stack>
              <IconButton
                aria-label="delete"
                color="error"
                size="small"
                onClick={() => handleDelete(slug)}
              >
                <DeleteForever />
              </IconButton>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

const Loading = () => (
  <Box
    sx={{
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <Stack spacing={1}>
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Stack direction="row" spacing={2} alignItems="center">
        <Skeleton variant="circular" width={50} height={50} />
        <Typography flex={1}>
          <Skeleton />
        </Typography>
      </Stack>
      <Skeleton variant="rectangular" height={80} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
    </Stack>
  </Box>
);

ProfileUploadCard.Loading = Loading;

export default ProfileUploadCard;
