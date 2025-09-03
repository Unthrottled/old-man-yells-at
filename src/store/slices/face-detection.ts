import { FaceDetector, FilesetResolver } from "@mediapipe/tasks-vision";
import { StateCreator } from "zustand";

import { getDefaultTargetImage } from "../../lib/target-image.ts";

import { AppSlice } from "./app.ts";
import { TargetImageSlice } from "./target-image.ts";

export interface FaceDetectionSlice {
  faceDetector: FaceDetector | undefined;
  detectFaces: (image: HTMLImageElement) => void;
}

export const createFaceDetectionSlice: StateCreator<
  FaceDetectionSlice & AppSlice & TargetImageSlice,
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
      function getDetectedTargets(): TargetImage[] {
        const faceDetector = get().faceDetector;
        if (!faceDetector) {
          return [getDefaultTargetImage()];
        }

        const faces = faceDetector.detect(image).detections;
        if (faces.length === 0) {
          return [getDefaultTargetImage()];
        }

        // For now, just create one default target when faces are detected
        // In the future, could position targets near detected faces
        return [getDefaultTargetImage()];
      }

      set(() => ({ targetImages: getDetectedTargets(), status: "READY" }));
    },
  };
};
