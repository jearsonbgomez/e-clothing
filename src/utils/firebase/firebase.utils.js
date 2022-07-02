import { initializeApp } from 'firebase/app';
import { 
  GoogleAuthProvider, 
  getAuth, 
  signInWithPopup 
} from "firebase/auth";

import { 
  getFirestore,
  collection, 
  doc, 
  getDoc, 
  setDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCA6vYNRY-Y37-dBRDdeExhRQkDyIEDMUk",
  authDomain: "e-clothing-db-973ee.firebaseapp.com",
  projectId: "e-clothing-db-973ee",
  storageBucket: "e-clothing-db-973ee.appspot.com",
  messagingSenderId: "15930571817",
  appId: "1:15930571817:web:efd783bb38283468977038"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore();

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const upsertUser = async (user) => {

  const { email, uid, displayName } = user;

  const createdAt = new Date();

  const userReference = doc(db, 'users', uid);

  const documentSnapShot = await getDoc(userReference);

  if(!documentSnapShot.exists()) {
    try {
      await setDoc(userReference, {
        email,
        displayName,
        createdAt
      });
    } catch (error) {
      console.error('Error authenticating user', error);
    }
  }

  return userReference;
}