// pages/api/story.js
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || "",
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

    if (!configuration.apiKey) {
      console.error("OpenAI API key is missing.");
      return res.status(500).json({ error: "OpenAI API key is not configured." });
    }

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "あなたはテキストRPGの進行役です。" },
        { role: "user", content: action },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const story = completion.data.choices[0].message.content;

    res.status(200).json({
      story,
      map: "ここにASCII地図が表示されます。",
    });
  } catch (error) {
    console.error("OpenAI API error:", error.response?.data || error.message || error);
    res.status(500).json({ error: error.response?.data || error.message || "Internal Server Error" });
  }
}
