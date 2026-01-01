/**
 * Data Ingestion Script
 *
 * This script reads markdown files from the data/ directory,
 * splits them into chunks, generates embeddings using Gemini,
 * and saves them to vector-store.json.
 *
 * Usage: node scripts/ingest.js
 *
 * Requirements:
 * - GEMINI_API_KEY environment variable must be set
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Configuration
const CONFIG = {
  dataDir: path.join(projectRoot, 'data'),
  outputPath: path.join(projectRoot, 'vector-store.json'),
  embeddingModel: 'gemini-embedding-exp-03-07',
  maxChunkSize: 500,
  overlap: 50,
};

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Split text into chunks with overlap
 */
function splitTextIntoChunks(text, maxSize = CONFIG.maxChunkSize, overlap = CONFIG.overlap) {
  const chunks = [];
  const paragraphs = text.split(/\n\n+/);

  let currentChunk = '';

  for (const paragraph of paragraphs) {
    if (currentChunk.length + paragraph.length > maxSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      const overlapText = currentChunk.slice(-overlap);
      currentChunk = overlapText + ' ' + paragraph;
    } else {
      currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

/**
 * Generate embedding for a text chunk
 */
async function generateEmbedding(text) {
  const model = genAI.getGenerativeModel({ model: CONFIG.embeddingModel });
  const result = await model.embedContent(text);
  return result.embedding.values;
}

/**
 * Read all markdown files from the data directory
 */
function readDataFiles() {
  const files = fs.readdirSync(CONFIG.dataDir).filter(f => f.endsWith('.md'));
  const documents = [];

  for (const file of files) {
    const filePath = path.join(CONFIG.dataDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    documents.push({
      source: file,
      content: content,
    });
  }

  return documents;
}

/**
 * Main ingestion function
 */
async function ingest() {
  console.log('Starting data ingestion...\n');

  // Check for API key
  if (!process.env.GEMINI_API_KEY) {
    console.error('Error: GEMINI_API_KEY environment variable is not set.');
    console.error('Please add your API key to .env.local file:');
    console.error('  GEMINI_API_KEY=your_api_key_here');
    process.exit(1);
  }

  // Read data files
  console.log('Reading data files from:', CONFIG.dataDir);
  const documents = readDataFiles();
  console.log(`Found ${documents.length} files.\n`);

  if (documents.length === 0) {
    console.error('No markdown files found in the data directory.');
    process.exit(1);
  }

  const vectorStore = [];
  let totalChunks = 0;

  // Process each document
  for (const doc of documents) {
    console.log(`Processing: ${doc.source}`);
    const chunks = splitTextIntoChunks(doc.content);
    console.log(`  - Split into ${chunks.length} chunks`);

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];

      try {
        // Add delay to avoid rate limiting
        if (totalChunks > 0) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        const embedding = await generateEmbedding(chunk);

        vectorStore.push({
          id: `${doc.source}-${i}`,
          source: doc.source,
          text: chunk,
          embedding: embedding,
        });

        totalChunks++;
        process.stdout.write(`  - Embedded chunk ${i + 1}/${chunks.length}\r`);
      } catch (error) {
        console.error(`\n  Error embedding chunk ${i + 1}: ${error.message}`);
      }
    }
    console.log(); // New line after processing each file
  }

  // Save to file
  console.log(`\nSaving ${totalChunks} chunks to ${CONFIG.outputPath}...`);
  fs.writeFileSync(CONFIG.outputPath, JSON.stringify(vectorStore, null, 2));

  console.log('\nIngestion complete!');
  console.log(`Total chunks: ${totalChunks}`);
  console.log(`Output file: ${CONFIG.outputPath}`);
}

// Run the ingestion
ingest().catch(console.error);
