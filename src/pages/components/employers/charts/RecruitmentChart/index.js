import React from 'react';
import {
  Box,
  Card,
  Divider,
  Stack,
  Tooltip as MuiTooltip,
  Typography,
  CircularProgress,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import dayjs from 'dayjs';

import RangePickerCustom from '../../../../../components/controls/RangePickerCustom';
import statisticService from '../../../../../services/statisticService';
import { Empty } from 'antd';

const colors = [
  'rgba(255, 159, 64, 0.9)',
  'rgba(255, 206, 86, 0.9)',
  'rgba(153, 102, 255, 0.9)',
  'rgba(54, 162, 235, 0.9)',
  'rgba(75, 192, 192, 0.9)',
  'rgba(255, 99, 132, 0.9)',
];

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const RecruitmentChart = ({ title }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [allowSubmit, setAllowSubmit] = React.useState(false);
  const [selectedDateRange, setSelectedDateRange] = React.useState([
    dayjs(new Date()).subtract(1, 'month'),
    dayjs(new Date()),
  ]);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const statistics = async (data) => {
      setIsLoading(true);
      try {
        const resData = await statisticService.employerRecruitmentStatistics(data);

        setData(resData.data);
      } catch (error) {
        console.error('Error: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    statistics({
      startDate: dayjs(selectedDateRange[0]).format('YYYY-MM-DD').toString(),
      endDate: dayjs(selectedDateRange[1]).format('YYYY-MM-DD').toString(),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowSubmit]);

  const dataOptions = React.useMemo(() => {
    var datasets = [];
    for (let i = data.length - 1; i >= 0; i--) {
      datasets.push({
        label: data[i]?.label,
        data: data[i]?.data || [],
        backgroundColor: colors[i],
        stack: 'Stack 0',
      });
    }

    const d = {
      labels: [''],
      datasets: datasets,
    };

    return d;
  }, [data]);

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
                title="Thống kê chỉ số tuyển dụng trong vòng 1 tháng gần nhất"
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
            <Stack justifyContent="center" alignItems="center">
              {isLoading ? (
                <CircularProgress color="secondary" />
              ) : data.length === 0 ? (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="Không có dữ liệu để thống kê"
                />
              ) : (
                <Bar options={options} data={dataOptions}  height={320}/>
              )}
            </Stack>
          </Box>
        </Stack>
      </Card>
    </>
  );
};

export default RecruitmentChart;
