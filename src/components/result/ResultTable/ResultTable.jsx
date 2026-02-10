import "./ResultTable.css";

function ResultTable({ results }) {
  return (
    <div className="result-table-wrapper">
      <table className="result-table">
        <thead>
          <tr>
            <th>Q.No</th>
            <th>Question ID</th>
            <th>Your Answer</th>
            <th>Correct</th>
            <th>Status</th>
            <th>Marks</th>
          </tr>
        </thead>

        <tbody>
          {results.map((q) => (
            <tr key={q.sl}>
              <td>{q.sl}</td>
              <td className="mono">{q.questionId}</td>
              <td>{q.userAnswer || "—"}</td>
              <td>{q.correctAnswer}</td>

              <td>
                <span className={`status ${q.status}`}>
                  {q.status.toUpperCase()}
                </span>
              </td>

              <td className="marks">{q.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultTable;
