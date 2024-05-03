import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDxk7NrAGsqLEW4TsHTKQlBHOw2IbUkato",
  authDomain: "it-sysarch32-store-acosta.firebaseapp.com",
  projectId: "it-sysarch32-store-acosta",
  storageBucket: "it-sysarch32-store-acosta.appspot.com",
  messagingSenderId: "148579718872",
  appId: "1:148579718872:web:40842bec5c0bf0b9c829ad",
  measurementId: "G-NP91RB9VTS"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);


export default db;