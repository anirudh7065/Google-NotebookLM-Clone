import fs from "fs/promises";
import {
  getDocument,
  GlobalWorkerOptions,
} from "pdfjs-dist/legacy/build/pdf.mjs";
import { TextItem, TextMarkedContent } from "pdfjs-dist/types/src/display/api";

GlobalWorkerOptions.workerSrc = "pdfjs-dist/legacy/build/pdf.worker.min.mjs";

export default async function extractChunksFromPDF(path: string) {
  const data = new Uint8Array(await fs.readFile(path));
  const loadingTask = getDocument({ data });
  const pdf = await loadingTask.promise;

  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    fullText += content.items
      .map((item: TextItem | TextMarkedContent) => {
        if ("str" in item) {
          return item.str;
        } else {
          return "";
        }
      })
      .join(" ");

    return fullText
      .split(/\n\s*\n/)
      .filter((chunk) => chunk.trim().length > 30)
      .map((text, idx) => ({ id: `chunk_${idx}`, text }));
  }
}
