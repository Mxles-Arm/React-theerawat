import { useEffect, useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Student from "./components/student";
import { Routes, Route } from "react-router-dom";
import Activity from "./components/Activity";
import Education from "./components/Education";
import TCTForm from "./components/TCTForm.jsx";
import Itunes from "./components/ItunesPage.jsx";
import NotFound from "./components/NotFound";

import auth from "./firebase_config.js";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

const App = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setUserInfo(user || null);
    });
    return () => unsub();
  }, []);

  const login = () => {
    const provider = new GoogleAuthProvider();
    auth.useDeviceLanguage();
    signInWithPopup(auth, provider).catch((error) => {
      window.alert(error.message);
    });
  };

  const logout = () => {
    signOut(auth).catch((error) => {
      alert(error.message);
    });
  };

  const requireAuth = (element) => {
    if (!userInfo) {
      return <div>Please login first</div>;
    }
    return element;
  };

  const std1 = {
    name: "Theerawat Noonngam",
    stdid: "6802041510180",
    sect: "TCT",
  };

  return (
    <div style={{ backgroundColor: "#d6fc7e", minHeight: "100vh" }}>
      <Header user={userInfo} login={login} logout={logout} />

      <Routes>
        <Route path="/" element={<Student stdInfo={std1} />} />
        <Route path="/edu" element={<Education />} />
        <Route path="/activity" element={<Activity />} />

        <Route
          path="/Itunes"
          element={requireAuth(
            <Itunes userInfo={userInfo} login={login} logout={logout} />
          )}
        />

        <Route
          path="/tct-form"
          element={requireAuth(<TCTForm userInfo={userInfo} login={login} />)}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;