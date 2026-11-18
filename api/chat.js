// Vercel serverless function: live Claude answers. Set ANTHROPIC_API_KEY in Vercel project settings.
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(503).json({ error: "No API key configured" });
  const { question = "", kb = "" } = req.body || {};
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5",
        max_tokens: 600,
        system: "You explain an M.Tech project on explainable student stress classification (MC-ECII). Answer clearly and briefly using only these facts; if unsure, say so. Non-diagnostic tool.\n\n" + kb,
        messages: [{ role: "user", content: String(question).slice(0, 1000) }],
      }),
    });
    const j = await r.json();
    const answer = (j.content || []).map((c) => c.text || "").join("").trim();
    return answer ? res.status(200).json({ answer }) : res.status(502).json({ error: "Empty answer" });
  } catch (e) { return res.status(500).json({ error: "Upstream error" }); }
}
