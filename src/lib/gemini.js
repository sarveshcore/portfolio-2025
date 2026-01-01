import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '@/config';

// Initialize the Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generate an embedding for the given text
 * Uses the text-embedding-004 model
 */
export async function generateEmbedding(text) {
  const model = genAI.getGenerativeModel({ model: config.models.embedding });
  const result = await model.embedContent(text);
  return result.embedding.values;
}

/**
 * Generate a chat response using the Gemini model
 * Returns a streaming response
 */
export async function generateChatResponse(prompt, context, history = []) {
  const model = genAI.getGenerativeModel({ model: config.models.generation });

  // Build the full prompt with system instructions and context
  const systemPrompt = config.chat.systemPrompt;

  const contextSection = context.length > 0
    ? `\n\nRelevant information from the portfolio:\n${context.map((c, i) => `[${i + 1}] ${c}`).join('\n\n')}`
    : '';

  const historySection = history.length > 0
    ? `\n\nConversation history:\n${history.map(m => `${m.role}: ${m.content}`).join('\n')}`
    : '';

  const fullPrompt = `${systemPrompt}${contextSection}${historySection}\n\nUser: ${prompt}\n\nAssistant:`;

  // Generate streaming response
  const result = await model.generateContentStream(fullPrompt);
  return result.stream;
}

/**
 * Generate a non-streaming chat response
 * Used for simpler use cases
 */
export async function generateChatResponseSync(prompt, context, history = []) {
  const model = genAI.getGenerativeModel({ model: config.models.generation });

  const systemPrompt = config.chat.systemPrompt;

  const contextSection = context.length > 0
    ? `\n\nRelevant information from the portfolio:\n${context.map((c, i) => `[${i + 1}] ${c}`).join('\n\n')}`
    : '';

  const historySection = history.length > 0
    ? `\n\nConversation history:\n${history.map(m => `${m.role}: ${m.content}`).join('\n')}`
    : '';

  const fullPrompt = `${systemPrompt}${contextSection}${historySection}\n\nUser: ${prompt}\n\nAssistant:`;

  const result = await model.generateContent(fullPrompt);
  return result.response.text();
}
