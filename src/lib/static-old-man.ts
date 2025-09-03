import oldManImageUrl from "../assets/old-man-yells-at.png";

export const DEFAULT_OLD_MAN_SIZE = 150;
export const DEFAULT_YELLING_INTENSITY = 5;
export const DEFAULT_EXPRESSION = "angry";
export const DEFAULT_POSITION = "left";

export function getDefaultStaticOldMan(): StaticOldMan {
  return {
    expression: DEFAULT_EXPRESSION,
    yellingIntensity: DEFAULT_YELLING_INTENSITY,
    position: DEFAULT_POSITION,
    size: {
      width: DEFAULT_OLD_MAN_SIZE,
      height: DEFAULT_OLD_MAN_SIZE * 1.2, // Slightly taller aspect ratio
    },
  };
}

export const OLD_MAN_EXPRESSIONS = {
  disappointed: { 
    label: "😞 Disappointed", 
    intensity: 3,
    description: "Mildly upset, shaking head",
    phrases: ["Not in my day...", "Kids these days...", "What's wrong with people?"]
  },
  angry: { 
    label: "😠 Angry", 
    intensity: 5,
    description: "Classic grumpy old man",
    phrases: ["Get off my lawn!", "Back in my day!", "This is ridiculous!"]
  },
  furious: { 
    label: "😡 Furious", 
    intensity: 8,
    description: "Red-faced and shouting",
    phrases: ["I've had enough!", "This is outrageous!", "What is this world coming to?!"]
  },
  outraged: { 
    label: "🤬 Outraged", 
    intensity: 10,
    description: "Maximum yelling intensity",
    phrases: ["ABSOLUTELY NOT!", "THIS IS MADNESS!", "I WON'T STAND FOR THIS!"]
  }
};

export const OLD_MAN_POSES = {
  pointing: {
    label: "👉 Pointing",
    description: "Pointing accusingly at target",
    imageUrl: "/src/assets/old-man-poses/pointing.png"
  },
  fist: {
    label: "✊ Fist Raised",
    description: "Shaking fist in anger",
    imageUrl: "/src/assets/old-man-poses/fist.png"
  },
  arms_crossed: {
    label: "🙅 Arms Crossed",
    description: "Disapproving stance",
    imageUrl: "/src/assets/old-man-poses/arms-crossed.png"
  },
  hands_on_hips: {
    label: "🤨 Hands on Hips",
    description: "Stern and judgmental",
    imageUrl: "/src/assets/old-man-poses/hands-on-hips.png"
  }
};

export function getOldManImageUrl(): string {
  // For now, return the base asset
  // In the future, this will return different images based on expression and pose
  return oldManImageUrl;
}

export function getOldManPosition(position: "left" | "right" | "center", canvasWidth: number): { x: number; y: number } {
  const oldManWidth = DEFAULT_OLD_MAN_SIZE;
  const padding = 20;
  
  switch (position) {
    case "left":
      return { x: padding, y: 50 };
    case "right":
      return { x: canvasWidth - oldManWidth - padding, y: 50 };
    case "center":
      return { x: (canvasWidth - oldManWidth) / 2, y: 50 };
    default:
      return { x: padding, y: 50 };
  }
}

export function getRandomPhrase(expression: string): string {
  const expressionData = OLD_MAN_EXPRESSIONS[expression as keyof typeof OLD_MAN_EXPRESSIONS];
  if (expressionData && expressionData.phrases) {
    const phrases = expressionData.phrases;
    return phrases[Math.floor(Math.random() * phrases.length)];
  }
  return "Get off my lawn!";
}

export function getContextualExpression(targetLabel: string): string {
  const target = targetLabel.toLowerCase();
  
  // Technology targets = outraged
  if (target.includes('phone') || target.includes('computer') || target.includes('wifi') || target.includes('social')) {
    return "outraged";
  }
  
  // Weather targets = furious
  if (target.includes('rain') || target.includes('snow') || target.includes('storm')) {
    return "furious";
  }
  
  // People targets = angry
  if (target.includes('kids') || target.includes('neighbor') || target.includes('teenager')) {
    return "angry";
  }
  
  // Default to disappointed
  return "disappointed";
}
