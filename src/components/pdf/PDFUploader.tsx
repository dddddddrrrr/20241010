import React, { useState } from "react";
import { pdfjs } from "react-pdf";

interface PDFUploaderProps {
  onFileUpload: (file: File, numPages: number) => void;
}

const PDFUploader: React.FC<PDFUploaderProps> = ({ onFileUpload }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      onFileUpload(file, pdf.numPages);
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
      {!fileName && (
        <label htmlFor="pdf-upload" className="cursor-pointer">
          <div className="flex h-[400px] w-[300px] flex-col items-center justify-center rounded-md border border-dashed bg-white p-4 dark:bg-black">
            <p className="text-sm">Click to upload or drag and drop</p>
          </div>
        </label>
      )}
    </div>
  );
};

export default PDFUploader;
