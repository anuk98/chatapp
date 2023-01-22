import { initializeApp } from "firebase/app"
import {getAuth} from 'firebase/auth'
import { getStorage  } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBX-iuQKnNySdNIngT0Uct5nznSKEQXEQ",
  authDomain: "chatapp-b2f88.firebaseapp.com",
  projectId: "chatapp-b2f88",
  storageBucket: "chatapp-b2f88.appspot.com",
  messagingSenderId: "788547866503",
  appId: "1:788547866503:web:aa5a362c688d122ee68d22"
};

export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);