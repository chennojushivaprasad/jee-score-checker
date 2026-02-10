import { useMemo, useState } from "react";
import ResultSummary from "../ResultSummary/ResultSummary";
import ResultTable from "../ResultTable/ResultTable";
import "./PdfResponseView.css";

function PdfResponseView({ results, data }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

  const filteredResults = useMemo(() => {
    let list = [...results || []];

    // FILTER
    if (statusFilter !== "all") {
      list = list.filter((q) => q.status === statusFilter);
    }

    // SORT
    if (sortOrder !== "default") {
      list.sort((a, b) =>
        sortOrder === "desc"
          ? b.marks - a.marks
          : a.marks - b.marks
      );
    } else {
      // NORMAL MODE → SERIAL ORDER
      list.sort((a, b) => a.sl - b.sl);
    }

    return list;
  }, [results, statusFilter, sortOrder]);

  const resetFilters = () => {
    setStatusFilter("all");
    setSortOrder("default");
  };

  const isFiltered = statusFilter !== "all" || sortOrder !== "default";

  if (!data?.length) {
    return <p>No response data found.</p>;
  }

  if (!results?.length) {
    return (
      <main className="pdf-page">
        <div className="empty-card">
          <p>⚠️ No result data available</p>
          <button onClick={() => navigate("/")}>Go Back</button>
        </div>
      </main>
    );
  }

  return (
    <main className="pdf-page">
      <section className="pdf-section">
        <h2 className="pdf-heading">📊 Result Summary</h2>
        <ResultSummary results={results} />

        {/* CONTROLS */}
        <div className="table-controls">
          <div className="control-group">
            <label>Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="correct">Correct</option>
              <option value="wrong">Wrong</option>
              <option value="unattempted">Unattempted</option>
            </select>
          </div>

          <div className="control-group">
            <label>Sort by Marks</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="default">Normal (Q.No)</option>
              <option value="desc">Marks: High → Low</option>
              <option value="asc">Marks: Low → High</option>
            </select>
          </div>

          {/* RESET */}
          <div className="control-group reset-group">
            <label>&nbsp;</label>
            <button
              className="reset-btn"
              onClick={resetFilters}
              disabled={!isFiltered}
            >
              Reset
            </button>
          </div>
        </div>

        <h2 className="pdf-heading">📋 Detailed Result</h2>
        <div className="table-wrapper">
          <ResultTable results={filteredResults} />
        </div>
      </section>
    </main>
  );
}


export default PdfResponseView;
