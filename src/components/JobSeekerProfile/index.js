import React from 'react';
import {
  Box,
  Card,
  Chip,
  IconButton,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import RoomIcon from '@mui/icons-material/Room';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import { salaryString } from '../../utils/customData';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { CV_TYPES } from '../../configs/constants';

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
  handleSave
}) => {
  const { allConfig } = useSelector((state) => state.config);

  return (
    <Card sx={{ p: 1.5 }} variant="outlined">
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
        <Stack spacing={0.5}>
          <Typography variant="subtitle2" sx={{ fontSize: 16 }}>
            {user?.fullName || (
              <span
                style={{
                  color: '#9e9e9e',
                  fontStyle: 'italic',
                }}
              >
                Chưa cập nhật
              </span>
            )}
            <span style={{ color: 'gray' }}>
              (
              {jobSeekerProfile?.old || (
                <span
                  style={{
                    color: '#9e9e9e',
                    fontStyle: 'italic',
                  }}
                >
                  Chưa cập nhật
                </span>
              )}{' '}
              tuổi)
            </span>
          </Typography>
          <Typography gutterBottom variant="body1">
            {type === CV_TYPES.CV_UPLOAD && <FontAwesomeIcon icon={faFilePdf} style={{marginRight: 5}} color='red'/>}
            {title || (
              <span
                style={{
                  color: '#9e9e9e',
                  fontStyle: 'italic',
                }}
              >
                Chưa cập nhật
              </span>
            )}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Box>
              <Chip
                sx={{ mr: 1 }}
                size="small"
                icon={<MonetizationOnIcon />}
                label={
                  salaryString(salaryMin, salaryMax) || (
                    <span
                      style={{
                        color: '#9e9e9e',
                        fontStyle: 'italic',
                      }}
                    >
                      Chưa cập nhật
                    </span>
                  )
                }
              />
              <Chip
                sx={{ mr: 1 }}
                size="small"
                icon={<WorkOutlineOutlinedIcon />}
                label={
                  allConfig.experienceDict[experience] || (
                    <span
                      style={{
                        color: '#9e9e9e',
                        fontStyle: 'italic',
                      }}
                    >
                      Chưa cập nhật
                    </span>
                  )
                }
              />
              <Chip
                size="small"
                icon={<RoomIcon />}
                label={
                  allConfig.cityDict[city] || (
                    <span
                      style={{
                        color: '#9e9e9e',
                        fontStyle: 'italic',
                      }}
                    >
                      Chưa cập nhật
                    </span>
                  )
                }
              />
            </Box>
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
          <Box>
            <Tooltip title="Lưu hồ sơ" arrow>
              <IconButton aria-label="save" size="small" onClick={() => handleSave(slug)}>
                {isSaved ? (
                  <FavoriteIcon fontSize="small" color="error" />
                ) : (
                  <FavoriteBorderOutlinedIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title="Xem hồ sơ" arrow>
              <IconButton aria-label="view" size="small">
                <RemoveRedEyeOutlinedIcon fontSize="small" color='primary'/>
              </IconButton>
            </Tooltip>
          </Box>
          <Box>
            <Typography variant="caption">
              Thời gian cập nhật: {dayjs(updateAt).format('DD/MM/YYYY')}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption">
              NTD quan tâm: {viewEmployerNumber}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
};

const Loading = () => (
  <>
    <Card sx={{ p: 1.5, boxShadow: 0 }}>
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
