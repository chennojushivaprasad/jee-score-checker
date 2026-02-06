import { useContext, useEffect, useState } from "react";
import { PdfContext } from "../context/PdfContext";
import { useNavigate } from "react-router-dom";

import { loadPdf, extractPdfItems } from "../services/pdfService";
import { buildAnsweKeyTableFromItems,buildCandiateResponseTableFromItems } from "../utils/parser";
import CandidateResponseTable from "../components/layout/CandidateResponseTable.jsx"
function Result() {

  // Both PDFs
  const { answerPdf, responsePdf } = useContext(PdfContext);

  const navigate = useNavigate();

  /* =====================
     STATES
  ===================== */

  const [answerKeyStatus, setAnswerKeyStatus] = useState(
    "Waiting for Answer Key PDF..."
  );

  const [responseStatus, setResponseStatus] = useState(
    "Waiting for Response PDF..."
  );

  const [answerKeyData, setAnswerKeyData] = useState([]);
  const [responseData, setResponseData] = useState([]);

  /* =====================
     PROCESS ANSWER KEY
  ===================== */

  useEffect(() => {
    if (!answerPdf) return;

    const processAnswerKeyPdf = async () => {
      try {
        setAnswerKeyStatus("📄 Reading Answer Key...");

        const buffer = await answerPdf.arrayBuffer();

        const pdf = await loadPdf(buffer);

        const items = await extractPdfItems(pdf);

        const table = buildAnsweKeyTableFromItems(items);

        setAnswerKeyData(table);

        setAnswerKeyStatus("✅ Answer Key Processed");

      } catch (err) {
        console.error("Answer Key Error:", err);

        setAnswerKeyStatus("❌ Failed to process answer key");
      }
    };

    processAnswerKeyPdf();

  }, [answerPdf]);

  useEffect(() => {
    if (!responsePdf) return;

    const processResponsePdf = async () => {
      try {
        setResponseStatus("📄 Reading Response Sheet...");

        const buffer = await responsePdf.arrayBuffer();

        const pdf = await loadPdf(buffer);

        const items = await extractPdfItems(pdf);

        console.log("prcess respnse", items)

        const table = buildCandiateResponseTableFromItems(items);

        setResponseData(table);

        setResponseStatus("✅ Response Sheet Processed");

      } catch (err) {
        console.error("Response Error:", err);

        setResponseStatus("❌ Failed to process response sheet");
      }
    };

    processResponsePdf();

  }, [responsePdf]);


  /* =====================
     UI
  ===================== */

  return (
    <main
      style={{
        minHeight: "calc(100vh - 80px)",
        padding: "40px",
        backgroundColor: "#020617",
        color: "#e5e7eb",
      }}
    >
      {/* STATUS */}
      <h2>{answerKeyStatus}</h2>
      <h3>{responseStatus}</h3>

      {/* ANSWER KEY */}
      {answerKeyData.length > 0 && (
        <>
          <h3 style={{ marginTop: "30px" }}>
            Official Answer Key
          </h3>

          <Table data={answerKeyData} />
        </>
      )}

      {/* RESPONSE */}
      {responseData?.length > 0 && (
        <>
          <h3 style={{ marginTop: "30px" }}>
            Candidate Response
          </h3>
          <CandidateResponseTable data={responseData} />
        </>
      )}

    </main>
  );
}


/* =====================
   REUSABLE TABLE
===================== */

function Table({ data }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        border="1"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#020617",
          color: "#e5e7eb",
        }}
      >
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Section</th>
            <th>Question ID</th>
            <th>Answer</th>
            <th>Options</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
              <td>{row[3]}</td>
              <td>
                {Array.isArray(row[4])
                  ? row[4].join(", ")
                  : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Result;
