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
        draft.staticOldMan.expression = expression as any;
      }),
    ),
  updateYellingIntensity: (intensity: number) =>
    set(
      produce((draft) => {
        draft.staticOldMan.yellingIntensity = intensity;
      }),
    ),
  updatePosition: (position: "left" | "right" | "center") =>
    set(
      produce((draft) => {
        draft.staticOldMan.position = position;
      }),
    ),
  updateOldManSize: (size: Size) =>
    set(
      produce((draft) => {
        draft.staticOldMan.size = size;
      }),
    ),
});
