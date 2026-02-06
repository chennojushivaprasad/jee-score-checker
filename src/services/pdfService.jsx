import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;


export const loadPdf = async (buffer) => {
  return await pdfjsLib
    .getDocument({ data: buffer })
    .promise;
};

export const extractPdfItems = async (pdf) => {
  const allItems = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    allItems.push(...content.items);
  }

  return allItems;
};
