import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        width:"100vw",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        backgroundColor: "#1e40af",
        color: "#fff",
      }}
    >
      <h3>JEE Score Tool</h3>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/about" style={linkStyle}>About</Link>
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "500",
};

export default Navbar;
