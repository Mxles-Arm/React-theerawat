import Header from "./components/Header";
import Footer from "./components/Footer";
import Student from "./components/student";
import { BrowserRouter , Routes , Route } from "react-router-dom";
import Activity from "./components/Activity";
import PageNotFound from "./components/PageNotFound";

function App() {
  const std1 = {name: "Theerawat Noonngam", stdid: "6802041510180", sect:"TCT"};


  return (
    <BrowserRouter>
      <div style={{ backgroundColor: '#a9c567', minHeight: '100vh' }}>
        <Header />
        <Routes>
          <Route path="/" element={<Student stdInfo={std1} />} />
          <Route path="/edu" element={<Education />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;