import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCODL-LGP4f3pmHSFqJtSTqJTxzcdFf2sU",
  authDomain: "college-guide-49b3a.firebaseapp.com",
  projectId: "college-guide-49b3a",
  storageBucket: "college-guide-49b3a.appspot.com",
  messagingSenderId: "745463651630",
  appId: "1:745463651630:web:b3ab9b6bee38731a4ceebf",
  measurementId: "G-N23EMTNSCD"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { firestore, storage }; 