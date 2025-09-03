import { getOldManImageUrl, getOldManPosition } from "./lib/static-old-man.ts";
import { useBoundStore } from "./store/index.ts";

interface StaticOldManProps {
  canvasWidth: number;
  canvasHeight: number;
}

function StaticOldMan({ canvasWidth }: StaticOldManProps) {
  const staticOldMan = useBoundStore((state) => state.staticOldMan);
  const targetImages = useBoundStore((state) => state.targetImages);
  
  const position = getOldManPosition(staticOldMan.position, canvasWidth);
  
  // Calculate yelling lines to targets
  const renderYellingLines = () => {
    if (targetImages.length === 0) return null;
    
    const oldManCenterX = position.x + staticOldMan.size.width / 2;
    const oldManCenterY = position.y + staticOldMan.size.height / 2;
    
    return targetImages.map((target) => {
      const targetCenterX = target.coordinates.x + target.size.width / 2;
      const targetCenterY = target.coordinates.y + target.size.height / 2;
      
      return (
        <svg
          key={target.id}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 8,
          }}
        >
          <defs>
            <marker
              id={`arrowhead-${target.id}`}
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="#ff6b6b"
                opacity="0.7"
              />
            </marker>
          </defs>
          <line
            x1={oldManCenterX}
            y1={oldManCenterY}
            x2={targetCenterX}
            y2={targetCenterY}
            stroke="#ff6b6b"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.7"
            markerEnd={`url(#arrowhead-${target.id})`}
          />
        </svg>
      );
    });
  };
  
  return (
    <>
      {renderYellingLines()}
      <div
        style={{
          position: "absolute",
          left: position.x,
          top: position.y,
          width: staticOldMan.size.width,
          height: staticOldMan.size.height,
          zIndex: 10, // Always on top
          pointerEvents: "none", // Don't interfere with target dragging
        }}
        className="select-none"
      >
        <img
          src={getOldManImageUrl()}
          alt="Old Man Yelling"
          className="w-full h-full object-contain drop-shadow-lg"
          draggable={false}
        />
        
        {/* Intensity indicator */}
        {staticOldMan.yellingIntensity > 7 && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-2xl animate-bounce">
            💢
          </div>
        )}
      </div>
    </>
  );
}

export default StaticOldMan;
