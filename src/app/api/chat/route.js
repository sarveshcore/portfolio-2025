import { GoogleGenerativeAI } from '@google/generative-ai';
import { loadVectorStore, findRelevantChunks, cosineSimilarity } from '@/lib/vectorStore';
import { config } from '@/config';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generate embedding for query
 */
async function generateEmbedding(text) {
  const model = genAI.getGenerativeModel({ model: config.models.embedding });
  const result = await model.embedContent(text);
  return result.embedding.values;
}

/**
 * POST /api/chat
 * Handle chat messages with RAG
 */
export async function POST(request) {
  try {
    const { message, history = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return Response.json({ error: 'Message is required' }, { status: 400 });
    }

    // --- Smart RAG Trigger ---
    const simpleGreetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'];
    const isSimpleGreeting = simpleGreetings.some(greeting => message.toLowerCase().startsWith(greeting));
    const isShortMessage = message.length < 10;

    let context = [];
    let bypassRAG = isSimpleGreeting || isShortMessage;

    if (!bypassRAG) {
      // Load vector store
      const vectorStore = loadVectorStore();

      if (vectorStore.length > 0) {
        // Generate embedding for the user's query
        const queryEmbedding = await generateEmbedding(message);

        // Find relevant chunks
        context = findRelevantChunks(queryEmbedding, vectorStore);
      }
    }

    // Build the prompt
    const systemPrompt = config.chat.systemPrompt;

    const contextSection = context.length > 0
      ? `\n\nRelevant information from the portfolio:\n${context.map((c, i) => `[${i + 1}] ${c}`).join('\n\n')}`
      : bypassRAG
        ? '' // No context for simple messages
        : '\n\nNote: No specific context was found in the portfolio data. Answer based on general knowledge about the portfolio owner if possible, or politely indicate that you don\'t have that information.';

    // Include recent conversation history
    const recentHistory = history.slice(-config.chat.maxHistoryLength);
    const historySection = recentHistory.length > 0
      ? `\n\nConversation history:\n${recentHistory.map(m => `${m.role === 'user' ? 'Assistant' : 'Assistant'}: ${m.content}`).join('\n')}`
      : '';


    const fullPrompt = `${systemPrompt}${contextSection}${historySection}\n\nUser: ${message}\n\nAssistant:`;

    // Generate response with streaming
    const model = genAI.getGenerativeModel({ model: config.models.generation });
    const result = await model.generateContentStream(fullPrompt);

    // Create a readable stream for the response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);

    // Handle rate limit errors
    if (error.status === 429) {
      return Response.json(
        { error: 'Rate limit reached. Please wait a moment and try again.' },
        { status: 429 }
      );
    }

    return Response.json(
      { error: 'Failed to process message. Please try again.' },
      { status: 500 }
    );
  }
}
