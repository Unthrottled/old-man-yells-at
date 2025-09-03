import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import { getFlipTransform } from "./lib/utils.ts";
import ResizeHandle from "./ResizeHandle.tsx";

interface DraggableTargetProps {
  targetImage: TargetImage;
}

function DraggableTarget({ targetImage }: DraggableTargetProps) {
  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    transform,
  } = useDraggable({
    id: targetImage.id,
  });

  const isDragging = !!transform;

  const flipTransform = getFlipTransform({
    flipHorizontally: targetImage.flipHorizontally,
    flipVertically: targetImage.flipVertically,
  });

  return (
    <div
      ref={setDraggableRef}
      style={{
        position: "absolute",
        left: targetImage.coordinates.x,
        top: targetImage.coordinates.y,
        width: targetImage.size.width,
        height: targetImage.size.height,
        cursor: isDragging ? "grabbing" : "grab",
        zIndex: targetImage.isSelected ? 5 : isDragging ? 6 : 1,
        transform: `${CSS.Translate.toString(transform)} ${flipTransform}`,
        opacity: isDragging ? 0.8 : 1,
        transition: isDragging ? "none" : "all 0.2s ease",
      }}
      {...listeners}
      {...attributes}
      className={`select-none ${
        targetImage.isSelected 
          ? "ring-2 ring-blue-500 shadow-lg" 
          : "hover:ring-1 hover:ring-gray-300"
      } ${isDragging ? "shadow-2xl" : ""}`}
    >
      <img
        src={targetImage.imageUrl}
        alt={targetImage.label || "Target"}
        className="w-full h-full object-contain pointer-events-none"
        draggable={false}
      />
      
      {targetImage.isSelected && !isDragging && (
        <ResizeHandle item={targetImage} />
      )}
      
      {targetImage.label && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-black bg-opacity-75 text-white px-2 py-1 rounded whitespace-nowrap">
          {targetImage.label}
        </div>
      )}
      
      {/* Drag indicator */}
      {isDragging && (
        <div className="absolute inset-0 border-2 border-dashed border-blue-400 bg-blue-100 bg-opacity-30 rounded flex items-center justify-center">
          <span className="text-blue-600 font-medium">📍</span>
        </div>
      )}
    </div>
  );
}

export default DraggableTarget;
