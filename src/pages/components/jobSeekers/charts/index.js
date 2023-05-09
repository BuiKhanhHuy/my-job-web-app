import React from 'react';
import { Box, Stack, CircularProgress } from '@mui/material';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { Empty } from 'antd';
import statisticService from '../../../../services/statisticService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
};

const ActivityChart = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const statistics = async () => {
      setIsLoading(true);
      try {
        const resData = await statisticService.jobSeekerActivityStatistics();
        setData(resData.data);
      } catch (error) {
        console.error('Error: ', error);
      } finally {
        setIsLoading(false);
      }
    };
    statistics();
  }, []);

  const dataOptions = React.useMemo(() => {
    const d = {
      labels: data?.labels || [],
      datasets: [
        {
          label: data?.title1,
          data: data?.data1 || [],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          tension: 0.5,
        },
        {
          label: data?.title2,
          data: data?.data2 || [],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          tension: 0.5,
        },
        {
          label: data?.title3,
          data: data?.data3 || [],
          borderColor: 'rgba(255, 206, 86 )',
          backgroundColor: 'rgba(255, 206, 86, 0.5)',
          tension: 0.5,
        },
      ],
    };

    return d;
  }, [data]);

  return (
    <>
      <Box sx={{ px: 1 }}>
        <Stack justifyContent="center" alignItems="center" height={300}>
          {isLoading ? (
            <CircularProgress color="secondary" />
          ) : data.length === 0 ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Không có dữ liệu để thống kê"
            />
          ) : (
            <Line options={options} data={dataOptions} width={500} />
          )}
        </Stack>
      </Box>
    </>
  );
};

export default ActivityChart;
