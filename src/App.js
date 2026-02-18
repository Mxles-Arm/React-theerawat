import Header from "./components/Header";
import Footer from "./components/Footer";
import Student from "./components/student";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Activity from "./components/Activity";
import Education from "./components/Education";
import 

function App() {
  const std1 = {
    name: "Theerawat Noonngam",
    stdid: "6802041510180",
    sect: "TCT"
  };

  return (
    <BrowserRouter>
      <div style={{ backgroundColor: '#a9c567', minHeight: '100vh' }}>
        <Header />

        <Routes>
          {/* หน้าแรก */}
          <Route path="/" element={<Student stdInfo={std1} />} />

          {/* หน้าอื่น */}
          <Route path="/edu" element={<Education />} />
          <Route path="/activity" element={<Activity />} />

          {/* ถ้า path ไม่ตรง ให้กลับ Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
