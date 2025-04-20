/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

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

import { Empty } from 'antd';

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
import statisticService from '../../../../../services/statisticService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 20,
        usePointStyle: true,
        pointStyle: 'circle',
        font: {
          size: 12
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      titleColor: '#212529',
      bodyColor: '#212529',
      padding: 12,
      boxPadding: 6,
      borderColor: 'rgba(0,0,0,0.1)',
      borderWidth: 1,
      usePointStyle: true,
    }
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false
      },
      ticks: {
        font: {
          size: 12
        }
      }
    },
    y: {
      grid: {
        color: 'rgba(0,0,0,0.05)',
        drawBorder: false
      },
      ticks: {
        font: {
          size: 12
        }
      }
    }
  }
};

const ApplicationChart = ({ title }) => {
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
        const resData = await statisticService.employerApplicationStatistics(data);

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

  const dataOptions = React.useMemo(() => ({
    labels: data?.labels || [],
    datasets: [
      {
        type: 'line',
        label: data?.title2,
        borderColor: 'rgba(68, 29, 160, 1)', // primary.main
        backgroundColor: 'rgba(68, 29, 160, 0.1)',
        data: data?.data2 || [],
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointBorderWidth: 2,
        pointHoverBorderWidth: 2,
      },
      {
        type: 'bar',
        label: data?.title1,
        backgroundColor: 'rgba(255, 152, 0, 0.9)', // secondary.main
        data: data?.data1 || [],
        borderRadius: 4,
        barThickness: 12,
        maxBarThickness: 12
      },
    ],
  }), [data]);

  return (
    <Card 
      sx={{ 
        p: 3,
        boxShadow: theme => theme.customShadows.card,
        border: theme => `1px solid ${theme.palette.grey[100]}`,
        height: '100%'
      }}
    >
      <Stack spacing={3}>
        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5" color="text.primary">
              {title}
            </Typography>
            <MuiTooltip
              title="Thống kê chỉ số tuyển dụng trong vòng 1 tháng gần nhất"
              arrow
              placement="left"
            >
              <InfoIcon
                sx={{
                  color: 'grey.400',
                  cursor: 'pointer',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              />
            </MuiTooltip>
          </Stack>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box>
          <Stack direction="row" justifyContent="flex-end" spacing={1} mb={3}>
            <RangePickerCustom
              allowSubmit={allowSubmit}
              setAllowSubmit={setAllowSubmit}
              selectedDateRange={selectedDateRange}
              setSelectedDateRange={setSelectedDateRange}
            />
          </Stack>

          <Box sx={{ position: 'relative', minHeight: 320 }}>
            {isLoading ? (
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{ height: 320 }}
              >
                <CircularProgress 
                  size={40}
                  thickness={3}
                  sx={{
                    color: 'primary.main'
                  }}
                />
              </Stack>
            ) : data.length === 0 ? (
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  height: 320,
                  bgcolor: 'grey.50',
                  borderRadius: 2
                }}
              >
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <Typography variant="body2" color="text.secondary">
                      Không có dữ liệu để thống kê
                    </Typography>
                  }
                />
              </Stack>
            ) : (
              <Box sx={{ height: 320 }}>
                <Bar options={options} data={dataOptions} />
              </Box>
            )}
          </Box>
        </Box>
      </Stack>
    </Card>
  );
};

export default ApplicationChart;
