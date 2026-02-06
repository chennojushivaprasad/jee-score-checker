import {
  isValidNumber,
  toNumber,
  isBigId,
  TOTAL_QUESTIONS,
} from "./pdfUtils.jsx";

/* Header Detector */
export const findAnswerKeyHeaderRow = (text) => {
  return text.str === "Option(s) ID claimed";
};


export const parseAnswerKeyRow = (row, text, colIndex) => {
  let rowCompleted = false;

  console.log(text)

  switch (colIndex) {
    // Serial No
    case 0:
      if (isValidNumber(text)) {
        row[0] = toNumber(text);
      }
      break;

    // Section
    case 1:
      if (typeof text === "string") {
        row[1] = row[1] ? row[1] + " " + text : text;
      }
      break;

    // Question ID / Answer
    case 2:
      if (isValidNumber(text)) {
        row[colIndex] = toNumber(text);
      }
      break;
    case 3: {
      if (isValidNumber(text)) {
        const num = toNumber(text);

        if (num > 100000000) {
          row[colIndex] = toNumber(text);
        } else {
          // This is final answer
          row[colIndex] = `answer : ${num}`;
          rowCompleted = true
        }
      }
      break;
    }


    // Options
    case 4:
    case 5:
      if (isValidNumber(text)) {
        if (!Array.isArray(row[4])) {
          row[4] = [];
        }

        if (row[4].length < 4) {
          row[4].push(toNumber(text));
        }

        if (row[4].length === 4) {
          rowCompleted = true;
        }
      }
      break;

    default:
      break;
  }

  return {
    rowCompleted,

    newRowStarted:
      isValidNumber(text) &&
      Number(text) >= 1 &&
      Number(text) <= TOTAL_QUESTIONS,
  };
};



export const buildAnsweKeyTableFromItems = (items) => {
  const table = [];

  let row = [];
  let headerFound = false;
  let rowStarted = false;

  items.forEach((text) => {
    const value = text.str.trim();

    if (!value) return;

    // Find header
    if (!headerFound) {
      headerFound = findAnswerKeyHeaderRow(text);
      return;
    }

    // Start new row
    if (
      !rowStarted &&
      isValidNumber(value) &&
      Number(value) >= 1 &&
      Number(value) <= TOTAL_QUESTIONS
    ) {
      row = [];
      parseAnswerKeyRow(row, value, row.length);
      rowStarted = true;
      return;
    }

    // Fill row
    if (headerFound && rowStarted) {
      const status = parseAnswerKeyRow(row, value, row.length);

      if (status.newRowStarted && !status.rowCompleted) {
        table.push(row);

        row = [];
        parseAnswerKeyRow(row, value, row.length);
        rowStarted = true;
      }

      if (status.rowCompleted) {
        table.push(row);
        row = [];
        rowStarted = false;
      }
    }
  });

  // Push last row
  if (row.length > 0) {
    table.push(row);
  }

  return table;
};


export const findCandidateResponseHeaderRow = (text) => {
  return text.str === "Option(s) ID claimed";
};


export const parseCandidateResponseKeyRow = (candidateDetails, row, text, prevText, nextQuestionNo) => {
  let rowCompleted = false;

  let newQuestionDetected = false

  if (text == `Q.${nextQuestionNo}`) {
    newQuestionDetected = true

  } else if (prevText == "Question Type :") {
    if (text == "MCQ") {
      row[prevText] = text
      row.isMCQ = true
    }
    if (text == "SA") {
      row[prevText] = text
      row.isMCQ = false
    }

  }
  else if (["Option 1 ID :", "Option 2 ID :", "Option 3 ID :", "Option 4 ID :"].includes(prevText)) {
    if (!Number.isNaN(Number(text)))
      row[prevText] = Number(text)
  } else if (prevText == "Question ID :") {
    if (!Number.isNaN(Number(text)))
      row[prevText] = Number(text)
  } else if (prevText == "Answer :") {
    row[prevText] = text
  } else if (prevText == "Status :") {
    if (text == "Not Answered" || text == "Answered") {
      row[prevText] = text
    }
  } else if (prevText == "Chosen Option :") {
    row[prevText] = text
    rowCompleted = true
  } else if (prevText == "Application No") {
    candidateDetails[prevText] = Number(text)
  } else if (prevText == "Candidate Name") {
    candidateDetails[prevText] = text
  } else if (prevText == "Roll No.") {
    candidateDetails[prevText] = text
  } else if (prevText == "Test Date") {
    candidateDetails[prevText] = text
  } else if (prevText == "Test Time") {
    candidateDetails[prevText] = text
  } else if (prevText == "Subject") {
    candidateDetails[prevText] = text
  }


  return { rowCompleted, newQuestionDetected }


};

export const buildCandiateResponseTableFromItems = (items) => {
  const table = [];

  let tempRow = { currentQuestion: null, isMCQ: null };
  let rowStarted = false;

  let currentQuestion = 1
  let currentRow = null

  const candidateDetails = {}

  let prevText = null

  items.forEach((text) => {

    const value = text.str.trim();

    if (!value) return;

    if (!rowStarted && value == `Q.${currentQuestion}`) {
      rowStarted = true
      currentRow = { ...tempRow, currentQuestion }
      prevText = value
    } else if (rowStarted) {
      const nextQuestionNo = currentQuestion + 1
      const rowStatus = parseCandidateResponseKeyRow(candidateDetails, currentRow, value, prevText, nextQuestionNo)
      prevText = value
      if (rowStatus.rowCompleted) {
        table.push(currentRow)
        rowStarted = false
        currentQuestion = nextQuestionNo
      } else if (rowStatus.newQuestionDetected) {
        table.push(currentRow)
        rowStarted = true
        currentQuestion = nextQuestionNo
        currentRow = { ...tempRow, currentQuestion }
      }
    }

  })

  return table
}