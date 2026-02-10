import { parseJeeResponseHtml } from "../utils/parser";

export async function loadResponseFromUrl(url, API_BASE) {
  const res = await fetch(
    `${API_BASE}/api/v1/exam/response?exam=jee&url=${encodeURIComponent(
      url
    )}`
  );

  if (!res.ok) {
    throw new Error("URL fetch failed");
  }

  const result = await res.json();

  return parseJeeResponseHtml(result.data);
}
