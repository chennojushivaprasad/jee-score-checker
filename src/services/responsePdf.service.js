import { loadPdf, extractPdfItems } from "./pdfService";
import { buildCandiateResponseTableFromItems } from "../utils/parser";

export async function loadResponseFromPdf(pdfFile) {
  const buffer = await pdfFile.arrayBuffer();
  const pdf = await loadPdf(buffer);
  const items = await extractPdfItems(pdf);

  return buildCandiateResponseTableFromItems(items);
}
