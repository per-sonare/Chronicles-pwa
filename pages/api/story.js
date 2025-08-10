import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { action } = req.body;
  if (!action) {
    return res.status(400).json({ error: "Action parameter missing" });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "あなたは冒険の案内役です。" },
        { role: "user", content: action }
      ],
    });

    const story = completion.data.choices[0].message.content;

    return res.status(200).json({ story, map: "（ここに地図情報を入れる）" });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
