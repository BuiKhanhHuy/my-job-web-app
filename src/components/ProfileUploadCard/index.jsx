/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

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
import downloadPdf, { formatRoute } from '../../utils/funcUtils';
import { ROUTES } from '../../configs/constants';
import defaultTheme from '../../themeConfigs/defaultTheme';

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
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
        boxShadow: (theme) => theme.customShadows.card,
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.customShadows.large,
        }
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
          height: '100%',
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
          background: 'linear-gradient(180deg, rgba(33, 47, 63, 0) 0%, rgba(33, 47, 63, 0.8) 50%, rgba(33, 47, 63, 0.95) 100%)',
        }}
      >
        <Stack direction="row" justifyContent="flex-end" sx={{ margin: 2 }}>
          {isActive ? (
            <Chip
              sx={{
                backdropFilter: 'blur(8px)',
                backgroundColor: 'rgba(46, 125, 50, 0.85)',
                '& .MuiChip-label': {
                  color: 'white',
                }
              }}
              size="small"
              icon={<StarIcon sx={{ color: 'warning.main' }} />}
              label="Cho phép tìm kiếm"
              onClick={() => handleActive(slug)}
            />
          ) : (
            <Chip
              sx={{
                backdropFilter: 'blur(8px)',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                '& .MuiChip-label': {
                  color: 'white',
                }
              }}
              size="small"
              icon={<StarOutlineIcon sx={{ color: 'warning.main' }} />}
              label="Cho phép tìm kiếm"
              onClick={() => handleActive(slug)}
            />
          )}
          <Tooltip
            title={`Bật "Cho phép tìm kiếm" sẽ giúp nhà tuyển dụng tìm thấy hồ sơ của bạn và họ có thể liên hệ với bạn về công việc mới. Chỉ có duy nhất một hồ được bật trạng thái "cho phép tìm kiếm" trong tất cả hồ sơ của bạn.`}
            arrow
          >
            <HelpIcon sx={{ ml: 1, color: 'rgba(255, 255, 255, 0.7)' }} />
          </Tooltip>
        </Stack>

        <Box
          sx={{
            position: 'absolute',
            zIndex: 3,
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            color: 'white',
          }}
        >
          <Stack spacing={2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>{title}</Typography>
              <IconButton
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(8px)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                  }
                }}
                size="small"
                onClick={() => nav(`/${ROUTES.JOB_SEEKER.DASHBOARD}/${formatRoute(ROUTES.JOB_SEEKER.ATTACHED_PROFILE, slug)}`)}
              >
                <EditIcon sx={{ color: 'white' }} />
              </IconButton>
            </Stack>

            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              Cập nhật lần cuối: {dayjs(updateAt).format('DD/MM/YYYY HH:mm:ss')}
            </Typography>

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Chip
                sx={{
                  backdropFilter: 'blur(8px)',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  '& .MuiChip-label': {
                    color: 'white',
                  }
                }}
                size="small"
                icon={<DownloadIcon sx={{ color: defaultTheme.palette.secondary.main }} />}
                label="Tải xuống"
                onClick={() => downloadPdf(fileUrl, title)}
              />
              <IconButton
                sx={{
                  bgcolor: 'rgba(211, 47, 47, 0.1)',
                  backdropFilter: 'blur(8px)',
                  '&:hover': {
                    bgcolor: 'rgba(211, 47, 47, 0.2)',
                  }
                }}
                size="small"
                onClick={() => handleDelete(slug)}
              >
                <DeleteForever sx={{ color: 'error.light' }} />
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
