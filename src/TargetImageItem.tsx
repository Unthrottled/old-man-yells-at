import { DeleteOutlined, EyeOutlined, HolderOutlined } from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Input, Select } from "antd";

import FlipH from "./icons/FlipH.tsx";
import FlipV from "./icons/FlipV.tsx";
import { useBoundStore } from "./store/index.ts";

interface TargetImageItemProps {
  targetImage: TargetImage;
}

function TargetImageItem({ targetImage }: TargetImageItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: targetImage.id });

  const status = useBoundStore((state) => state.status);
  const flipTarget = useBoundStore((state) => state.flip);
  const removeTarget = useBoundStore((state) => state.remove);
  const selectTarget = useBoundStore((state) => state.select);
  const updateTargetDirection = useBoundStore((state) => state.updateDirection);
  const updateTargetLabel = useBoundStore((state) => state.updateLabel);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const directionOptions = [
    { label: "↑", value: "up" },
    { label: "↓", value: "down" },
    { label: "→", value: "right" },
    { label: "←", value: "left" },
  ];

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 p-2 border-b ${
        targetImage.isSelected ? "bg-blue-50 dark:bg-blue-900/20" : ""
      }`}
    >
      <Button
        {...attributes}
        {...listeners}
        type="text"
        size="small"
        icon={<HolderOutlined />}
        disabled={status !== "READY"}
      />
      
      <img
        src={targetImage.imageUrl}
        alt={targetImage.label}
        className="w-8 h-8 object-contain"
      />

      <div className="flex-1 space-y-2">
        <div className="flex gap-2">
          <Input
            size="small"
            value={targetImage.label}
            onChange={(e) => updateTargetLabel(targetImage.id, e.target.value)}
            disabled={status !== "READY"}
            placeholder="What is this?"
            className="flex-1"
          />
          
          <Select
            size="small"
            value={targetImage.direction}
            options={directionOptions}
            onChange={(value) => updateTargetDirection(targetImage.id, value)}
            disabled={status !== "READY"}
            className="w-16"
          />
        </div>
      </div>

      <div className="flex gap-1">
        <Button
          type="text"
          size="small"
          icon={<FlipH />}
          onClick={() => flipTarget(targetImage.id, "flipHorizontally")}
          disabled={status !== "READY"}
          className={targetImage.flipHorizontally ? "bg-blue-100 dark:bg-blue-800" : ""}
        />
        
        <Button
          type="text"
          size="small"
          icon={<FlipV />}
          onClick={() => flipTarget(targetImage.id, "flipVertically")}
          disabled={status !== "READY"}
          className={targetImage.flipVertically ? "bg-blue-100 dark:bg-blue-800" : ""}
        />
        
        <Button
          type="text"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => selectTarget(targetImage.id)}
          disabled={status !== "READY"}
          className={targetImage.isSelected ? "bg-blue-100 dark:bg-blue-800" : ""}
        />
        
        <Button
          type="text"
          size="small"
          danger
          icon={<DeleteOutlined />}
          onClick={() => removeTarget(targetImage.id)}
          disabled={status !== "READY"}
        />
      </div>
    </li>
  );
}

export default TargetImageItem;
