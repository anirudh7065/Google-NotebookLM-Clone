"use client";

import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf.mjs";
import { useEffect, useRef } from "react";

GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";

export default function PdfViewer({ file }: { file: File }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!file) return;

        const container = containerRef.current;
        if (!container) return;

        const renderPDF = async () => {
            container.innerHTML = "";

            const arrayBuffer = await file.arrayBuffer();
            const pdf = await getDocument({ data: arrayBuffer }).promise;

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);

                // Get container width
                const containerWidth = container.clientWidth;

                // Get original page viewport
                const viewport = page.getViewport({ scale: 1 });

                // Calculate scale to fit container width
                const scale = containerWidth / viewport.width;

                const scaledViewport = page.getViewport({ scale });

                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d")!;

                canvas.height = scaledViewport.height;
                canvas.width = scaledViewport.width;

                await page.render({
                    canvasContext: context,
                    viewport: scaledViewport,
                    canvas
                }).promise;

                canvas.style.width = "100%";
                canvas.style.height = "auto";
                canvas.id = `page_${i}`;

                container.appendChild(canvas);
            }
        };

        renderPDF();

        return () => {
            container.innerHTML = "";
        };
    }, [file]);

    return (
        <div
            ref={containerRef}
            className="w-full overflow-y-auto h-full shadow-xl"
        />
    );
}