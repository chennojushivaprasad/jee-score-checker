export const TOTAL_QUESTIONS = 75;
export const BIG_ID_LIMIT = 100000000;

export const isValidNumber = (value) =>
  typeof value === "string" &&
  value.trim() !== "" &&
  !Number.isNaN(Number(value));

export const toNumber = (value) => Number(value);

export const isBigId = (num) => num > BIG_ID_LIMIT;
