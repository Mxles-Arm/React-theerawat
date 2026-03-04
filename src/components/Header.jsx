import { Link } from "react-router-dom";

const Header = ({ user, login, logout }) => {
  return (
    <div
      style={{
        background: "#2fa8ee",
        padding: "20px",
        color: "white",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      }}
    >
      {/* แถวบน */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0 }}>WebTech TCT</h1>

        {/* มุมขวาบน */}
        <div>
          {user ? (
            <>
              <span style={{ marginRight: "10px" }}>
                Welcome: <b>{user.displayName}</b>
              </span>

              <img
                src={user.photoURL}
                alt="user"
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  verticalAlign: "middle",
                  marginRight: "10px",
                }}
              />

              <button onClick={logout} style={btnStyle}>
                Logout
              </button>
            </>
          ) : (
            <button onClick={login} style={btnStyle}>
              Login with Google
            </button>
          )}
        </div>
      </div>

      {/* เมนู */}
      <div style={{ marginTop: "15px", textAlign: "center" }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/edu" style={linkStyle}>Education</Link>
        <Link to="/activity" style={linkStyle}>Hobby</Link>
        <Link to="/tct-form" style={linkStyle}>TCT Form</Link>
        <Link to="/Itunes" style={linkStyle}>Music</Link>
      </div>
    </div>
  );
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  margin: "0 10px",
  padding: "8px 15px",
  backgroundColor: "#d9a066",
  borderRadius: "20px",
};

const btnStyle = {
  padding: "6px 14px",
  border: "none",
  borderRadius: "15px",
  background: "#ffcc00",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Header;