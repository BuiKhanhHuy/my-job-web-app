import React from 'react';

import {
  CopyFilled,
  ClockCircleFilled,
  CloseCircleFilled,
  ContactsFilled,
} from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';

import statisticService from '../../../../services/statisticService';

const EmployerQuantityStatistics = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const statistics = async () => {
      setIsLoading(true);
      try {
        const resData = await statisticService.generalStatistics();

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
    <Row gutter={16}>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic
            title={
              <span style={{ fontWeight: 'bold' }}>Tất cả tin tuyển dụng</span>
            }
            value={data?.totalJobPost || "---"}
            precision={0}
            valueStyle={{ color: '#3f8600', borderRadius: 1 }}
            prefix={<CopyFilled />}
            suffix=""
            loading={isLoading}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic
            title={
              <span style={{ fontWeight: 'bold' }}>
                Tin tuyển dụng chờ duyệt
              </span>
            }
            value={data?.totalJobPostingPendingApproval || "---"}
            precision={0}
            valueStyle={{ color: '#ff9800' }}
            prefix={<ClockCircleFilled />}
            suffix=""
            loading={isLoading}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic
            title={
              <span style={{ fontWeight: 'bold' }}>Tin tuyển dụng hết hạn</span>
            }
            value={data?.totalJobPostExpired || "---"}
            precision={0}
            valueStyle={{ color: '#cf1322' }}
            prefix={<CloseCircleFilled />}
            suffix=""
            loading={isLoading}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic
            title={
              <span style={{ fontWeight: 'bold' }}>Ứng viên ứng tuyển</span>
            }
            value={data?.totalApply || "---"}
            precision={0}
            valueStyle={{ color: '#00b0ff' }}
            prefix={<ContactsFilled />}
            suffix=""
            loading={isLoading}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default EmployerQuantityStatistics;
