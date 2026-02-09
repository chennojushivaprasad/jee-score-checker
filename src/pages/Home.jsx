import { useContext, useState } from "react";
import UploadBox from "../components/upload/UploadBox.jsx";
import { useNavigate } from "react-router-dom";
import { PdfContext } from "../context/PdfContext.jsx";

function Home() {
  const {
    setResponsePdf,
    setAnswerPdf,
    responsePdf,
    answerPdf,
  } = useContext(PdfContext);

  const navigate = useNavigate();

  const isReady = responsePdf && answerPdf;

  return (

    <main
      style={{
        minHeight: "calc(100vh - 80px)",
        padding: "clamp(24px, 6vw, 60px)",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#020617",
        color: "#e5e7eb",
      }}
    >
      <section
        style={{
          maxWidth: "900px",
          width: "100%",
        }}
      >
        {/* ================= TITLE ================= */}
        <header style={{ textAlign: "center", marginBottom: "24px" }}>
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 42px)",
              marginBottom: "10px",
              color: "#f8fafc",
            }}
          >
            JEE Score Analyzer
          </h1>

          <p
            style={{
              fontSize: "clamp(15px, 3.5vw, 17px)",
              color: "#94a3b8",
              lineHeight: "1.6",
            }}
          >
            Upload official JEE PDFs and get detailed performance analysis
            instantly.
          </p>
        </header>

        {/* ================= GUIDE ================= */}
        <div
          style={{
            background: "#020617",
            border: "1px solid #1e293b",
            borderRadius: "14px",
            padding: "18px",
            marginBottom: "32px",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>
            📌 How to Download PDFs from JEE Portal
          </h3>

          <ol
            style={{
              paddingLeft: "22px",
              lineHeight: "1.7",
              color: "#cbd5f5",
              fontSize: "14px",
            }}
          >
            <li>
              Login to <strong>jeemain.nta.nic.in</strong>
            </li>

            <li>
              Click <strong>“View Question Paper”</strong>
            </li>

            <li>
              Click <strong>Print</strong> → Save as PDF
              <br />
              👉 This is your <b>Response Sheet</b>
            </li>

            <li>
              Click <strong>“View / Challenge Answer Key”</strong>
            </li>

            <li>
              Press <strong>Ctrl + P</strong> → Save as PDF
              <br />
              👉 This is your <b>Official Answer Key</b>
            </li>
          </ol>

        </div>

        {/* ================= UPLOAD ================= */}
        <section
          aria-label="JEE PDF uploads"
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          <UploadBox
            label="Response Sheet"
            helperText="From: View Question Paper → Print → PDF"
            onFileSelect={setResponsePdf}
          />

          <UploadBox
            label=" Official Answer Key"
            helperText="From: View / Challenge → Ctrl+P → PDF"
            onFileSelect={setAnswerPdf}
          />
        </section>

        {/* ================= FILE INFO ================= */}
        {(responsePdf || answerPdf) && (
          <div
            style={{
              background: "#020617",
              border: "1px solid #1e293b",
              borderRadius: "12px",
              padding: "14px",
              fontSize: "14px",
              marginBottom: "20px",
            }}
          >
            <strong>📄 Selected Files</strong>

            {responsePdf && (
              <p style={{ marginTop: "6px" }}>
                🧑‍🎓 Response: {responsePdf.name}
              </p>
            )}

            {answerPdf && (
              <p>
                🏛️ Answer Key: {answerPdf.name}
              </p>
            )}
          </div>
        )}

        

        {/* ================= BUTTON ================= */}
        <div style={{ textAlign: "center" }}>
          <button
            disabled={!isReady}
            onClick={() => navigate("/result")}
            style={{
              padding: "12px 32px",
              background: isReady ? "#2563eb" : "#334155",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: isReady ? "pointer" : "not-allowed",
              fontSize: "16px",
              opacity: isReady ? 1 : 0.7,
              transition: "0.2s",
            }}
          >
            Analyze My Result
          </button>
        </div>
      </section>
    </main>

  );
}

export default Home;
