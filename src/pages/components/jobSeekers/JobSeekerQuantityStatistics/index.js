import React from 'react';

import {
  SolutionOutlined,
  BookOutlined,
  EyeOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { Grid } from '@mui/material';
import { Card, Statistic } from 'antd';

import statisticService from '../../../../services/statisticService';

const JobSeekerQuantityStatistics = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const statistics = async () => {
      setIsLoading(true);
      try {
        const resData = await statisticService.jobSeekerGeneralStatistics();

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
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <Card bordered={false} style={{ borderRadius: 4 }}>
          <Statistic
            title={
              <span style={{ fontWeight: 'bold' }}>Việc làm đã ứng tuyển</span>
            }
            value={data?.totalApply}
            precision={0}
            valueStyle={{ color: '#3f8600', borderRadius: 1 }}
            prefix={<SolutionOutlined />}
            suffix=""
            loading={isLoading}
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <Card bordered={false} style={{ borderRadius: 4 }}>
          <Statistic
            title={<span style={{ fontWeight: 'bold' }}>Việc làm đã lưu</span>}
            value={data?.totalSave}
            precision={0}
            valueStyle={{ color: '#673ab7' }}
            prefix={<BookOutlined />}
            suffix=""
            loading={isLoading}
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <Card bordered={false} style={{ borderRadius: 4 }}>
          <Statistic
            title={<span style={{ fontWeight: 'bold' }}>NTD đã xem hồ sơ</span>}
            value={data?.totalView}
            precision={0}
            valueStyle={{ color: '#00b0ff' }}
            prefix={<EyeOutlined />}
            suffix=""
            loading={isLoading}
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <Card bordered={false} style={{ borderRadius: 4 }}>
          <Statistic
            title={
              <span style={{ fontWeight: 'bold' }}>NTD đang theo dõi</span>
            }
            value={data?.totalFollow}
            precision={0}
            valueStyle={{ color: '#cf1322' }}
            prefix={<HeartOutlined />}
            suffix=""
            loading={isLoading}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default JobSeekerQuantityStatistics;
