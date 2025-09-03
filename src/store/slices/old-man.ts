import type { Coordinates } from "@dnd-kit/core/dist/types";
import { arrayMove } from "@dnd-kit/sortable";
import { produce } from "immer";
import { StateCreator } from "zustand";

import { computeStyleUrl, getDefaultOldMan } from "../../lib/old-man.ts";
import { byId } from "../../lib/id-utils.ts";

export interface OldManSlice {
  oldMenList: OldMan[];
  flip: (id: nanoId, field: keyof WithFlip) => void;
  addDefault: () => void;
  updateCoordinates: (id: nanoId, delta: Coordinates) => void;
  updateDirection: (id: nanoId, direction: OldManDirection) => void;
  updateStyle: (id: nanoId, styleUrl: string) => void;
  updateExpression: (id: nanoId, expression: string) => void;
  updateYellingIntensity: (id: nanoId, intensity: number) => void;
  updateSize: (id: nanoId, size: Size) => void;
  reorder: (oldId: nanoId, newId: nanoId) => void;
  remove: (id: nanoId) => void;
  select: (id: nanoId) => void;
}

export const createOldManSlice: StateCreator<OldManSlice> = (set, get) => ({
  oldMenList: [],
  addDefault: () =>
    set(
      produce((draft) => {
        draft.oldMenList.push(getDefaultOldMan());
        draft.posthog.capture("user_added_old_man");
      }),
    ),
  updateCoordinates: (id: nanoId, delta: Coordinates) =>
    set(
      produce((draft) => {
        const index = draft.oldMenList.findIndex(byId(id));
        if (index === -1) {
          return;
        }
        const { x, y } = draft.oldMenList[index].coordinates;
        draft.oldMenList[index].coordinates = {
          x: x + delta.x,
          y: y + delta.y,
        };
        draft.posthog.capture("user_dragged_old_man");
      }),
    ),
  updateDirection: (id: nanoId, direction: OldManDirection) =>
    set(
      produce((draft) => {
        const index = draft.oldMenList.findIndex(byId(id));
        if (index === -1) {
          return;
        }
        draft.oldMenList[index].direction = direction;
        draft.posthog.capture("user_changed_old_man_direction", {
          direction,
        });
      }),
    ),
  updateStyle: async (id: nanoId, style: string) => {
    const index = get().oldMenList.findIndex(byId(id));
    if (index === -1) {
      return;
    }
    const newStyleUrl = await computeStyleUrl(style);
    return set(
      produce((draft) => {
        draft.oldMenList[index].style = style;
        draft.oldMenList[index].styleUrl = newStyleUrl;
        draft.posthog.capture("user_changed_old_man_style", {
          style,
        });
      }),
    );
  },
  updateExpression: (id: nanoId, expression: string) =>
    set(
      produce((draft) => {
        const index = draft.oldMenList.findIndex(byId(id));
        if (index === -1) {
          return;
        }
        draft.oldMenList[index].expression = expression;
        draft.posthog.capture("user_changed_old_man_expression", {
          expression,
        });
      }),
    ),
  updateYellingIntensity: (id: nanoId, intensity: number) =>
    set(
      produce((draft) => {
        const index = draft.oldMenList.findIndex(byId(id));
        if (index === -1) {
          return;
        }
        draft.oldMenList[index].yellingIntensity = intensity;
        draft.posthog.capture("user_changed_yelling_intensity", {
          intensity,
        });
      }),
    ),
  updateSize: (id: nanoId, size: Size) =>
    set(
      produce((draft) => {
        const index = draft.oldMenList.findIndex(byId(id));
        if (index === -1) {
          return;
        }
        draft.oldMenList[index].size = size;
      }),
    ),
  reorder: (oldId: nanoId, newId: nanoId) =>
    set(
      produce((draft) => {
        const oldIndex = draft.oldMenList.findIndex(byId(oldId));
        const newIndex = draft.oldMenList.findIndex(byId(newId));
        if (oldIndex === -1 || newIndex === -1) {
          return;
        }
        draft.oldMenList = arrayMove(draft.oldMenList, oldIndex, newIndex);
        draft.posthog.capture("user_reordered_old_men");
      }),
    ),
  remove: (id: nanoId) =>
    set(
      produce((draft) => {
        const index = draft.oldMenList.findIndex(byId(id));
        if (index === -1) {
          return;
        }
        draft.oldMenList.splice(index, 1);
        draft.posthog.capture("user_removed_old_man");
      }),
    ),
  select: (id: nanoId) =>
    set(
      produce((draft) => {
        const index = draft.oldMenList.findIndex(byId(id));
        if (index === -1) {
          return;
        }
        let previouslySelectedId;
        draft.oldMenList = draft.oldMenList.map((oldMan: OldMan) => {
          if (oldMan.isSelected) {
            previouslySelectedId = oldMan.id;
          }
          oldMan.isSelected = false;
          return oldMan;
        });
        if (previouslySelectedId !== id) {
          draft.oldMenList[index].isSelected = true;
          draft.posthog.capture("user_selected_old_man");
        } else {
          draft.posthog.capture("user_deselected_old_man");
        }
      }),
    ),
  flip: (id, field) =>
    set(
      produce((draft) => {
        const index = draft.oldMenList.findIndex(byId(id));
        if (index === -1) {
          return;
        }
        draft.oldMenList[index][field] = !draft.oldMenList[index][field];
        draft.posthog.capture("user_flipped_old_man", {
          flip: field,
        });
      }),
    ),
});
