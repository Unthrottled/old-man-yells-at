import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useBoundStore } from "./store/index.ts";
import ResizeHandle from "./ResizeHandle.tsx";

interface DraggableBackgroundProps {
  inputImageRef: React.RefObject<HTMLImageElement>;
}

function DraggableBackground({ inputImageRef }: DraggableBackgroundProps) {
  const backgroundImage = useBoundStore((state) => state.backgroundImage);
  const inputImageDataUrl = useBoundStore((state) => state.inputImageDataUrl);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id: "background-image",
  });

  const isDragging = !!transform;

  if (!inputImageDataUrl || !backgroundImage) return null;

  return (
    <div
      ref={setNodeRef}
      style={{
        position: "absolute",
        left: backgroundImage.coordinates.x,
        top: backgroundImage.coordinates.y,
        width: backgroundImage.size.width,
        height: backgroundImage.size.height,
        cursor: isDragging ? "grabbing" : "grab",
        zIndex: 1, // Behind old man
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.8 : 1,
        transition: isDragging ? "none" : "all 0.2s ease",
      }}
      {...listeners}
      {...attributes}
      className={`select-none ${
        backgroundImage.isSelected 
          ? "ring-2 ring-blue-500 shadow-lg" 
          : "hover:ring-1 hover:ring-gray-300"
      } ${isDragging ? "shadow-2xl" : ""}`}
    >
      <img
        ref={inputImageRef}
        src={inputImageDataUrl}
        alt="Background"
        className="w-full h-full object-cover pointer-events-none rounded"
        draggable={false}
      />
      
      {backgroundImage.isSelected && !isDragging && (
        <ResizeHandle item={backgroundImage} />
      )}
      
      {/* Drag indicator */}
      {isDragging && (
        <div className="absolute inset-0 border-2 border-dashed border-blue-400 bg-blue-100 bg-opacity-30 rounded flex items-center justify-center">
          <span className="text-blue-600 font-medium text-lg">📷</span>
        </div>
      )}
    </div>
  );
}

export default DraggableBackground;
