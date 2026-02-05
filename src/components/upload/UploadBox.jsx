import { useState } from "react";

function UploadBox({label,helperText, onFileSelect }) {
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validate type
    if (file.type !== "application/pdf") {
      setError("Please upload only PDF file");
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB");
      return;
    }

    setError("");
    setFileName(file.name);

    // Send file to parent
    onFileSelect(file);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Upload PDF</h3>

      <label
        style={{
          display: "block",
          marginBottom: "6px",
          fontWeight: "600",
          color: "#f8fafc",
        }}
      >
        Upload PDF :{label}
      </label>

      {helperText && (
        <p
          style={{
            fontSize: "13px",
            color: "#94a3b8",
            marginBottom: "10px",
          }}
        >
          {helperText}
        </p>
      )}

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFile}
      />

      {fileName && <p>Selected: {fileName}</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default UploadBox;
