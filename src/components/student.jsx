import Arm from "../image/me01.png";
import "../css/tct.css";

function Student() {
  return (
    <div className="home-container">
      <div className="main-card">
        <h1 className="main-title">Welcome to the My Website</h1>

        <div className="intro-card">
          <div className="intro-image">
            <img src={Arm} alt="Arm" />
          </div>

          <div className="intro-text">
            <h2>Introducing Me</h2>
            <p>
              My name is Theerawat Noonngam. Nickname Arm.
              This website is created to introduce myself.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student;
