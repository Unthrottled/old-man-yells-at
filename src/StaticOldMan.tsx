import { getOldManImageUrl, getOldManPosition } from "./lib/static-old-man.ts";
import { useBoundStore } from "./store/index.ts";

interface StaticOldManProps {
  canvasWidth: number;
  canvasHeight: number;
}

function StaticOldMan({ canvasWidth, canvasHeight }: StaticOldManProps) {
  const staticOldMan = useBoundStore((state) => state.staticOldMan);
  const backgroundImage = useBoundStore((state) => state.backgroundImage);
  
  const position = getOldManPosition(staticOldMan.position, canvasWidth, canvasHeight);
  
  return (
    <>
      {/* Yelling line to background image */}
      {backgroundImage && (
        <svg
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
              id="arrowhead-bg"
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
            x1={position.x + staticOldMan.size.width / 2}
            y1={position.y + staticOldMan.size.height / 2}
            x2={backgroundImage.coordinates.x + backgroundImage.size.width / 2}
            y2={backgroundImage.coordinates.y + backgroundImage.size.height / 2}
            stroke="#ff6b6b"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.7"
            markerEnd="url(#arrowhead-bg)"
          />
        </svg>
      )}
      
      {/* Old man image */}
      <div
        style={{
          position: "absolute",
          left: position.x,
          top: position.y,
          width: staticOldMan.size.width,
          height: staticOldMan.size.height,
          zIndex: 10, // Always on top
          pointerEvents: "none", // Don't interfere with background dragging
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
