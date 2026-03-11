import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

console.log("API KEY:", process.env.REACT_APP_API_KEY);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "theerawat-web.firebaseapp.com",
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: "theerawat-web.firebasestorage.app",
  messagingSenderId: "545068050908",
  appId: process.env.REACT_APP_APP_ID
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;