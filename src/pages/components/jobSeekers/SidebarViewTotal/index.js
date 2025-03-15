import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';

import statisticService from '../../../../services/statisticService';
import { ROUTES } from '../../../../configs/constants';

const SidebarViewTotal = () => {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const statistics = async () => {
      setIsLoading(true);
      try {
        const resData = await statisticService.jobSeekerTotalView();

        setData(resData.data);
      } catch (error) {
        console.error('Error: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    statistics();
  }, []);

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
              {isLoading ? (
                <CircularProgress color="secondary" />
              ) : data === null ? (
                '---'
              ) : (
                data?.totalView
              )}
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
        <Button
          variant="contained"
          size="small"
          onClick={() => nav(`/${ROUTES.JOB_SEEKER.JOBS}`)}
        >
          Khám phá ngay
        </Button>
      </Stack>
    </Box>
  );
};

export default SidebarViewTotal;
