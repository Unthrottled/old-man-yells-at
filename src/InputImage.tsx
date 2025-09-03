import { closestCenter, DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { Button } from "antd";

import DraggableBackground from "./DraggableBackground.tsx";
import StaticOldMan from "./StaticOldMan.tsx";
import { useBoundStore } from "./store/index.ts";

interface InputImageProps {
  inputImageRef: React.RefObject<HTMLImageElement>;
}

function InputImage({ inputImageRef }: InputImageProps) {
  const status = useBoundStore((state) => state.status);
  const goBackToStart = useBoundStore((state) => state.goBackToStart);
  const updateBackgroundCoordinates = useBoundStore((state) => state.updateBackgroundCoordinates);
  const selectBackground = useBoundStore((state) => state.selectBackground);

  function handleRemoveInputImage() {
    goBackToStart();
  }

  function handleDragEnd({ delta, active }: DragEndEvent) {
    if (active.id === "background-image") {
      updateBackgroundCoordinates(delta);
    }
  }

  function handleBackgroundClick() {
    selectBackground();
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement]}
      collisionDetection={closestCenter}
    >
      <div className="flex flex-col gap-2 items-center">
        <div 
          className="relative select-none bg-gray-100 rounded-lg border-2 border-dashed border-gray-300"
          style={{
            width: "600px",
            height: "400px",
            overflow: "hidden",
          }}
          onClick={handleBackgroundClick}
        >
          <DraggableBackground inputImageRef={inputImageRef} />
          <StaticOldMan 
            canvasWidth={600}
            canvasHeight={400}
          />
        </div>
        <div className="flex justify-between w-full">
          <Button
            size="small"
            disabled={status !== "READY"}
            onClick={handleRemoveInputImage}
          >
            Remove Image
          </Button>
        </div>
      </div>
    </DndContext>
  );
}

export default InputImage;
