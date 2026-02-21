<<<<<<< HEAD
// lib/embedding.ts

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function getEmbedding(text: string): Promise<number[]> {
  if (!text.trim()) {
    throw new Error("Empty text");
  }

  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: text,
  });

  const embedding = response.embeddings?.[0]?.values;

  if (!embedding) {
    throw new Error("Invalid embedding response");
  }

  return embedding;
=======
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "embedding-001" });

export async function getEmbedding(text: string): Promise<number[]> {
  try {
    const result = await model.embedContent(text);
    return result.embedding.values; // Gemini's embedding array
  } catch (err) {
    console.error("❌ Gemini embedding error:", err);
    return [];
  }
>>>>>>> 3909b27 (Initial Commit)
}
