import { Button, Card, Tabs, Tooltip } from "antd";
import { TARGET_CATEGORIES, getTargetImageByCategory, getRandomTarget } from "./lib/target-image.ts";
import { useBoundStore } from "./store/index.ts";

function TargetImagePicker() {
  const status = useBoundStore((state) => state.status);
  const addTargetImage = useBoundStore((state) => state.addTargetImage);

  const handleAddTarget = (category: string, item: string) => {
    const targetImage = getTargetImageByCategory(category, item);
    addTargetImage(targetImage.imageUrl, targetImage.label);
  };

  const handleAddRandomTarget = () => {
    const randomTarget = getRandomTarget();
    addTargetImage(randomTarget.imageUrl, randomTarget.label);
  };

  const tabItems = Object.entries(TARGET_CATEGORIES).map(([key, category]) => ({
    key,
    label: category.label,
    children: (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {category.items.map((item) => (
            <Tooltip key={item.label} title={item.description} placement="top">
              <Button
                size="small"
                disabled={status !== "READY"}
                onClick={() => handleAddTarget(key, item.label)}
                className="flex flex-col items-center p-3 h-auto hover:bg-blue-50"
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.label}
                  className="w-8 h-8 object-contain mb-1"
                />
                <span className="text-xs font-medium">{item.label}</span>
                <span className="text-xs text-gray-400 text-center leading-tight">
                  {item.description}
                </span>
              </Button>
            </Tooltip>
          ))}
        </div>
      </div>
    ),
  }));

  return (
    <Card
      size="small"
      title="Add Target"
      className="mt-2"
      extra={
        <Button
          size="small"
          disabled={status !== "READY"}
          onClick={handleAddRandomTarget}
          className="text-xs"
        >
          🎲 Random
        </Button>
      }
    >
      <Tabs
        size="small"
        items={tabItems}
        defaultActiveKey="technology"
        tabPosition="top"
      />
    </Card>
  );
}

export default TargetImagePicker;
