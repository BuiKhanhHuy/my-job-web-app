import * as React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment/locale/vi';
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
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  where,
  startAfter,
  orderBy,
  updateDoc,
  doc,
  writeBatch,
} from 'firebase/firestore';
import db from '../../configs/firebase-config';

import { IMAGES, ROUTES } from '../../configs/constants';
import MuiImageCustom from '../MuiImageCustom';
import { formatRoute } from '../../utils/funcUtils';

const PAGE_SIZE = 5;

const NotificationCard = () => {
  const nav = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [count, setCount] = React.useState(0);
  const [badgeCount, setBadgeCount] = React.useState(0);
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
    const notificationsRef = collection(
      db,
      'users',
      `${currentUser.id}`,
      'notifications'
    );
    const allQuery = query(
      notificationsRef,
      where('is_deleted', '==', false),
      where('is_read', '==', false)
    );

    const unsubscribe = onSnapshot(allQuery, (querySnapshot) => {
      let total = 0;
      querySnapshot.forEach((doc) => {
        total = total + 1;
      });
      setBadgeCount(total);
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser.id]);

  React.useEffect(() => {
    const notificationsRef = collection(
      db,
      'users',
      `${currentUser.id}`,
      'notifications'
    );
    const allQuery = query(notificationsRef, where('is_deleted', '==', false));

    const unsubscribe = onSnapshot(allQuery, (querySnapshot) => {
      let total = 0;
      querySnapshot.forEach((doc) => {
        total = total + 1;
      });
      setCount(total);
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser.id]);

  React.useEffect(() => {
    const notificationsRef = collection(
      db,
      'users',
      `${currentUser.id}`,
      'notifications'
    );
    const first = query(
      notificationsRef,
      where('is_deleted', '==', false),
      orderBy('time', 'desc'),
      limit(PAGE_SIZE)
    );

    const unsubscribe = onSnapshot(first, (querySnapshot) => {
      const notificationList = [];
      querySnapshot.forEach((doc) => {
        notificationList.push({
          ...doc.data(),
          key: doc.id,
        });
      });
      setNotifications(notificationList);
      setLastKey(querySnapshot.docs[querySnapshot.docs.length - 1]);

      return () => {
        unsubscribe();
      };
    });
  }, [currentUser.id]);

  const loadMore = async () => {
    const notificationsRef = collection(
      db,
      'users',
      `${currentUser.id}`,
      'notifications'
    );
    const nextQuery = query(
      notificationsRef,
      where('is_deleted', '==', false),
      orderBy('time', 'desc'),
      startAfter(lastKey),
      limit(PAGE_SIZE)
    );

    const nextNotificationList = [];
    const nextQuerySnapshot = await getDocs(nextQuery);
    const lastVisible =
      nextQuerySnapshot.docs[nextQuerySnapshot.docs.length - 1];

    nextQuerySnapshot.forEach((doc) => {
      nextNotificationList.push({
        ...doc.data(),
        key: doc.id,
      });
    });

    setNotifications([...notifications, ...nextNotificationList]);
    setLastKey(lastVisible);
  };

  const handleRemove = (key) => {
    updateDoc(doc(db, 'users', `${currentUser.id}`, 'notifications', key), {
      is_deleted: true,
    })
      .then(() => {
        const index = notifications.findIndex((value) => value.key === key);
        if (index > -1) {
          let newNotifications = [...notifications];
          newNotifications.splice(index, 1);
          setNotifications(newNotifications);
        }
      })
      .catch((error) => {
        console.log('deleted noti failed: ', error);
      });
  };

  const handleRead = (key) => {
    updateDoc(doc(db, 'users', `${currentUser.id}`, 'notifications', key), {
      is_read: true,
    })
      .then(() => {})
      .catch((error) => {
        console.log('read noti failed: ', error);
      });
  };

  const handleRemoveAll = async () => {
    // Get a reference to the notifications collection
    const notificationsRef = collection(
      db,
      'users',
      `${currentUser.id}`,
      'notifications'
    );
    const deleteQuery = query(
      notificationsRef,
      where('is_deleted', '==', false)
    );
    const querySnapshot = await getDocs(deleteQuery);

    // Create a batch write operation
    const batch = writeBatch(db);

    // Iterate over all documents and add them to the batch
    querySnapshot.forEach((doc) => {
      const docRef = doc.ref;
      batch.update(docRef, { is_deleted: true });
    });

    // Commit the batch write operation
    await batch.commit();
  };

  const handleClickItem = (item) => {
    switch (item.type) {
      case 'SYSTEM':
        handleRead(item.key);
        nav('/');
        break;
      case 'EMPLOYER_VIEWED_RESUME':
        handleRead(item.key);
        nav(`/${ROUTES.JOB_SEEKER.MY_COMPANY}`);
        break;
      case 'EMPLOYER_SAVED_RESUME':
        handleRead(item.key);
        nav(`/${ROUTES.JOB_SEEKER.MY_COMPANY}`);
        break;
      case 'APPLY_STATUS':
        handleRead(item.key);
        nav(`/${ROUTES.JOB_SEEKER.MY_JOB}`);
        break;
      case 'COMPANY_FOLLOWED':
        handleRead(item.key);
        nav(`/${ROUTES.EMPLOYER.PROFILE}`);
        break;
      case 'POST_VERIFY_RESULT':
        handleRead(item.key);
        nav(`/${ROUTES.EMPLOYER.JOB_POST}`);
        break;
      case 'APPLY_JOB':
        handleRead(item.key);
        nav(
          `/${formatRoute(ROUTES.EMPLOYER.PROFILE_DETAIL, item['APPLY_JOB']?.resume_slug)}`
        );
        break;
      default:
        break;
    }

    handleClose();
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
          <Badge badgeContent={badgeCount} color="error">
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
            <Stack spacing={2} sx={{ p: 1 }}>
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
                    sx={{
                      boxShadow: 1,
                      p: 1,
                      borderRadius: 1.5,
                    }}
                  >
                    <Box
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleClickItem(value)}
                    >
                      <MuiImageCustom
                        width={65}
                        height={65}
                        src={value?.image || IMAGES.notificationImageDefault}
                        sx={{
                          p: 0.5,
                          borderRadius: 1.5,
                          maxHeight: 150,
                          border: 0.5,
                          borderColor: '#d1c4e9',
                        }}
                        duration={500}
                      />
                    </Box>
                    <Box
                      sx={{ cursor: 'pointer' }}
                      flex={1}
                      onClick={() => handleClickItem(value)}
                    >
                      <Stack>
                        <Box>
                          <Typography
                            variant="subtitle2"
                            fontSize={14}
                            style={{
                              fontWeight:
                                value?.is_read === true ? 'normal' : 'bold',
                            }}
                          >
                            {value.title}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="#616161">
                            {value.content}
                          </Typography>
                        </Box>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography
                            variant="caption"
                            fontSize={12}
                            color="#bdbdbd"
                          >
                            <Moment fromNow>
                              {value?.time?.seconds * 1000}
                            </Moment>
                          </Typography>
                          <Typography variant="caption" fontSize={12}>
                            {value?.is_read === true ? (
                              <span style={{ color: '#bdbdbd' }}>Đã đọc</span>
                            ) : (
                              <span style={{ color: 'red' }}>Mới</span>
                            )}
                          </Typography>
                        </Stack>
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
                    <Typography
                      fontWeight="bold"
                      textAlign="center"
                      color="GrayText"
                    >
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
