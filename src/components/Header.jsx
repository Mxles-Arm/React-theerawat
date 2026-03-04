import { Link } from "react-router-dom";

const Header = ({ user, login, logout }) => {
    return(
        <div style={{
            background: "#2fa8ee",
            padding: "20px",
            textAlign: "center",
            color: "white",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
        }}>
            <h1 style={{marginBottom: "15px"}}>WebTech TCT</h1>

            <Link to='/' style={linkStyle}>Home</Link>
            <Link to='/edu' style={linkStyle}>Education</Link>
            <Link to='/activity' style={linkStyle}>Hobby</Link>
            <Link to='/tct-form' style={linkStyle}>TCT Form</Link>
            <Link to='/itunes' style={linkStyle}>Music</Link>

            <div style={{marginTop:"15px"}}>

                {user ? (
                    <>
                        <span style={{marginRight:"10px"}}>
                            Welcome: {user.displayName}
                        </span>

                        <img
                            src={user.photoURL}
                            alt="user"
                            width="30"
                            style={{borderRadius:"50%", marginRight:"10px"}}
                        />

                        <button onClick={logout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <button onClick={login}>
                        Login with Google
                    </button>
                )}

            </div>
        </div>
    )
}

const linkStyle = {
    color: "white",
    textDecoration: "none",
    margin: "0 15px",
    padding: "8px 15px",
    backgroundColor: "#d9a066",
    borderRadius: "20px"
}

export default Header;