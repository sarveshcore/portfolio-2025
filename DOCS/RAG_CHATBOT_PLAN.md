# RAG-based Portfolio Chatbot: Implementation Guide

## Status: IMPLEMENTED

This document describes the RAG chatbot that has been implemented for the portfolio website.

---

## File Structure

```
portfolio/
├── data/                              # Portfolio data for RAG
│   ├── about.md                       # Info about Sarvesh
│   ├── projects.md                    # Project details
│   ├── skills.md                      # Skills and expertise
│   └── contact.md                     # Contact information
│
├── scripts/
│   └── ingest.js                      # Data ingestion & embedding script
│
├── src/
│   ├── app/
│   │   └── api/
│   │       └── chat/
│   │           └── route.js           # RAG chat API endpoint
│   │
│   ├── components/
│   │   └── Chatbot/
│   │       ├── Chatbot.js             # Main chatbot component
│   │       ├── ChatMessage.js         # Individual message component
│   │       ├── ChatInput.js           # Input field component
│   │       └── index.js               # Export file
│   │
│   ├── lib/
│   │   ├── gemini.js                  # Gemini API client wrapper
│   │   └── vectorStore.js             # Vector store utilities
│   │
│   └── config.js                      # Centralized configuration
│
├── vector-store.json                  # Generated embeddings (gitignored)
└── .env.local                         # Contains GEMINI_API_KEY
```

---

## Quick Start

### 1. Get a Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key

### 2. Add Your API Key

Create or update `.env.local` in the project root:

```
GEMINI_API_KEY=your_api_key_here
```

### 3. Run the Ingestion Script

This generates embeddings from your portfolio data:

```bash
npm run ingest
```

### 4. Start the Development Server

```bash
npm run dev
```

The chatbot will appear as a blue floating button in the bottom-right corner.

---

## How It Works

### Data Flow

```
User Message
    ↓
Chat API (/api/chat)
    ↓
Generate Query Embedding (text-embedding-004)
    ↓
Find Relevant Chunks (cosine similarity)
    ↓
Construct Prompt with Context
    ↓
Generate Response (gemini-1.5-flash)
    ↓
Stream Response to Frontend
    ↓
Display in Chat UI
```

### Key Components

| Component | File | Purpose |
|-----------|------|---------|
| Config | `src/config.js` | Centralized settings (models, prompts, etc.) |
| Gemini Wrapper | `src/lib/gemini.js` | Simplified API for embeddings and generation |
| Vector Store | `src/lib/vectorStore.js` | Load, search, and chunk utilities |
| Chat API | `src/app/api/chat/route.js` | RAG orchestration with streaming |
| Chatbot UI | `src/components/Chatbot/` | Floating chat widget |

---

## Configuration

Edit `src/config.js` to customize:

```javascript
export const config = {
  models: {
    embedding: 'text-embedding-004',
    generation: 'gemini-1.5-flash',
  },
  vectorStore: {
    topK: 4, // Number of chunks to retrieve
  },
  chunking: {
    maxChunkSize: 500,
    overlap: 50,
  },
  chat: {
    maxHistoryLength: 10,
    systemPrompt: '...', // Customize chatbot personality
  },
};
```

---

## Updating Content

When you update the markdown files in `data/`:

1. Edit the relevant `.md` file
2. Run `npm run ingest` to regenerate embeddings
3. Restart the dev server

---

## API Models Used

| Model | Purpose | Free Tier |
|-------|---------|-----------|
| `text-embedding-004` | Generate embeddings | 1,500 req/min |
| `gemini-1.5-flash` | Generate responses | 15 req/min |

---

## Future Enhancements

- [ ] Migrate to dedicated vector database (Pinecone, Chroma)
- [ ] Add conversation memory/persistence
- [ ] Implement suggested questions
- [ ] Add message copying functionality
- [ ] Auto-sync with project READMEs
