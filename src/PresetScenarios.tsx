import { Button, Card } from "antd";
import { useBoundStore } from "./store/index.ts";

function PresetScenarios() {
  const status = useBoundStore((state) => state.status);
  const addTargetImage = useBoundStore((state) => state.addTargetImage);
  const updateExpression = useBoundStore((state) => state.updateExpression);
  const updateYellingIntensity = useBoundStore((state) => state.updateYellingIntensity);
  const updatePosition = useBoundStore((state) => state.updatePosition);

  const presets = [
    {
      name: "📱 Kids These Days",
      description: "Classic technology frustration",
      setup: () => {
        updateExpression("outraged");
        updateYellingIntensity(10);
        updatePosition("left");
        addTargetImage("/src/assets/targets/phone.png", "Smartphone");
        addTargetImage("/src/assets/targets/social-media.png", "Social Media");
      }
    },
    {
      name: "🌧️ Weather Woes", 
      description: "Angry about Mother Nature",
      setup: () => {
        updateExpression("furious");
        updateYellingIntensity(8);
        updatePosition("center");
        addTargetImage("/src/assets/targets/rain.png", "Rain");
        addTargetImage("/src/assets/targets/cloud.png", "Clouds");
      }
    },
    {
      name: "🏠 Neighborhood Nuisances",
      description: "Dealing with inconsiderate neighbors",
      setup: () => {
        updateExpression("angry");
        updateYellingIntensity(7);
        updatePosition("right");
        addTargetImage("/src/assets/targets/kids.png", "Neighborhood Kids");
        addTargetImage("/src/assets/targets/dog.png", "Barking Dog");
      }
    },
    {
      name: "🚗 Modern Annoyances",
      description: "Everything wrong with today",
      setup: () => {
        updateExpression("disappointed");
        updateYellingIntensity(6);
        updatePosition("left");
        addTargetImage("/src/assets/targets/electric-scooter.png", "E-Scooters");
        addTargetImage("/src/assets/targets/drone.png", "Drones");
        addTargetImage("/src/assets/targets/influencer.png", "Influencers");
      }
    },
    {
      name: "🐿️ Backyard Battles",
      description: "War against garden invaders",
      setup: () => {
        updateExpression("furious");
        updateYellingIntensity(9);
        updatePosition("center");
        addTargetImage("/src/assets/targets/squirrel.png", "Squirrels");
        addTargetImage("/src/assets/targets/deer.png", "Deer");
        addTargetImage("/src/assets/targets/raccoon.png", "Raccoons");
      }
    },
    {
      name: "💻 Technology Troubles",
      description: "When machines don't cooperate",
      setup: () => {
        updateExpression("outraged");
        updateYellingIntensity(10);
        updatePosition("left");
        addTargetImage("/src/assets/targets/computer.png", "Slow Computer");
        addTargetImage("/src/assets/targets/wifi.png", "Bad WiFi");
        addTargetImage("/src/assets/targets/robot.png", "Automation");
      }
    }
  ];

  return (
    <Card
      size="small"
      title="🎭 Quick Scenarios"
      className="mb-2"
    >
      <div className="grid grid-cols-1 gap-2">
        {presets.map((preset) => (
          <Button
            key={preset.name}
            size="small"
            disabled={status !== "READY"}
            onClick={preset.setup}
            className="text-left h-auto p-3 hover:bg-blue-50"
          >
            <div>
              <div className="font-medium text-sm">{preset.name}</div>
              <div className="text-xs text-gray-500 mt-1">{preset.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </Card>
  );
}

export default PresetScenarios;
