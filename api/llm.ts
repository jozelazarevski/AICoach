// Vercel serverless function: proxies game LLM calls to the Anthropic API.
// The ANTHROPIC_API_KEY env var stays server-side and is never sent to the client.

const MODEL = "claude-sonnet-5";
const MAX_TOKENS = 500;

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "POST only" });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(503).json({ error: "LLM not configured" });
    return;
  }

  const { system, messages } = req.body ?? {};
  if (typeof system !== "string" || !Array.isArray(messages) || messages.length === 0 || messages.length > 24) {
    res.status(400).json({ error: "Bad request" });
    return;
  }
  for (const m of messages) {
    if (
      !m ||
      (m.role !== "user" && m.role !== "assistant") ||
      typeof m.content !== "string" ||
      m.content.length > 4000
    ) {
      res.status(400).json({ error: "Bad message" });
      return;
    }
  }

  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system,
        messages,
      }),
    });

    if (!upstream.ok) {
      const detail = await upstream.text();
      res.status(502).json({ error: "Upstream error", detail: detail.slice(0, 300) });
      return;
    }

    const data = await upstream.json();
    const text = Array.isArray(data.content)
      ? data.content
          .filter((b: any) => b.type === "text")
          .map((b: any) => b.text)
          .join("")
      : "";
    res.status(200).json({ text });
  } catch {
    res.status(502).json({ error: "LLM call failed" });
  }
}
