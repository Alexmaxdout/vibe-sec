import fetch from "node-fetch";

export async function runHFModel(code) {
  const url = process.env.PY_URL;

  if (!url) {
    throw new Error("PY_URL is not set in .env");
  }

  const pyRes = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: code })
  });

  const text = await pyRes.text();

  // ngrok offline returns HTML
  if (!pyRes.ok) {
    throw new Error(`Python model error: ${text}`);
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Python returned non‑JSON: ${text}`);
  }
}
