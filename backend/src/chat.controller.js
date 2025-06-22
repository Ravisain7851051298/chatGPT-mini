import { OpenAI } from 'openai';

export const chatController = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Missing message' });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: message }]
    });
    const answer = response.choices[0]?.message?.content;

    res.json({ answer });
  } catch (error) {
    if (error.status === 429) {
      console.error("🚨 Quota exhausted. Please review your billing or usage.");
      res.status(429).json({ error: "Quota exhausted. Please review your billing or usage in OpenAI platform." });
    } else {
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  }
};
