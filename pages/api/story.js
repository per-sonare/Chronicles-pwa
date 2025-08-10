// pages/api/story.js
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Vercelの環境変数に設定したAPIキーを使用
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { action } = req.body;

    if (!action || typeof action !== "string" || action.trim() === "") {
      return res.status(400).json({ error: "Missing or empty 'action' parameter" });
    }

    // ChatCompletion API 呼び出し
    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini", // 必要に応じてモデル名を調整してください
      messages: [
        { role: "system", content: "あなたはテキストRPGの進行役です。" },
        { role: "user", content: action },
      ],
      max_tokens: 500,       // 必要に応じて調整してください
      temperature: 0.7,      // 創造性の度合い（0〜1）
    });

    const story = completion.data.choices[0].message.content;

    res.status(200).json({
      story,
      map: "ここにASCII地図が表示されます。",  // 必要なら実装を変更してください
    });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
