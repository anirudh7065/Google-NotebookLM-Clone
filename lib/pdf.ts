import fs from "fs/promises";
import pdf from "pdf-parse/lib/pdf-parse.js";
export default async function extractChunksFromPDF(path: string) {
  // Read file
  const buffer = await fs.readFile(path);

  // Extract text
const data = await (pdf as any)(buffer);
  const text = data.text || "";

  // Simple chunking
  const chunkSize = 800;
  const chunks: { id: string; text: string }[] = [];

  for (let i = 0; i < text.length; i += chunkSize) {
    const chunkText = text.slice(i, i + chunkSize).trim();

    if (chunkText.length > 50) {
      chunks.push({
        id: `chunk_${i / chunkSize}`,
        text: chunkText,
      });
    }
  }

  return chunks;
}
