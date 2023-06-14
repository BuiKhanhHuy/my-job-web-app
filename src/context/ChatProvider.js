import React from 'react';
import { useSelector } from 'react-redux';

import { ROLES_NAME } from '../configs/constants';
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
  const [currentUserChat, setCurrentUserChat] = React.useState(null);

  React.useEffect(() => {
    const createUserChat = async () => {
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
      const userChat = await getUserAccount('accounts', userId);
      setCurrentUserChat(userChat);
      console.log('userChat: ', userChat);
    };

    createUserChat();
  }, [currentUser, userId]);

  return (
    <ChatContext.Provider
      value={{
        currentUserChat,
        selectedRoomId,
        setSelectedRoomId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
