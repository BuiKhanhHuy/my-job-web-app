import React from 'react';
import {
  Box,
  Card,
  Divider,
  Stack,
  Tooltip as MuiTooltip,
  Typography,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import dayjs from 'dayjs';

import RangePickerCustom from '../../../../../components/controls/RangePickerCustom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      type: 'bar',
      label: 'Dataset 1',
      backgroundColor: 'red',
      data: [10, 20, 30, 40, 50, 60, 70],
    },
    {
      type: 'bar',
      label: 'Dataset 2',
      backgroundColor: 'blue',
      data: [20, 30, 40, 50, 60, 70, 80],
    },
    {
      type: 'line',
      label: 'Dataset 3',
      backgroundColor: 'green',
      data: [30, 40, 50, 60, 70, 80, 90],
    },
  ],
};

const options = {
  scales: {
    xAxes: [
      {
        stacked: true,
      },
    ],
    yAxes: [
      {
        stacked: true,
      },
    ],
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
};

const ApplicationChart = ({ title }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [allowSubmit, setAllowSubmit] = React.useState(false);
  const [selectedDateRange, setSelectedDateRange] = React.useState([
    dayjs(new Date()).subtract(1, 'month'),
    dayjs(new Date()),
  ]);

  return (
    <>
      <Card sx={{ p: 2 }}>
        <Stack>
          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography fontWeight="bold">{title}</Typography>
              <MuiTooltip
                title="Thống kê chỉ số tương quan giữa nhu cầu tuyển dụng và lượt hồ sơ ứng tuyển"
                arrow
              >
                <InfoIcon color="disabled" />
              </MuiTooltip>
            </Stack>
          </Box>
          <Divider sx={{ mt: 2, mb: 3 }} />
          <Box sx={{ px: 1 }}>
            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={0.75}
              mb={1}
            >
              <RangePickerCustom
                allowSubmit={allowSubmit}
                setAllowSubmit={setAllowSubmit}
                selectedDateRange={selectedDateRange}
                setSelectedDateRange={setSelectedDateRange}
              />
            </Stack>
            <Stack justifyContent="center" alignItems="center" height={300}>
              <Bar data={data} options={options} />
            </Stack>
          </Box>
        </Stack>
      </Card>
    </>
  );
};

export default ApplicationChart;
