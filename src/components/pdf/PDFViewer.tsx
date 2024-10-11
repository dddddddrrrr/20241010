"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { RotateCw } from "lucide-react";

interface PDFViewerProps {
  file: File | string;
  rotations: number[];
  onRotate: (pageIndex: number, degrees: number) => void;
  scale: number;
}

const PDFViewer: React.FC<PDFViewerProps> = ({
  file,
  rotations,
  onRotate,
  scale,
}) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageDimensions, setPageDimensions] = useState<
    { width: number; height: number }[]
  >([]);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let url: string | null = null;
    if (file instanceof File) {
      url = URL.createObjectURL(file);
      setFileUrl(url);
    } else {
      setFileUrl(file);
    }

    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
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

  useEffect(() => {
    pageRefs.current = pageRefs.current.slice(0, numPages || 0);
  }, [numPages]);

  const handleRotate = (index: number) => {
    onRotate(index, 90);
  };

  const onPageLoadSuccess = useCallback((page: any, index: number) => {
    const { width, height } = page.getViewport({ scale: 1 });
    setPageDimensions((prev) => {
      const newDimensions = [...prev];
      newDimensions[index] = { width, height };
      return newDimensions;
    });
  }, []);

  return (
    <div className="flex justify-center">
      <div
        className="relative w-[250px] overflow-auto p-4 sm:w-[500px] lg:w-[800px] 2xl:w-[1200px]"
        ref={containerRef}
      >
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={<div>Loading PDF...</div>}
        >
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {numPages &&
              Array.from(new Array(numPages), (el, index) => (
                <div
                  key={`page_${index + 1}`}
                  className="relative flex items-center justify-center"
                  style={{
                    aspectRatio: pageDimensions[index]
                      ? `${pageDimensions[index].width} / ${pageDimensions[index].height}`
                      : "1 / 1",
                  }}
                  ref={(el) => {
                    if (el) {
                      pageRefs.current[index] = el;
                    }
                  }}
                >
                  <div
                    className="absolute inset-0 m-auto flex items-center justify-center"
                    style={{
                      transform: `rotate(${rotations[index] || 0}deg)`,
                      transition: "transform 0.3s ease-in-out",
                    }}
                  >
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      rotate={0}
                      scale={scale}
                      onLoadSuccess={(page) => onPageLoadSuccess(page, index)}
                      error={<div>Error loading page {index + 1}</div>}
                      loading={<div>Loading page {index + 1}...</div>}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="absolute right-0 top-0 z-10 flex space-x-1">
                    <button
                      onClick={() => handleRotate(index)}
                      className="bg-white bg-opacity-50 p-1 transition-opacity hover:bg-opacity-75"
                    >
                      <RotateCw className="h-4 w-4 text-black" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </Document>
      </div>
    </div>
  );
};

export default PDFViewer;
