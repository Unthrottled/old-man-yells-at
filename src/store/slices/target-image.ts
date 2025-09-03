import type { Coordinates } from "@dnd-kit/core/dist/types";
import { arrayMove } from "@dnd-kit/sortable";
import { produce } from "immer";
import { StateCreator } from "zustand";

import { getDefaultTargetImage } from "../../lib/target-image.ts";
import { byId } from "../../lib/id-utils.ts";

export interface TargetImageSlice {
  targetImages: TargetImage[];
  flip: (id: nanoId, field: keyof WithFlip) => void;
  addDefault: () => void;
  addTargetImage: (imageUrl: string, label?: string) => void;
  updateCoordinates: (id: nanoId, delta: Coordinates) => void;
  updateDirection: (id: nanoId, direction: TargetImageDirection) => void;
  updateLabel: (id: nanoId, label: string) => void;
  updateSize: (id: nanoId, size: Size) => void;
  reorder: (oldId: nanoId, newId: nanoId) => void;
  remove: (id: nanoId) => void;
  select: (id: nanoId) => void;
}

export const createTargetImageSlice: StateCreator<TargetImageSlice> = (set) => ({
  targetImages: [],
  addDefault: () =>
    set(
      produce((draft) => {
        draft.targetImages.push(getDefaultTargetImage());
        draft.posthog.capture("user_added_target_image");
      }),
    ),
  addTargetImage: (imageUrl: string, label?: string) =>
    set(
      produce((draft) => {
        draft.targetImages.push(getDefaultTargetImage(imageUrl, label));
        draft.posthog.capture("user_added_custom_target", { label });
      }),
    ),
  updateCoordinates: (id: nanoId, delta: Coordinates) =>
    set(
      produce((draft) => {
        const index = draft.targetImages.findIndex(byId(id));
        if (index === -1) {
          return;
        }
        const { x, y } = draft.targetImages[index].coordinates;
        draft.targetImages[index].coordinates = {
          x: x + delta.x,
          y: y + delta.y,
        };
        draft.posthog.capture("user_dragged_target_image");
      }),
    ),
  updateDirection: (id: nanoId, direction: TargetImageDirection) =>
    set(
      produce((draft) => {
        const index = draft.targetImages.findIndex(byId(id));
        if (index === -1) {
          return;
        }
        draft.targetImages[index].direction = direction;
        draft.posthog.capture("user_changed_target_direction", {
          direction,
        });
      }),
    ),
  updateLabel: (id: nanoId, label: string) =>
    set(
      produce((draft) => {
        const index = draft.targetImages.findIndex(byId(id));
        if (index === -1) {
          return;
        }
        draft.targetImages[index].label = label;
        draft.posthog.capture("user_changed_target_label", {
          label,
        });
      }),
    ),
  updateSize: (id: nanoId, size: Size) =>
    set(
      produce((draft) => {
        const index = draft.targetImages.findIndex(byId(id));
        if (index === -1) {
          return;
        }
        draft.targetImages[index].size = size;
      }),
    ),
  reorder: (oldId: nanoId, newId: nanoId) =>
    set(
      produce((draft) => {
        const oldIndex = draft.targetImages.findIndex(byId(oldId));
        const newIndex = draft.targetImages.findIndex(byId(newId));
        if (oldIndex === -1 || newIndex === -1) {
          return;
        }
        draft.targetImages = arrayMove(draft.targetImages, oldIndex, newIndex);
        draft.posthog.capture("user_reordered_target_images");
      }),
    ),
  remove: (id: nanoId) =>
    set(
      produce((draft) => {
        const index = draft.targetImages.findIndex(byId(id));
        if (index === -1) {
          return;
        }
        draft.targetImages.splice(index, 1);
        draft.posthog.capture("user_removed_target_image");
      }),
    ),
  select: (id: nanoId) =>
    set(
      produce((draft) => {
        const index = draft.targetImages.findIndex(byId(id));
        if (index === -1) {
          return;
        }
        let previouslySelectedId;
        draft.targetImages = draft.targetImages.map((targetImage: TargetImage) => {
          if (targetImage.isSelected) {
            previouslySelectedId = targetImage.id;
          }
          targetImage.isSelected = false;
          return targetImage;
        });
        if (previouslySelectedId !== id) {
          draft.targetImages[index].isSelected = true;
          draft.posthog.capture("user_selected_target_image");
        } else {
          draft.posthog.capture("user_deselected_target_image");
        }
      }),
    ),
  flip: (id, field) =>
    set(
      produce((draft) => {
        const index = draft.targetImages.findIndex(byId(id));
        if (index === -1) {
          return;
        }
        draft.targetImages[index][field] = !draft.targetImages[index][field];
        draft.posthog.capture("user_flipped_target_image", {
          flip: field,
        });
      }),
    ),
});
