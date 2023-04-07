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
  Tooltip,
} from '@mui/material';

import HelpIcon from '@mui/icons-material/Help';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteForever from '@mui/icons-material/DeleteForever';
import downloadPdf from '../../utils/funcUtils';

const ProfileUploadCard = ({
  resumeImage,
  fileUrl,
  title,
  updateAt,
  slug,
  id,
  isActive,
  handleDelete,
  handleActive,
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
        <Stack direction="row" justifyContent="flex-end" sx={{ marginTop: 1 }}>
          {isActive ? (
            <Chip
              sx={{ ml: 1 }}
              size="small"
              icon={<StarIcon color="warning" />}
              color="success"
              label="Cho phép tìm kiếm"
              onClick={() => handleActive(slug)}
            />
          ) : (
            <Chip
              variant="outlined"
              sx={{ ml: 1 }}
              size="small"
              icon={<StarOutlineIcon color="warning" />}
              color="success"
              label="Cho phép tìm kiếm"
              onClick={() => handleActive(slug)}
            />
          )}
          <Tooltip
           title={`Bật "Cho phép tìm kiếm" sẽ giúp nhà tuyển dụng tìm thấy hồ sơ của bạn và họ có thể liên hệ với bạn về công việc mới. Chỉ có duy nhất một hồ được bật trạng thái "cho phép tìm kiếm" trong tất cả hồ sơ của bạn.`}
            arrow
          >
            <HelpIcon color="disabled" />
          </Tooltip>
        </Stack>
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
                  sx={{ ml: 1, color: 'white' }}
                  size="small"
                  icon={<DownloadIcon />}
                  color="secondary"
                  label="Tải xuống"
                  onClick={() => downloadPdf(fileUrl, title)}
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
