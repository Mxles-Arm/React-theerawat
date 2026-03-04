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
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "15px",
            textAlign: "center",
            boxShadow: "0 10px 25px rgba(31, 52, 211, 0.2)",
            width: "350px",
          }}
        >
          <h2 style={{ marginBottom: "10px" }}> Login Required</h2>

          <p style={{ color: "#555", marginBottom: "20px" }}>
            Please login first to access this page
          </p>

          <button
            onClick={login}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              background: "#2563eb",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Login with Google
          </button>
        </div>
      </div>
    );
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