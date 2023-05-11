import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyCKr_uSX5ObUgxEEfLIOYhze750NPlTjgM',
  authDomain: 'myjobpro-6283b.firebaseapp.com',
  projectId: 'myjobpro-6283b',
  storageBucket: 'myjobpro-6283b.appspot.com',
  messagingSenderId: '734184453591',
  appId: '1:734184453591:web:226041c4414b54c9b8c792',
  databaseURL:
    'https://myjobpro-6283b-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
