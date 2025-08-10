// pages/api/story.js
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Vercelの環境変数に登録したAPIキーを読み込み
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { action } = req.body;
    if (!action || action.trim() === "") {
      return res.status(400).json({ error: "Missing or empty 'action' parameter" });
    }

    // ChatCompletion API呼び出し
    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "あなたはテキストRPGの進行役です。" },
        { role: "user", content: action },
      ],
    });

    const story = completion.data.choices[0].message.content;

    // レスポンスに物語と地図を返す（地図は必要に応じて変更してください）
    res.status(200).json({
      story,
      map: "ここにASCII地図が表示されます。",
    });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
