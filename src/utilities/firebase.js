import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useState, useEffect } from 'react';
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBAAAaqRWLP7A4BwEmCVC2OWoKXw8j79W4",
  authDomain: "dirtylittlepaws-487d9.firebaseapp.com",
  databaseURL: "https://dirtylittlepaws-487d9-default-rtdb.firebaseio.com",
  projectId: "dirtylittlepaws-487d9",
  storageBucket: "dirtylittlepaws-487d9.appspot.com",
  messagingSenderId: "781498327165",
  appId: "1:781498327165:web:9da20c4afa727b8e5e5114"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);



export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      // if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
    
    return [data, loading, error];
  };


  export const setData = (path, value) => (
    set(ref(database, path), value)
  );


  export const pushToFirebase = async (route, userid, data) => {
    if (data) {
      try {
        await setData(`users/${userid}/info/${route}`, data);
        console.log("pushed to firebase")
      } catch (error) {
        alert(error);
      }
    }
  };

  export const changeAvaliability = async (StationID, avaliable) =>
  {
    try{
      await setData("Locations/"+StationID+"/avaliable", avaliable);
      }catch(error)
      {
       alert(error);
      }
  }

  export const useUserState = () => {
    const [user, setUser] = useState();
  
    useEffect(() => {
      onIdTokenChanged(getAuth(firebase), setUser);
    }, []); 

    // if(user){
    //   console.log(user.displayName)
    // }
      
    return user;
  };
  
  export const signInWithG = () => {
    signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
  };

  export const signOutOfG = () => signOut(getAuth(firebase));

