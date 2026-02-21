"use client";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf.mjs";
import { useEffect, useRef } from "react";

GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";

export default function PdfViewer({ file }: { file: File }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const hasRendered = useRef(false);

    useEffect(() => {
        if (!file || file.size === 0) return;
<<<<<<< HEAD
        if (hasRendered.current) return; 

        hasRendered.current = true; 
=======
        if (hasRendered.current) return; // ✅ Block the 2nd render in StrictMode

        hasRendered.current = true; // mark as rendered before starting
>>>>>>> 3909b27 (Initial Commit)
        const container = containerRef.current;
        if (!container) return;

        const renderPDF = async () => {
<<<<<<< HEAD
            container.innerHTML = ""; 

            // Render PDF
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await getDocument({ data: arrayBuffer }).promise;

            // Render each page
            for (let i = 1; i <= pdf.numPages; i++) {
                // Render page
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 1.2 });

                // Create canvas
=======
            container.innerHTML = ""; // clear previous renders

            const arrayBuffer = await file.arrayBuffer();
            const pdf = await getDocument({ data: arrayBuffer }).promise;

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 1.2 });

>>>>>>> 3909b27 (Initial Commit)
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d")!;
                canvas.height = viewport.height;
                canvas.width = viewport.width;

<<<<<<< HEAD
                // Render page
                await page.render({ canvasContext: context, viewport,canvas }).promise;

                // Add canvas to container
=======
                await page.render({ canvasContext: context, viewport }).promise;

>>>>>>> 3909b27 (Initial Commit)
                canvas.id = `page_${i}`;
                container.appendChild(canvas);
            }
        };
<<<<<<< HEAD
        // Render PDF
=======

>>>>>>> 3909b27 (Initial Commit)
        renderPDF();

        return () => {
            // Clear on unmount
            if (container) container.innerHTML = "";
        };
    }, [file]);

    return (
<<<<<<< HEAD
        // Render PDF
=======
>>>>>>> 3909b27 (Initial Commit)
        <div
            ref={containerRef}
            className="pdf-container overflow-auto h-full shadow-xl"
        />
    );
}
