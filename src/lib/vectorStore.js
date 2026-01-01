import fs from 'fs';
import path from 'path';
import { config } from '@/config';

/**
 * Calculate cosine similarity between two vectors
 */
export function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Load the vector store from the JSON file
 */
export function loadVectorStore() {
  const storePath = path.join(process.cwd(), config.vectorStore.path);

  if (!fs.existsSync(storePath)) {
    console.warn('Vector store not found. Please run the ingestion script first.');
    return [];
  }

  const data = fs.readFileSync(storePath, 'utf-8');
  return JSON.parse(data);
}

/**
 * Find the most relevant chunks for a given query embedding
 */
export function findRelevantChunks(queryEmbedding, vectorStore, topK = config.vectorStore.topK) {
  if (!vectorStore || vectorStore.length === 0) {
    return [];
  }

  // Calculate similarity for each chunk
  const similarities = vectorStore.map((item) => ({
    text: item.text,
    source: item.source,
    similarity: cosineSimilarity(queryEmbedding, item.embedding),
  }));

  // Sort by similarity (descending) and take top K
  return similarities
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK)
    .map((item) => item.text);
}

/**
 * Split text into chunks with overlap
 */
export function splitTextIntoChunks(text, maxSize = config.chunking.maxChunkSize, overlap = config.chunking.overlap) {
  const chunks = [];
  const paragraphs = text.split(/\n\n+/);

  let currentChunk = '';

  for (const paragraph of paragraphs) {
    // If adding this paragraph exceeds max size, save current chunk and start new one
    if (currentChunk.length + paragraph.length > maxSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());

      // Start new chunk with overlap from the end of the previous chunk
      const overlapText = currentChunk.slice(-overlap);
      currentChunk = overlapText + ' ' + paragraph;
    } else {
      currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
    }
  }

  // Don't forget the last chunk
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}
