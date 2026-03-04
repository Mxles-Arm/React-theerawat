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

  // ✅ ล็อกหน้าแบบ “ขึ้นข้อความ” แทนการเด้งกลับ
  const requireAuth = (element) => {
    if (!userInfo) {
      return (
        <div
          style={{
            minHeight: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
          }}
        >
          <div
            style={{
              background: "white",
              width: 480,
              maxWidth: "100%",
              padding: 28,
              borderRadius: 16,
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              textAlign: "center",
            }}
          >
            <h2 style={{ margin: 0, marginBottom: 10 }}>
              Log in to view this content.
            </h2>
            <p style={{ marginTop: 0, marginBottom: 18, color: "#555" }}>
              Please sign in with your Google Account to continue.
            </p>

            <button
              onClick={login}
              style={{
                padding: "12px 18px",
                border: "none",
                borderRadius: 10,
                background: "#2563eb",
                color: "white",
                cursor: "pointer",
                fontSize: 16,
                width: "100%",
              }}
            >
              Login with Google
            </button>

            <button
              onClick={() => window.history.back()}
              style={{
                marginTop: 10,
                padding: "10px 18px",
                borderRadius: 10,
                background: "#e5e7eb",
                border: "none",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Go back
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

        {/* 🔒 ล็อกหน้า Itunes */}
        <Route
          path="/Itunes"
          element={requireAuth(
            <Itunes userInfo={userInfo} login={login} logout={logout} />
          )}
        />

        {/* 🔒 ล็อกหน้า TCT Form */}
        <Route
          path="/tct-form"
          element={requireAuth(<TCTForm userInfo={userInfo} login={login} />)}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;