// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfFvsf3c-c_D35AKF9ei4ge0gybkUu4Wk",
  authDomain: "podcast-app-10532.firebaseapp.com",
  projectId: "podcast-app-10532",
  storageBucket: "podcast-app-10532.appspot.com",
  messagingSenderId: "1008993725418",
  appId: "1:1008993725418:web:f587fa2122904ee2de6093",
  measurementId: "G-2LJX89SLCT"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, storage };

// making customer useAuth Hook so that we can use it in any component
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);
  return currentUser;
}



