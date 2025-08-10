// pages/api/story.js
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Vercelの環境変数から取得
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { action, context } = req.body; // フロントから受け取る情報例

  if (!action) {
    return res.status(400).json({ error: "No action provided" });
  }

  try {
    // OpenAIに問い合わせ
    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "あなたは物語の案内役です。" },
        {
          role: "user",
          content: `次の行動を元に物語を続けてください。行動: ${action}\n現在の状況: ${context || "特になし"}`,
        },
      ],
      max_tokens: 500,
      temperature: 0.8,
    });

    const storyText = completion.data.choices[0].message.content;

    // ここで地図や状態管理があれば追加可能
    // 今は簡易的にstoryのみ返す
    res.status(200).json({
      story: storyText,
      map: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "OpenAI API error" });
  }
}
