import React from "react";
import { Button } from "~/components/ui/button";

interface PDFUploaderProps {
  onFileUpload: (file: File) => void;
}

const PDFUploader: React.FC<PDFUploaderProps> = ({ onFileUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      onFileUpload(file);
    }
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="hidden"
        id="pdf-upload"
      />
      <label htmlFor="pdf-upload" className="cursor-pointer">
        <Button asChild>
          <span>Upload PDF</span>
        </Button>
      </label>
    </div>
  );
};

export default PDFUploader;
