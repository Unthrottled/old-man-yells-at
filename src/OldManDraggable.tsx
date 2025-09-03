import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import { getFlipTransform } from "./lib/utils.ts";
import ResizeHandle from "./ResizeHandle.tsx";
import { useBoundStore } from "./store/index.ts";

interface OldManDraggableProps {
  oldMan: OldMan;
  inputImageRef: React.RefObject<HTMLImageElement>;
}

const MIN_WIDTH = 16;

function OldManDraggable({ oldMan }: OldManDraggableProps) {
  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    transform,
  } = useDraggable({
    id: oldMan.id,
  });

  const updateOldManSize = useBoundStore((state) => state.updateSize);

  const flipTransform = getFlipTransform(oldMan.flipHorizontally, oldMan.flipVertically);

  return (
    <div
      ref={setDraggableRef}
      style={{
        transform: CSS.Translate.toString(transform),
        position: "absolute",
        left: oldMan.coordinates.x,
        top: oldMan.coordinates.y,
        width: oldMan.size.width,
        height: oldMan.size.height,
        transform: flipTransform,
        cursor: "move",
        zIndex: oldMan.isSelected ? 10 : 1,
      }}
      {...listeners}
      {...attributes}
      className={`select-none ${oldMan.isSelected ? "ring-2 ring-blue-500" : ""}`}
    >
      <img
        src={oldMan.styleUrl}
        alt="Old Man Yelling"
        className="w-full h-full object-contain pointer-events-none"
        draggable={false}
      />
      
      {oldMan.isSelected && (
        <ResizeHandle item={oldMan} />
      )}
    </div>
  );
}

export default OldManDraggable;
