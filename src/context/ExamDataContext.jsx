import { createContext, useState } from "react";


export const ExamDataContext = createContext();

/* =========================
   PROVIDER
========================= */

export function ExamDataProvider({ children }) {
  // Response (User Attempt)
  const [responsePdf, setResponsePdf] = useState(null);
  const [responseUrl, setResponseUrl] = useState(null);
  const [mode, setMode] = useState(null);

  // Official Answer Key
  const [answerPdf, setAnswerPdf] = useState(null);

  // Set PDF → Clear URL
  const setResponsePdfSafe = (file) => {
    setMode("pdf")
    setResponsePdf(file);
    setResponseUrl(null);
  };

  // Set URL → Clear PDF
  const setResponseUrlSafe = (url) => {
    setMode("url")
    setResponseUrl(url);
    setResponsePdf(null);
  };

  // Reset All
  const resetExamData = () => {
    setResponsePdf(null);
    setResponseUrl(null);
    setAnswerPdf(null);
    setMode(null)
  };

  return (
    <ExamDataContext.Provider
      value={{
        // Data
        responsePdf,
        responseUrl,
        answerPdf,
        mode,
        // Setters
        setResponsePdf: setResponsePdfSafe,
        setResponseUrl: setResponseUrlSafe,
        setAnswerPdf,

        // Utils
        resetExamData,
      }}
    >
      {children}
    </ExamDataContext.Provider>
  );
}
