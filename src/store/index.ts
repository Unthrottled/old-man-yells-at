import { create } from "zustand";

import { AppSlice, createAppSlice } from "./slices/app.ts";
import {
  createFaceDetectionSlice,
  FaceDetectionSlice,
} from "./slices/face-detection.ts";
import { createOldManSlice, OldManSlice } from "./slices/old-man.ts";
import { createImageSlice, ImageSlice } from "./slices/image.ts";
import { createThemeSlice, ThemeSlice } from "./slices/theme.ts";

export const useBoundStore = create<
  AppSlice & FaceDetectionSlice & OldManSlice & ImageSlice & ThemeSlice
>((...a) => ({
  ...createAppSlice(...a),
  ...createFaceDetectionSlice(...a),
  ...createOldManSlice(...a),
  ...createImageSlice(...a),
  ...createThemeSlice(...a),
}));
