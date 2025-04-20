/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from "react";
import { Box, Stack, CircularProgress, Typography } from "@mui/material";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { Empty } from "antd";
import statisticService from "../../../../services/statisticService";
import defaultTheme from "../../../../themeConfigs/defaultTheme";

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
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        padding: 20,
        usePointStyle: true,
        pointStyle: "circle",
      },
    },
    tooltip: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      titleColor: "#212529",
      bodyColor: "#212529",
      borderColor: "#e9ecef",
      borderWidth: 1,
      padding: 12,
      boxPadding: 6,
      usePointStyle: true,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        color: "#f0f1f5",
      },
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
        console.error("Error: ", error);
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
          borderColor: defaultTheme.palette.primary.main,
          backgroundColor: defaultTheme.palette.primary.light,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBackgroundColor: defaultTheme.palette.primary.main,
        },
        {
          label: data?.title2,
          data: data?.data2 || [],
          borderColor: defaultTheme.palette.secondary.main,
          backgroundColor: defaultTheme.palette.secondary.light,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBackgroundColor: defaultTheme.palette.secondary.main,
        },
        {
          label: data?.title3,
          data: data?.data3 || [],
          borderColor: defaultTheme.palette.info.main,
          backgroundColor: defaultTheme.palette.info.light,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBackgroundColor: defaultTheme.palette.info.main,
        },
      ],
    };

    return d;
  }, [data]);

  return (
    <>
      <Box
        sx={{
          px: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
        }}
      >
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: 360 }}
        >
          {isLoading ? (
            <CircularProgress sx={{ color: "primary.main" }} />
          ) : data.length === 0 ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <Typography variant="body2" color="text.secondary">
                  Không có dữ liệu để thống kê
                </Typography>
              }
            />
          ) : (
            <Line options={options} data={dataOptions} height={320} />
          )}
        </Stack>
      </Box>
    </>
  );
};

export default ActivityChart;
