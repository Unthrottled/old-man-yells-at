import { Card, Select, Slider, Button, Tooltip } from "antd";
import { useState } from "react";
import { OLD_MAN_EXPRESSIONS, getRandomPhrase } from "./lib/static-old-man.ts";
import { useBoundStore } from "./store/index.ts";

function StaticOldManControls() {
  const [currentPhrase, setCurrentPhrase] = useState("");
  
  const status = useBoundStore((state) => state.status);
  const staticOldMan = useBoundStore((state) => state.staticOldMan);
  const targetImages = useBoundStore((state) => state.targetImages);
  const updateExpression = useBoundStore((state) => state.updateExpression);
  const updateYellingIntensity = useBoundStore((state) => state.updateYellingIntensity);
  const updatePosition = useBoundStore((state) => state.updatePosition);

  const expressionOptions = Object.entries(OLD_MAN_EXPRESSIONS).map(([key, value]) => ({
    label: (
      <Tooltip title={value.description} placement="right">
        <span>{value.label}</span>
      </Tooltip>
    ),
    value: key,
  }));

  const positionOptions = [
    { label: "👈 Left", value: "left" },
    { label: "🎯 Center", value: "center" },
    { label: "👉 Right", value: "right" },
  ];

  const handleExpressionChange = (expression: string) => {
    updateExpression(expression);
    // Auto-adjust intensity based on expression
    const expressionData = OLD_MAN_EXPRESSIONS[expression as keyof typeof OLD_MAN_EXPRESSIONS];
    if (expressionData) {
      updateYellingIntensity(expressionData.intensity);
    }
    // Generate a random phrase
    setCurrentPhrase(getRandomPhrase(expression));
  };

  const generateRandomPhrase = () => {
    setCurrentPhrase(getRandomPhrase(staticOldMan.expression));
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity <= 3) return "#52c41a"; // Green
    if (intensity <= 6) return "#faad14"; // Orange  
    if (intensity <= 8) return "#fa8c16"; // Dark orange
    return "#f5222d"; // Red
  };

  const getIntensityLabel = (intensity: number) => {
    if (intensity <= 3) return "Mildly annoyed";
    if (intensity <= 6) return "Getting upset";
    if (intensity <= 8) return "Really angry";
    return "MAXIMUM RAGE";
  };

  return (
    <Card
      size="small"
      title="👴 Old Man Configuration"
      className="mb-2"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Expression</label>
          <Select
            size="small"
            value={staticOldMan.expression}
            options={expressionOptions}
            onChange={handleExpressionChange}
            disabled={status !== "READY"}
            className="w-full"
          />
          {currentPhrase && (
            <div className="mt-2 p-2 bg-gray-50 rounded text-sm italic text-center">
              "{currentPhrase}"
              <Button 
                size="small" 
                type="text" 
                onClick={generateRandomPhrase}
                className="ml-2 text-xs"
              >
                🎲
              </Button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Position</label>
          <Select
            size="small"
            value={staticOldMan.position}
            options={positionOptions}
            onChange={updatePosition}
            disabled={status !== "READY"}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">
            {targetImages.length > 0 
              ? `Yelling at ${targetImages.length} target${targetImages.length > 1 ? 's' : ''}`
              : "Add targets to yell at!"
            }
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            <span>Yelling Intensity: </span>
            <span style={{ color: getIntensityColor(staticOldMan.yellingIntensity) }}>
              {staticOldMan.yellingIntensity}/10
            </span>
            <span className="text-xs text-gray-500 ml-2">
              ({getIntensityLabel(staticOldMan.yellingIntensity)})
            </span>
          </label>
          <Slider
            min={1}
            max={10}
            value={staticOldMan.yellingIntensity}
            onChange={updateYellingIntensity}
            disabled={status !== "READY"}
            tooltip={{
              formatter: (value) => `${value}/10 - ${getIntensityLabel(value || 1)}`
            }}
            styles={{
              track: {
                backgroundColor: getIntensityColor(staticOldMan.yellingIntensity),
              },
              handle: {
                borderColor: getIntensityColor(staticOldMan.yellingIntensity),
              }
            }}
          />
        </div>
      </div>
    </Card>
  );
}

export default StaticOldManControls;
