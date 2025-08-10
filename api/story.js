export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { action } = req.body;
    console.log("Received action:", action);

    if (!action || typeof action !== "string" || action.trim() === "") {
      return res.status(400).json({ error: "Missing or empty 'action' parameter" });
    }

    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "あなたはテキストRPGの進行役です。" },
        { role: "user", content: action },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    console.log("OpenAI response received");

    const story = completion.data.choices[0].message.content;

    return res.status(200).json({
      story,
      map: "ここにASCII地図が表示されます。",
    });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
