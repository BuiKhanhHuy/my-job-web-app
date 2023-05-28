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
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
  maintainAspectRatio: false,
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

  const dataOptions = React.useMemo(() => {
    const dataOptions = {
      labels: data?.labels || [],
      datasets: [
        {
          label: '# Số lượng ứng tuyển',
          data: data?.data || [],
          backgroundColor: data?.backgroundColor || [],
          borderWidth: 0,
        },
      ],
    };

    return dataOptions;
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
    </>
  );
};

export default HiringAcademicChart;
