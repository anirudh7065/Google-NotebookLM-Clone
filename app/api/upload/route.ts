import { getEmbedding } from "@/lib/embedding";
import {
  addChunksToMemory,
  clearMemoryChunks,
} from "@/lib/store";
import extractChunksFromPDF from "@/lib/pdf";
import { Buffer } from "buffer";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Get file
    const formData = await request.formData();
    const file = formData.get("File") as File;

    // Check file
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Reset old memory
    clearMemoryChunks();

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const tempDir = path.join(process.cwd(), "temp");
    const filePath = path.join(tempDir, "file.pdf");
    await mkdir(tempDir, { recursive: true });
    await writeFile(filePath, buffer);

    // Extract chunks
    const chunks = await extractChunksFromPDF(filePath) || [];
    for (const chunk of chunks) {
      const embedding = await getEmbedding(chunk.text);
      if (!embedding || embedding.length === 0) {
        continue;
      }
      // Add to memory
      addChunksToMemory({ id: chunk.id, content: chunk.text, embedding });
    }


    return NextResponse.json({ message: "File uploaded & embedded!" }, { status: 200 });
  } catch (err: any) {
    console.error("UPLOAD ROUTE ERROR:", err);

    return NextResponse.json(
      { error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
