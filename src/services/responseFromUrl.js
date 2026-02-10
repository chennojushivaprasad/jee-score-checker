export async function fetchResponseFromUrl({
  exam,
  responseUrl,
}) {
  const API_BASE = import.meta.env.VITE_BACKEND_URL;

  const res = await fetch(
    `${API_BASE}/api/v1/exam/response?exam=${exam}&url=${encodeURIComponent(
      responseUrl
    )}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch response data");
  }

  return res.json(); 
}
