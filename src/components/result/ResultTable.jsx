function ResultTable({ results }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={table}>
        <thead>
          <tr>
            <Th>Q.No</Th>
            <Th>Question ID</Th>
            <Th>Your Answer</Th>
            <Th>Correct</Th>
            <Th>Status</Th>
            <Th>Marks</Th>
          </tr>
        </thead>

        <tbody>
          {results.map((q) => (
            <tr key={q.sl}>
              <Td>{q.sl}</Td>
              <Td>{q.questionId}</Td>
              <Td>{q.userAnswer || "—"}</Td>
              <Td>{q.correctAnswer}</Td>

              <Td
                style={{
                  color:
                    q.status === "correct"
                      ? "#22c55e"
                      : q.status === "wrong"
                      ? "#ef4444"
                      : "#eab308",
                  fontWeight: "bold",
                }}
              >
                {q.status.toUpperCase()}
              </Td>

              <Td>{q.marks}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* STYLES */

const table = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};

const Th = ({ children }) => (
  <th style={cell}>{children}</th>
);

const Td = ({ children }) => (
  <td style={cell}>{children}</td>
);

const cell = {
  border: "1px solid #1e293b",
  padding: "10px",
  textAlign: "center",
};

export default ResultTable;
