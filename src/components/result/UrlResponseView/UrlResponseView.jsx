import React, { useMemo } from "react";
import "./UrlResponseView.css";

const getAnswerKeyMap = (answerKey) => {
  const map = new Map();
  answerKey.forEach((a) => map.set(a.questionId, a));
  return map;
};

const evaluateQuestion = (answer, meta) => {
  if (!answer) return { result: "unknown", marks: 0 };

  const isAnswered = meta.status === "Answered";

  if (!answer.isMCQ) {
    if (isAnswered && Number(meta.chosen_option) === answer.correctAnswer) {
      return { result: "correct", marks: 4 };
    }
    return isAnswered ? { result: "wrong", marks: -1 } : { result: "unattempted", marks: 0 };
  }

  if (!isAnswered) return { result: "unattempted", marks: 0 };

  const optionIdMap = {
    1: Number(meta.option_1_id),
    2: Number(meta.option_2_id),
    3: Number(meta.option_3_id),
    4: Number(meta.option_4_id),
  };

  const chosenOptionId = optionIdMap[Number(meta.chosen_option)];
  return chosenOptionId === answer.correctAnswer
    ? { result: "correct", marks: 4 }
    : { result: "wrong", marks: -1 };
};

function SummaryStat({ icon, label, value, type }) {
  return (
    <div className={`summary-card ${type || ""}`}>
      <span className="card-icon">{icon}</span>
      <span className="summary-label">{label}</span>
      <span className="summary-value">{value}</span>
    </div>
  );
}


function UrlResponseView({ answerKey, questions, candidateDetails }) {
  const answerKeyMap = useMemo(() => getAnswerKeyMap(answerKey), [answerKey]);

const summary = useMemo(() => {
  if (!questions?.length) return null;

  let stats = {
    correct: 0,
    wrong: 0,
    attempted: 0,
    unattempted: 0,
    score: 0,
    total: questions.length,
    accuracy: 0, // 👈 added
  };

  questions.forEach((data) => {
    const answer = answerKeyMap.get(Number(data.meta.question_id));
    const evalResult = evaluateQuestion(answer, data.meta);

    if (evalResult.result === "correct") stats.correct++;
    else if (evalResult.result === "wrong") stats.wrong++;
    else stats.unattempted++;

    stats.score += evalResult.marks;
  });

  // Attempted = Total - Unattempted
  stats.attempted = stats.total - stats.unattempted;

  // Accuracy = (Correct / Attempted) * 100
  stats.accuracy =
    stats.attempted > 0
      ? ((stats.correct / stats.attempted) * 100).toFixed(2)
      : 0;

  return stats;
}, [questions, answerKeyMap]);

  if (!questions?.length) return <div className="analysis-container">No questions found.</div>;

  return (
    <section className="analysis-container">
      <h2 className="analysis-heading">🌐 Candidate Response Analysis</h2>

      {/* RESULT HEADER */}
      {summary && candidateDetails && (
        <section className="result-header">

          {/* LEFT: CANDIDATE */}
          <div className="candidate-box">

            <div className="avatar">
              {candidateDetails["Candidate Name"]?.charAt(0)}
            </div>

            <div className="candidate-info">

              <h3>{candidateDetails["Candidate Name"]}</h3>

              <p>🆔 Roll: {candidateDetails["Roll No."]}</p>
              <p>📄 App: {candidateDetails["Application No"]}</p>

              <div className="exam-meta">
                <span>📚 {candidateDetails["Subject"]}</span>
                <span>📅 {candidateDetails["Test Date"]}</span>
                <span>⏰ {candidateDetails["Test Time"]}</span>
              </div>

            </div>
          </div>

          {/* CENTER: SCORE */}
          <div className="score-box">

            <div className="score-circle">
              <span className="score-value">{summary.score}</span>
              <span className="score-label">Score</span>
            </div>

            <p className="accuracy">
              🎯 Accuracy: <b>{summary.accuracy}%</b>
            </p>

          </div>

          {/* RIGHT: STATS */}
          <div className="stats-box">

            <SummaryStat icon="📊" label="Total" value={summary.total} />
            <SummaryStat icon="✍️" label="Attempted" value={summary.attempted} />
            <SummaryStat icon="✅" label="Correct" value={summary.correct} type="success" />
            <SummaryStat icon="❌" label="Wrong" value={summary.wrong} type="danger" />
            <SummaryStat icon="⏭️" label="Skipped" value={summary.unattempted} />

          </div>

        </section>
      )}


      <div className="question-list">
        {questions.map((data, index) => {
          const { question: q, meta } = data;
          const answer = answerKeyMap.get(Number(meta.question_id));
          const evaluation = evaluateQuestion(answer, meta);

          return (
            <div key={index} className="question-card">
              <div className="card-header">
                <h3 style={{ margin: 0 }}>{q.questionNumber}</h3>
                <span className={`badge`} style={{
                  backgroundColor: evaluation.result === "correct" ? "var(--success)" :
                    evaluation.result === "wrong" ? "var(--danger)" : "var(--text-secondary)"
                }}>
                  {evaluation.result}
                </span>
              </div>

              {q.questionImage && (
                <img src={`https://cdn3.digialm.com/${q.questionImage}`} alt="Q" className="question-image" />
              )}

              {meta.question_type === "MCQ" ? (
                <div className="options-grid">
                  {q.options.map((opt) => {
                    const optId = meta[`option_${opt.optionNumber}_id`];
                    const isCorrect = answer?.correctAnswer === Number(optId);
                    const isChosen = String(opt.optionNumber) === meta.chosen_option;

                    return (
                      <div key={opt.optionNumber} className={`option-item ${isCorrect ? 'correct-border' : isChosen ? 'wrong-border' : ''}`}>
                        <span className="option-label">Option {opt.optionNumber} {isCorrect && "✅"} {isChosen && !isCorrect && "❌"}</span>
                        <img src={`https://cdn3.digialm.com/${opt.image}`} alt="opt" className="option-img" />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="sa-result-box">
                  <p><b>Your Answer:</b> {meta.chosen_option || "NA"}</p>
                  <p style={{ color: "var(--success)" }}><b>Correct:</b> {answer?.correctAnswer}</p>
                </div>
              )}

              <div className="footer-marks">
                <span>Type: {meta.question_type}</span>
                <span style={{ fontWeight: 700, color: evaluation.marks > 0 ? "var(--success)" : "var(--danger)" }}>
                  {evaluation.marks > 0 ? `+${evaluation.marks}` : evaluation.marks} Points
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default UrlResponseView;