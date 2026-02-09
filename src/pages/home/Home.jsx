import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExamDataContext } from "../../context/ExamDataContext";
import UploadBox from "../../components/upload/UploadBox";
import "./Home.css"; // Import the CSS file

function Home() {
  const {
    setResponsePdf,
    setResponseUrl,
    setAnswerPdf,
    responsePdf,
    responseUrl,
    answerPdf,
  } = useContext(ExamDataContext);

  const navigate = useNavigate();
  const [urlError, setUrlError] = useState("");
  const [urlInput, setUrlInput] = useState(responseUrl || "");

  const isValidResponseUrl = (url) => {
    return url.includes("digialm.com") && url.includes("AssessmentQPHTML");
  };

  const handleUrlChange = (e) => {
    const value = e.target.value.trim();
    setUrlInput(value);
    if (!value) {
      setResponseUrl(null);
      setUrlError("");
      return;
    }
    if (!isValidResponseUrl(value)) {
      setUrlError("❌ Please enter a valid NTA/Digialm URL");
      setResponseUrl(null);
      return;
    }
    setResponsePdf(null);
    setResponseUrl(value);
    setUrlError("");
  };

  const isReady = answerPdf && (responsePdf || responseUrl);

  return (
    <main className="home-container">
      <section className="content-wrapper">
        <header className="header-section">
          <h1 className="main-title">JEE <span className="title-accent">Score Analyzer</span></h1>
          <p className="subtitle">The fastest and most accurate way to calculate your JEE Main scores.</p>
        </header>

        <div style={{ marginBottom: "40px" }}>
          <div className="step-header">
            <div className="step-number">1</div>
            <h2 style={{ fontSize: "24px", fontWeight: "700" }}>Your Response Sheet</h2>
          </div>

          <div className="step-grid">
            {/* Option A: URL */}
            <div className={`card ${responseUrl ? "card-active" : ""}`}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                <label style={{ fontWeight: "700" }}>Paste Link</label>
                <span className="badge-recommended">Recommended</span>
              </div>
              <p className="subtitle" style={{ fontSize: "14px", marginBottom: "20px" }}>
                Directly fetch data from NTA servers. <b>Faster & more accurate.</b>
              </p>
              <input
                type="text"
                className={`url-input ${urlError ? "error" : ""}`}
                value={urlInput}
                onChange={handleUrlChange}
                placeholder="https://cdn3.digialm.com/..."
              />
              {urlError && <p style={{ color: "#ef4444", fontSize: "13px", marginTop: "10px" }}>{urlError}</p>}
              {responseUrl && <p style={{ color: "#10b981", fontSize: "13px", marginTop: "10px" }}>✨ Link captured!</p>}
            </div>

            {/* OR Separator */}
            <div className="or-separator">
              <div className="sep-line"></div>
              <span className="or-text">OR</span>
              <div className="sep-line"></div>
            </div>

            {/* Option B: PDF */}
            <div className={`card ${responseUrl ? "card-disabled" : ""}`}>
              <label style={{ fontWeight: "600", marginBottom: "12px" }}>Upload PDF</label>
              <UploadBox
                label="Select PDF"
                onFileSelect={(file) => {
                  setResponsePdf(file);
                  setResponseUrl(null);
                  setUrlInput("");
                }}
                active={!!responsePdf}
              />
              <p className="helper-text">
                Use this only if your response link <br /> is not working.
              </p>
            </div>
          </div>
        </div>

        {/* Step 2: Answer Key */}
        <div style={{ marginBottom: "50px" }}>
          <div className="step-header">
            <div className="step-number">2</div>
            <h2 style={{ fontSize: "24px", fontWeight: "700" }}>Official Answer Key</h2>
          </div>

          <div className={`card ${answerPdf ? "card-active" : ""}`} style={{ maxWidth: "100%" }}>
            <label style={{ fontSize: "16px", fontWeight: "700", marginBottom: "8px", display: "block" }}>
              Upload NTA Master Key
            </label>

            <p className="info-text">
              Upload the <b>Official Answer Key PDF</b> released by NTA. We use this to cross-verify your responses with the correct Question IDs.
            </p>

            <UploadBox
              label={answerPdf ? "File Selected" : "Click or Drag Answer Key PDF"}
              onFileSelect={setAnswerPdf}
              active={!!answerPdf}
            />

            {answerPdf && (
              <div className="success-text">
                <span>✅</span> Answer key processed successfully
              </div>
            )}
          </div>
        </div>
        <div className="action-section">
          <button
            className={`analyze-button ${isReady ? "ready" : ""}`}
            disabled={!isReady}
            onClick={() => navigate("/result")}
          >
            {isReady ? "Analyze Results Now →" : "Complete Step 1 & 2"}
          </button>
        </div>
      </section>
    </main>
  );
}

export default Home;