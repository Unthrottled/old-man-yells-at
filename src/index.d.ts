type AppStatus =
  | "START"
  | "INPUT"
  | "LOADING"
  | "DETECTING"
  | "READY"
  | "GENERATING"
  | "DONE";

type AppMode = "NORMAL" | "HEDGEHOG";

type WithFlip = {
  flipHorizontally: boolean;
  flipVertically: boolean;
};

type ImageOptions = WithFlip;

type nanoId = string;

interface WithNanoId {
  id: nanoId;
}

type TargetImageDirection = "up" | "down" | "right" | "left";

type TargetImage = WithFlip &
  WithNanoId & {
    coordinates: Coordinates;
    direction: TargetImageDirection;
    isSelected: boolean;
    imageUrl: string;
    label?: string; // What the old man is yelling at
    size: Size;
  };

// Static old man configuration (no positioning)
type StaticOldMan = {
  expression: "angry" | "furious" | "disappointed" | "outraged";
  yellingIntensity: number;
  position: "left" | "right" | "center"; // Fixed positions
  size: Size;
};

interface Size {
  width: number;
  height: number;
}

interface ToggleValue<Type> {
  enabled: boolean;
  value: Type;
}

// Simplified configuration for static images only
interface StaticImageOptions {
  format: "png" | "jpg";
  quality: number; // For JPG compression
  size: number; // Output size
}
