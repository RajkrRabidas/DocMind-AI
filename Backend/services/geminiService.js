const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

// Gemini AI setup
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Generate Summary
const generateSummary = async (text) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: `
You are an AI document analyzer.

Analyze the following document and return ONLY valid JSON.

The JSON format must be exactly:

{
  "summary": "Write a short summary in 3-4 sentences.",
  "keyPoints": [
    "Point 1",
    "Point 2",
    "Point 3",
    "Point 4",
    "Point 5"
  ]
}

Do not write markdown.
Do not use \`\`\`json.
Do not add any explanation.
Return only valid JSON.

Document:
${text.slice(0, 15000)}
`,
    });

    return response.text;
  } catch (error) {
    console.log(error);
    throw new Error("Summary generation failed");
  }
};

module.exports = {
  generateSummary,
};
