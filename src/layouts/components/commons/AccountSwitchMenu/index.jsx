/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import * as React from 'react';
import { Stack, Typography, Button, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faBriefcase,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { HOST_NAME, ROUTES } from '../../../../configs/constants';
import { buildURL } from '../../../../utils/funcUtils';

const AccountSwitchMenu = ({ isShowButton = false }) => {
  const hostName = window.location.hostname;

  const handleClick = () => {
    switch(hostName) {
      case HOST_NAME.MYJOB:
        window.open(buildURL(HOST_NAME.EMPLOYER_MYJOB), '_blank');
        break;
      case HOST_NAME.EMPLOYER_MYJOB:
        window.open(buildURL(HOST_NAME.MYJOB), '_blank');
        break;
      default:
        window.open(buildURL(HOST_NAME.MYJOB), '_blank');
    }
  };

  const handleClickAuth = (isLogin = false) => {
    const path = isLogin ? ROUTES.AUTH.LOGIN : ROUTES.AUTH.REGISTER;

    switch(hostName) {
      case HOST_NAME.MYJOB:
        window.open(`${buildURL(HOST_NAME.EMPLOYER_MYJOB)}/${path}`, '_blank');
        break;
      case HOST_NAME.EMPLOYER_MYJOB:
        window.open(`${buildURL(HOST_NAME.MYJOB)}/${path}`, '_blank');
        break;
      default:
        window.open(`${buildURL(HOST_NAME.MYJOB)}/${path}`, '_blank');
    }
  }


  const title = React.useMemo(() => {
    return hostName === HOST_NAME.MYJOB ? (
      <Stack direction="row" alignItems="center">
        <FontAwesomeIcon
          color="#2c95ff"
          icon={faBriefcase}
          fontSize={25}
          style={{ marginRight: 8 }}
        />
        <Stack direction="column">
          <Typography>Nhà tuyển dụng</Typography>
          <Typography variant="caption" sx={{ fontSize: 11 }}>
            Đăng tin miễn phí
          </Typography>
        </Stack>
      </Stack>
    ) : hostName === HOST_NAME.EMPLOYER_MYJOB ? (
      <Stack direction="row" alignItems="center">
        <FontAwesomeIcon
          color="#2c95ff"
          icon={faUsers}
          fontSize={25}
          style={{ marginRight: 8 }}
        />
        <Stack direction="column">
          <Typography>Người tìm việc</Typography>
          <Typography variant="caption" sx={{ fontSize: 11 }}>
            <FontAwesomeIcon icon={faArrowRight} /> Chuyển
          </Typography>
        </Stack>
      </Stack>
    ) : (
      <Stack direction="row" alignItems="center">
        <FontAwesomeIcon
          color="#2c95ff"
          icon={faBriefcase}
          fontSize={25}
          style={{ marginRight: 8 }}
        />
        <Stack direction="column">
          <Typography>Nhà tuyển dụng</Typography>
          <Typography variant="caption" sx={{ fontSize: 11 }}>
            Đăng tin miễn phí
          </Typography>
        </Stack>
      </Stack>
    );
  }, [hostName]);

  return (
    <div>
      {isShowButton ? (
        <Stack spacing={1} sx={{ px: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            color="inherit"
            onClick={() => handleClickAuth(true)}
            size="small"
            sx={{ textTransform: 'inherit' }}
          >
            {hostName === HOST_NAME.EMPLOYER_MYJOB
              ? 'Đăng nhập ứng viên'
              : 'Đăng nhập NTD'}
          </Button>
          <Button
            variant="outlined"
            fullWidth
            size="small"
            color="inherit"
            sx={{ textTransform: 'inherit' }}
            onClick={() => handleClickAuth(false)}
          >
            {hostName === HOST_NAME.EMPLOYER_MYJOB
              ? 'Đăng ký ứng viên'
              : 'Đăng ký NTD'}
          </Button>
        </Stack>
      ) : (
        <Box
          sx={{ ml: 1, cursor: 'pointer' }}
          onClick={handleClick}
        >
          {title}
        </Box>
      )}
    </div>
  );
};

export default React.memo(AccountSwitchMenu);
