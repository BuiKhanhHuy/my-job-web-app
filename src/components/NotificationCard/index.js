import * as React from 'react';
import {
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const NotificationCard = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <IconButton
          size="large"
          aria-label="show new notifications"
          color="inherit"
          onClick={handleClick}
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Box>
      <Menu
        style={{ width: 400 }}
        anchorEl={anchorEl}
        id="noti-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose} sx={{width: '100%'}}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Stack>
              <IconButton aria-label="view" size="small" color="primary">
                <RemoveRedEyeIcon fontSize="small" />
              </IconButton>
            </Stack>
            <Stack>
              <Typography variant='subtitle2'>
                Công Ty Cổ Phần Đầu Tư Digital Kingdom đã xem hồ sơ Python
                Backend Developer của bạn
              </Typography>
              <Typography variant='caption'>16 ngày trước</Typography>
            </Stack>
            <Stack>
              <IconButton aria-label="delete" color="error" size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default NotificationCard;
