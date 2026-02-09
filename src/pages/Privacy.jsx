import Header from "../components/layout/Header.jsx";

function Privacy() {
  return (


    <main
      style={{
        minHeight: "calc(100vh - 80px)",
        padding: "clamp(24px, 6vw, 60px)",
        backgroundColor: "#020617",
        color: "#e5e7eb",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <section
        style={{
          maxWidth: "900px",
          width: "100%",
          background: "#020617",
          border: "1px solid #1e293b",
          borderRadius: "14px",
          padding: "28px",
          lineHeight: "1.7",
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: "clamp(24px, 4vw, 34px)",
            marginBottom: "16px",
            color: "#f8fafc",
            textAlign: "center",
          }}
        >
          🔒 Privacy & Data Handling
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          Your privacy is important to us. This application is designed
          to keep your data safe and secure.
        </p>

        {/* Section */}
        <h3>📄 Local Processing Only</h3>
        <p>
          All uploaded PDFs are processed inside your browser.
          Your files are never uploaded to any server.
          No data is sent to third parties.
        </p>

        <h3>💾 No Data Storage</h3>
        <p>
          We do not store your PDFs, answers, scores, or personal
          information. Once you close the browser, all data is removed.
        </p>

        <h3>🔐 No Login Required</h3>
        <p>
          This app does not require registration or login.
          We do not collect email, phone number, or identity details.
        </p>

        <h3>🛡️ Secure Usage</h3>
        <p>
          Your files remain on your device.
          Processing happens using secure browser technologies.
          We cannot access your documents.
        </p>

        <h3>⚠️ User Responsibility</h3>
        <p>
          Please upload only official JEE PDFs.
          Do not upload unrelated or confidential documents.
          We are not responsible for incorrect files uploaded.
        </p>

        <h3>📢 Purpose of This App</h3>
        <p>
          This tool is built for educational use and self-evaluation.
          It helps students estimate their JEE score.
          This app is not affiliated with NTA.
        </p>

        {/* Footer Note */}
        <div
          style={{
            marginTop: "30px",
            paddingTop: "16px",
            borderTop: "1px solid #1e293b",
            color: "#94a3b8",
            fontSize: "14px",
            textAlign: "center",
          }}
        >
          Last Updated: {new Date().getFullYear()}
        </div>
      </section>
    </main>
  );
}

export default Privacy;
