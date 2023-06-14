import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Stack, TextField, Button, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import InfiniteScroll from 'react-infinite-scroll-component';

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
import { ChatContext } from '../../../../context/ChatProvider';
import Message from '../Message';
import { ImageSvg14, ROLES_NAME } from '../../../../configs/constants';
import NoDataCard from '../../../../components/NoDataCard';
import {
  addDocument,
  getChatRoomById,
  updateChatRoomByPartnerId,
} from '../../../../services/firebaseService';
import ChatInfo from '../../../../components/chats/ChatInfo';

const LIMIT = 20;
const messageCollectionRef = collection(db, 'messages');

const ChatWindow = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentUserChat, selectedRoomId } = React.useContext(ChatContext);
  const inputRef = React.useRef(null);
  const [inputValue, setInputValue] = React.useState('');

  const [selectedRoom, setSelectedRoom] = React.useState({});
  const [partnerId, setPartnerId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(true);
  const [lastDocument, setLastDocument] = React.useState(null);
  const [messages, setMessages] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const getChatRoom = async (selectedRoomId, userId) => {
      const selectRoom = await getChatRoomById(selectedRoomId, userId);

      setSelectedRoom(selectRoom);
      setPartnerId(selectRoom?.user?.userId);
    };
    if (selectedRoomId && currentUserChat) {
      getChatRoom(selectedRoomId, currentUserChat.userId);
    }
  }, [selectedRoomId, currentUserChat]);

  // lang nghe tong message
  React.useEffect(() => {
    if (selectedRoomId) {
      const q = query(
        messageCollectionRef,
        where('roomId', '==', `${selectedRoomId}`)
      );

      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        let total = 0;
        querySnapshot.forEach((doc) => {
          total = total + 1;
        });

        setCount(total);
      });

      return () => {
        unsubscribe();
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoomId]);

  // danh sach messages
  React.useEffect(() => {
    setIsLoading(true);
    setHasMore(true);
    setPage(1);

    let q = query(
      messageCollectionRef,
      where('roomId', '==', `${selectedRoomId}`),
      orderBy('createdAt', 'desc'),
      limit(LIMIT)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      if (querySnapshot.docs.length > 0) {
        setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
      }

      setMessages(messagesData);
      setIsLoading(false);
    });

    return () => unsubscribe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoomId]);

  // tai them du lieu
  const handleLoadMore = () => {
    const getMoreData = async () => {
      if (lastDocument !== null) {
        const q = query(
          messageCollectionRef,
          where('roomId', '==', `${selectedRoomId}`),
          orderBy('createdAt', 'desc'),
          startAfter(lastDocument),
          limit(LIMIT)
        );

        const querySnapshot = await getDocs(q);
        if (querySnapshot.docs.length > 0) {
          setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
        }
        const messagesData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setMessages([...messages, ...messagesData]);
      }
    };

    if (Math.ceil(count / LIMIT) > page) {
      setPage(page + 1);
      getMoreData();
    } else {
      setHasMore(false);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim() !== '') {
      // them message
      addDocument('messages', {
        text: inputValue,
        userId: `${currentUserChat?.userId}`,
        roomId: selectedRoomId,
      });

      // cap nhat chat room
      updateChatRoomByPartnerId(partnerId, selectedRoomId);

      setInputValue('');

      if (inputRef?.current) {
        setTimeout(() => {
          inputRef.current.focus();
        });
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.shiftKey === false) {
      event.preventDefault();
      handleOnSubmit(event);
    }
  };

  return (
    <Stack direction="column" justifyContent="space-around">
      {selectedRoomId ? (
        <Stack>
          <Box height="75vh">
            {isLoading ? (
              <Stack
                sx={{ py: 2 }}
                justifyContent="center"
                alignItems="center"
                height={'100%'}
              >
                <CircularProgress color="secondary" sx={{ margin: 'auto' }} />
              </Stack>
            ) : messages.length === 0 ? (
              currentUser?.roleName === ROLES_NAME.JOB_SEEKER ? (
                <ChatInfo
                  avatarUrl={selectedRoom?.user?.avatarUrl}
                  title={selectedRoom?.user?.name}
                  subTitle={selectedRoom?.user?.company?.companyName}
                />
              ) : (
                <ChatInfo
                  avatarUrl={selectedRoom?.user?.avatarUrl}
                  title={selectedRoom?.user?.name}
                  subTitle={selectedRoom?.user?.email}
                />
              )
            ) : (
              <div
                id="scrollableDiv"
                style={{
                  height: '75vh',
                  overflow: 'auto',
                  display: 'flex',
                  flexDirection: 'column-reverse',
                }}
              >
                <InfiniteScroll
                  style={{
                    overflowY: 'auto',
                    padding: 2,
                    display: 'flex',
                    flexDirection: 'column-reverse',
                  }}
                  scrollableTarget="scrollableDiv"
                  dataLength={messages.length}
                  next={handleLoadMore}
                  hasMore={hasMore}
                  inverse={true}
                  loader={
                    <Stack sx={{ py: 2 }} justifyContent="center">
                      <CircularProgress
                        color="secondary"
                        sx={{ margin: '0 auto' }}
                      />
                    </Stack>
                  }
                >
                  {messages.map((value) => (
                    <Message
                      key={value.id}
                      userId={value?.userId}
                      text={value?.text}
                      avatarUrl={
                        `${currentUserChat?.userId}` === `${value?.userId}`
                          ? currentUserChat?.avatarUrl
                          : selectedRoom?.user?.avatarUrl
                      }
                      createdAt={value?.createdAt}
                    />
                  ))}
                </InfiniteScroll>
              </div>
            )}
          </Box>
          <Box
            flex={1}
            p={2}
            component="form"
            onSubmit={(e) => handleOnSubmit(e)}
          >
            <Stack direction="row" spacing={2} alignItems="flex-end">
              <Box flex={1}>
                <TextField
                  inputRef={inputRef}
                  fullWidth
                  placeholder={'Nhập nội dung tại đây ...'}
                  defaultValue=""
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  multiline
                  maxRows={5}
                  variant="outlined"
                />
              </Box>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<SendIcon />}
                  type="submit"
                >
                  Gửi
                </Button>
              </Box>
            </Stack>
          </Box>
        </Stack>
      ) : (
        <Stack justifyContent="center">
          <NoDataCard
            title="Bạn không có cuộc trò chuyện nào..."
            imgComponentSgv={<ImageSvg14 />}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default ChatWindow;
