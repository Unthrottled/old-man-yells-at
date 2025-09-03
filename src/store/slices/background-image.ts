import type { Coordinates } from "@dnd-kit/core/dist/types";
import { produce } from "immer";
import { StateCreator } from "zustand";
import { nanoid } from "nanoid";

export interface BackgroundImageSlice {
  backgroundImage: BackgroundImage | null;
  initializeBackgroundImage: (naturalWidth: number, naturalHeight: number) => void;
  updateBackgroundCoordinates: (delta: Coordinates) => void;
  updateBackgroundSize: (size: Size) => void;
  selectBackground: () => void;
}

export const createBackgroundImageSlice: StateCreator<BackgroundImageSlice> = (set) => ({
  backgroundImage: null,
  
  initializeBackgroundImage: (naturalWidth: number, naturalHeight: number) =>
    set(
      produce((draft) => {
        // Create background image with reasonable default size and centered position
        const maxSize = 400;
        const aspectRatio = naturalWidth / naturalHeight;
        
        let width = maxSize;
        let height = maxSize / aspectRatio;
        
        if (height > maxSize) {
          height = maxSize;
          width = maxSize * aspectRatio;
        }
        
        draft.backgroundImage = {
          id: nanoid(),
          coordinates: {
            x: 50, // Start offset from left
            y: 50, // Start offset from top
          },
          isSelected: false,
          size: {
            width: Math.round(width),
            height: Math.round(height),
          },
        };
      }),
    ),
    
  updateBackgroundCoordinates: (delta: Coordinates) =>
    set(
      produce((draft) => {
        if (!draft.backgroundImage) return;
        
        const { x, y } = draft.backgroundImage.coordinates;
        draft.backgroundImage.coordinates = {
          x: x + delta.x,
          y: y + delta.y,
        };
      }),
    ),
    
  updateBackgroundSize: (size: Size) =>
    set(
      produce((draft) => {
        if (!draft.backgroundImage) return;
        
        draft.backgroundImage.size = size;
      }),
    ),
    
  selectBackground: () =>
    set(
      produce((draft) => {
        if (!draft.backgroundImage) return;
        
        draft.backgroundImage.isSelected = !draft.backgroundImage.isSelected;
      }),
    ),
});
