import PdfResponseView from "./PdfResponseView/PdfResponseView";
import UrlResponseView from "./UrlResponseView/UrlResponseView";

function ResponseSection({
  mode,
  responseData,
  answerKey,
  questions,
  candidateDetails,
   results
}) {
  if (mode === "pdf") {
    return <PdfResponseView results={results} data={responseData} />;
  }

  if (mode === "url") {
    return (
      <UrlResponseView
        answerKey={answerKey}
        questions={questions}
        candidateDetails={candidateDetails}
      />
    );
  }

  return null;
}

export default ResponseSection;
