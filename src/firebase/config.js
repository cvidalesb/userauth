import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDs_apAxUPW6JNHbMM7raL13uEepwIz8UU",
  authDomain: "userauth-56f60.firebaseapp.com",
  projectId: "userauth-56f60",
  storageBucket: "userauth-56f60.firebasestorage.app",
  messagingSenderId: "464848560625",
  appId: "1:464848560625:web:8e4cd9b809352f65fd2450",
  measurementId: "G-PEN5663MNQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
