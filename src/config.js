// RAG Chatbot Configuration
// Centralized settings for the chatbot system

export const config = {
  // Gemini API Models
  models: {
    embedding: 'gemini-embedding-exp-03-07',
    generation: 'gemini-2.0-flash-lite',
  },

  // Vector Store Settings
  vectorStore: {
    path: './vector-store.json',
    topK: 4, // Number of relevant chunks to retrieve
  },

  // Chunking Settings for Ingestion
  chunking: {
    maxChunkSize: 500, // Maximum characters per chunk
    overlap: 50, // Overlap between chunks
  },

  // Data Directory
  dataDir: './data',

  // Chat Settings
  chat: {
    maxHistoryLength: 10, // Maximum conversation turns to include in context
    systemPrompt: `You are a helpful assistant for Sarvesh's portfolio website.
You answer questions about Sarvesh's skills, projects, experience, and background.
Use the provided context to answer questions accurately.
If you don't have enough information to answer a question, say so politely.
Keep responses concise and friendly.
Do not make up information that is not in the provided context.`,
  },
};
