import { Link } from "react-router-dom";

const Header = ({ user, login, logout }) => {
  return (
    <div
      style={{
        background: "#2fa8ee",
        padding: "20px",
        textAlign: "center",
        color: "white",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <h1 style={{ marginBottom: "15px" }}>WebTech TCT</h1>

      <div style={{ marginBottom: "15px" }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/edu" style={linkStyle}>Education</Link>
        <Link to="/activity" style={linkStyle}>Hobby</Link>
        <Link to="/tct-form" style={linkStyle}>TCT Form</Link>
        <Link to="/itunes" style={linkStyle}>Music</Link>
      </div>

      <div style={{ marginTop: "10px" }}>
        {user ? (
          <>
            <span style={{ marginRight: "10px" }}>
              Welcome: <b>{user.displayName}</b>
            </span>

            <img
              src={user.photoURL}
              alt="user"
              width="35"
              style={{
                borderRadius: "50%",
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