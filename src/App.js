import { useEffect, useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Student from "./components/student";
import { Routes, Route, Navigate } from "react-router-dom";
import Activity from "./components/Activity";
import Education from "./components/Education";
import TCTForm from "./components/TCTForm.jsx";
import Itunes from "./components/ItunesPage.jsx";

import auth from "./firebase_config.js";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

function App() {
  const std1 = {
    name: "Theerawat Noonngam",
    stdid: "6802041510180",
    sect: "TCT",
  };

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setUserInfo(user ? user : null);
    });
    return () => unsub();
  }, []);

  const login = () => {
    const provider = new GoogleAuthProvider();
    auth.useDeviceLanguage();
    signInWithPopup(auth, provider).catch((err) => alert(err.message));
  };

  const logout = () => {
    signOut(auth).catch((err) => alert(err.message));
  };

  return (
    <div style={{ backgroundColor: "#d6fc7e", minHeight: "100vh" }}>
      
      <Header user={userInfo} login={login} logout={logout} />

      <Routes>
        <Route path="/" element={<Student stdInfo={std1} />} />
        <Route path="/edu" element={<Education />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/Itunes" element={<Itunes />} />
        <Route path="/tct-form" element={<TCTForm />} />

        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;