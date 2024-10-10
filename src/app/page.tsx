"use client";

import { useState } from "react";
import PDFUploader from "~/components/pdf/PDFUploader";
import PDFViewer from "~/components/pdf/PDFViewer";
import DownloadButton from "~/components/DownloadButton";

const Home = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [rotations, setRotations] = useState<number[]>([]);

  const handleFileUpload = (file: File) => {
    setPdfFile(file);
    setRotations([]);
  };

  const handleRotation = (pageIndex: number, degrees: number) => {
    setRotations((prevRotations) => {
      const newRotations = [...prevRotations];
      newRotations[pageIndex] =
        ((newRotations[pageIndex] || 0) + degrees) % 360;
      return newRotations;
    });
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Rotate PDF</h1>
      <PDFUploader onFileUpload={handleFileUpload} />
      {pdfFile && (
        <>
          <PDFViewer
            file={pdfFile}
            rotations={rotations}
            onRotate={handleRotation}
          />
          <DownloadButton file={pdfFile} rotations={rotations} />
        </>
      )}
    </div>
  );
};

export default Home;
