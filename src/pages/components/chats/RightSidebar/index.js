import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Chip,
  Pagination,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { Empty } from 'antd';

import { ChatContext } from '../../../../context/ChatProvider';
import jobPostActivityService from '../../../../services/jobPostActivityService';
import MuiImageCustom from '../../../../components/MuiImageCustom';

import {
  addDocument,
  checkChatRoomExists,
  checkExists,
  createUser,
} from '../../../../services/firebaseService';

const pageSize = 12;

const LoadingComponentItem = () => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Box>
        <Skeleton variant="circular" width={54} height={54} />
      </Box>
      <Stack flex={1} spacing={1} width={'50%'}>
        <Skeleton variant="rounded" />
        <Skeleton variant="rounded" />
      </Stack>
      <Box>
        <Skeleton variant="rounded" width={80} height={25} />
      </Box>
    </Stack>
  );
};

const RightSidebar = () => {
  const { setSelectedRoomId } = React.useContext(ChatContext);
  const { currentUser } = useSelector((state) => state.user);
  const { id: userId } = currentUser;
  const [isLoading, setIsLoading] = React.useState(true);
  const [jobPostsApplied, setJobPostsApplied] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const getJobPosts = async (params) => {
      setIsLoading(true);
      try {
        const resData = await jobPostActivityService.getJobPostChatActivity({
          page: page,
          pageSize: pageSize,
        });
        const data = resData.data;

        setCount(data.count);
        setJobPostsApplied(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getJobPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleAddRoom = async (partnerId, userData) => {
    // kiem tra user nay da duoc tao account tren firestore
    let allowCreateNewChatRoom = false;
    const isExists = await checkExists('accounts', partnerId);
    if (!isExists) {
      // tao moi user tren firestore.
      const createResult = await createUser('accounts', userData, partnerId);
      if (createResult) {
        // tao phong tro chuyen
        allowCreateNewChatRoom = true;
      }
    } else {
      allowCreateNewChatRoom = true;
    }

    // tao phong tro chuyen
    if (allowCreateNewChatRoom) {
      // neu da ton tai phong co 2 user này => setSelectRoomID
      let chatRoomId = await checkChatRoomExists(
        'chatRooms',
        userId,
        partnerId
      );
      if (chatRoomId === null) {
        // neu chua ton tai thi tao phong moi
        chatRoomId = await addDocument('chatRooms', {
          members: [`${userId}`, `${partnerId}`],
          membersString: [`${userId}-${partnerId}`, `${partnerId}-${userId}`],
          recipientId: `${partnerId}`,
          unreadCount: 0
        });
      }

      // set phong hien tai voi chatRoomId
      setSelectedRoomId(chatRoomId);
    }
  };

  return (
    <Box>
      <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
        TIN TUYỂN DỤNG ĐÃ ỨNG TUYỂN
      </Typography>
      <Box p={2} sx={{ maxHeight: '80vh', overflowY: 'auto' }}>
        {isLoading ? (
          <Stack spacing={2}>
            {Array.from(Array(12).keys()).map((value) => (
              <LoadingComponentItem key={value} />
            ))}
          </Stack>
        ) : jobPostsApplied.length === 0 ? (
          <Box py={5}>
            <Empty description="Bạn chưa ứng tuyển vị trí nào" />
          </Box>
        ) : (
          <Stack spacing={2}>
            {jobPostsApplied.map((value) => (
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                key={value.id}
              >
                <Box>
                  <MuiImageCustom
                    width={54}
                    height={54}
                    sx={{
                      borderRadius: 50,
                      border: 1,
                      borderColor: '#e0e0e0',
                      p: 0.25,
                    }}
                    src={value?.companyImageUrl}
                  />
                </Box>
                <Stack flex={1} width={'50%'}>
                  <Tooltip title={value?.jobPostTitle} arrow>
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: 15,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        cursor: 'pointer',
                      }}
                    >
                      {value?.jobPostTitle || '---'}
                    </span>
                  </Tooltip>
                  <Tooltip title={value?.companyName} arrow>
                    <Typography
                      variant="caption"
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        cursor: 'pointer',
                      }}
                    >
                      {value?.companyName || '---'}
                    </Typography>
                  </Tooltip>
                </Stack>
                <Box>
                  <Chip
                    label="Nhắn tin"
                    color="success"
                    variant="outlined"
                    onClick={() =>
                      handleAddRoom(value?.userId, {
                        userId: value?.userId,
                        name: value?.fullName,
                        email: value?.userEmail,
                        avatarUrl: value?.companyImageUrl,
                        company: {
                          companyId: value?.companyId,
                          slug: value?.companySlug,
                          companyName: value?.companyName,
                          imageUrl: value?.companyImageUrl,
                        },
                      })
                    }
                  />
                </Box>
              </Stack>
            ))}
          </Stack>
        )}
      </Box>
      <Stack sx={{ pt: 2 }} alignItems="center" justifyContent="center">
        {Math.ceil(count / pageSize) > 1 && (
          <Pagination
            color="primary"
            size="medium"
            variant="text"
            sx={{ margin: '0 auto' }}
            count={Math.ceil(count / pageSize)}
            page={page}
            onChange={(event, newPage) => {
              setPage(newPage);
            }}
          />
        )}
      </Stack>
    </Box>
  );
};

const EmployerSidebar = () => {
  const { setSelectedRoomId } = React.useContext(ChatContext);
  const { currentUser } = useSelector((state) => state.user);
  const { id: userId } = currentUser;
  const [isLoading, setIsLoading] = React.useState(true);
  const [jobPostsApplied, setJobPostsApplied] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const loadJobPostActivity = async (params) => {
      setIsLoading(true);

      try {
        const resData = await jobPostActivityService.getAppliedResumeChat(
          params
        );

        const data = resData.data;

        setCount(data.count);
        setJobPostsApplied(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadJobPostActivity({
      page: page,
      pageSize: pageSize,
      //   jobPostId: jobPostIdSelect,
    });
  }, [page /*jobPostIdSelect */]);

  const handleAddRoom = async (partnerId, userData) => {
    // kiem tra user nay da duoc tao account tren firestore
    let allowCreateNewChatRoom = false;
    const isExists = await checkExists('accounts', partnerId);
    if (!isExists) {
      // tao moi user tren firestore.
      const createResult = await createUser('accounts', userData, partnerId);
      if (createResult) {
        // tao phong tro chuyen
        allowCreateNewChatRoom = true;
      }
    } else {
      allowCreateNewChatRoom = true;
    }

    // tao phong tro chuyen
    if (allowCreateNewChatRoom) {
      // neu da ton tai phong co 2 user này => setSelectRoomID
      let chatRoomId = await checkChatRoomExists(
        'chatRooms',
        userId,
        partnerId
      );
      if (chatRoomId === null) {
        // neu chua ton tai thi tao phong moi
        chatRoomId = await addDocument('chatRooms', {
          members: [`${userId}`, `${partnerId}`],
          userId1: `${userId}`,
          userId2: `${partnerId}`,
        });
      }

      // set phong hien tai voi chatRoomId
      setSelectedRoomId(chatRoomId);
    }
  };

  return (
    <Box>
      <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
        ỨNG VIÊN ỨNG TUYỂN
      </Typography>
      <Box p={2} sx={{ height: '90vh', overflowY: 'auto' }}>
        {isLoading ? (
          <Stack spacing={2}>
            {Array.from(Array(12).keys()).map((value) => (
              <LoadingComponentItem key={value} />
            ))}
          </Stack>
        ) : jobPostsApplied.length === 0 ? (
          <Box py={5}>
            <Empty description="Chưa có ứng viên nào ứng tuyển" />
          </Box>
        ) : (
          <Stack spacing={2}>
            {jobPostsApplied.map((value) => (
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                key={value.id}
              >
                <Box>
                  <MuiImageCustom
                    width={54}
                    height={54}
                    sx={{
                      borderRadius: 50,
                      border: 1,
                      borderColor: '#e0e0e0',
                      p: 0.25,
                    }}
                    src={value?.avatarUrl}
                  />
                </Box>
                <Stack flex={1} width={'50%'}>
                  <Tooltip title={value?.fullName} arrow>
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: 15,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        cursor: 'pointer',
                      }}
                    >
                      {value?.fullName || '---'}
                    </span>
                  </Tooltip>
                  <Tooltip title={value?.jobPostTitle} arrow>
                    <Typography
                      variant="caption"
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        cursor: 'pointer',
                      }}
                    >
                      {value?.jobPostTitle || '---'}
                    </Typography>
                  </Tooltip>
                </Stack>
                <Box>
                  <Chip
                    label="Nhắn tin"
                    color="success"
                    variant="outlined"
                    onClick={() =>
                      handleAddRoom(value?.userId, {
                        userId: value?.userId,
                        name: value?.fullName,
                        email: value?.userEmail,
                        avatarUrl: value?.avatarUrl,
                        company: null,
                      })
                    }
                  />
                </Box>
              </Stack>
            ))}
          </Stack>
        )}
      </Box>
      <Stack sx={{ pt: 2 }} alignItems="center" justifyContent="center">
        {Math.ceil(count / pageSize) > 1 && (
          <Pagination
            color="primary"
            size="medium"
            variant="text"
            sx={{ margin: '0 auto' }}
            count={Math.ceil(count / pageSize)}
            page={page}
            onChange={(event, newPage) => {
              setPage(newPage);
            }}
          />
        )}
      </Stack>
    </Box>
  );
};

RightSidebar.Employer = EmployerSidebar;

export default RightSidebar;
