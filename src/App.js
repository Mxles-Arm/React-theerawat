import Header from "./components/Header";
import Footer from "./components/Footer";
import Student from "./components/student";

function App() {
  const std1 = {name: "Theerawat Noonngam", stdid: "6802041510180", sect:"TCT"};
  return (
    <div style={{ backgroundColor: '#a9c567', minHeight: '100vh' }}>
      <Header />
      <Student stdInfo={std1}/>
      <Footer />
    </div>
  );
}

export default App;