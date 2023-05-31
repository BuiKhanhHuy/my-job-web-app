import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Badge, IconButton } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';

import { ROLES_NAME } from '../../configs/constants';

const ChatCard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const nav = useNavigate();
  const isEmployer = React.useMemo(() => {
    return currentUser?.roleName === ROLES_NAME.EMPLOYER;
  }, [currentUser]);

  const handleRedirect = () => {
    if (isEmployer) {
      nav('/ket-noi-voi-ung-vien');
    } else {
      nav('/ket-noi-voi-nha-tuyen-dung');
    }
  };

  return (
    <IconButton
      onClick={handleRedirect}
      size="large"
      aria-label="show new notifications"
      color="inherit"
    >
      <Badge badgeContent={10} color="error">
        <ForumIcon />
      </Badge>
    </IconButton>
  );
};

export default ChatCard;
