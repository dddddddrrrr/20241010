"use client";

import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

interface PDFViewerProps {
  file: File | string;
  rotations: number[];
  onRotate: (pageIndex: number, degrees: number) => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ file, rotations, onRotate }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("File received in PDFViewer:", file);
  }, [file]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    console.log("PDF loaded successfully. Number of pages:", numPages);
    setNumPages(numPages);
    setError(null);
  }

  function onDocumentLoadError(error: Error) {
    console.error("Error loading PDF:", error);
    setError(error.message);
  }

  if (error) {
    return <div>Error loading PDF: {error}</div>;
  }

  return (
    <div>
      <Document
        file={file instanceof File ? URL.createObjectURL(file) : file}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading={<div>Loading PDF...</div>}
      >
        {numPages &&
          Array.from(new Array(numPages), (el, index) => (
            <div key={`page_${index + 1}`}>
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                rotate={rotations[index] || 0}
                error={<div>Error loading page {index + 1}</div>}
                loading={<div>Loading page {index + 1}...</div>}
              />
              <button onClick={() => onRotate(index, -90)}>Rotate Left</button>
              <button onClick={() => onRotate(index, 90)}>Rotate Right</button>
            </div>
          ))}
      </Document>
    </div>
  );
};

export default PDFViewer;
