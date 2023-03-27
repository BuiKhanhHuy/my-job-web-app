import * as React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import DevicesIcon from '@mui/icons-material/Devices';

import JobPosts from '../../../components/JobPosts';
import TopCompanyCarousel from '../../../components/TopCompanyCarousel';
import CareerCarousel from '../../../components/CareerCarousel';
import FeedbackCarousel from '../../../components/FeedbackCarousel';
import JobByCategory from '../../components/defaults/JobByCategory';

export default function HomePage() {
  return (
    <>
      {/*Start: Top cong ty */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ mb: 3 }} gutterBottom>
          Các công ty hàng đầu
        </Typography>
        <TopCompanyCarousel />
      </Box>
      {/*End: Top cong ty */}

      {/*Start: Viec lam tuyen gap */}
      <Box sx={{ mt: 10 }}>
        <Card variant="outlined">
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: 'white' }} aria-label="recipe">
                <AccessAlarmsIcon color="secondary" />
              </Avatar>
            }
            title={
              <Typography variant="h5" sx={{ color: 'white' }}>
                Việc làm tuyển gấp
              </Typography>
            }
            sx={{ backgroundColor: '#441da0' }}
          />
          <CardContent>
            <Box sx={{ p: 2 }}>
              <JobPosts />
            </Box>
          </CardContent>
        </Card>
      </Box>
      {/*End: Viec lam tuyen gap */}

      {/* Start: Cac nganh nghe */}
      <Box sx={{ mt: 10 }}>
        <Typography variant="h5" sx={{ mb: 3 }} gutterBottom>
          Ngành nghề trọng điểm
        </Typography>
        <CareerCarousel />
      </Box>
      {/* End: Cac nganh nghe */}

      {/* Start: Viec lam goi y */}
      <Box sx={{ mt: 10 }}>
        <Card variant="outlined">
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: 'white' }} aria-label="recipe">
                <TipsAndUpdatesIcon color="secondary" />
              </Avatar>
            }
            title={
              <Typography variant="h5" sx={{ color: 'white' }}>
                Việc làm gợi ý
              </Typography>
            }
            sx={{ backgroundColor: '#441da0' }}
          />
          <CardContent>
            <Box sx={{ p: 2 }}>
              <JobPosts />
            </Box>
          </CardContent>
        </Card>
      </Box>
      {/* End: Viec lam goi y */}

      {/* Start: Viec lam nganh IT phan mem */}
      <Box sx={{ mt: 10 }}>
        <Card variant="outlined">
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: 'white' }} aria-label="recipe">
                <DevicesIcon color="secondary" />
              </Avatar>
            }
            title={
              <Typography variant="h5" sx={{ color: 'white' }}>
                Việc làm nổi bậc ngành IT-Phần mềm
              </Typography>
            }
            sx={{ backgroundColor: '#441da0' }}
          />
          <CardContent>
            <Box sx={{ p: 2 }}>
              <JobPosts />
            </Box>
          </CardContent>
        </Card>
      </Box>
      {/* End: Viec lam nganh IT phan mem */}

      {/* Start: Viec lam nganh IT phan cung */}
      <Box sx={{ mt: 10 }}>
        <Card variant="outlined">
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: 'white' }} aria-label="recipe">
                <DeveloperBoardIcon color="secondary" />
              </Avatar>
            }
            title={
              <Typography variant="h5" sx={{ color: 'white' }}>
                Việc làm nổi bậc ngành IT-Phần cứng
              </Typography>
            }
            sx={{
              backgroundColor: '#441da0',
            }}
          />
          <CardContent>
            <Box sx={{ p: 2 }}>
              <JobPosts />
            </Box>
          </CardContent>
        </Card>
      </Box>
      {/* End: Viec lam nganh IT phan cung */}

      {/* Start: Feedback */}
      <Box sx={{ mt: 10 }}>
        <Typography variant="h5" sx={{ mb: 3 }} gutterBottom>
          Người dùng đánh giá
        </Typography>
        <FeedbackCarousel />
      </Box>
      {/* End: Feedback */}

      {/* Start: Job by category */}
      <Box sx={{ mt: 10 }}>
        <Card sx={{ boxShadow: 0 }}>
          <CardContent>
            <Box sx={{ py: 4, px: 6 }}>
              <JobByCategory />
            </Box>
          </CardContent>
        </Card>
      </Box>
      {/* End: Job by category */}
    </>
  );
}
