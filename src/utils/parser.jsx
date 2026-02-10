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

const normalizeAnswerKeyRow = (row) => {
  const isMCQ = Array.isArray(row[4]);

  return {
    sl: row[0] ?? null,

    section: row[1] ?? "",

    questionId: row[2] ?? null,

    isMCQ,

    correctAnswer:
      typeof row[3] === "string"
        ? Number(row[3].replace("answer :", "").trim())
        : row[3] ?? null,

    options: isMCQ ? row[4] : [],
  };
};


export const parseAnswerKeyRow = (row, text, colIndex) => {
  let rowCompleted = false;

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
        table.push(normalizeAnswerKeyRow(row));
        row = [];
        parseAnswerKeyRow(row, value, row.length);
        rowStarted = true;
      }

      if (status.rowCompleted) {
        table.push(normalizeAnswerKeyRow(row));
        row = [];
        rowStarted = false;
      }
    }
  });

  // Push last row
  if (row.length > 0) {
    table.push(normalizeAnswerKeyRow(row));
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


function getCandidateDetailsFromTable(table) {
  const details = {};

  table.querySelectorAll("tr").forEach(row => {
    const cells = row.querySelectorAll("td, th");
    if (cells.length >= 2) {
      const key = cells[0].innerText.trim();
      const value = cells[1].innerText.trim();
      details[key] = value;
    }
  });

  return details;
}

function extractQuestionData(tableElement) {
  const data = {
    questionNumber: null,
    questionImage: null,
    options: []
  };

  // Question number
  const qNumberCell = tableElement.querySelector('td.bold');
  if (qNumberCell) {
    data.questionNumber = qNumberCell.textContent.trim();
  }

  // Question image
  const questionImg = tableElement.querySelector('td.bold img');
  if (questionImg) {
    data.questionImage = questionImg.getAttribute('src');
  }

  // Option rows (images inside option section)
  const optionRows = tableElement.querySelectorAll('tr td img');

  optionRows.forEach((img, index) => {
    // Skip first image (question image)
    if (index === 0) return;

    data.options.push({
      optionNumber: index,
      image: img.getAttribute('src')
    });
  });

  return data;
}

function extractMetaData(tableElement) {
  const data = {};

  const rows = tableElement.querySelectorAll('tr');

  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    if (cells.length === 2) {
      const key = cells[0].textContent
        .replace(':', '')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '_');

      const value = cells[1].textContent.trim();

      data[key] = value;
    }
  });

  return data;
}

const extractFullQuestion = (questionTable, metaTable) => ({
  question: extractQuestionData(questionTable),
  meta: extractMetaData(metaTable)
});


export function parseJeeResponseHtml(htmlString) {
  const parser = new DOMParser();

  const doc = parser.parseFromString(htmlString, "text/html");


  const candidateDetails = getCandidateDetailsFromTable(doc.getElementsByTagName("table")[0])

  // // Each question is usually in a table or div block
  const questionBlocks = Array.from(doc.querySelectorAll(".questionPnlTbl .rw"));

  const questions = questionBlocks.map((element) => {
    const row = element.children
    const questionTb1 = row[0]
    const questionInfo = row[1]
    return extractFullQuestion(questionTb1, questionInfo)
  })

  return {questions,candidateDetails};
}
