import React from "react";
import { Button } from "~/components/ui/button";
import { PDFDocument, degrees } from "pdf-lib";

interface DownloadButtonProps {
  file: File;
  rotations: number[];
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ file, rotations }) => {
  const handleDownload = async () => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();

    pages.forEach((page, index) => {
      if (rotations[index]) {
        page.setRotation(degrees(rotations[index]));
      }
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "rotated_" + file.name;
    link.click();
  };

  return <Button onClick={handleDownload}>Download</Button>;
};

export default DownloadButton;
