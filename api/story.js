export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { action } = req.body;
  if (!action) {
    return res.status(400).json({ error: "No action provided" });
  }

  try {
    const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
あなたはRPGの進行役です。必ず以下の形式で返答してください。
[MAP]
現在地を中心に5x5マスの周辺地図をASCIIアートで描いてください。
プレイヤーの位置は「@」で表してください。
地形や建物など特徴があれば1文字で示してください。
[/MAP]
[STORY]
地図を踏まえた物語を描写してください。
[/STORY]
            `
          },
          { role: "user", content: action }
        ],
        max_tokens: 300
      })
    });

    const aiData = await ai
