import OpenAI from "openai";

// Blog Generator Controller
export const generateBlog = async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validate input
    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Initialize OpenAI client
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // AI Prompt: professional blog, plain text, well-structured
    const userPrompt = `
You are a professional healthcare blog writer.

Write a detailed, SEO-friendly blog of about 1000 words on the topic: "${prompt}".

Requirements:
- Use clear, simple, engaging language suitable for Indian healthcare readers.
- Make it professional and visually appealing in plain text.
- Use natural line breaks and spacing to indicate:
  - Title
  - Subheadings
  - Paragraphs
  - Bullet points or numbered lists
  - Highlighted key points (e.g., "Key Takeaway:", "Important:")
- Avoid Markdown symbols (##, ###) or HTML tags.
- Include an introduction, main content sections, and a conclusion.
- Ensure smooth flow, easy readability, and professional tone.
- Optimize for healthcare SEO keywords.
- Approximate total length: 1000 words.

 IMPORTANT: Return the response strictly in valid JSON format:
{
  "title": "3-4 word blog title",
  "content": "full blog content in plain text with structured line breaks, bullet points, and highlights"
}
    `;

    // Request completion from OpenAI
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a professional healthcare blog writer." },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 1800, // buffer for ~1000 words
      temperature: 0.7,
    });

    // Extract AI response safely
    const aiResponse = completion.choices?.[0]?.message?.content || "";

    let blogData;
    try {
      blogData = JSON.parse(aiResponse);
    } catch (err) {
      console.error("JSON Parse Error:", err, "\nAI Response:", aiResponse);
      return res.status(500).json({
        error: "AI response was not in valid JSON format",
        raw: aiResponse,
      });
    }

    // Success response
    return res.status(200).json(blogData);

  } catch (error) {
    console.error("OpenAI Error:", error);
    return res.status(500).json({ error: "Something went wrong while generating blog" });
  }
};
