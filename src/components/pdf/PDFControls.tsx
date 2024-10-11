import React from "react";
import { Button } from "~/components/ui/button";
import { RotateCw, Trash, ZoomIn, ZoomOut } from "lucide-react";

interface PDFControlsProps {
  onRotateAll: (degrees: number) => void;
  onRemovePDF: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const PDFControls: React.FC<PDFControlsProps> = ({
  onRotateAll,
  onRemovePDF,
  onZoomIn,
  onZoomOut,
}) => {
  return (
    <div className="mb-4 flex justify-center space-x-2">
      <Button onClick={() => onRotateAll(90)} className="flex items-center">
        <RotateCw className="mr-2 h-4 w-4" />
        Rotate All
      </Button>
      <Button
        onClick={onRemovePDF}
        variant="destructive"
        className="flex items-center"
      >
        <Trash className="mr-2 h-4 w-4" />
        Remove PDF
      </Button>
      <Button onClick={onZoomIn} className="flex items-center">
        <ZoomIn className="mr-2 h-4 w-4" />
        Zoom In
      </Button>
      <Button onClick={onZoomOut} className="flex items-center">
        <ZoomOut className="mr-2 h-4 w-4" />
        Zoom Out
      </Button>
    </div>
  );
};

export default PDFControls;
