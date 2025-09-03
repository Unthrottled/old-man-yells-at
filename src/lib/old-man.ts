import { nanoid } from "nanoid";

import oldManImageUrl from "../assets/old-man-yells-at.png";

export const DEFAULT_OLD_MAN_SIZE = 120;
export const DEFAULT_YELLING_INTENSITY = 5;
export const DEFAULT_EXPRESSION = "angry";

export function getDefaultOldMan(styleUrl = oldManImageUrl): OldMan {
  return {
    id: nanoid(),
    direction: "right",
    coordinates: {
      x: 35,
      y: 54,
    },
    flipHorizontally: false,
    flipVertically: false,
    isSelected: false,
    style: styleUrl,
    styleUrl: styleUrl,
    expression: DEFAULT_EXPRESSION,
    yellingIntensity: DEFAULT_YELLING_INTENSITY,
    size: {
      width: DEFAULT_OLD_MAN_SIZE,
      height: DEFAULT_OLD_MAN_SIZE / getAspectRatio(),
    },
  };
}

export function getAspectRatio(): number {
  // Default aspect ratio for old man character
  return 1.2; // Slightly taller than wide
}

export async function computeStyleUrl(style: string): Promise<string> {
  // For now, just return the style as-is
  // This can be expanded later for dynamic style computation
  return style;
}

export const OLD_MAN_EXPRESSIONS = {
  angry: { label: "Angry", intensity: 5 },
  furious: { label: "Furious", intensity: 8 },
  disappointed: { label: "Disappointed", intensity: 3 },
  outraged: { label: "Outraged", intensity: 10 }
};

export function getOldManAssetUrl(): string {
  // For now, return the base asset
  // This will be expanded when we have multiple expression assets
  return oldManImageUrl;
}

// Face detection utility functions
export function getEyesDistance(): number {
  // Calculate distance between eyes for old man sizing
  return 50; // Default value for now
}

export function getOldManSize(eyesDistance: number): { width: number; height: number } {
  const width = Math.max(DEFAULT_OLD_MAN_SIZE, eyesDistance * 2);
  return {
    width,
    height: width / getAspectRatio(),
  };
}

export function getNoseOffset(): { x: number; y: number } {
  // Calculate offset from nose for old man positioning
  return { x: -20, y: -30 }; // Default offset
}

export function getRandomOldManStyle(): string {
  // Return random old man style - for now just the default
  return oldManImageUrl;
}
