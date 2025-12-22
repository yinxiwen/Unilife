
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// Always use the named parameter and exclusively the process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Simulates checking text for sensitive content or toxicity.
 * Uses Gemini 3 Flash for speed and accuracy.
 */
export const checkContentSafety = async (text: string): Promise<{ safe: boolean; reason?: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the following text for toxicity, hate speech, or inappropriate content for a university campus platform. 
      Respond with strictly JSON: { "safe": boolean, "reason": string }.
      Text: "${text}"`,
      config: {
        responseMimeType: "application/json"
      }
    });

    // response.text is a property, not a method.
    const result = JSON.parse(response.text || '{}');
    return result;
  } catch (error) {
    console.error("Gemini Safety Check Error:", error);
    // Fail safe in case of API issues
    return { safe: true };
  }
};

/**
 * Generates a "Match Score" for lost and found items based on description.
 * This uses semantic understanding of descriptions to find similarities.
 */
export const calculateMatchScore = async (lostDesc: string, foundDesc: string): Promise<number> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Compare these two item descriptions and determine the probability (0-100) that they refer to the same item.
      Item 1: ${lostDesc}
      Item 2: ${foundDesc}
      Return only the integer number.`,
    });
    
    // response.text is a property.
    const scoreStr = response.text?.trim() || '0';
    const score = parseInt(scoreStr, 10);
    return isNaN(score) ? 0 : score;
  } catch (error) {
    console.error("Gemini Match Score Error:", error);
    return 0;
  }
};

/**
 * Generates a short summary or title from a long description.
 */
export const generateSmartTitle = async (description: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Generate a concise 5-word title for this sales listing: ${description}`
        });
        // response.text is a property.
        return response.text || "New Item";
    } catch (e) {
        console.error("Gemini Smart Title Error:", e);
        return "New Item";
    }
}
