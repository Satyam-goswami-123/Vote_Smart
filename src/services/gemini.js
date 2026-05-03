import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
if (API_KEY && API_KEY !== 'your_gemini_api_key_here') {
  genAI = new GoogleGenerativeAI(API_KEY);
}

const SYSTEM_PROMPT = `
You are VoteBot, an AI election assistant for "VoteSmart India". 
Your goal is to guide Indian citizens regarding elections, voting processes, eligibility, and rules.
Keep your answers concise, respectful, and accurate based on the Election Commission of India (ECI) guidelines.
Always respond in a helpful tone. If asked about political preferences, state clearly that you are non-partisan and only provide factual election process information.
Use simple language and formatting (like bullet points) for readability.
`;

export const getGeminiResponse = async (prompt, history = []) => {
  if (!genAI) {
    // Mock response if no API key is provided
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Hello! I am operating in offline mode because the Gemini API key is missing. However, I can tell you that to vote in India, you must be 18+ and an Indian citizen.");
      }, 1000);
    });
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_PROMPT
    });
    
    // Format history for Gemini API
    const formattedHistory = history.map(msg => ({
      role: msg.role === 'bot' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    // If there's an API key issue, clarify it for the user
    if (error.message && error.message.includes('API key not valid')) {
      return "There appears to be an issue with your Gemini API key. Please check your .env file.";
    }
    return `I'm sorry, I encountered an error: ${error.message || 'Trouble connecting'}. Please try again later.`;
  }
};
