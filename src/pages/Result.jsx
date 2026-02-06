import {
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

import { PdfContext } from "../context/PdfContext";
import { loadPdf, extractPdfItems } from "../services/pdfService";
import {
  buildAnsweKeyTableFromItems,
  buildCandiateResponseTableFromItems,
} from "../utils/parser";
import { mergeAnswerAndResponse } from "../utils/mergeResults";

import ResultSummary from "../components/result/ResultSummary";
import ResultTable from "../components/result/ResultTable";

function Result() {
  const { answerPdf, responsePdf } = useContext(PdfContext);

  /* ===================== STATES ===================== */
  const [answerKeyData, setAnswerKeyData] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [finalResults, setFinalResults] = useState([]);

  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [status, setStatus] = useState("📂 Waiting for PDFs...");

  const [sortOrder, setSortOrder] = useState("default");
  const [statusFilter, setStatusFilter] = useState("all");

  /* ===================== HELPERS ===================== */
  const isFilterActive =
    statusFilter !== "all" || sortOrder !== "default";

  const clearFilters = () => {
    setStatusFilter("all");
    setSortOrder("default");
  };

  const processPdf = async (file, builder, setter, name) => {
    try {
      setStatus(`📄 Processing ${name}...`);
      const buffer = await file.arrayBuffer();
      const pdf = await loadPdf(buffer);
      const items = await extractPdfItems(pdf);
      const data = builder(items);
      setter(data);
      return true;
    } catch (err) {
      console.error(err);
      setStatus(`❌ Failed to load ${name}`);
      return false;
    }
  };

  /* ===================== LOAD PDFS ===================== */
  useEffect(() => {
    if (!answerPdf || !responsePdf) return;

    const run = async () => {
      setLoading(true);
      setIsReady(false);
      setFinalResults([]);

      const answerOk = await processPdf(
        answerPdf,
        buildAnsweKeyTableFromItems,
        setAnswerKeyData,
        "Answer Key"
      );

      const responseOk = await processPdf(
        responsePdf,
        buildCandiateResponseTableFromItems,
        setResponseData,
        "Response Sheet"
      );

      if (answerOk && responseOk) {
        setStatus("🔍 Merging results...");
      }

      setLoading(false);
    };

    run();
  }, [answerPdf, responsePdf]);

  /* ===================== MERGE DATA ===================== */
  useEffect(() => {
    if (!answerKeyData.length || !responseData.length) return;

    const merged = mergeAnswerAndResponse(
      answerKeyData,
      responseData
    );

    setFinalResults(merged);
    setIsReady(true);
    setStatus("✅ Results Ready");
  }, [answerKeyData, responseData]);

  /* ===================== FILTER + SORT ===================== */
  const processedResults = useMemo(() => {
    let data = [...finalResults];

    // Filter
    if (statusFilter !== "all") {
      data = data.filter(
        (q) => q.status === statusFilter
      );
    }

    // Sort
    if (sortOrder === "asc") {
      data.sort((a, b) => a.marks - b.marks);
    } else if (sortOrder === "desc") {
      data.sort((a, b) => b.marks - a.marks);
    }
    // default → keep original order

    return data;
  }, [finalResults, statusFilter, sortOrder]);

  /* ===================== UI ===================== */
  return (
    <main style={page}>
      {/* LOADING */}
      {loading && (
        <div style={loaderBox}>
          <div style={spinner} />
          <p style={statusStyle}>{status}</p>
        </div>
      )}

      {/* MAIN CONTENT */}
      {!loading && isReady && finalResults.length > 0 && (
        <>
          <h2 style={heading}>📊 Result Summary</h2>
          <ResultSummary results={finalResults} />

          <p style={filterInfo}>
            {isFilterActive
              ? "🔸 Filters Active"
              : "🔹 No Filters Applied"}
          </p>

          {/* CONTROLS */}
          <div style={controls}>
            <div style={controlBox}>
              <label style={label}>📌 Filter Status</label>
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                style={select}
              >
                <option value="all">All</option>
                <option value="correct">✅ Correct</option>
                <option value="wrong">❌ Wrong</option>
                <option value="unattempted">
                  ⚠️ Skipped
                </option>
              </select>
            </div>

            <div style={controlBox}>
              <label style={label}>🔁 Sort</label>
              <select
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value)
                }
                style={select}
              >
                <option value="default">
                  Default Order
                </option>
                <option value="desc">
                  📈 Marks: High → Low
                </option>
                <option value="asc">
                  📉 Marks: Low → High
                </option>
              </select>
            </div>

            <div style={controlBox}>
              <label style={label}>🧹 Reset</label>
              <button
                onClick={clearFilters}
                disabled={!isFilterActive}
                style={{
                  ...clearBtn,
                  opacity: isFilterActive ? 1 : 0.4,
                  cursor: isFilterActive
                    ? "pointer"
                    : "not-allowed",
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* TABLE */}
          <h2 style={heading}>📋 Detailed Result</h2>
          <div style={{ overflowX: "auto" }}>
            <ResultTable results={processedResults} />
          </div>
        </>
      )}

      {/* NO DATA */}
      {!loading &&
        isReady &&
        finalResults.length === 0 && (
          <p style={statusStyle}>
            ⚠️ No result data found
          </p>
        )}
    </main>
  );
}

/* ===================== STYLES ===================== */

const page = {
  minHeight: "100vh",
  padding: "clamp(12px, 4vw, 20px)",
  backgroundColor: "#020617",
  color: "#e5e7eb",
  maxWidth: "1200px",
  margin: "auto",
};

const heading = {
  marginTop: "30px",
  marginBottom: "15px",
};

const statusStyle = {
  fontSize: "16px",
  opacity: 0.9,
  textAlign: "center",
};

/* Loader */
const loaderBox = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "80px",
  gap: "15px",
};

const spinner = {
  width: "40px",
  height: "40px",
  border: "4px solid #1e293b",
  borderTop: "4px solid #38bdf8",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

/* Filter Info */
const filterInfo = {
  fontSize: "14px",
  opacity: 0.8,
  marginTop: "15px",
};

/* Controls */
const controls = {
  display: "flex",
  gap: "20px",
  marginTop: "15px",
  marginBottom: "25px",
  flexWrap: "wrap",
};

const controlBox = {
  display: "flex",
  flexDirection: "column",
  flex: "1 1 220px",
  minWidth: "180px",
};

const label = {
  fontSize: "14px",
  marginBottom: "6px",
  opacity: 0.9,
};

const select = {
  padding: "10px",
  background: "#020617",
  color: "#e5e7eb",
  border: "1px solid #1e293b",
  borderRadius: "6px",
  outline: "none",
  cursor: "pointer",
  width: "100%",
};

/* Clear Button */
const clearBtn = {
  padding: "10px",
  background: "#0f172a",
  color: "#38bdf8",
  border: "1px solid #38bdf8",
  borderRadius: "6px",
  fontWeight: "500",
  transition: "0.2s",
};

export default Result;
