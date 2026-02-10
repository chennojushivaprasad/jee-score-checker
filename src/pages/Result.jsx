import { useContext, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { ExamDataContext } from "../context/ExamDataContext";

import { loadAnswerKey } from "../services/answerKey.service";
import { loadResponseFromPdf } from "../services/responsePdf.service";
import { loadResponseFromUrl } from "../services/responseUrl.service";

import { mergeAnswerAndResponse } from "../utils/mergeResults";
import ResponseSection from "../components/result/ResponseSection";

import ResultTable from "../components/result/ResultTable"
import ResultSummary from "../components/result/ResultSummary";



function Result() {
  const {
    answerPdf,
    responsePdf,
    responseUrl,
    mode,
  } = useContext(ExamDataContext);

  const navigate = useNavigate();

  const [answerKey, setAnswerKey] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [results, setResults] = useState([]);

  const [questions, setQuestions] = useState([]);
  const [candidateDetails, setCandidateDetails] = useState({});

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("📂 Preparing data...");

  /* ================= LOAD ================= */

  useEffect(() => {
    if (!answerPdf) {
      navigate("/");
      return;
    }

    async function run() {
      try {
        setLoading(true);
        setStatus("📘 Reading official answer key...");

        const ak = await loadAnswerKey(answerPdf);
        setAnswerKey(ak);

        setStatus("🧑‍🎓 Reading candidate response...");

        if (mode === "pdf") {
          const res = await loadResponseFromPdf(responsePdf);
          setResponseData(res);
        }

        if (mode === "url") {
          const res = await loadResponseFromUrl(
            responseUrl,
            import.meta.env.VITE_API_BASE
          );

          setQuestions(res.questions);
          setCandidateDetails(res.candidateDetails);
          // setResponseData(res.questions);
        }

        setStatus("🔗 Matching answers & calculating score...");
      } catch (err) {
        console.error(err);
        setStatus("❌ Failed to load result data");
      } finally {
        setLoading(false);
      }
    }

    run();
  }, [answerPdf, responsePdf, responseUrl, mode]);

  /* ================= MERGE ================= */

  useEffect(() => {
    if (!answerKey.length || !responseData.length) return;

    const merged = mergeAnswerAndResponse(
      answerKey,
      responseData
    );

    setResults(merged);
    setStatus("✅ Result ready");
  }, [answerKey, responseData]);

  const processed = useMemo(() => [...results], [results]);

  /* ================= UI ================= */

  if (loading) {
    return (
      <main style={page}>
        <div style={loaderCard}>
          <div style={spinner} />
          <p style={statusText}>{status}</p>
        </div>
      </main>
    );
  }


  return (
    <main style={page}>
   
      {/* RESPONSE PREVIEW */}
      <section style={section}>
        <ResponseSection
          mode={mode}
          responseData={responseData}
          answerKey={answerKey}
          questions={questions}
          candidateDetails={candidateDetails}
          results={results}
        />
      </section>
    
    </main>
  );
}

export default Result;


const page = {
  minHeight: "100vh",
  padding: "clamp(16px, 4vw, 40px)",
  background: "#020617",
  color: "#e5e7eb",
};

const section = {
  marginBottom: "40px",
};

const heading = {
  marginBottom: "16px",
};

const tableWrapper = {
  overflowX: "auto",
  border: "1px solid #1e293b",
  borderRadius: "12px",
};

const loaderCard = {
  maxWidth: "420px",
  margin: "100px auto",
  padding: "24px",
  borderRadius: "16px",
  border: "1px solid #1e293b",
  background: "#020617",
  textAlign: "center",
};

const statusText = {
  marginTop: "12px",
  color: "#cbd5f5",
};

const spinner = {
  width: "36px",
  height: "36px",
  border: "4px solid #1e293b",
  borderTop: "4px solid #2563eb",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  margin: "0 auto",
};

const emptyCard = {
  maxWidth: "420px",
  margin: "100px auto",
  padding: "24px",
  textAlign: "center",
  border: "1px solid #1e293b",
  borderRadius: "12px",
};
