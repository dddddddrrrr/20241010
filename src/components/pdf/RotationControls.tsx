import React from "react";
import { Button } from "~/components/ui/button";

interface RotationControlsProps {
  onRotate: (degrees: number) => void;
}

const RotationControls: React.FC<RotationControlsProps> = ({ onRotate }) => {
  return (
    <div className="mb-4 flex space-x-2">
      <Button onClick={() => onRotate(-90)}>Rotate Left</Button>
      <Button onClick={() => onRotate(90)}>Rotate Right</Button>
    </div>
  );
};

export default RotationControls;
