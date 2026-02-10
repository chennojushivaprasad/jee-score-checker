import { extractPdfItems } from "../services/pdfService";

export async function processPdf({
  file,
  builder,
  setter,
  setStatus,
  name,
}) {
  try {
    setStatus(`📄 Processing ${name}...`);
    const buffer = await file.arrayBuffer();
    const pdf = await loadPdf(buffer);
    const items = await extractPdfItems(pdf);
    const data = builder(items);
    setter(data);
    return true;
  } catch (err) {
    console.error(err);
    setStatus(`❌ Failed to load ${name}`);
    return false;
  }
}
