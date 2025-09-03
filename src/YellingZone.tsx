import { useBoundStore } from "./store/index.ts";
import { getOldManPosition } from "./lib/static-old-man.ts";

interface YellingZoneProps {
  canvasWidth: number;
  canvasHeight: number;
}

function YellingZone({ canvasWidth, canvasHeight }: YellingZoneProps) {
  const staticOldMan = useBoundStore((state) => state.staticOldMan);
  const targetImages = useBoundStore((state) => state.targetImages);
  
  const oldManPos = getOldManPosition(staticOldMan.position, canvasWidth);
  
  // Calculate yelling zone based on old man position
  const getYellingZone = () => {
    const padding = 50;
    const oldManWidth = staticOldMan.size.width;
    
    switch (staticOldMan.position) {
      case "left":
        return {
          x: oldManPos.x + oldManWidth + padding,
          y: padding,
          width: canvasWidth - oldManPos.x - oldManWidth - padding * 2,
          height: canvasHeight - padding * 2,
        };
      case "right":
        return {
          x: padding,
          y: padding,
          width: oldManPos.x - padding * 2,
          height: canvasHeight - padding * 2,
        };
      case "center":
        return {
          x: padding,
          y: oldManPos.y + staticOldMan.size.height + padding,
          width: canvasWidth - padding * 2,
          height: canvasHeight - oldManPos.y - staticOldMan.size.height - padding * 2,
        };
      default:
        return { x: 0, y: 0, width: 0, height: 0 };
    }
  };

  const zone = getYellingZone();
  
  // Only show zone when no targets are present
  if (targetImages.length > 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: zone.x,
        top: zone.y,
        width: zone.width,
        height: zone.height,
        border: "2px dashed #ff6b6b",
        backgroundColor: "rgba(255, 107, 107, 0.1)",
        borderRadius: "8px",
        pointerEvents: "none",
        zIndex: 2,
      }}
      className="flex items-center justify-center"
    >
      <div className="text-center text-red-500 font-medium bg-white bg-opacity-90 px-3 py-2 rounded">
        <div>📢 Yelling Zone</div>
        <div className="text-sm">Drag targets here!</div>
      </div>
    </div>
  );
}

export default YellingZone;
