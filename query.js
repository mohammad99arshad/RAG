import * as dotenv from 'dotenv';
dotenv.config();

import readlineSync from 'readline-sync';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini client
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const History = [];

async function transformQuery(question) {
  History.push({ role: 'user', parts: [{ text: question }] });

  // ✅ systemInstruction goes here
  const model = ai.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `You are a query rewriting expert. 
    Based on the provided chat history, rephrase the "Follow Up user Question" 
    into a complete, standalone question. 
    Only output the rewritten question and nothing else.`,
  });

  const result = await model.generateContent({
    contents: History,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 256,
    },
  });

  History.pop();
  return result.response.text();
}

async function chatting(question) {
  const queries = await transformQuery(question);

  // embeddings
  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
    model: 'text-embedding-004',
  });

  const queryVector = await embeddings.embedQuery(queries);

  // pinecone
  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);

  const searchResults = await pineconeIndex.query({
    topK: 10,
    vector: queryVector,
    includeMetadata: true,
  });

  const context = searchResults.matches
    .map(match => match.metadata.text)
    .join("\n\n---\n\n");

  // push rewritten question to history
  History.push({
    role: 'user',
    parts: [{ text: queries }]
  });

  // ✅ systemInstruction also goes here
  const model = ai.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `You have to behave like a DBMS Expert.
    Answer ONLY from the provided context. 
    If the answer isn’t in the context, reply: "I could not find the answer in the provided document." 
    Keep answers concise and educational.`,
  });

  const result = await model.generateContent({
    contents: [
      ...History,
      { role: "user", parts: [{ text: `Context:\n${context}\n\nQuestion: ${queries}` }] }
    ],
    generationConfig: {
      temperature: 0.5,
      maxOutputTokens: 512,
    },
  });

  const answer = result.response.text();

  History.push({ role: 'model', parts: [{ text: answer }] });

  console.log("\n" + answer);
}

async function main() {
  while (true) {
    const userProblem = readlineSync.question("Ask me anything--> ");
    await chatting(userProblem);
  }
}

main();
