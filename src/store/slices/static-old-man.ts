import { produce } from "immer";
import { StateCreator } from "zustand";

import { getDefaultStaticOldMan } from "../../lib/static-old-man.ts";

export interface StaticOldManSlice {
  staticOldMan: StaticOldMan;
  updateExpression: (expression: string) => void;
  updateYellingIntensity: (intensity: number) => void;
  updatePosition: (position: "left" | "right" | "center") => void;
  updateOldManSize: (size: Size) => void;
}

export const createStaticOldManSlice: StateCreator<StaticOldManSlice> = (set) => ({
  staticOldMan: getDefaultStaticOldMan(),
  updateExpression: (expression: string) =>
    set(
      produce((draft) => {
        draft.staticOldMan.expression = expression;
        draft.posthog.capture("user_changed_old_man_expression", {
          expression,
        });
      }),
    ),
  updateYellingIntensity: (intensity: number) =>
    set(
      produce((draft) => {
        draft.staticOldMan.yellingIntensity = intensity;
        draft.posthog.capture("user_changed_yelling_intensity", {
          intensity,
        });
      }),
    ),
  updatePosition: (position: "left" | "right" | "center") =>
    set(
      produce((draft) => {
        draft.staticOldMan.position = position;
        draft.posthog.capture("user_changed_old_man_position", {
          position,
        });
      }),
    ),
  updateOldManSize: (size: Size) =>
    set(
      produce((draft) => {
        draft.staticOldMan.size = size;
      }),
    ),
});
