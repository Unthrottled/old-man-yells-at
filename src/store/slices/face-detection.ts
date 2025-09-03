import { FaceDetector, FilesetResolver } from "@mediapipe/tasks-vision";
import { StateCreator } from "zustand";

import { AppSlice } from "./app.ts";
import { BackgroundImageSlice } from "./background-image.ts";

export interface FaceDetectionSlice {
  faceDetector: FaceDetector | undefined;
  detectFaces: (image: HTMLImageElement) => void;
}

export const createFaceDetectionSlice: StateCreator<
  FaceDetectionSlice & AppSlice & BackgroundImageSlice,
  [],
  [],
  FaceDetectionSlice
> = (set, get) => {
  function startInitializingFaceDetector() {
    async function initializeFaceDetector() {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm",
      );
      const faceDetector = await FaceDetector.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
          delegate: "GPU",
        },
        runningMode: "IMAGE",
      });
      set(() => ({ faceDetector, status: "INPUT" }));
    }
    initializeFaceDetector();

    return undefined;
  }

  return {
    faceDetector: startInitializingFaceDetector(),
    detectFaces(image: HTMLImageElement) {
      // Initialize background image when face detection is done
      const initializeBackgroundImage = get().initializeBackgroundImage;
      initializeBackgroundImage(image.naturalWidth, image.naturalHeight);
      
      set(() => ({ status: "READY" }));
    },
  };
};
