import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#020617",
        borderTop: "1px solid #1e293b",
        padding: "16px 24px",
        color: "#94a3b8",
        fontSize: "14px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {/* Left */}
        <div>
          © {new Date().getFullYear()} JEE Score Analyzer
        </div>

        {/* Right */}
        <div
          style={{
            display: "flex",
            gap: "16px",
          }}
        >
          <Link
            to="/privacy"
            style={{
              color: "#94a3b8",
              textDecoration: "none",
            }}
          >
            Privacy
          </Link>

          {/* <Link
            to="/help"
            style={{
              color: "#94a3b8",
              textDecoration: "none",
            }}
          >
            Help
          </Link> */}

          <Link
            to="/about"
            style={{
              color: "#94a3b8",
              textDecoration: "none",
            }}
          >
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
