import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Tooltip, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import dayjs from 'dayjs';
import { List, Avatar as AntAvatar } from 'antd';
import { FileOutlined, FilePdfOutlined } from '@ant-design/icons';

import jobSeekerProfileService from '../../../../services/jobSeekerProfileService';
import { CV_TYPES } from '../../../../configs/constants';

const JobApplicationCard = () => {
  const nav = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const getOnlineProfile = async (jobSeekerProfileId, params) => {
      setIsLoading(true);
      try {
        const resData = await jobSeekerProfileService.getResumes(
          jobSeekerProfileId,
          params
        );

        setData(resData.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getOnlineProfile(currentUser?.jobSeekerProfileId);
  }, [currentUser]);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Hồ sơ xin việc</Typography>
        <IconButton
          aria-label="ArrowForward"
          size="medium"
          onClick={() => nav('/ung-vien/ho-so')}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Stack>
      <Box sx={{ pt: 2 }}>
        <List
          itemLayout="horizontal"
          dataSource={data}
          loading={isLoading}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  item?.type === CV_TYPES.cvWebsite ? (
                    <Tooltip title="Hồ sơ Online">
                      <AntAvatar
                        style={{ backgroundColor: '#441da0' }}
                        icon={<FileOutlined />}
                      />
                    </Tooltip>
                  ) : item?.type === CV_TYPES.cvUpload ? (
                    <Tooltip title="Hồ sơ đính kèm">
                      <AntAvatar
                        style={{ backgroundColor: '#ff3d00' }}
                        icon={<FilePdfOutlined />}
                      />
                    </Tooltip>
                  ) : (
                    '---'
                  )
                }
                title={item?.title}
                description={
                  <>
                    <Typography variant="caption">
                      Sửa lần cuối {dayjs(item?.updateAt).format('DD/MM/YYYY')}
                    </Typography>
                    <Typography>
                      {item?.isActive ? (
                        <span style={{ color: '#4caf50' }}>
                          Đang cho phép tìm kiếm
                        </span>
                      ) : (
                        <span style={{ color: '#ff3d00' }}>
                          Không cho phép tìm kiếm
                        </span>
                      )}
                    </Typography>
                  </>
                }
              />
            </List.Item>
          )}
        />
      </Box>
    </Box>
  );
};

export default JobApplicationCard;
