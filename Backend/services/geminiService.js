const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
console.log("API KEY EXISTS:", !!process.env.GEMINI_API_KEY);

const generateSummary = async (text) => {
  try {
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.5-pro",
      contents: `Summarize this PDF in simple bullet points:\n\n${text}`,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating summary:", error);
    throw new Error("Failed to generate summary");
  }
};

module.exports = {
  generateSummary,
};