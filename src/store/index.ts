import { create } from "zustand";

import { AppSlice, createAppSlice } from "./slices/app.ts";
import {
  createFaceDetectionSlice,
  FaceDetectionSlice,
} from "./slices/face-detection.ts";
import { createStaticOldManSlice, StaticOldManSlice } from "./slices/static-old-man.ts";
import { createTargetImageSlice, TargetImageSlice } from "./slices/target-image.ts";
import { createImageSlice, ImageSlice } from "./slices/image.ts";
import { createThemeSlice, ThemeSlice } from "./slices/theme.ts";

export const useBoundStore = create<
  AppSlice & FaceDetectionSlice & StaticOldManSlice & TargetImageSlice & ImageSlice & ThemeSlice
>((...a) => ({
  ...createAppSlice(...a),
  ...createFaceDetectionSlice(...a),
  ...createStaticOldManSlice(...a),
  ...createTargetImageSlice(...a),
  ...createImageSlice(...a),
  ...createThemeSlice(...a),
}));
