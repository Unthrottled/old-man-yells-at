import { create } from "zustand";

import { AppSlice, createAppSlice } from "./slices/app.ts";
import { createStaticOldManSlice, StaticOldManSlice } from "./slices/static-old-man.ts";
import { createBackgroundImageSlice, BackgroundImageSlice } from "./slices/background-image.ts";
import { createImageSlice, ImageSlice } from "./slices/image.ts";
import { createThemeSlice, ThemeSlice } from "./slices/theme.ts";

export const useBoundStore = create<
  AppSlice & StaticOldManSlice & BackgroundImageSlice & ImageSlice & ThemeSlice
>((...a) => ({
  ...createAppSlice(...a),
  ...createStaticOldManSlice(...a),
  ...createBackgroundImageSlice(...a),
  ...createImageSlice(...a),
  ...createThemeSlice(...a),
}));
