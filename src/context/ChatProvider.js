import React from 'react';
import { useSelector } from 'react-redux';

import { ROLES_NAME } from '../configs/constants';
import useFireStoreGetChatRoom from '../hooks/useFireStoreGetChatRoom';
import {
  checkExists,
  createUser,
  getUserAccount,
} from '../services/firebaseService';

export const ChatContext = React.createContext();

const ChatProvider = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { id: userId } = currentUser;
  const [selectedRoomId, setSelectedRoomId] = React.useState('');
  const [currentAccount, setCurrentAccount] = React.useState(null);

  React.useEffect(() => {
    const createAccount = async () => {
      const isExists = await checkExists('accounts', userId);

      if (!isExists) {
        // tao moi user tren firestore.
        let userData = null;
        const roleName = currentUser.roleName;
        if (roleName === ROLES_NAME.JOB_SEEKER) {
          userData = {
            userId: userId,
            name: currentUser?.fullName,
            email: currentUser?.email,
            avatarUrl: currentUser?.avatarUrl,
            company: null,
          };
        } else {
          userData = {
            userId: userId,
            name: currentUser?.fullName,
            email: currentUser?.email,
            avatarUrl: currentUser?.company?.imageUrl,
            company: {
              companyId: currentUser?.company?.id,
              slug: currentUser?.company?.slug,
              companyName: currentUser?.company?.companyName,
              imageUrl: currentUser?.company?.imageUrl,
            },
          };
        }

        const createResult = await createUser('accounts', userData, userId);
        console.log('CREATE USER TRÊN FILRESTORE: ', createResult);
      }

      // lay thong tin user hien tai
      const account = await getUserAccount('accounts', userId);
      setCurrentAccount(account);
    };

    createAccount();
  }, [currentUser, userId]);

  const chatRoomsCondition = React.useMemo(() => {
    return {
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: `${userId}`,
    };
  }, [userId]);

  const chatRooms = useFireStoreGetChatRoom(chatRoomsCondition, userId);

  const selectedRoom = React.useMemo(
    () => chatRooms.find((room) => room.id === selectedRoomId) || {},
    [chatRooms, selectedRoomId]
  );

  return (
    <ChatContext.Provider
      value={{
        currentAccount: currentAccount,
        chatRooms: chatRooms,
        selectedRoom: selectedRoom,
        selectedRoomId,
        setSelectedRoomId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
