/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Chip,
  IconButton,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import RoomIcon from '@mui/icons-material/Room';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import dayjs from 'dayjs';

import { salaryString } from '../../utils/customData';
import { useSelector } from 'react-redux';
import { CV_TYPES, ROUTES } from '../../configs/constants';
import { formatRoute } from '../../utils/funcUtils';
import defaultTheme from '../../themeConfigs/defaultTheme';

const JobSeekerProfile = ({
  id,
  slug,
  title,
  salaryMin,
  salaryMax,
  experience,
  updateAt,
  isSaved,
  viewEmployerNumber,
  city,
  user,
  jobSeekerProfile,
  type,
  lastViewedDate,
  handleSave,
}) => {
  const nav = useNavigate();
  const { allConfig } = useSelector((state) => state.config);

  return (
    <Card
      sx={{
        p: 2,
        transition: 'all 0.3s ease',
        border: `1px solid ${defaultTheme.palette.grey[200]}`,
        backgroundColor: defaultTheme.palette.background.paper,
        '&:hover': {
          borderColor: defaultTheme.palette.primary.main,
          backgroundColor: defaultTheme.palette.primary.background,
          transform: 'translateY(-2px)',
          boxShadow: defaultTheme.customShadows.card,
        },
      }}
      variant="outlined"
    >
      <Stack
        direction={{
          xs: 'column',
          sm: 'column',
          md: 'row',
          lg: 'row',
          xl: 'row',
        }}
        justifyContent="space-between"
        spacing={2}
      >
        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontSize: '1rem',
                fontWeight: 600,
                color: defaultTheme.palette.grey[800],
                '&:hover': {
                  color: defaultTheme.palette.primary.main,
                }
              }}
            >
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => nav(`/${formatRoute(ROUTES.EMPLOYER.PROFILE_DETAIL, slug)}`)}
              >
                {user?.fullName || (
                  <Typography
                    component="span"
                    sx={{
                      color: defaultTheme.palette.text.placeholder,
                      fontStyle: 'italic',
                      ...defaultTheme.palette.text.italic
                    }}
                  >
                    Chưa cập nhật
                  </Typography>
                )}
                <Typography
                  component="span"
                  sx={{
                    color: defaultTheme.palette.grey[600],
                    ml: 0.5,
                    fontSize: '0.95rem'
                  }}
                >
                  (
                  {jobSeekerProfile?.old || (
                    <span style={defaultTheme.palette.text.italic}>
                      Chưa cập nhật
                    </span>
                  )}{' '}
                  tuổi)
                </Typography>
              </span>
            </Typography>
            {lastViewedDate && (
              <Chip
                icon={<CheckCircleRoundedIcon />}
                label={`Xem lần cuối: ${dayjs(lastViewedDate).format(
                  'DD/MM/YYYY HH:mm'
                )}`}
                color="success"
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: '6px',
                  backgroundColor: defaultTheme.palette.success.background,
                  borderColor: defaultTheme.palette.success.light,
                  '& .MuiChip-label': {
                    px: 1,
                  }
                }}
              />
            )}
          </Stack>

          <Typography 
            variant="h6"
            sx={{
              cursor: 'pointer',
              color: defaultTheme.palette.primary.main,
              fontWeight: 500,
              '&:hover': {
                color: defaultTheme.palette.primary.dark,
              }
            }}
            onClick={() => nav(`/${formatRoute(ROUTES.EMPLOYER.PROFILE_DETAIL, slug)}`)}
          >
            {type === CV_TYPES.cvUpload && (
              <FontAwesomeIcon
                icon={faFilePdf}
                style={{ marginRight: 8 }}
                color={defaultTheme.palette.error.main}
              />
            )}
            {title || (
              <Typography
                component="span"
                sx={defaultTheme.palette.text.italic}
              >
                Chưa cập nhật
              </Typography>
            )}
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
            <Chip
              size="small"
              icon={<MonetizationOnIcon />}
              label={
                salaryString(salaryMin, salaryMax) || (
                  <Typography component="span" sx={defaultTheme.palette.text.italic}>
                    Chưa cập nhật
                  </Typography>
                )
              }
              sx={{
                backgroundColor: defaultTheme.palette.secondary.background,
                color: defaultTheme.palette.secondary.dark,
                '&:hover': {
                  backgroundColor: defaultTheme.palette.secondary.backgroundHover,
                }
              }}
            />
            <Chip
              size="small"
              icon={<WorkOutlineOutlinedIcon />}
              label={
                allConfig.experienceDict[experience] || (
                  <Typography component="span" sx={defaultTheme.palette.text.italic}>
                    Chưa cập nhật
                  </Typography>
                )
              }
              sx={{
                backgroundColor: defaultTheme.palette.primary.background,
                color: defaultTheme.palette.primary.main,
              }}
            />
            <Chip
              size="small"
              icon={<RoomIcon />}
              label={
                allConfig.cityDict[city] || (
                  <Typography component="span" sx={defaultTheme.palette.text.italic}>
                    Chưa cập nhật
                  </Typography>
                )
              }
              sx={{
                backgroundColor: defaultTheme.palette.info.background,
                color: defaultTheme.palette.info.main,
              }}
            />
          </Stack>
        </Stack>

        <Stack
          alignItems={{
            xs: 'flex-start',
            sm: 'flex-start',
            md: 'flex-end',
            lg: 'flex-end',
            xl: 'flex-end',
          }}
          spacing={1}
        >
          <Stack direction="row" spacing={1}>
            <Tooltip title="Lưu hồ sơ" arrow>
              <IconButton
                aria-label="save"
                size="small"
                onClick={() => handleSave(slug)}
                sx={{
                  color: isSaved ? defaultTheme.palette.error.main : defaultTheme.palette.grey[400],
                  '&:hover': {
                    backgroundColor: defaultTheme.palette.error.background,
                  }
                }}
              >
                {isSaved ? (
                  <FavoriteIcon fontSize="small" />
                ) : (
                  <FavoriteBorderOutlinedIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title="Xem hồ sơ" arrow>
              <IconButton 
                aria-label="view" 
                size="small"
                onClick={() => nav(`/${formatRoute(ROUTES.EMPLOYER.PROFILE_DETAIL, slug)}`)}
                sx={{
                  color: defaultTheme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: defaultTheme.palette.primary.background,
                  }
                }}
              >
                <RemoveRedEyeOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>

          <Typography 
            variant="caption"
            sx={{
              color: defaultTheme.palette.grey[600],
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}
          >
            Cập nhật: {dayjs(updateAt).format('DD/MM/YYYY')}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: defaultTheme.palette.grey[600],
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}
          >
            <RemoveRedEyeOutlinedIcon 
              sx={{ 
                fontSize: '1rem',
                color: defaultTheme.palette.grey[500]
              }} 
            />
            {viewEmployerNumber} NTD quan tâm
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

const Loading = () => (
  <>
    <Card sx={{ p: 1, boxShadow: 0 }}>
      <Stack
        direction={{
          xs: 'column',
          sm: 'column',
          md: 'row',
          lg: 'row',
          xl: 'row',
        }}
        justifyContent="space-between"
        spacing={1.5}
      >
        <Stack direction="column" flex={1}>
          <Skeleton />
          <Skeleton />
          <Stack direction="row" spacing={1}>
            <Skeleton width={'20%'} />
            <Skeleton width={'20%'} />
            <Skeleton width={'20%'} />
          </Stack>
        </Stack>
        <Stack
          alignItems={{
            xs: 'flex-start',
            sm: 'flex-start',
            md: 'flex-end',
            lg: 'flex-end',
            xl: 'flex-end',
          }}
        >
          <Skeleton width={150} />
          <Skeleton width={100} />
          <Skeleton width={150} />
        </Stack>
      </Stack>
    </Card>
  </>
);

JobSeekerProfile.Loading = Loading;

export default JobSeekerProfile;
