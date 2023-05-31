import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Chip, Stack, Typography } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import HomeIcon from '@mui/icons-material/Home';

import { ROLES_NAME } from '../../../configs/constants';

const SidebarHeader = () => {
  const { currentUser } = useSelector((state) => state.user);
  const nav = useNavigate();

  const isEmployer = React.useMemo(() => {
    return currentUser?.roleName === ROLES_NAME.EMPLOYER;
  }, [currentUser]);

  const handleRedirect = () => {
    if (isEmployer) {
      nav('/');
    } else {
      nav('/nha-tuyen-dung');
    }
  };

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Box>
        <Typography>Logo</Typography>
      </Box>
      <Box>
        <Chip
          icon={!isEmployer ? <HomeIcon /> : <GridViewIcon />}
          label={!isEmployer ? 'Về trang chủ' : 'Về trang quản trị'}
          onClick={handleRedirect}
        />
      </Box>
    </Stack>
  );
};

export default SidebarHeader;
