import React from "react";

function CandidateResponseTable({ data }) {
  return (
    <div
      style={{
        width: "100%",
        overflowX: "auto",
        marginTop: "20px",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          minWidth: "900px", // Makes mobile scroll
          backgroundColor: "#020617",
          color: "#e5e7eb",
        }}
        border="1"
      >
        {/* HEADER */}
        <thead>
          <tr style={{ backgroundColor: "#020617" }}>
            <th>Q No</th>
            <th>Type</th>
            <th>Question ID</th>
            <th>Option 1</th>
            <th>Option 2</th>
            <th>Option 3</th>
            <th>Option 4</th>
            <th>Status</th>
            <th>Chosen</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.currentQuestion}</td>

              <td>{item["Question Type :"]}</td>

              <td>{item["Question ID :"]}</td>

              <td>{item["Option 1 ID :"]}</td>

              <td>{item["Option 2 ID :"]}</td>

              <td>{item["Option 3 ID :"]}</td>

              <td>{item["Option 4 ID :"]}</td>

              {/* Status with color */}
              <td
                style={{
                  color:
                    item["Status :"] === "Answered"
                      ? "#22c55e"
                      : "#ef4444",
                  fontWeight: "600",
                }}
              >
                {item["Status :"]}
              </td>

              {/* Chosen Option */}
              <td>
                {item["Chosen Option :"] === "--"
                  ? "—"
                  : item["Chosen Option :"]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CandidateResponseTable;
