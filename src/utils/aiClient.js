import { GoogleGenerativeAI } from '@google/generative-ai';

const getGenAI = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing VITE_GEMINI_API_KEY in .env file");
  }
  return new GoogleGenerativeAI(apiKey);
};

export const analyzePaper = async (paperText) => {
  try {
    const genAI = getGenAI();
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
    You are an expert academic research assistant. Analyze the following research paper text and extract key information.
    Format your response EXACTLY as a valid JSON object with the following structure:
    {
      "summary": "A 3-4 sentence executive summary of the paper.",
      "studentExplanation": "A simplified, easy-to-understand explanation using an analogy.",
      "methodology": ["bullet point 1", "bullet point 2", "bullet point 3"],
      "results": ["key result 1", "key result 2", "key result 3"],
      "futureResearch": ["future direction 1", "future direction 2"],
      "keywords": ["keyword1", "keyword2", "keyword3", "keyword4"]
    }
    
    Make sure it is valid JSON and contains only the JSON string (no markdown formatting like \`\`\`json).
    
    Paper Text:
    ${paperText.substring(0, 50000)}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Clean up formatting if AI includes markdown ticks
    text = text.replace(/```json\n?/, '').replace(/```\n?/, '');
    
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Analysis Error:", error);
    throw error;
  }
};

export const askQuestion = async (paperText, question, previousMessages = []) => {
  try {
    const genAI = getGenAI();
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    let historyText = previousMessages.map(msg => `${msg.sender}: ${msg.text}`).join('\n');

    const prompt = `
    You are a highly capable AI assistant. You have been provided with the text of a research paper below.
    The user will give you questions, commands, or tasks. 
    Use the paper's context to fulfill the user's request to the best of your ability. If the user asks a general question unrelated to the paper, you may answer it normally, but always prioritize the paper's context if relevant.
    
    Paper Context:
    ${paperText.substring(0, 40000)}
    
    Conversation History:
    ${historyText}
    
    User Command / Question: ${question}
    
    Answer:
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Chat Error:", error);
    throw error;
  }
};

export const comparePapers = async (paperText1, paperText2) => {
  try {
    const genAI = getGenAI();
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
    You are an expert academic research evaluator. Compare the following two research papers and determine which one is of higher quality based on methodology, results, and clarity.
    
    Format your response EXACTLY as a valid JSON object with the following structure:
    {
      "winner": "Paper 1 OR Paper 2",
      "reasoning": "A 3-4 sentence explanation of why this paper is better. Focus on methodology strength, data quality, and clarity.",
      "keyDifferences": [
        "Difference 1: e.g., Paper 1 uses X while Paper 2 uses Y.",
        "Difference 2...",
        "Difference 3..."
      ]
    }
    
    Make sure it is valid JSON and contains only the JSON string (no markdown formatting like \`\`\`json).
    
    --- PAPER 1 ---
    ${paperText1.substring(0, 25000)}
    
    --- PAPER 2 ---
    ${paperText2.substring(0, 25000)}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Clean up formatting if AI includes markdown ticks
    text = text.replace(/```json\n?/, '').replace(/```\n?/, '');
    
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Comparison Error:", error);
    throw error;
  }
};
