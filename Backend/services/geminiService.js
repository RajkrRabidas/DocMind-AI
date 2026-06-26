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
Summarize this document in simple bullet points.

${text}
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