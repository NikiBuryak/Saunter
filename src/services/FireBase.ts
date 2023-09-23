import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyAyUQiPlLpa_7LuxGHj1PHGXOKKPRwP0",
  authDomain: "techtask-72c42.firebaseapp.com",
  projectId: "techtask-72c42",
  storageBucket: "techtask-72c42.appspot.com",
  messagingSenderId: "302991791473",
  appId: "1:302991791473:web:7c41c44623bc36ab5f92d0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)