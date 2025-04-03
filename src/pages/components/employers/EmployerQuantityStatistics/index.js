import React from 'react';

import {
  CopyFilled,
  ClockCircleFilled,
  CloseCircleFilled,
  ContactsFilled,
} from '@ant-design/icons';
import { Grid } from '@mui/material';
import { Card, Statistic } from 'antd';

import statisticService from '../../../../services/statisticService';

const EmployerQuantityStatistics = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const statistics = async () => {
      setIsLoading(true);
      try {
        const resData = await statisticService.employerGeneralStatistics();

        setData(resData.data);
      } catch (error) {
        console.error('Error: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    statistics();
  }, []);

  const cardStyle = {
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    borderRadius: '10px',
    transition: 'all 0.3s ease',
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <Card 
          bordered={false}
          style={cardStyle}
          className="statistic-card"
        >
          <Statistic
            title={
              <span style={{ 
                fontWeight: '600',
                fontSize: '16px',
                color: '#333',
                marginBottom: '10px'
              }}>
                Tất cả tin tuyển dụng
              </span>
            }
            value={data?.totalJobPost}
            precision={0}
            valueStyle={{ 
              color: '#3f8600', 
              fontSize: '24px',
              fontWeight: '700'
            }}
            prefix={<CopyFilled style={{ fontSize: '24px', marginRight: '10px' }} />}
            loading={isLoading}
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <Card 
          bordered={false}
          style={cardStyle}
          className="statistic-card"
        >
          <Statistic
            title={
              <span style={{ 
                fontWeight: '600',
                fontSize: '16px',
                color: '#333',
                marginBottom: '10px'
              }}>
                Tin tuyển dụng chờ duyệt
              </span>
            }
            value={data?.totalJobPostingPendingApproval}
            precision={0}
            valueStyle={{ 
              color: '#ff9800',
              fontSize: '24px',
              fontWeight: '700'
            }}
            prefix={<ClockCircleFilled style={{ fontSize: '24px', marginRight: '10px' }} />}
            loading={isLoading}
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <Card 
          bordered={false}
          style={cardStyle}
          className="statistic-card"
        >
          <Statistic
            title={
              <span style={{ 
                fontWeight: '600',
                fontSize: '16px',
                color: '#333',
                marginBottom: '10px'
              }}>
                Tin tuyển dụng hết hạn
              </span>
            }
            value={data?.totalJobPostExpired}
            precision={0}
            valueStyle={{ 
              color: '#cf1322',
              fontSize: '24px',
              fontWeight: '700'
            }}
            prefix={<CloseCircleFilled style={{ fontSize: '24px', marginRight: '10px' }} />}
            loading={isLoading}
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <Card 
          bordered={false}
          style={cardStyle}
          className="statistic-card"
        >
          <Statistic
            title={
              <span style={{ 
                fontWeight: '600',
                fontSize: '16px',
                color: '#333',
                marginBottom: '10px'
              }}>
                Ứng viên ứng tuyển
              </span>
            }
            value={data?.totalApply}
            precision={0}
            valueStyle={{ 
              color: '#00b0ff',
              fontSize: '24px',
              fontWeight: '700'
            }}
            prefix={<ContactsFilled style={{ fontSize: '24px', marginRight: '10px' }} />}
            loading={isLoading}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default EmployerQuantityStatistics;
