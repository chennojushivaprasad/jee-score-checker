export const mergeAnswerAndResponse = (
  answerKeyData,
  responseData
) => {

  const finalResults = [];

  // Build fast lookup for response (by Question ID)
  const responseMap = new Map();

  responseData.forEach((res) => {
    const qid = res["Question ID :"];
    if (qid) {
      responseMap.set(qid, res);
    }
  });


  answerKeyData.forEach((ans) => {

    const qid = ans.questionId;

    const response = responseMap.get(qid);

    let userAnswer = null;
    let status = "unattempted";
    let marks = 0;


    // If no response → unattempted
    if (!response) {

      status = "unattempted";
      marks = 0;

    } else {

      const respStatus = response["Status :"];


      // Not Answered
      if (respStatus === "Not Answered") {

        status = "unattempted";
        marks = 0;

      }

      // Answered
      else if (respStatus === "Answered") {

        if (ans.isMCQ) {

          // MCQ → option number (1-4)
          const chosen = response["Chosen Option :"];

          if (chosen && chosen !== "--") {

            const selectedOptionId = response[`Option ${chosen} ID :`] ?? null;

            userAnswer = selectedOptionId;

          }

        } else {

          // Numerical
          const answer = response["Answer :"];

          if (answer && answer !== "--") {
            userAnswer = Number(answer);
          }
        }


        // Compare answers
        if (userAnswer === ans.correctAnswer) {

          status = "correct";
          marks = 4;

        } else {

          status = "wrong";
          marks = -1;
        }

      }
    }


    finalResults.push({

      sl: ans.sl,
      section: ans.section,

      questionId: qid,

      isMCQ: ans.isMCQ,

      correctAnswer: ans.correctAnswer,

      userAnswer,

      status,
      marks,

      options: ans.options || []
    });

  });


  return finalResults;
};
