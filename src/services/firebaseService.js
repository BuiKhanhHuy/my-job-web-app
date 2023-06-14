import {
  getFirestore,
  collection,
  setDoc,
  doc,
  getDoc,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  increment,
} from 'firebase/firestore';
import db, { serverTimestamp } from '../configs/firebase-config';

export const addDocument = async (collectionName, data) => {
  const query = collection(db, collectionName);

  const docRef = await addDoc(query, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  console.log('Document written with ID: ', docRef.id);
  return docRef.id;
};

export const updateChatRoomByPartnerId = (partnerId, chatRoomId) => {
  const chatRoomDocRef = doc(db, 'chatRooms', `${chatRoomId}`);
  updateDoc(chatRoomDocRef, {
    recipientId: `${partnerId}`,
    unreadCount: increment(1),
    updatedAt: serverTimestamp(),
  })
    .then(() => {
      console.log('update chatRoom success');
    })
    .catch((error) => {
      console.log('update chatRoom failed: ', error);
    });
};

export const checkExists = async (collectionName, docId) => {
  const firestore = getFirestore();
  const documentRef = doc(firestore, collectionName, `${docId}`);

  const documentSnapshot = await getDoc(documentRef);

  return documentSnapshot.exists();
};

export const createUser = async (collectionName, userData, userId) => {
  try {
    const userRef = doc(db, collectionName, `${userId}`);

    await setDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const checkChatRoomExists = async (collectionName, member1, member2) => {
  const firestore = getFirestore();
  const chatRoomsRef = collection(firestore, collectionName);

  const q = query(
    chatRoomsRef,
    where('membersString', 'array-contains', `${member1}-${member2}`)
  );
  const querySnapshot = await getDocs(q);

  if (querySnapshot.size > 0) {
    const roomId = querySnapshot.docs[0].id;
    return roomId;
  } else {
    console.log('Room does not exist');
    return null;
  }
};

export const getChatRoomById = async (chatRoomId, currentUserId) => {
  const chatRoomRef = doc(db, 'chatRooms', `${chatRoomId}`);
  const docSnap = await getDoc(chatRoomRef);

  if (docSnap.exists()) {
    let partnerId = '';
    const chatRoomData = docSnap.data();

    if (chatRoomData?.members[0] === `${currentUserId}`) {
      partnerId = chatRoomData?.members[1];
    } else {
      partnerId = chatRoomData?.members[0];
    }

    const userAccount = await getUserAccount('accounts', `${partnerId}`);
    return {
      ...chatRoomData,
      id: docSnap.id,
      user: userAccount,
    };
  } else {
    return {};
  }
};

export const getUserAccount = async (collectionName, userId) => {
  const userRef = doc(db, collectionName, `${userId}`);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

// tao keywords cho displayName, su dung cho search
export const generateKeywords = (displayName) => {
  // liet ke tat cac hoan vi. vd: name = ["David", "Van", "Teo"]
  // => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
  const name = displayName.split(' ').filter((word) => word);

  const length = name.length;
  let flagArray = [];
  let result = [];
  let stringArray = [];

  /**
   * khoi tao mang flag false
   * dung de danh dau xem gia tri
   * tai vi tri nay da duoc su dung
   * hay chua
   **/
  for (let i = 0; i < length; i++) {
    flagArray[i] = false;
  }

  const createKeywords = (name) => {
    const arrName = [];
    let curName = '';
    name.split('').forEach((letter) => {
      curName += letter;
      arrName.push(curName);
    });
    return arrName;
  };

  function findPermutation(k) {
    for (let i = 0; i < length; i++) {
      if (!flagArray[i]) {
        flagArray[i] = true;
        result[k] = name[i];

        if (k === length - 1) {
          stringArray.push(result.join(' '));
        }

        findPermutation(k + 1);
        flagArray[i] = false;
      }
    }
  }

  findPermutation(0);

  const keywords = stringArray.reduce((acc, cur) => {
    const words = createKeywords(cur);
    return [...acc, ...words];
  }, []);

  return keywords;
};
