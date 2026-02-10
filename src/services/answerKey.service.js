import { loadPdf, extractPdfItems } from "./pdfService";
import { buildAnsweKeyTableFromItems } from "../utils/parser";

export async function loadAnswerKey(pdfFile) {
  const buffer = await pdfFile.arrayBuffer();
  const pdf = await loadPdf(buffer);
  const items = await extractPdfItems(pdf);

  return buildAnsweKeyTableFromItems(items);
}
