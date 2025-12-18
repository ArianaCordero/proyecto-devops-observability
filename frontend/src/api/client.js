// client.js
export async function apiFetch(path, options = {}) {
  const res = await fetch(`/api${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  const contentType = res.headers.get("content-type") || "";
  const body = contentType.includes("application/json") ? await res.json() : await res.text();

  if (!res.ok) {
    const msg =
      typeof body === "object" && body?.error
        ? body.error
        : typeof body === "string" && body
          ? body
          : `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return body;
}
