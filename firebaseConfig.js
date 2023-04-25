import {
  Firebase_apiKey,
  Firebase_authDomain,
  Firebase_projectId,
  Firebase_storageBucket,
  Firebase_messagingSenderId,
  Firebase_appId,
  Firebase_measurementId,
  Firebase_databaseURL,
} from "@env";
// Import the functions you need from the SDKs you need
import { getDatabase } from "@firebase/database";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: Firebase_apiKey,
  authDomain: Firebase_authDomain,
  projectId: Firebase_projectId,
  storageBucket: Firebase_storageBucket,
  messagingSenderId: Firebase_messagingSenderId,
  appId: Firebase_appId,
  measurementId: Firebase_measurementId,
  databaseURL: Firebase_databaseURL,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();
const storage = getStorage(app);

export { auth, db, storage };
