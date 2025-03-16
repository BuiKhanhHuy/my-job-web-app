import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";
import "moment/locale/vi";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

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
} from "firebase/firestore";
import db from "../../../../configs/firebase-config";

import { IMAGES, ImageSvg9, ROUTES } from "../../../../configs/constants";
import MuiImageCustom from "../../../../components/MuiImageCustom";
import NoDataCard from "../../../../components/NoDataCard";
import { formatRoute } from "../../../../utils/funcUtils";

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
      "users",
      `${currentUser.id}`,
      "notifications"
    );
    const allQuery = query(notificationsRef, where("is_deleted", "==", false));

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
      "users",
      `${currentUser.id}`,
      "notifications"
    );
    const first = query(
      notificationsRef,
      where("is_deleted", "==", false),

      orderBy("time", "desc"),
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
      "users",
      `${currentUser.id}`,
      "notifications"
    );
    const nextQuery = query(
      notificationsRef,
      where("is_deleted", "==", false),
      orderBy("time", "desc"),
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
    updateDoc(doc(db, "users", `${currentUser.id}`, "notifications", key), {
      is_read: true,
    })
      .then(() => {})
      .catch((error) => {
        console.log("read noti failed: ", error);
      });
  };

  const handleClickItem = (item) => {
    switch (item.type) {
      case "SYSTEM":
        handleRead(item.key);
        nav("/");
        break;
      case "EMPLOYER_VIEWED_RESUME":
        handleRead(item.key);
        nav(`/${ROUTES.JOB_SEEKER.DASHBOARD}/${ROUTES.JOB_SEEKER.MY_COMPANY}`);
        break;
      case "EMPLOYER_SAVED_RESUME":
        handleRead(item.key);
        nav(`/${ROUTES.JOB_SEEKER.DASHBOARD}/${ROUTES.JOB_SEEKER.MY_COMPANY}`);
        break;
      case "APPLY_STATUS":
        handleRead(item.key);
        nav(`/${ROUTES.JOB_SEEKER.DASHBOARD}/${ROUTES.JOB_SEEKER.MY_JOB}`);
        break;
      case "COMPANY_FOLLOWED":
        handleRead(item.key);
        nav(`/${ROUTES.EMPLOYER.PROFILE}`);
        break;
      case "POST_VERIFY_RESULT":
        handleRead(item.key);
        nav(`/${ROUTES.EMPLOYER.JOB_POST}`);
        break;
      case "APPLY_JOB":
        handleRead(item.key);
        nav(
          `/${formatRoute(
            ROUTES.EMPLOYER.PROFILE_DETAIL,
            item["APPLY_JOB"]?.resume_slug
          )}`
        );
        break;
      default:
        break;
    }
  };

  const handleRemove = (key) => {
    updateDoc(doc(db, "users", `${currentUser.id}`, "notifications", key), {
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
        console.log("deleted noti failed: ", error);
      });
  };

  const handleRemoveAll = async () => {
    // Get a reference to the notifications collection
    const notificationsRef = collection(
      db,
      "users",
      `${currentUser.id}`,
      "notifications"
    );
    const deleteQuery = query(
      notificationsRef,
      where("is_deleted", "==", false)
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
      "users",
      `${currentUser.id}`,
      "notifications"
    );
    const readQuery = query(notificationsRef, where("is_read", "==", false));
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
    <Box>
      <Stack spacing={3}>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          justifyContent="space-between"
          alignItems={{
            xs: "flex-start",
            sm: "center",
          }}
          spacing={2}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "text.primary" }}
          >
            {title}
          </Typography>
          <Stack direction="row" spacing={1}>
            {notifications.length > 0 && (
              <>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<CheckCircleOutlineIcon />}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "primary.light",
                      color: "primary.contrastText",
                    },
                  }}
                  onClick={handleMakeAllRead}
                >
                  Đánh dấu đã đọc
                </Button>

                <Button
                  color="error"
                  variant="outlined"
                  size="small"
                  startIcon={<DeleteOutlineIcon />}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "error.light",
                      color: "error.contrastText",
                    },
                  }}
                  onClick={handleRemoveAll}
                >
                  Xóa tất cả
                </Button>
              </>
            )}
          </Stack>
        </Stack>

        <Divider sx={{ borderColor: "grey.500" }} />

        <Box>
          {isLoading ? (
            <Stack justifyContent="center" direction="row" py={5}>
              <CircularProgress color="primary" />
            </Stack>
          ) : notifications.length === 0 ? (
            <NoDataCard
              title="Chưa có thông báo nào."
              imgComponentSgv={<ImageSvg9 />}
            />
          ) : (
            <Stack spacing={2}>
              {notifications.map((value, index) => (
                <Box
                  key={value?.key}
                  sx={{
                    bgcolor: value?.is_read ? "transparent" : "action.hover",
                    borderRadius: 2,
                    transition: "all 0.2s",
                    // '&:hover': {
                    //   bgcolor: 'action.selected',
                    // }
                  }}
                >
                  <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                    <ListItemButton
                      onClick={() => handleClickItem(value)}
                      sx={{ borderRadius: 2 }}
                    >
                      <ListItemAvatar>
                        <MuiImageCustom
                          width={50}
                          height={50}
                          src={value?.image || IMAGES.notificationImageDefault}
                          sx={{
                            borderRadius: 2,
                            border: 1,
                            borderColor: "divider",
                          }}
                          duration={500}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: value?.is_read ? 400 : 600,
                              color: "text.primary",
                              mb: 0.5,
                            }}
                          >
                            {value?.title}
                          </Typography>
                        }
                        secondary={
                          <Stack spacing={1}>
                            <Typography variant="body2" color="text.secondary">
                              {value?.content}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: "text.disabled" }}
                            >
                              <Moment fromNow>
                                {value?.time?.seconds * 1000}
                              </Moment>
                            </Typography>
                          </Stack>
                        }
                      />
                      <IconButton
                        size="small"
                        color="error"
                        sx={{
                          opacity: 0.7,
                          "&:hover": { opacity: 1 },
                        }}
                        onClick={() => handleRemove(value.key)}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </ListItemButton>
                  </ListItem>
                </Box>
              ))}

              {Math.ceil(count / PAGE_SIZE) > 1 && (
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={loadMore}
                  sx={{
                    mt: 2,
                    textTransform: "none",
                    borderRadius: 2,
                  }}
                >
                  Xem thêm
                </Button>
              )}
            </Stack>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default NotificationCard;
