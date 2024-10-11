"use client";

import { useState, useCallback } from "react";
import PDFUploader from "~/components/pdf/PDFUploader";
import PDFViewer from "~/components/pdf/PDFViewer";
import PDFControls from "~/components/pdf/PDFControls";
import DownloadButton from "~/components/DownloadButton";

const Home = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [rotations, setRotations] = useState<number[]>([]);
  const [scale, setScale] = useState(0.3);
  const [numPages, setNumPages] = useState<number>(0);

  const handleFileUpload = (file: File, pages: number) => {
    setPdfFile(file);
    setRotations(Array(pages).fill(0));
    setScale(0.3);
    setNumPages(pages);
  };

  const handleRotation = useCallback((pageIndex: number, degrees: number) => {
    setRotations((prevRotations) => {
      const newRotations = [...prevRotations];
      newRotations[pageIndex] = (newRotations[pageIndex] ?? 0) + degrees;
      return newRotations;
    });
  }, []);

  const handleRotateAll = useCallback(
    (degrees: number) => {
      setRotations((prevRotations) => {
        const newRotations = Array(numPages)
          .fill(0)
          .map((_, index) => (prevRotations[index] ?? 0) + degrees);
        return newRotations;
      });
    },
    [numPages],
  );

  const handleRemovePDF = useCallback(() => {
    setPdfFile(null);
    setRotations([]);
    setScale(0.3);
  }, []);

  const handleZoom = useCallback((factor: number) => {
    setScale((prevScale) => Math.max(0.1, Math.min(3, prevScale + factor)));
  }, []);

  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">Rotate PDF Pages</h1>
      <p className="mb-8 mt-2 text-muted-foreground">
        Simply click on a page to rotate it. You can then download your modified
        PDF.
      </p>
      {!pdfFile ? (
        <PDFUploader onFileUpload={handleFileUpload} />
      ) : (
        <div className="w-full max-w-3xl">
          <PDFControls
            onRotateAll={handleRotateAll}
            onRemovePDF={handleRemovePDF}
            onZoomIn={() => handleZoom(0.1)}
            onZoomOut={() => handleZoom(-0.1)}
          />
          <PDFViewer
            file={pdfFile}
            rotations={rotations}
            onRotate={handleRotation}
            scale={scale}
          />
        </div>
      )}
      {pdfFile && <DownloadButton file={pdfFile} rotations={rotations} />}
    </div>
  );
};

export default Home;
