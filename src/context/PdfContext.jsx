import { createContext, useState } from "react";

export const PdfContext = createContext();

export function PdfProvider({ children }) {
  const [responsePdf, setResponsePdf] = useState(null);
  const [answerPdf, setAnswerPdf] = useState(null);

  return (
    <PdfContext.Provider
      value={{
        responsePdf,
        setResponsePdf,
        answerPdf,
        setAnswerPdf,
      }}
    >
      {children}
    </PdfContext.Provider>
  );
}
