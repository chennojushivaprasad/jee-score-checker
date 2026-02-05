import { useContext, useEffect } from "react";
import { PdfContext } from "../context/PdfContext";
import { useNavigate } from "react-router-dom";

function Result() {
  const { responsePdf, answerPdf } = useContext(PdfContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!responsePdf || !answerPdf) {
      navigate("/");
    }
  }, [responsePdf, answerPdf, navigate]);

  return (
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
      <h2>Processing PDFs...</h2>

      <p>{responsePdf?.name}</p>
      <p>{answerPdf?.name}</p>

      {/* Phase 2 logic will go here */}
    </main>
  );
}

export default Result;
