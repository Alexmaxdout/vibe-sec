import { runHFModel } from "../utils/hfClient.js";

export async function analyzeCode(req, res) {
  try {
    const { code } = req.body;

    if (!code || !code.trim()) {
      return res.status(400).json({ error: "No code provided." });
    }

    const result = await runHFModel(code);

    // result already has { full_code, analysis: [...] }
    return res.json(result);
  } catch (err) {
    console.error("Backend Model Error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
