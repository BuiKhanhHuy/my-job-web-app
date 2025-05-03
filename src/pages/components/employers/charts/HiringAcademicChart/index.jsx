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

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import dayjs from 'dayjs';

import RangePickerCustom from '../../../../../components/controls/RangePickerCustom';
import statisticService from '../../../../../services/statisticService';

ChartJS.register(ArcElement, Tooltip, Legend);

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
  }
};

const HiringAcademicChart = ({ title }) => {
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
        const resData =
          await statisticService.employerRecruitmentStatisticsByRank(data);

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
        label: '# Số lượng ứng tuyển',
        data: data?.data || [],
        backgroundColor: [
          'rgba(255, 152, 0, 0.9)',  // secondary
          'rgba(68, 29, 160, 0.9)',  // primary
          'rgba(46, 125, 50, 0.9)',  // success
          'rgba(2, 136, 209, 0.9)',  // info
          'rgba(211, 47, 47, 0.9)',  // error
        ],
        borderWidth: 0,
        borderRadius: 4,
        spacing: 2,
        hoverOffset: 4
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
      <Stack>
        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontWeight="bold">{title}</Typography>
            <MuiTooltip
              title="Thống kê chỉ số ứng tuyển theo trình độ học vấn"
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
              <Pie data={dataOptions} options={options} height={320} />
            )}
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
};

export default HiringAcademicChart;
