function ResultSummary({ results }) {
  let correct = 0;
  let wrong = 0;
  let skipped = 0;
  let marks = 0;

  results.forEach((q) => {
    if (q.status === "correct") correct++;
    else if (q.status === "wrong") wrong++;
    else skipped++;

    marks += q.marks;
  });

  return (
    <div style={container}>
      <Card title="Total" value={results.length} />
      <Card title="Correct" value={correct} color="#22c55e" />
      <Card title="Wrong" value={wrong} color="#ef4444" />
      <Card title="Skipped" value={skipped} color="#eab308" />
      <Card title="Marks" value={marks} color="#38bdf8" />
    </div>
  );
}

function Card({ title, value, color = "#fff" }) {
  return (
    <div style={card}>
      <h3>{title}</h3>
      <p style={{ fontSize: 28, color, fontWeight: "bold" }}>
        {value}
      </p>
    </div>
  );
}

const container = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
  gap: "20px",
  marginTop: "20px",
};

const card = {
  background: "#020617",
  border: "1px solid #1e293b",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
};

export default ResultSummary;
