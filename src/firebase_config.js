import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCm_AVqecg8Qxac5Bshiv7dv7L2eUtTFMI",
  authDomain: "theerawat-web.firebaseapp.com",
  projectId: "theerawat-web",
  storageBucket: "theerawat-web.firebasestorage.app",
  messagingSenderId: "545068050908",
  appId: "1:545068050908:web:cfc8f858e1d6d1fe1f0719"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Create Auth object
const auth = getAuth(app);

export default auth;