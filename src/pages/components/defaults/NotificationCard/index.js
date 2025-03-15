import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment/locale/vi';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
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
import db from '../../../../configs/firebase-config';

import { IMAGES, ImageSvg9, ROUTES } from '../../../../configs/constants';
import MuiImageCustom from '../../../../components/MuiImageCustom';
import NoDataCard from '../../../../components/NoDataCard';
import { formatRoute } from '../../../../utils/funcUtils';

const PAGE_SIZE = 10;
const NotificationCard = ({ title }) => {
  const nav = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [count, setCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [notifications, setNotifications] = React.useState([]);
  const [lastKey, setLastKey] = React.useState(null);

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
    setIsLoading(true);
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
      setIsLoading(false);

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

  const handleRead = (key) => {
    updateDoc(doc(db, 'users', `${currentUser.id}`, 'notifications', key), {
      is_read: true,
    })
      .then(() => {})
      .catch((error) => {
        console.log('read noti failed: ', error);
      });
  };

  const handleClickItem = (item) => {
    switch (item.type) {
      case 'SYSTEM':
        handleRead(item.key);
        nav('/');
        break;
      case 'EMPLOYER_VIEWED_RESUME':
        handleRead(item.key);
        nav(`/${ROUTES.JOB_SEEKER.DASHBOARD}/${ROUTES.JOB_SEEKER.MY_COMPANY}`);
        break;
      case 'EMPLOYER_SAVED_RESUME':
        handleRead(item.key);
        nav(`/${ROUTES.JOB_SEEKER.DASHBOARD}/${ROUTES.JOB_SEEKER.MY_COMPANY}`);
        break;
      case 'APPLY_STATUS':
        handleRead(item.key);
        nav(`/${ROUTES.JOB_SEEKER.DASHBOARD}/${ROUTES.JOB_SEEKER.MY_JOB}`);
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

  const handleMakeAllRead = async () => {
    // Get a reference to the notifications collection
    const notificationsRef = collection(
      db,
      'users',
      `${currentUser.id}`,
      'notifications'
    );
    const readQuery = query(notificationsRef, where('is_read', '==', false));
    const querySnapshot = await getDocs(readQuery);

    // Create a batch write operation
    const batch = writeBatch(db);

    // Iterate over all documents and add them to the batch
    querySnapshot.forEach((doc) => {
      const docRef = doc.ref;
      batch.update(docRef, { is_read: true });
    });

    // Commit the batch write operation
    await batch.commit();
  };

  return (
    <>
      <Stack>
        <Box>
          <Stack
            direction={{
              xs: 'column',
              sm: 'row',
              md: 'row',
              lg: 'row',
              xl: 'row',
            }}
            justifyContent="space-between"
            alignItems={{
              xs: 'flex-start',
              sm: 'center',
              md: 'center',
              lg: 'center',
              xl: 'center',
            }}
          >
            <Typography variant="h6" textAlign="left">
              {title}
            </Typography>
            <Stack direction="row" spacing={2}>
              {notifications.length > 0 && (
                <>
                  <Button
                    variant="text"
                    sx={{ textTransform: 'inherit' }}
                    onClick={handleMakeAllRead}
                  >
                    Đánh dấu tất cả đã đọc
                  </Button>

                  <Button
                    color="error"
                    variant="text"
                    sx={{ textTransform: 'inherit' }}
                    onClick={handleRemoveAll}
                  >
                    Xóa tất cả
                  </Button>
                </>
              )}
            </Stack>
          </Stack>
        </Box>
        <Divider sx={{ mt: 2, mb: 3 }} />
        <Box sx={{ px: 1 }}>
          <>
            <Stack>
              <Box>
                {isLoading ? (
                  <Stack justifyContent="center" direction="row" py={5}>
                    <CircularProgress color="secondary" />
                  </Stack>
                ) : notifications.length === 0 ? (
                  <NoDataCard
                    title="Chưa có thông báo nào."
                    imgComponentSgv={<ImageSvg9 />}
                  />
                ) : (
                  <>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                      {notifications.map((value, index) => (
                        <>
                          <ListItem
                            key={value?.key}
                            alignItems="center"
                            secondaryAction={
                              <Tooltip title="Xóa thông báo" arrow>
                                <IconButton
                                  aria-label="delete"
                                  color="error"
                                  onClick={() => handleRemove(value.key)}
                                >
                                  <ClearIcon />
                                </IconButton>
                              </Tooltip>
                            }
                          >
                            <ListItemButton
                              onClick={() => handleClickItem(value)}
                            >
                              <ListItemAvatar style={{ marginRight: 10 }}>
                                <MuiImageCustom
                                  width={65}
                                  height={65}
                                  src={
                                    value?.image ||
                                    IMAGES.notificationImageDefault
                                  }
                                  sx={{
                                    p: 0.5,
                                    borderRadius: 1.5,
                                    maxHeight: 150,
                                    border: 0.5,
                                    borderColor: '#d1c4e9',
                                  }}
                                  duration={500}
                                />
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  value?.is_read ? (
                                    <span>{value?.title}</span>
                                  ) : (
                                    <span style={{ fontWeight: 'bold' }}>
                                      {value?.title}
                                    </span>
                                  )
                                }
                                secondary={
                                  <Stack>
                                    <Typography
                                      sx={{ display: 'inline' }}
                                      component="span"
                                      variant="body2"
                                      color="text.primary"
                                    >
                                      {value?.content}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      fontSize={12}
                                      color="#bdbdbd"
                                    >
                                      <Moment fromNow>
                                        {value?.time?.seconds * 1000}
                                      </Moment>
                                    </Typography>
                                  </Stack>
                                }
                              />
                            </ListItemButton>
                          </ListItem>
                          {notifications.length - 1 !== index && (
                            <Divider component="li" />
                          )}
                        </>
                      ))}
                    </List>
                    {Math.ceil(count / PAGE_SIZE) > 1 && (
                      <Stack justifyContent="center" direction="row">
                        <Button
                          size="medium"
                          onClick={loadMore}
                          variant="contained"
                        >
                          Xem thêm
                        </Button>
                      </Stack>
                    )}
                  </>
                )}
              </Box>
            </Stack>
          </>
        </Box>
      </Stack>
    </>
  );
};

export default NotificationCard;
