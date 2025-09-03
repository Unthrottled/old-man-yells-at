import { PlusCircleOutlined } from "@ant-design/icons";
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
import { Alert, Button, Card } from "antd";

import SortableOldManItem from "./SortableOldManItem.tsx";
import { useBoundStore } from "./store/index.ts";

function SortableOldMenList() {
  const status = useBoundStore((state) => state.status);
  const oldMenList = useBoundStore((state) => state.oldMenList);
  const addDefaultOldMan = useBoundStore((state) => state.addDefault);
  const reorderOldMen = useBoundStore((state) => state.reorder);

  function renderOldManItem(oldMan: OldMan) {
    return <SortableOldManItem key={oldMan.id} oldMan={oldMan} />;
  }

  function handleOldManItemDragEnd({ active, over }: DragEndEvent) {
    const oldId = active.id as nanoId;
    const newId = over?.id as nanoId;
    reorderOldMen(oldId, newId);
  }

  const cardStyles = {
    body: {
      padding: 0,
    },
  };

  return (
    <Card
      className="mt-2"
      size="small"
      title="Old Men"
      styles={cardStyles}
      loading={status === "DETECTING"}
      extra={
        <Button
          size="small"
          icon={<PlusCircleOutlined />}
          disabled={status !== "READY"}
          onClick={addDefaultOldMan}
        >
          Add
        </Button>
      }
    >
      <DndContext
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        collisionDetection={closestCenter}
        onDragEnd={handleOldManItemDragEnd}
      >
        <SortableContext
          items={oldMenList}
          strategy={verticalListSortingStrategy}
        >
          <ul>
            {oldMenList.map(renderOldManItem)}
            {oldMenList.length === 0 && (
              <Alert
                className="rounded-b-md"
                banner
                message="No old men!?"
                description="How can anyone yell at anything without at least one grumpy old man? Add one now!"
                type="warning"
                action={
                  <Button
                    size="small"
                    icon={<PlusCircleOutlined />}
                    onClick={addDefaultOldMan}
                  >
                    Add
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

export default SortableOldMenList;
