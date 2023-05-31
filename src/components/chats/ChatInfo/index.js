import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Chip, Stack, Typography } from '@mui/material';

import { ROLES_NAME } from '../../../configs/constants';

const ChatInfo = () => {
  const { currentUser } = useSelector((state) => state.user);
  const nav = useNavigate();

  const isEmployer = React.useMemo(() => {
    return currentUser?.roleName === ROLES_NAME.EMPLOYER;
  }, [currentUser]);

  return <div>Chat info</div>;
};

export default ChatInfo;
