# UX Migration Plan: Static Old Man + Draggable Target Image

## Overview
Transform the user experience from dragging old men around to having a static old man yelling at a draggable target image that moves behind the old man. **This will be a static image generator only - all GIF/animation features will be removed.**

## Current State vs Target State

### Current UX
- Multiple draggable old men
- Static background image
- Old men positioned on top of image
- **GIF generation with animations**

### Target UX  
- Single static old man (fixed position)
- Draggable target image/element behind old man
- Old man appears to be yelling "at" the target
- **Static image output only (PNG/JPG)**

## Phase 1: Data Model Changes

### 1.1 Update Type Definitions
- [ ] Remove `oldMenList` concept (single old man only)
- [ ] Add `TargetImage` type for draggable element
- [ ] Update store to have single `oldMan` + `targetImage`
- [ ] Remove old man positioning properties (now static)

```typescript
type TargetImage = {
  id: string;
  coordinates: { x: number; y: number };
  size: { width: number; height: number };
  imageUrl: string;
  label?: string; // What the old man is yelling at
};

// Old man becomes static configuration
type StaticOldMan = {
  expression: "angry" | "furious" | "disappointed" | "outraged";
  yellingIntensity: number;
  position: "left" | "right" | "center"; // Fixed positions
  size: { width: number; height: number };
};
```

### 1.2 Update Store Slices
- [ ] Replace `OldManSlice` with `StaticOldManSlice`
- [ ] Create new `TargetImageSlice` for draggable targets
- [ ] Remove old man positioning/dragging logic
- [ ] Add target image manipulation methods

## Phase 2: Component Architecture Changes

### 2.1 Remove Old Man Dragging
- [ ] Remove `OldManDraggable.tsx` component
- [ ] Remove old man drag and drop logic
- [ ] Remove old man positioning controls

### 2.2 Create Static Old Man Component
- [ ] Create `StaticOldMan.tsx` - fixed position old man
- [ ] Position old man at predetermined locations (left/right/center)
- [ ] Only allow expression and intensity changes
- [ ] Remove resize handles and drag listeners

### 2.3 Create Target Image System
- [ ] Create `DraggableTarget.tsx` - draggable image/element
- [ ] Create `TargetImagePicker.tsx` - select what to yell at
- [ ] Create `TargetImageList.tsx` - manage multiple targets
- [ ] Add target image upload/selection

### 2.4 Update Layout
- [ ] Redesign canvas layout with static old man
- [ ] Position old man in fixed location (e.g., left side)
- [ ] Target images render behind old man (lower z-index)
- [ ] Add visual indicators showing yelling direction

## Phase 3: Interaction Model

### 3.1 Target Selection
- [ ] Predefined target categories:
  - "Technology" (phones, computers, etc.)
  - "Weather" (clouds, rain, etc.) 
  - "People" (generic figures)
  - "Objects" (cars, buildings, etc.)
  - "Custom" (user upload)

### 3.2 Positioning Logic
- [ ] Old man fixed at optimal yelling position
- [ ] Target images draggable within "yelling zone"
- [ ] Snap-to-grid for better alignment
- [ ] Visual guides showing effective yelling area

### 3.3 Static Image Generation
- [ ] Remove all GIF generation logic
- [ ] Remove animation-related configuration options
- [ ] Implement static image export (PNG/JPG)
- [ ] Remove frame-based rendering system
- [ ] Simplify to single-frame composition

## Phase 4: UI/UX Improvements

### 4.1 Control Panel Redesign
- [ ] Single old man configuration section
- [ ] Target image selection and management
- [ ] Simplified positioning controls for targets only
- [ ] Add "What is the old man yelling at?" input field

### 4.2 Visual Enhancements
- [ ] Add speech bubble or yelling lines from old man to target (static)
- [ ] Highlight "yelling zone" where targets can be placed
- [ ] Add visual feedback when dragging targets
- [ ] Show old man "looking at" the target
- [ ] Remove all animation controls and timeline UI

### 4.3 Preset Scenarios
- [ ] "Yelling at phone" preset
- [ ] "Yelling at weather" preset  
- [ ] "Yelling at traffic" preset
- [ ] "Yelling at technology" preset

## Phase 5: Content and Assets

### 5.1 Target Image Library
- [ ] Curated collection of "yellable" objects
- [ ] Categorized by theme (tech, weather, people, etc.)
- [ ] Consistent art style matching old man
- [ ] Transparent backgrounds for better compositing

### 5.2 Old Man Variations
- [ ] Different old man poses for different scenarios
- [ ] Pointing gestures toward target area
- [ ] Varied expressions based on target type
- [ ] Multiple old man character styles

## Phase 6: Advanced Features

### 6.1 Smart Positioning
- [ ] Auto-position targets based on old man's "gaze"
- [ ] Suggest optimal target placement
- [ ] Collision detection between multiple targets

### 6.2 Context Awareness
- [ ] Old man expression changes based on target type
- [ ] Intensity auto-adjusts for different scenarios
- [ ] Suggested captions based on target selection

## Implementation Priority

### High Priority (Core UX Change)
1. **Phase 1**: Data model transformation
2. **Phase 2**: Component architecture changes  
3. **Phase 3**: Basic interaction model

### Medium Priority (Polish)
4. **Phase 4**: UI improvements
5. **Phase 5**: Content library

### Low Priority (Enhancement)
6. **Phase 6**: Advanced features

## Phase 7: GIF/Animation Removal

### 7.1 Remove GIF Generation System
- [ ] Remove `src/worker/gif.worker.ts` entirely
- [ ] Remove `src/worker/utils.ts` frame rendering logic
- [ ] Remove `gifwrap` dependency from package.json
- [ ] Remove all animation-related imports

### 7.2 Remove Animation Configuration
- [ ] Remove `ConfigurationOptions` type (looping, frameDelay, etc.)
- [ ] Remove animation controls from `ConfigurationForm.tsx`
- [ ] Remove `DownloadModal.tsx` GIF options
- [ ] Simplify to basic image export options

### 7.3 Update Export System
- [ ] Replace GIF generation with static image export
- [ ] Use HTML5 Canvas `toBlob()` for PNG/JPG export
- [ ] Remove frame-based composition logic
- [ ] Simplify to single canvas render

## Technical Considerations

### Breaking Changes
- Complete data model restructure
- All existing old man positioning logic removed
- **Complete removal of GIF/animation system**
- New drag and drop system for targets
- **Simplified static image generation**

### Dependencies to Remove
- `gifwrap` - GIF generation library
- Animation-related worker files
- Frame timing and looping logic

### New Dependencies (Optional)
- Image compression libraries for better PNG/JPG output
- Canvas-to-image conversion utilities

### Migration Strategy
- Create new branch for UX transformation
- Implement alongside existing system initially
- Feature flag to switch between old/new UX
- Gradual rollout with user feedback

## User Story Examples

### Before (Current)
"I want to add multiple old men to my image and position them where people's faces are"

### After (Target)
"I want the old man to yell at my phone, so I'll drag the phone image to where I want it and the old man will appear to be yelling at it"

## Success Metrics
- Reduced complexity (single old man vs multiple)
- More intuitive interaction (drag the target, not the old man)
- Better storytelling (clear "yelling at X" narrative)
- Easier content creation (predefined targets vs positioning)

## File Changes Required

### Core Files to Modify
- `src/index.d.ts` - Update type definitions
- `src/store/slices/old-man.ts` → `static-old-man.ts`
- `src/store/slices/target-image.ts` - New slice
- `src/store/index.ts` - Update store composition

### Components to Replace
- `src/OldManDraggable.tsx` → `src/StaticOldMan.tsx`
- `src/SortableOldMenList.tsx` → `src/TargetImageList.tsx`
- `src/SortableOldManItem.tsx` → `src/TargetImageItem.tsx`

### New Components to Create
- `src/DraggableTarget.tsx`
- `src/TargetImagePicker.tsx`
- `src/YellingZone.tsx`
- `src/PresetScenarios.tsx`

### Assets to Add
- Target image library in `src/assets/targets/`
- Static old man poses in `src/assets/old-man-poses/`
- Yelling effect graphics (speech bubbles, lines)

### Components to Remove Entirely
- `src/worker/gif.worker.ts` - GIF generation worker
- `src/worker/utils.ts` - Animation frame utilities  
- Animation controls in `src/ConfigurationForm.tsx`
- GIF options in `src/DownloadModal.tsx`

### Dependencies to Remove
- `gifwrap` - GIF generation
- Animation-related configuration types
- Frame timing logic

## Estimated Effort
- **Phase 1-2**: 4-6 hours (core restructure)
- **Phase 3**: 2-3 hours (interaction model, simplified without animation)
- **Phase 4**: 2-3 hours (UI polish)
- **Phase 5**: 4-6 hours (content creation)
- **Phase 6**: 3-5 hours (advanced features)
- **Phase 7**: 2-3 hours (GIF removal and static export)

**Total**: 17-26 hours for complete UX transformation + animation removal
