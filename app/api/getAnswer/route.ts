import { getEmbedding } from "@/lib/embedding";
import { searchRelevantChunks } from "@/lib/search";
<<<<<<< HEAD
import { GoogleGenAI } from "@google/genai";
import { NextResponse,NextRequest } from "next/server";

export async function POST(req: NextRequest) {
=======
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
>>>>>>> 3909b27 (Initial Commit)
  try {
    const body = await req.json();
    const { messages } = body;

    // checking for messages
    if (!messages || messages.length === 0) {
      return new Response("No messages provided", { status: 400 });
    }

<<<<<<< HEAD
    // forming question
    const question = messages
      .map((m: { content: string }) => m.content)
      .join("\n");
=======
    // forming question 
    const question = messages
      .map((m: { content: string }) => m.content)
      .join("\n");
    console.log("🔹 Question received:", question);

>>>>>>> 3909b27 (Initial Commit)

    // embedding question
    const questionEmbedding = await getEmbedding(question);
    if (questionEmbedding.length === 0) {
      return new Response("No question embedding found!", { status: 400 });
    }

    // searching for relevant chunks
    const topChunks = await searchRelevantChunks(questionEmbedding);
    if (topChunks.length === 0) {
      return new Response("No relevant context found!", { status: 400 });
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

    // calling Gemini
<<<<<<< HEAD
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
    });
    const result = response?.text;

    // returning answer
    return NextResponse.json({
      answer: result,
    });
  } catch (err) {
    // error handling
    return new NextResponse(`Error processing question and erro is: ${err}`, {
      status: 500,
    });
=======
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    // returning answer
    return new Response(result.response.text(), {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (err) {
    // error handling
    return new Response(`Error processing question and erro is: ${err}`, { status: 500 });
>>>>>>> 3909b27 (Initial Commit)
  }
}
