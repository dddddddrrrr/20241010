"use client";

import { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";

export default function PDFInitializer() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      const workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
      pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
      setIsInitialized(true);
      console.log("PDF.js worker initialized with:", workerSrc);
    }
  }, [isInitialized]);

  return null;
}
