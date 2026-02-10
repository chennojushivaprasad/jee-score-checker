import "./ResultSummary.css";

function ResultSummary({ results }) {
  let correct = 0;
  let wrong = 0;
  let skipped = 0;
  let marks = 0;

  results.forEach((q) => {
    if (q.status === "correct") correct++;
    else if (q.status === "wrong") wrong++;
    else skipped++;

    marks += q.marks || 0;
  });

  return (
    <div className="summary-grid">
      <SummaryCard title="Total" value={results.length} />
      <SummaryCard title="Correct" value={correct} type="success" />
      <SummaryCard title="Wrong" value={wrong} type="danger" />
      <SummaryCard title="Skipped" value={skipped} type="warning" />
      <SummaryCard title="Marks" value={marks} type="info" />
    </div>
  );
}

function SummaryCard({ title, value, type }) {
  return (
    <div className={`summary-card ${type || ""}`}>
      <h3 className="summary-title">{title}</h3>
      <p className="summary-value">{value}</p>
    </div>
  );
}

export default ResultSummary;
