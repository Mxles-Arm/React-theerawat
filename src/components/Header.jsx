import { Link } from "react-router-dom";

const Header = () => {
    return(
        <div style={{
            background: "#a86841",
            padding: "20px",
            textAlign: "center",
            color: "white",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
        }}>
            <h1 style={{marginBottom: "15px"}}>WebTech TCT </h1>

            <Link 
                to='/' 
                style={{
                    color: "white",
                    textDecoration: "none",
                    margin: "0 15px",
                    padding: "8px 15px",
                    backgroundColor: "#d9a066",
                    borderRadius: "20px"
                }}
            >
                Home
            </Link>

            <Link 
                to='/edu' 
                style={{
                    color: "white",
                    textDecoration: "none",
                    margin: "0 15px",
                    padding: "8px 15px",
                    backgroundColor: "#d9a066",
                    borderRadius: "20px"
                }}
            >
                Education
            </Link>

            <Link 
                to='/activity' 
                style={{
                    color: "white",
                    textDecoration: "none",
                    margin: "0 15px",
                    padding: "8px 15px",
                    backgroundColor: "#d9a066",
                    borderRadius: "20px"
                }}
            >
                Hobby
            </Link>
        </div>
    )
}

export default Header;