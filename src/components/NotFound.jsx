export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "60px" }}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>

      <a
        href="#/"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "10px 20px",
          background: "#2563eb",
          color: "white",
          borderRadius: "8px",
          textDecoration: "none"
        }}
      >
        Go Home
      </a>
    </div>
  );
}