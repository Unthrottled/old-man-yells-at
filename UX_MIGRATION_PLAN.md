# UX Migration Plan: Static Old Man + Draggable Target Image

## Overview
Transform the user experience from dragging old men around to having a static old man yelling at a draggable target image that moves behind the old man.

## Current State vs Target State

### Current UX
- Multiple draggable old men
- Static background image
- Old men positioned on top of image

### Target UX  
- Single static old man (fixed position)
- Draggable target image/element behind old man
- Old man appears to be yelling "at" the target

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

### 3.3 Animation Updates
- [ ] Old man stays static during GIF generation
- [ ] Target images can animate (shake, move, etc.)
- [ ] Add "yelling effect" animations (speech lines, etc.)

## Phase 4: UI/UX Improvements

### 4.1 Control Panel Redesign
- [ ] Single old man configuration section
- [ ] Target image selection and management
- [ ] Simplified positioning controls for targets only
- [ ] Add "What is the old man yelling at?" input field

### 4.2 Visual Enhancements
- [ ] Add speech bubble or yelling lines from old man to target
- [ ] Highlight "yelling zone" where targets can be placed
- [ ] Add visual feedback when dragging targets
- [ ] Show old man "looking at" the target

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

## Technical Considerations

### Breaking Changes
- Complete data model restructure
- All existing old man positioning logic removed
- New drag and drop system for targets
- Updated GIF generation logic

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
