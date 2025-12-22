import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// In a real scenario, API_KEY comes from process.env.API_KEY
// For this demo, we assume the environment is set up correctly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'mock-key-for-demo' });

/**
 * Simulates checking text for sensitive content or toxicity.
 * Uses Gemini 2.5 Flash for speed.
 */
export const checkContentSafety = async (text: string): Promise<{ safe: boolean; reason?: string }> => {
  if (!process.env.API_KEY) {
    // Mock response if no key is present to allow UI demo to function
    return new Promise(resolve => setTimeout(() => resolve({ safe: true }), 1000));
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the following text for toxicity, hate speech, or inappropriate content for a university campus platform. 
      Respond with strictly JSON: { "safe": boolean, "reason": string }.
      Text: "${text}"`,
      config: {
        responseMimeType: "application/json"
      }
    });

    const result = JSON.parse(response.text || '{}');
    return result;
  } catch (error) {
    console.error("Gemini Safety Check Error:", error);
    // Fail safe
    return { safe: true };
  }
};

/**
 * Generates a "Match Score" for lost and found items based on description.
 * This simulates a vector matching or semantic comparison.
 */
export const calculateMatchScore = async (lostDesc: string, foundDesc: string): Promise<number> => {
   if (!process.env.API_KEY) {
    return Math.floor(Math.random() * 30) + 70; // Mock 70-100%
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Compare these two item descriptions and determine the probability (0-100) that they refer to the same item.
      Item 1: ${lostDesc}
      Item 2: ${foundDesc}
      Return only the integer number.`,
    });
    
    const score = parseInt(response.text?.trim() || '0', 10);
    return isNaN(score) ? 0 : score;
  } catch (error) {
    return 0;
  }
};

/**
 * Generates a short summary or title from a long description.
 */
export const generateSmartTitle = async (description: string): Promise<string> => {
    if (!process.env.API_KEY) return "Smart Title (Demo)";
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate a concise 5-word title for this sales listing: ${description}`
        });
        return response.text || "New Item";
    } catch (e) {
        return "New Item";
    }
}
