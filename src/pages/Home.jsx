import { useContext, useState } from "react";
import Header from "../components/layout/Header.jsx";
import UploadBox from "../components/upload/UploadBox.jsx";
import { useNavigate } from "react-router-dom";
import { PdfContext } from "../context/PdfContext.jsx";


function Home() {
  const { setResponsePdf, setAnswerPdf, responsePdf, answerPdf } =
    useContext(PdfContext);

  const navigate = useNavigate();


  return (
    <>
      <Header />

      <main
        style={{
          minHeight: "calc(100vh - 80px)",
          padding: "clamp(24px, 6vw, 60px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#020617",
          color: "#e5e7eb",
        }}
      >
        <section
          style={{
            maxWidth: "760px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <header>
            <h1
              style={{
                fontSize: "clamp(26px, 5vw, 38px)",
                marginBottom: "12px",
                color: "#f8fafc",
              }}
            >
              Check Your JEE Score
            </h1>

            <p
              style={{
                fontSize: "clamp(15px, 3.5vw, 17px)",
                color: "#94a3b8",
                marginBottom: "36px",
                lineHeight: "1.6",
              }}
            >
              Upload the PDFs provided by NTA to get a clear estimate of your
              expected JEE score.
            </p>
          </header>

          <section
            aria-label="JEE PDF uploads"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
            }}
          >
            <UploadBox
              label="Response Sheet"
              helperText="Upload the PDF showing the answers you selected during the exam"
              onFileSelect={setResponsePdf}
            />

            <UploadBox
              label="Official Answer Key"
              helperText="Upload the official answer key PDF released by NTA"
              onFileSelect={setAnswerPdf}
            />
          </section>

          {(responsePdf || answerPdf) && (
            <aside
              style={{
                marginTop: "28px",
                padding: "16px",
                backgroundColor: "#020617",
                border: "1px solid #1e293b",
                borderRadius: "10px",
                textAlign: "left",
                fontSize: "clamp(14px, 3vw, 15px)",
              }}
            >
              {responsePdf && (
                <p>
                  📄 <strong>Response Sheet:</strong> {responsePdf.name}
                </p>
              )}
              {answerPdf && (
                <p>
                  📄 <strong>Answer Key:</strong> {answerPdf.name}
                </p>
              )}
            </aside>
          )}

          {responsePdf && answerPdf && (
            <button
              onClick={() => navigate("/result")}
              style={{
                marginTop: "24px",
                padding: "12px 24px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              Check
            </button>
          )}

        </section>
      </main>
    </>
  );
}

export default Home;
