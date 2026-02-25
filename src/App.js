import Header from "./components/Header";
import Footer from "./components/Footer";
import Student from "./components/student";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Activity from "./components/Activity";
import Education from "./components/Education";
import TCTForm from "./components/TCTForm.jsx";
import Itunes from "./components/itunes"; // ✅ แก้ตรงนี้

function App() {
  const std1 = {
    name: "Theerawat Noonngam",
    stdid: "6802041510180",
    sect: "TCT",
  };

  return (
    <BrowserRouter>
      <div style={{ backgroundColor: "#d6fc7e", minHeight: "100vh" }}>
        <Header />

        <Routes>
          <Route path="/" element={<Student stdInfo={std1} />} />
          <Route path="/edu" element={<Education />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/itunes" element={<Itunes />} />
          <Route path="/tct-form" element={<TCTForm />} />

          {/* ✅ ต้องไว้ล่างสุด */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;