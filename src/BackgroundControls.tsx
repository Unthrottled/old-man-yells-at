import { Card, Button, Slider } from "antd";
import { useBoundStore } from "./store/index.ts";

function BackgroundControls() {
  const status = useBoundStore((state) => state.status);
  const backgroundImage = useBoundStore((state) => state.backgroundImage);
  const selectBackground = useBoundStore((state) => state.selectBackground);
  const updateBackgroundSize = useBoundStore((state) => state.updateBackgroundSize);

  if (!backgroundImage) {
    return (
      <Card
        size="small"
        title="📷 Background Image"
        className="mb-2"
      >
        <div className="text-center text-gray-500 py-4">
          Upload an image to get started
        </div>
      </Card>
    );
  }

  const handleSizeChange = (scale: number) => {
    const newSize = {
      width: Math.round(backgroundImage.size.width * (scale / 100)),
      height: Math.round(backgroundImage.size.height * (scale / 100)),
    };
    updateBackgroundSize(newSize);
  };

  const currentScale = 100; // For now, we'll calculate this later

  return (
    <Card
      size="small"
      title="📷 Background Image"
      className="mb-2"
    >
      <div className="space-y-3">
        <div>
          <Button
            size="small"
            onClick={selectBackground}
            disabled={status !== "READY"}
            type={backgroundImage.isSelected ? "primary" : "default"}
            block
          >
            {backgroundImage.isSelected ? "✓ Selected" : "Select to Resize"}
          </Button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Size: {backgroundImage.size.width} × {backgroundImage.size.height}
          </label>
          <Slider
            min={25}
            max={200}
            value={currentScale}
            onChange={handleSizeChange}
            disabled={status !== "READY" || !backgroundImage.isSelected}
            tooltip={{
              formatter: (value) => `${value}%`
            }}
          />
          <div className="text-xs text-gray-500 mt-1">
            Drag the image to position it behind the old man
          </div>
        </div>
      </div>
    </Card>
  );
}

export default BackgroundControls;
