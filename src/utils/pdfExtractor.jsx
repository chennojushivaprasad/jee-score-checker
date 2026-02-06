export const extractPdfItems = async (pdf) => {
  const allItems = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    allItems.push(...content.items);
  }

  return allItems;
};


