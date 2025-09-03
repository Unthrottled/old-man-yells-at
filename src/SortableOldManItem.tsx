import { DeleteOutlined, EyeOutlined, HolderOutlined } from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Select, Slider } from "antd";

import oldManImageUrl from "./assets/old-man-yells-at.png";
import FlipH from "./icons/FlipH.tsx";
import FlipV from "./icons/FlipV.tsx";
import { useBoundStore } from "./store/index.ts";
import { OLD_MAN_EXPRESSIONS } from "./lib/old-man.ts";

interface SortableOldManItemProps {
  oldMan: OldMan;
}

function SortableOldManItem({ oldMan }: SortableOldManItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: oldMan.id });

  const status = useBoundStore((state) => state.status);
  const flipOldMan = useBoundStore((state) => state.flip);
  const removeOldMan = useBoundStore((state) => state.remove);
  const selectOldMan = useBoundStore((state) => state.select);
  const updateOldManDirection = useBoundStore((state) => state.updateDirection);
  const updateOldManExpression = useBoundStore((state) => state.updateExpression);
  const updateYellingIntensity = useBoundStore((state) => state.updateYellingIntensity);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const expressionOptions = Object.entries(OLD_MAN_EXPRESSIONS).map(([key, value]) => ({
    label: value.label,
    value: key,
  }));

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
        oldMan.isSelected ? "bg-blue-50 dark:bg-blue-900/20" : ""
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
        src={oldManImageUrl}
        alt="Old Man"
        className="w-8 h-8 object-contain"
      />

      <div className="flex-1 space-y-2">
        <div className="flex gap-2">
          <Select
            size="small"
            value={oldMan.expression}
            options={expressionOptions}
            onChange={(value) => updateOldManExpression(oldMan.id, value)}
            disabled={status !== "READY"}
            className="w-24"
          />
          
          <Select
            size="small"
            value={oldMan.direction}
            options={directionOptions}
            onChange={(value) => updateOldManDirection(oldMan.id, value)}
            disabled={status !== "READY"}
            className="w-16"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs">Intensity:</span>
          <Slider
            min={1}
            max={10}
            value={oldMan.yellingIntensity}
            onChange={(value) => updateYellingIntensity(oldMan.id, value)}
            disabled={status !== "READY"}
            className="flex-1"
          />
          <span className="text-xs w-4">{oldMan.yellingIntensity}</span>
        </div>
      </div>

      <div className="flex gap-1">
        <Button
          type="text"
          size="small"
          icon={<FlipH />}
          onClick={() => flipOldMan(oldMan.id, "flipHorizontally")}
          disabled={status !== "READY"}
          className={oldMan.flipHorizontally ? "bg-blue-100 dark:bg-blue-800" : ""}
        />
        
        <Button
          type="text"
          size="small"
          icon={<FlipV />}
          onClick={() => flipOldMan(oldMan.id, "flipVertically")}
          disabled={status !== "READY"}
          className={oldMan.flipVertically ? "bg-blue-100 dark:bg-blue-800" : ""}
        />
        
        <Button
          type="text"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => selectOldMan(oldMan.id)}
          disabled={status !== "READY"}
          className={oldMan.isSelected ? "bg-blue-100 dark:bg-blue-800" : ""}
        />
        
        <Button
          type="text"
          size="small"
          danger
          icon={<DeleteOutlined />}
          onClick={() => removeOldMan(oldMan.id)}
          disabled={status !== "READY"}
        />
      </div>
    </li>
  );
}

export default SortableOldManItem;
