/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from 'react';
import {
  Box,
  CircularProgress,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircleIcon from '@mui/icons-material/Circle';

import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  startAfter,
  limit,
  getDocs,
} from 'firebase/firestore';
import db from '../../../../configs/firebase-config';

import NoDataCard from '../../../../components/NoDataCard';
import { SVG_IMAGES } from '../../../../configs/constants';
import { ChatContext } from '../../../../context/ChatProvider';
import MuiImageCustom from '../../../../components/MuiImageCustom';
import ChatRoomSearch from '../../../../components/chats/ChatRoomSearch';
import { useDebounce } from '../../../../hooks';
import { getUserAccount } from '../../../../services/firebaseService';

const LoadingComponentItem = () => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Box>
        <Skeleton variant="circular" width={54} height={54} />
      </Box>
      <Stack flex={1} spacing={1}>
        <Skeleton variant="rounded" />
        <Skeleton variant="rounded" />
      </Stack>
    </Stack>
  );
};

const LIMIT = 20;
const chatRoomCollectionRef = collection(db, 'chatRooms');

const LeftSidebar = () => {
  const { currentUserChat, setSelectedRoomId } = React.useContext(ChatContext);
  const [searchText, setSearchText] = React.useState('');
  const deboundedTextValue = useDebounce(searchText, 500);

  const [isLoading, setIsLoading] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(true);
  const [lastDocument, setLastDocument] = React.useState(null);
  const [chatRooms, setChatRooms] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const handleSelectRoom = (chatRoom) => {
    setSelectedRoomId(chatRoom?.id);
  };

  React.useEffect(() => {
    console.log('==> Bắn API Search: ', deboundedTextValue);
  }, [deboundedTextValue]);

  // lang nghe tong chat rooms
  React.useEffect(() => {
    if (currentUserChat) {
      const q = query(
        chatRoomCollectionRef,
        where('members', 'array-contains', `${currentUserChat.userId}`)
      );

      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        setCount(querySnapshot?.size || 0);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [currentUserChat]);

  // load danh sach chat rooms
  React.useEffect(() => {
    if (currentUserChat) {
      setIsLoading(true);

      let q = query(
        chatRoomCollectionRef,
        where('members', 'array-contains', `${currentUserChat.userId}`),
        orderBy('updatedAt', 'desc'),
        limit(LIMIT)
      );

      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        let chatRoomsData = [];

        const promises = querySnapshot.docs.map(async (doc) => {
          try {
            let partnerId = '';
            const chatRoomData = doc.data();

            if (chatRoomData?.members[0] === `${currentUserChat.userId}`) {
              partnerId = chatRoomData?.members[1];
            } else {
              partnerId = chatRoomData?.members[0];
            }

            const userAccount = await getUserAccount(
              'accounts',
              `${partnerId}`
            );

            chatRoomsData.push({
              ...chatRoomData,
              id: doc.id,
              user: userAccount,
            });
          } catch (error) {
            console.error(error);
          }
        });

        if (querySnapshot.docs.length > 0) {
          setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
        }
        await Promise.all(promises);

        setChatRooms(chatRoomsData);
        setHasMore(true);
        setPage(1);
        setIsLoading(false);
      });

      return () => unsubscribe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserChat]);

  // tai them du lieu
  const handleLoadMore = () => {
    const getMoreData = async () => {
      if (lastDocument !== null) {
        const q = query(
          chatRoomCollectionRef,
          where('members', 'array-contains', `${currentUserChat.userId}`),
          orderBy('updatedAt', 'desc'),
          startAfter(lastDocument),
          limit(LIMIT)
        );
        const querySnapshot = await getDocs(q);
        let chatRoomsData = [];
        if (querySnapshot.docs.length > 0) {
          setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
        }
        const promises = querySnapshot.docs.map(async (doc) => {
          try {
            let partnerId = '';
            const chatRoomData = doc.data();
            if (chatRoomData?.members[0] === `${currentUserChat.userId}`) {
              partnerId = chatRoomData?.members[1];
            } else {
              partnerId = chatRoomData?.members[0];
            }
            const userAccount = await getUserAccount(
              'accounts',
              `${partnerId}`
            );
            chatRoomsData.push({
              ...chatRoomData,
              id: doc.id,
              user: userAccount,
            });
          } catch (error) {
            console.error(error);
          }
        });
        await Promise.all(promises);
        setChatRooms([...chatRooms, ...chatRoomsData]);
      }
    };
    if (Math.ceil(count / LIMIT) > page) {
      setPage(page + 1);
      getMoreData();
    } else {
      setHasMore(false);
    }
  };

  return (
    <Box>
      <Stack spacing={2}>
        <Box>
          <ChatRoomSearch
            value={searchText}
            setValue={setSearchText}
            placeholder="Tên công ty, tên nhà tuyển dụng, ..."
          />
        </Box>
        <Box
          sx={{
            height: '75vh',
          }}
        >
          {isLoading ? (
            <Stack spacing={2} overflow={'hidden'} height="100%">
              {Array.from(Array(12).keys()).map((value) => (
                <LoadingComponentItem key={value} />
              ))}
            </Stack>
          ) : chatRooms.length === 0 ? (
            <NoDataCard
              title="Không tìm thấy cuộc trò chuyện nào..."
              imgComponentSgv={<SVG_IMAGES.ImageSvg15 />}
            />
          ) : (
            <Stack spacing={1}>
              <InfiniteScroll
                height={'75vh'}
                style={{
                  overflowY: 'auto',
                }}
                dataLength={chatRooms.length}
                next={handleLoadMore}
                hasMore={hasMore}
                loader={
                  <Stack sx={{ py: 2 }} justifyContent="center">
                    <CircularProgress
                      color="secondary"
                      sx={{ margin: '0 auto' }}
                    />
                  </Stack>
                }
              >
                {chatRooms.map((value) => (
                  <Stack
                    onClick={() => handleSelectRoom(value)}
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    key={value.id}
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: '#ede7f6',
                      },
                    }}
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
                        src={`${value?.user?.avatarUrl}`}
                      />
                    </Box>
                    <Stack flex={1} width={'50%'}>
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
                        {`${value?.user?.name}`}
                      </span>

                      <Typography
                        variant="caption"
                        sx={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          cursor: 'pointer',
                        }}
                      >
                        {`${value?.user?.company?.companyName}` || '---'}
                      </Typography>
                    </Stack>
                    <Box>
                      {`${value?.recipientId}` ===
                        `${currentUserChat.userId}` &&
                        value?.unreadCount > 0 && (
                          <CircleIcon
                            style={{ color: '#2979ff', fontSize: 12 }}
                          />
                        )}
                    </Box>
                  </Stack>
                ))}
              </InfiniteScroll>
            </Stack>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

const EmployerSidebar = () => {
  const { currentUserChat, setSelectedRoomId } = React.useContext(ChatContext);
  const [searchText, setSearchText] = React.useState('');
  const deboundedTextValue = useDebounce(searchText, 500);

  const [isLoading, setIsLoading] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(true);
  const [lastDocument, setLastDocument] = React.useState(null);
  const [chatRooms, setChatRooms] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const handleSelectRoom = (chatRoom) => {
    setSelectedRoomId(chatRoom?.id);
  };

  React.useEffect(() => {
    console.log('==> Bắn API Search: ', deboundedTextValue);
  }, [deboundedTextValue]);

  // lang nghe tong chat rooms
  React.useEffect(() => {
    if (currentUserChat) {
      const q = query(
        chatRoomCollectionRef,
        where('members', 'array-contains', `${currentUserChat.userId}`)
      );

      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        setCount(querySnapshot?.size || 0);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [currentUserChat]);

  // load danh sach chat rooms
  React.useEffect(() => {
    if (currentUserChat) {
      setIsLoading(true);

      let q = query(
        chatRoomCollectionRef,
        where('members', 'array-contains', `${currentUserChat.userId}`),
        orderBy('updatedAt', 'desc'),
        limit(LIMIT)
      );

      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        let chatRoomsData = [];

        const promises = querySnapshot.docs.map(async (doc) => {
          try {
            let partnerId = '';
            const chatRoomData = doc.data();

            if (chatRoomData?.members[0] === `${currentUserChat.userId}`) {
              partnerId = chatRoomData?.members[1];
            } else {
              partnerId = chatRoomData?.members[0];
            }

            const userAccount = await getUserAccount(
              'accounts',
              `${partnerId}`
            );

            chatRoomsData.push({
              ...chatRoomData,
              id: doc.id,
              user: userAccount,
            });
          } catch (error) {
            console.error(error);
          }
        });

        if (querySnapshot.docs.length > 0) {
          setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
        }
        await Promise.all(promises);

        setChatRooms(chatRoomsData);
        setHasMore(true);
        setPage(1);
        setIsLoading(false);
      });

      return () => unsubscribe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserChat]);

  // tai them du lieu
  const handleLoadMore = () => {
    const getMoreData = async () => {
      if (lastDocument !== null) {
        const q = query(
          chatRoomCollectionRef,
          where('members', 'array-contains', `${currentUserChat.userId}`),
          orderBy('updatedAt', 'desc'),
          startAfter(lastDocument),
          limit(LIMIT)
        );
        const querySnapshot = await getDocs(q);
        let chatRoomsData = [];
        if (querySnapshot.docs.length > 0) {
          setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
        }
        const promises = querySnapshot.docs.map(async (doc) => {
          try {
            let partnerId = '';
            const chatRoomData = doc.data();
            if (chatRoomData?.members[0] === `${currentUserChat.userId}`) {
              partnerId = chatRoomData?.members[1];
            } else {
              partnerId = chatRoomData?.members[0];
            }
            const userAccount = await getUserAccount(
              'accounts',
              `${partnerId}`
            );
            chatRoomsData.push({
              ...chatRoomData,
              id: doc.id,
              user: userAccount,
            });
          } catch (error) {
            console.error(error);
          }
        });
        await Promise.all(promises);
        setChatRooms([...chatRooms, ...chatRoomsData]);
      }
    };
    if (Math.ceil(count / LIMIT) > page) {
      setPage(page + 1);
      getMoreData();
    } else {
      setHasMore(false);
    }
  };

  return (
    <Box>
      <Stack spacing={2}>
        <Box>
          <ChatRoomSearch
            value={searchText}
            setValue={setSearchText}
            placeholder="Họ tên ứng viên ..."
          />
        </Box>
        <Box sx={{ height: '75vh', overflowY: 'auto' }}>
          {isLoading ? (
            <Stack spacing={2}>
              {Array.from(Array(12).keys()).map((value) => (
                <LoadingComponentItem key={value} />
              ))}
            </Stack>
          ) : chatRooms.length === 0 ? (
            <NoDataCard
              title="Không tìm thấy cuộc trò chuyện nào..."
              imgComponentSgv={<SVG_IMAGES.ImageSvg15 />}
            />
          ) : (
            <Stack spacing={1}>
              <Box>
                <InfiniteScroll
                  height={'75vh'}
                  style={{
                    overflowY: 'auto',
                  }}
                  dataLength={chatRooms.length}
                  next={handleLoadMore}
                  hasMore={hasMore}
                  loader={
                    <Stack sx={{ py: 2 }} justifyContent="center">
                      <CircularProgress
                        color="secondary"
                        sx={{ margin: '0 auto' }}
                      />
                    </Stack>
                  }
                >
                  {chatRooms.map((value) => (
                    <Stack
                      onClick={() => handleSelectRoom(value)}
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      key={value.id}
                      sx={{
                        p: 1,
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: '#ede7f6',
                        },
                      }}
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
                          src={`${value?.user?.avatarUrl}`}
                        />
                      </Box>
                      <Stack flex={1} width={'50%'}>
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
                          {`${value?.user?.name}` || '---'}
                        </span>

                        <Typography
                          variant="caption"
                          sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            cursor: 'pointer',
                          }}
                        >
                          {`${value?.user?.email}` || '---'}
                        </Typography>
                      </Stack>
                      <Box>
                        {`${value?.recipientId}` ===
                          `${currentUserChat.userId}` &&
                          value?.unreadCount > 0 && (
                            <CircleIcon
                              style={{ color: '#2979ff', fontSize: 12 }}
                            />
                          )}
                      </Box>
                    </Stack>
                  ))}
                </InfiniteScroll>
              </Box>
            </Stack>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

LeftSidebar.Employer = EmployerSidebar;

export default LeftSidebar;
