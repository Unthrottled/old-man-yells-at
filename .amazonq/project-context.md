# Old Man Yells At Generator - Project Context

## Overview
React + TypeScript project being converted from a "Deal With It" sunglasses generator to an "Old Man Yells At" meme generator. Users can upload images and add old man characters yelling at things for humorous effect.

## Tech Stack
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand with slice pattern
- **UI Framework**: Ant Design components
- **Styling**: Tailwind CSS
- **Image Processing**: Jimp (client-side)
- **Face Detection**: MediaPipe Face Detector
- **File Handling**: file-saver for downloads

## Architecture

### State Management (Zustand Slices)
- `app.ts` - Application status, mode, UI state
- `face-detection.ts` - MediaPipe face detection logic
- `glasses.ts` - **NEEDS CONVERSION** → old-man slice
- `image.ts` - Input image handling
- `theme.ts` - Dark/light theme switching

### Key Data Models
```typescript
// Current "Glasses" model (needs conversion to "OldMan")
type Glasses = {
  id: string;
  coordinates: { x: number; y: number };
  direction: "up" | "down" | "right" | "left";
  flipHorizontally: boolean;
  flipVertically: boolean;
  isSelected: boolean;
  style: string;
  styleColor: string;
  styleUrl: string;
  size: { width: number; height: number };
};
```

### Core Features
- Client-side image processing (no backend)
- Drag & drop positioning of characters
- Face detection for auto-positioning
- Multiple character instances
- GIF generation with customizable options
- Flip/rotate characters
- Size adjustment
- Different character styles/expressions

## File Structure
```
src/
├── assets/
│   ├── old-man-yells-at.png     # Main character asset
│   └── glasses-*.png            # Legacy assets to replace
├── store/
│   ├── index.ts                 # Combined store
│   └── slices/                  # State slices
├── lib/
│   ├── glasses.ts               # **NEEDS CONVERSION** → old-man.ts
│   └── utils.ts                 # Helper functions
├── components/                  # React components
└── worker/                      # Web workers
```

## Conversion Tasks
1. **Rename/Update Core Concepts**:
   - `Glasses` → `OldMan` type
   - `glassesList` → `oldMenList`
   - `glasses.ts` → `old-man.ts`

2. **Component Updates**:
   - `SortableGlassesList.tsx` → `SortableOldMenList.tsx`
   - `GlassesDraggable.tsx` → `OldManDraggable.tsx`
   - `GlassesColorPicker.tsx` → update for old man customization

3. **Asset Management**:
   - Replace glasses assets with old man variations
   - Update default character positioning logic

4. **UI Text Updates**:
   - Update all "glasses" references to "old man"
   - Change title in `index.html`
   - Update component labels and descriptions

## Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
```

## Key Dependencies
- `@mediapipe/tasks-vision` - Face detection
- `jimp` - Image manipulation
- `gifwrap` - GIF creation
- `@dnd-kit/*` - Drag and drop functionality
- `zustand` - State management
- `antd` - UI components

## Current Status
- Project setup complete
- README updated for new concept
- Ready for conversion from glasses to old man generator
- All dependencies installed and working
