import React from 'react';
import db from '../configs/firebase-config';
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

const useFirebaseFireStore = (collectionName, condition) => {
  const [docs, setDocs] = React.useState([]);

  React.useEffect(() => {
    const collectionRef = collection(db, collectionName);
    let q = query(collectionRef);

    if (condition) {
      if (!condition.compareValue) {
        setDocs([]);
        return;
      }

      q = query(
        collectionRef,
        where(condition.fieldName, condition.operator, condition.compareValue)
      );
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      
      setDocs(documents);
    });

    return unsubscribe;
  }, [collectionName, condition]);

  return docs;
};

export default useFirebaseFireStore;
