import { getEmbedding } from "@/lib/embedding";
import { searchRelevantChunks } from "@/lib/search";
import { GoogleGenAI } from "@google/genai";
import { NextResponse,NextRequest } from "next/server";

export async function POST(req: NextRequest) {

  try {
    const body = await req.json();
    const { messages } = body;

    // checking for messages
    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided" },
        { status: 400 },
      );
    }

    // forming question
    const question = messages
      .map((m: { content: string }) => m.content)
      .join("\n");

    // embedding question
    const questionEmbedding = await getEmbedding(question);
    if (questionEmbedding.length === 0) {
            return NextResponse.json(
              { error: "No question embedding found!" },
              { status: 500 },
            );

    }

    // searching for relevant chunks
    const topChunks = await searchRelevantChunks(questionEmbedding);
    if (topChunks.length === 0) {
      return NextResponse.json(
        { error: "No relevant context found!" },
        { status: 200 },
      );
    }

    // generating answer
    const context = topChunks.map((chunk) => chunk.content).join("\n\n");
    const prompt = `
    You are a helpful assistant.
    Use the following context to answer the question:
      
    Context:
    ${context}
      
    Question:
    ${question}
    `;

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
    });
    const result = response?.text ;

    // returning answer
    return NextResponse.json({
      answer: result,
      page: topChunks[0]?.page,
    });
  } catch (err) {
    console.error(JSON.parse((err as Error)?.message)?.error?.message);
    return NextResponse.json(
      {
        error: "AI request limit reached. Please try again in a few seconds.",
        status: 429,
      },
      { status: 429 },
    );
  }
}
