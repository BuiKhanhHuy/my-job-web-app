import React from 'react';
import db from '../configs/firebase-config';
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from 'firebase/firestore';

const useFirebaseFireStore = (collectionName, condition, sort = 'desc') => {
  const [docs, setDocs] = React.useState([]);

  React.useEffect(() => {
    const collectionRef = collection(db, collectionName);
    let q = query(collectionRef, orderBy('createdAt', sort));

    if (condition) {
      if (!condition.compareValue) {
        setDocs([]);
        return;
      }

      q = query(
        collectionRef,
        where(condition.fieldName, condition.operator, condition.compareValue),
        orderBy('createdAt', sort)
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
  }, [collectionName, condition, sort]);

  return docs;
};

export default useFirebaseFireStore;
