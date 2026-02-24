declare module "pdf-parse/lib/pdf-parse.js" {
  export interface PDFData {
    // Define the properties and methods of the PDFData interface here
    text: string;
    // Add more properties and methods as needed
  }

  export default function parse(buffer: Buffer): PDFData;
}
