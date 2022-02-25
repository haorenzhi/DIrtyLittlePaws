// firebase.utils.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getDatabase, set, ref } from 'firebase/database';
import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth, 
  GoogleAuthProvider, 
  setPersistence,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBAAAaqRWLP7A4BwEmCVC2OWoKXw8j79W4",
    authDomain: "dirtylittlepaws-487d9.firebaseapp.com",
    databaseURL: "https://dirtylittlepaws-487d9-default-rtdb.firebaseio.com",
    projectId: "dirtylittlepaws-487d9",
    storageBucket: "dirtylittlepaws-487d9.appspot.com",
    messagingSenderId: "781498327165",
    appId: "1:781498327165:web:9da20c4afa727b8e5e5114"
  };
  
const myFirebase = initializeApp(firebaseConfig);

// export const auth = firebase.auth(); 
export const auth = getAuth(myFirebase);
export const database = getDatabase(myFirebase);

// const provider = new firebase.auth.GoogleAuthProvider();
//select from google accounts every time you refresh page and sign in
// provider.setCustomParameters({ prompt: 'select_account' });
// export const signInwithG = () => auth.signInWithPopup(provider);
export const signInwithG = () => signInWithPopup(auth, new GoogleAuthProvider());
setPersistence(auth, browserLocalPersistence)

export const pushToFirebase = async (info, user) => {
  if (info) {
    try {
      await set(ref(database, `users/${user.uid}info/${info.id}/`), info);
    } catch (error) {
      alert(error);
    }
  }
};

export default firebase;
