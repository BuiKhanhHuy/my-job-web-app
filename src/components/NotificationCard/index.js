import * as React from 'react';
import {
  Badge,
  Box,
  Grid,
  IconButton,
  Menu,
  Stack,
  Typography,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ClearIcon from '@mui/icons-material/Clear';

import {
  ref,
  query,
  orderByChild,
  limitToFirst,
  startAt,
  get,
  onValue,
  remove,
} from 'firebase/database';
import database from '../../configs/firebase-config';

import MuiImageCustom from '../MuiImageCustom';
import { useSelector } from 'react-redux';

const PAGE_SIZE = 10;

const NotificationCard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [count, setCount] = React.useState(0);
  const [notifications, setNotifications] = React.useState([]);
  const [lastKey, setLastKey] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    const notificationsRef = ref(database, `notifications/${currentUser.id}`);
    let notificationsQuery = query(notificationsRef, orderByChild('time'));

    // Lắng nghe sự thay đổi số lượng thông báo
    const unsubscribe = onValue(notificationsQuery, (snapshot) => {
      const data = snapshot.val();
      const countNoti = data ? Object.keys(data).length : 0;
      setCount(countNoti);
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser.id]);

  React.useEffect(() => {
    const notificationsRef = ref(database, `notifications/${currentUser.id}`);
    let notificationsQuery = query(
      notificationsRef,
      orderByChild('time'),
      limitToFirst(PAGE_SIZE)
    );
    const unsubscribe = onValue(notificationsQuery, (snapshot) => {
      const data = snapshot.val();

      console.log(data);
      if (data) {
        const newNotifications = Object.values(data).map((notification) => ({
          ...notification,
          key: Object.keys(data).find((key) => data[key] === notification),
        }));

        setNotifications(newNotifications || []);
      } else {
        setNotifications([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser.id]);

  React.useEffect(() => {
    const notificationsRef = ref(database, `notifications/${currentUser.id}`);
    let notificationsQuery = query(
      notificationsRef,
      orderByChild('time'),
      limitToFirst(PAGE_SIZE)
    );

    if (lastKey) {
      notificationsQuery = query(
        notificationsRef,
        orderByChild('time'),
        startAt(lastKey),
        limitToFirst(PAGE_SIZE)
      );
    }

    const getNotifications = async () => {
      const snapshot = await get(notificationsQuery);
      const data = snapshot.val();
      if (data) {
        const newNotifications = Object.values(data).map((notification) => ({
          ...notification,
          key: Object.keys(data).find((key) => data[key] === notification),
        }));
        setNotifications([...notifications, ...newNotifications]);
      }
    };

    getNotifications();

    return () => {};

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastKey, currentUser.id]);

  const loadMore = () => {
    const lastKeyInList = notifications[notifications.length - 1].time;
    if (lastKeyInList !== lastKey) setLastKey(lastKeyInList + 1);
  };

  const handleRemove = (key) => {
    const notiRef = ref(database, `notifications/${currentUser.id}/${key}`);
    remove(notiRef)
      .then(() => {
        console.log('Node deleted successfully.');
      })
      .catch((error) => {
        console.error('Error deleting node:', error);
      });
  };

  const handleRemoveAll = () => {
    const notiRef = ref(database, `notifications/${currentUser.id}`);
    remove(notiRef)
      .then(() => {
        console.log('Node deleted successfully.');
      })
      .catch((error) => {
        console.error('Error deleting node:', error);
      });
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
          <Badge badgeContent={count} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="noti-menu"
        open={open}
        onClose={handleClose}
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
        <Box style={{ width: 500, maxHeight: 500 }} sx={{ py: 1, px: 1.5 }}>
          <Box style={{ overflowY: 'auto', maxHeight: 450 }}>
            <Stack spacing={2}>
              {notifications.length === 0 ? (
                <Typography textAlign="center" variant="body2" color="gray">
                  Chưa có thông báo nào
                </Typography>
              ) : (
                notifications.map((value, idx) => (
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    key={idx}
                  >
                    <Box>
                      <MuiImageCustom
                        width={50}
                        height={50}
                        src={
                          'https://cdn1.vieclam24h.vn/images/default/2021/09/21/images/img_vieclam24h_vn_163219231433.w-62.h-62.padding-1.png?v=220513'
                        }
                        sx={{ borderRadius: 1.5, maxHeight: 150 }}
                        duration={500}
                      />
                    </Box>
                    <Box flex={1}>
                      <Stack>
                        <Box>
                          <Typography variant="subtitle2">
                            {value.title} - {value.time}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="gray">
                            {value.content}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                    <Box>
                      <IconButton
                        aria-label="delete"
                        color="error"
                        size="small"
                        onClick={() => handleRemove(value.key)}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Stack>
                ))
              )}
            </Stack>
          </Box>
          <Box>
            <Grid container>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                {Math.ceil(count / PAGE_SIZE) > 1 && (
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography fontWeight="bold" textAlign="center">
                      <span style={{ cursor: 'pointer' }} onClick={loadMore}>
                        Xem thêm
                      </span>
                    </Typography>
                  </Stack>
                )}
              </Grid>
              <Grid item xs={4}>
                {notifications.length > 0 && (
                  <Stack direction="row" justifyContent="flex-end">
                    <Typography
                      variant="caption"
                      color="red"
                      textAlign="center"
                    >
                      <span
                        style={{ cursor: 'pointer' }}
                        onClick={handleRemoveAll}
                      >
                        Xóa tất cả
                      </span>
                    </Typography>
                  </Stack>
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Menu>
    </React.Fragment>
  );
};

export default NotificationCard;
