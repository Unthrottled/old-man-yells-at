# Old Man Yells At Generator - Reference Documentation

## API Reference

### Core Types

```typescript
type OldMan = {
  id: string;
  coordinates: { x: number; y: number };
  direction: "up" | "down" | "right" | "left";
  flipHorizontally: boolean;
  flipVertically: boolean;
  isSelected: boolean;
  style: string;
  styleUrl: string;
  expression: "angry" | "furious" | "disappointed" | "outraged";
  yellingIntensity: number; // 1-10 scale
  size: { width: number; height: number };
};

type AppStatus = "START" | "INPUT" | "LOADING" | "DETECTING" | "READY" | "GENERATING" | "DONE";

type ConfigurationOptions = {
  looping: { mode: "infinite" | "off" | "finite"; loops: number };
  lastFrameDelay: { enabled: boolean; value: number };
  frameDelay: number;
  numberOfFrames: number;
  size: number;
};
```

### Store Slices

#### OldManSlice
```typescript
interface OldManSlice {
  oldMenList: OldMan[];
  addDefaultOldMan: () => void;
  updateCoordinates: (id: string, delta: { x: number; y: number }) => void;
  updateDirection: (id: string, direction: OldManDirection) => void;
  updateExpression: (id: string, expression: string) => void;
  updateYellingIntensity: (id: string, intensity: number) => void;
  updateSize: (id: string, size: { width: number; height: number }) => void;
  flip: (id: string, field: "flipHorizontally" | "flipVertically") => void;
  reorder: (oldId: string, newId: string) => void;
  remove: (id: string) => void;
  select: (id: string) => void;
}
```

#### FaceDetectionSlice
```typescript
interface FaceDetectionSlice {
  faceDetector: FaceDetector | null;
  detectedFaces: DetectedFace[];
  detectFaces: (image: HTMLImageElement) => Promise<void>;
  initializeFaceDetector: () => Promise<void>;
}
```

#### ImageSlice
```typescript
interface ImageSlice {
  inputImage: HTMLImageElement | null;
  setInputImage: (image: HTMLImageElement) => void;
  clearInputImage: () => void;
}
```

## Component Reference

### Core Components

#### `<OldManDraggable />`
Draggable old man character component.

**Props:**
```typescript
interface OldManDraggableProps {
  oldMan: OldMan;
  inputImageSize: { width: number; height: number };
  scale: number;
}
```

#### `<SortableOldMenList />`
Sortable list of old man characters.

**Props:**
```typescript
interface SortableOldMenListProps {
  oldMenList: OldMan[];
  onReorder: (oldId: string, newId: string) => void;
}
```

#### `<OldManExpressionPicker />`
Expression selection component.

**Props:**
```typescript
interface OldManExpressionPickerProps {
  value: string;
  onChange: (expression: string) => void;
  expressions: Array<{
    key: string;
    label: string;
    icon: string;
  }>;
}
```

### Utility Functions

#### Old Man Utilities (`src/lib/old-man.ts`)

```typescript
// Create default old man character
function getDefaultOldMan(styleUrl?: string): OldMan;

// Calculate positioning relative to detected face
function positionOldManNearFace(
  face: DetectedFace, 
  imageSize: { width: number; height: number }
): { x: number; y: number };

// Get old man asset URL by expression
function getOldManAssetUrl(expression: string): string;

// Calculate old man size based on face size
function calculateOldManSize(
  faceSize: { width: number; height: number },
  intensity: number
): { width: number; height: number };
```

#### Image Processing (`src/lib/utils.ts`)

```typescript
// Generate GIF with old men
function generateGifWithOldMen(
  inputImage: HTMLImageElement,
  oldMenList: OldMan[],
  options: ConfigurationOptions
): Promise<Blob>;

// Apply old man to single frame
function applyOldManToFrame(
  canvas: HTMLCanvasElement,
  oldMan: OldMan,
  frameIndex: number
): void;
```

## Configuration Options

### Old Man Expressions
```typescript
const EXPRESSIONS = {
  angry: { label: "Angry", intensity: 5 },
  furious: { label: "Furious", intensity: 8 },
  disappointed: { label: "Disappointed", intensity: 3 },
  outraged: { label: "Outraged", intensity: 10 }
};
```

### Default Settings
```typescript
const DEFAULT_OLD_MAN_SIZE = 120;
const DEFAULT_YELLING_INTENSITY = 5;
const DEFAULT_EXPRESSION = "angry";
const DEFAULT_DIRECTION = "right";
```

### GIF Generation Options
```typescript
const GIF_OPTIONS = {
  frameDelay: 100, // milliseconds
  numberOfFrames: 10,
  size: 500, // output size
  looping: { mode: "infinite", loops: 0 },
  lastFrameDelay: { enabled: true, value: 1000 }
};
```

## Asset Management

### Old Man Assets
```
src/assets/
├── old-man-angry.png          # Default angry expression
├── old-man-furious.png        # Furious expression
├── old-man-disappointed.png   # Disappointed expression
├── old-man-outraged.png       # Outraged expression
└── old-man-variants/          # Additional style variants
    ├── old-man-style-2.png
    └── old-man-style-3.png
```

### Asset Loading
```typescript
// Dynamic asset loading
const assetMap = {
  angry: () => import('../assets/old-man-angry.png'),
  furious: () => import('../assets/old-man-furious.png'),
  disappointed: () => import('../assets/old-man-disappointed.png'),
  outraged: () => import('../assets/old-man-outraged.png')
};
```

## Event Handling

### Drag and Drop Events
```typescript
// Old man drag events
interface OldManDragEvents {
  onDragStart: (event: DragStartEvent) => void;
  onDragMove: (event: DragMoveEvent) => void;
  onDragEnd: (event: DragEndEvent) => void;
}
```

### Face Detection Events
```typescript
// Face detection callbacks
interface FaceDetectionEvents {
  onFacesDetected: (faces: DetectedFace[]) => void;
  onDetectionError: (error: Error) => void;
  onDetectionComplete: () => void;
}
```

## Performance Considerations

### Image Processing
- Use Web Workers for heavy image processing
- Implement canvas pooling for GIF generation
- Lazy load old man assets
- Debounce drag operations

### Memory Management
- Clean up canvas contexts after use
- Dispose of MediaPipe resources properly
- Limit maximum number of old men (default: 10)

## Browser Compatibility

### Required Features
- Canvas 2D API
- Web Workers
- File API
- MediaPipe WebAssembly support

### Supported Browsers
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Error Handling

### Common Error Scenarios
```typescript
// Face detection errors
try {
  await detectFaces(image);
} catch (error) {
  if (error.name === 'MediaPipeError') {
    // Handle MediaPipe initialization failure
  }
}

// Image processing errors
try {
  const gif = await generateGif(image, oldMen, options);
} catch (error) {
  if (error.name === 'OutOfMemoryError') {
    // Reduce image size or number of frames
  }
}
```

## Development Workflow

### Adding New Expressions
1. Add asset to `src/assets/`
2. Update `EXPRESSIONS` constant
3. Add to expression picker options
4. Update asset loading map

### Adding New Features
1. Update type definitions in `src/index.d.ts`
2. Modify store slice interfaces
3. Update components and utilities
4. Add tests and documentation

## Testing

### Unit Tests
```typescript
// Test old man positioning
describe('positionOldManNearFace', () => {
  it('should position old man relative to face', () => {
    const face = { x: 100, y: 100, width: 50, height: 50 };
    const position = positionOldManNearFace(face, { width: 500, height: 500 });
    expect(position.x).toBeGreaterThan(face.x);
  });
});
```

### Integration Tests
- Face detection with various image types
- GIF generation with multiple old men
- Drag and drop functionality
- Asset loading and caching
