// pages/api/story.js

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  // CORS設定を追加
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONSメソッドのプリフライトリクエストに対応
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { action } = req.body;

    if (!action) {
      return res.status(400).json({ error: "Action is required" });
    }

    // ここにOpenAI API呼び出しのロジックを書く（例）
    const prompt = `あなたはゲームの物語進行AIです。次の行動に基づいて物語と地図を生成してください。\n行動: ${action}\n`;

    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
    });

    const responseText = completion.data.choices[0].message.content;

    // 物語と地図を分ける簡単な例（実際はもっと高度な解析が必要）
    // ここでは仮に「[MAP]」で地図部分を区切る想定
    let story = responseText;
    let map = "";

    if (responseText.includes("[MAP]")) {
      [story, map] = responseText.split("[MAP]");
      story = story.trim();
      map = map.trim();
    }

    res.status(200).json({ story, map });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
      }
