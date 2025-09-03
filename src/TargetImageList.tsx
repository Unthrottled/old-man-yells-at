import { PlusCircleOutlined, BulbOutlined } from "@ant-design/icons";
import { closestCenter, DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Alert, Button, Card, Input, Tag } from "antd";
import { useState } from "react";

import TargetImageItem from "./TargetImageItem.tsx";
import { useBoundStore } from "./store/index.ts";
import { getContextualExpression } from "./lib/static-old-man.ts";

function TargetImageList() {
  const [yellingAtText, setYellingAtText] = useState("");
  
  const status = useBoundStore((state) => state.status);
  const targetImages = useBoundStore((state) => state.targetImages);
  const staticOldMan = useBoundStore((state) => state.staticOldMan);
  const addDefaultTarget = useBoundStore((state) => state.addDefault);
  const reorderTargets = useBoundStore((state) => state.reorder);
  const updateExpression = useBoundStore((state) => state.updateExpression);

  function renderTargetImageItem(targetImage: TargetImage) {
    return <TargetImageItem key={targetImage.id} targetImage={targetImage} />;
  }

  function handleTargetItemDragEnd({ active, over }: DragEndEvent) {
    const oldId = active.id as nanoId;
    const newId = over?.id as nanoId;
    reorderTargets(oldId, newId);
  }

  const handleSmartSuggestion = () => {
    if (targetImages.length > 0) {
      const firstTarget = targetImages[0];
      const suggestedExpression = getContextualExpression(firstTarget.label || "");
      updateExpression(suggestedExpression);
    }
  };

  const getYellingPhrase = () => {
    if (!yellingAtText) return "";
    
    const intensity = staticOldMan.yellingIntensity;
    if (intensity <= 3) return `"Hmph, ${yellingAtText}..."`;
    if (intensity <= 6) return `"Get away from here, ${yellingAtText}!"`;
    if (intensity <= 8) return `"I'VE HAD IT WITH ${yellingAtText.toUpperCase()}!"`;
    return `"ABSOLUTELY NOT, ${yellingAtText.toUpperCase()}! GET OFF MY LAWN!"`;
  };

  const cardStyles = {
    body: {
      padding: 0,
    },
  };

  return (
    <Card
      className="mt-2"
      size="small"
      title={
        <div className="flex items-center gap-2">
          <span>🎯 Target Images</span>
          {targetImages.length > 0 && (
            <Tag color="blue">{targetImages.length}</Tag>
          )}
        </div>
      }
      styles={cardStyles}
      loading={status === "DETECTING"}
      extra={
        <div className="flex gap-1">
          {targetImages.length > 0 && (
            <Button
              size="small"
              icon={<BulbOutlined />}
              onClick={handleSmartSuggestion}
              disabled={status !== "READY"}
              title="Smart expression suggestion"
            >
              Auto
            </Button>
          )}
          <Button
            size="small"
            icon={<PlusCircleOutlined />}
            disabled={status !== "READY"}
            onClick={addDefaultTarget}
          >
            Add
          </Button>
        </div>
      }
    >
      <div className="p-3 border-b bg-gray-50">
        <Input
          placeholder="What is the old man yelling at?"
          value={yellingAtText}
          onChange={(e) => setYellingAtText(e.target.value)}
          disabled={status !== "READY"}
          className="text-center font-medium mb-2"
        />
        {yellingAtText && (
          <div className="text-center text-sm text-gray-700 font-medium bg-white p-2 rounded border">
            {getYellingPhrase()}
          </div>
        )}
      </div>
      
      <DndContext
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        collisionDetection={closestCenter}
        onDragEnd={handleTargetItemDragEnd}
      >
        <SortableContext
          items={targetImages}
          strategy={verticalListSortingStrategy}
        >
          <ul>
            {targetImages.map(renderTargetImageItem)}
            {targetImages.length === 0 && (
              <Alert
                className="rounded-b-md"
                banner
                message="🎯 No targets to yell at!"
                description="The old man needs something to yell at! Try a preset scenario or add targets manually."
                type="warning"
                action={
                  <Button
                    size="small"
                    icon={<PlusCircleOutlined />}
                    onClick={addDefaultTarget}
                  >
                    Add Target
                  </Button>
                }
              />
            )}
          </ul>
        </SortableContext>
      </DndContext>
    </Card>
  );
}

export default TargetImageList;
