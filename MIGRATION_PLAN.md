# Migration Plan: Deal With It → Old Man Yells At Generator

## Phase 1: Core Data Model Migration

### 1.1 Update Type Definitions
- [ ] Rename `Glasses` → `OldMan` in `src/index.d.ts`
- [ ] Update `GlassesDirection` → `OldManDirection` 
- [ ] Add new properties: `expression`, `yellingIntensity`
- [ ] Remove glasses-specific properties: `styleColor`

### 1.2 Update Store Slice
- [ ] Rename `src/store/slices/glasses.ts` → `old-man.ts`
- [ ] Update interface: `GlassesSlice` → `OldManSlice`
- [ ] Rename all methods and properties:
  - `glassesList` → `oldMenList`
  - `addDefault()` → `addDefaultOldMan()`
  - Update all function signatures

### 1.3 Update Utilities
- [ ] Rename `src/lib/glasses.ts` → `old-man.ts`
- [ ] Update `getDefaultGlasses()` → `getDefaultOldMan()`
- [ ] Update default positioning logic for old man character
- [ ] Remove glasses-specific aspect ratio calculations

## Phase 2: Component Migration

### 2.1 Rename Core Components
- [ ] `SortableGlassesList.tsx` → `SortableOldMenList.tsx`
- [ ] `GlassesDraggable.tsx` → `OldManDraggable.tsx`
- [ ] `SortableGlassesItem.tsx` → `SortableOldManItem.tsx`

### 2.2 Update Component Logic
- [ ] Replace all glasses references with old man terminology
- [ ] Update drag handles and positioning logic
- [ ] Modify size constraints for old man character
- [ ] Update selection and highlighting behavior

### 2.3 Remove/Replace Glasses-Specific Components
- [ ] Remove `GlassesColorPicker.tsx` (old man doesn't need color picker)
- [ ] Create `OldManExpressionPicker.tsx` for facial expressions
- [ ] Update `ConfigurationForm.tsx` with old man options

## Phase 3: Asset Management

### 3.1 Asset Replacement
- [ ] Remove unused glasses assets:
  - `glasses.png`, `glasses.svg`
  - `glasses-small.png`, `glasses-symmetrical.png`
  - `glasses-symmetrical-party.png`
- [ ] Create old man expression variants from base `old-man-yells-at.png`
- [ ] Add different yelling intensity assets

### 3.2 Update Asset References
- [ ] Update default asset URL in old-man utilities
- [ ] Update asset imports across components
- [ ] Update example images if needed

## Phase 4: UI/UX Updates

### 4.1 Text and Labels
- [ ] Update `index.html` title: "Old Man Yells At Generator"
- [ ] Update all component text references
- [ ] Update button labels and tooltips
- [ ] Update configuration form labels

### 4.2 Styling Updates
- [ ] Update drag handles for old man character
- [ ] Adjust default sizing for old man vs glasses
- [ ] Update selection indicators
- [ ] Modify positioning constraints

## Phase 5: Feature Enhancements

### 5.1 Old Man Specific Features
- [ ] Add expression picker (angry, furious, disappointed, etc.)
- [ ] Add yelling intensity slider
- [ ] Add speech bubble option (optional)
- [ ] Multiple old man character styles

### 5.2 Positioning Logic
- [ ] Update face detection positioning for old man placement
- [ ] Adjust default positioning relative to detected faces
- [ ] Update collision detection for multiple old men

## Phase 6: Testing & Polish

### 6.1 Functionality Testing
- [ ] Test drag and drop with old man characters
- [ ] Test GIF generation with old men
- [ ] Test face detection positioning
- [ ] Test multiple old men scenarios

### 6.2 Final Updates
- [ ] Update README examples
- [ ] Update configuration options
- [ ] Test all download formats
- [ ] Update analytics events (posthog)

## Implementation Order

1. **Start with Phase 1** - Core data model changes
2. **Phase 2** - Component renames and basic functionality
3. **Phase 3** - Asset management
4. **Phase 4** - UI polish
5. **Phase 5** - New features
6. **Phase 6** - Testing and final polish

## Key Files to Modify

### Critical Path (Must Change)
- `src/index.d.ts` - Type definitions
- `src/store/slices/glasses.ts` → `old-man.ts`
- `src/store/index.ts` - Store imports
- `src/lib/glasses.ts` → `old-man.ts`

### Component Updates
- All components with "Glasses" in filename
- `ConfigurationForm.tsx`
- `App.tsx` - Update imports and references

### Assets & Config
- `index.html` - Title update
- Asset files in `src/assets/`
- Any hardcoded asset references

## Estimated Effort
- **Phase 1-2**: 2-3 hours (core functionality)
- **Phase 3-4**: 1-2 hours (assets and UI)
- **Phase 5**: 2-4 hours (new features)
- **Phase 6**: 1 hour (testing)

**Total**: 6-10 hours for complete migration
