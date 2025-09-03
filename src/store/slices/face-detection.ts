import { FaceDetector, FilesetResolver } from "@mediapipe/tasks-vision";
import { StateCreator } from "zustand";

import {
  getDefaultOldMan,
  getEyesDistance,
  getOldManSize,
  getNoseOffset,
  getRandomOldManStyle,
} from "../../lib/old-man.ts";

import { AppSlice } from "./app.ts";
import { OldManSlice } from "./old-man.ts";

export interface FaceDetectionSlice {
  faceDetector: FaceDetector | undefined;
  detectFaces: (image: HTMLImageElement) => void;
}

export const createFaceDetectionSlice: StateCreator<
  FaceDetectionSlice & AppSlice & OldManSlice,
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
      function getDetectedOldMen(): OldMan[] {
        const faceDetector = get().faceDetector;
        if (!faceDetector) {
          return [getDefaultOldMan()];
        }

        const faces = faceDetector.detect(image).detections;
        if (faces.length === 0) {
          return [getDefaultOldMan()];
        }

        const scaleX = image.width / image.naturalWidth;
        const scaleY = image.height / image.naturalHeight;

        const newOldMenList: OldMan[] = [];
        for (const face of faces) {
          for (const keypoint of face.keypoints) {
            keypoint.x *= image.naturalWidth;
            keypoint.y *= image.naturalHeight;
          }

          const newOldMan =
            faces.length === 1
              ? getDefaultOldMan()
              : getDefaultOldMan(getRandomOldManStyle());
          const originalOldManSize = getOldManSize(getEyesDistance());
          const originalEyesDistance = getEyesDistance();
          const eyesDistance = Math.sqrt(
            Math.pow(scaleY * (face.keypoints[0].y - face.keypoints[1].y), 2) +
              Math.pow(scaleX * (face.keypoints[0].x - face.keypoints[1].x), 2),
          );
          const oldManScale = eyesDistance / originalEyesDistance;
          newOldMan.size.width = originalOldManSize.width * oldManScale;
          newOldMan.size.height = originalOldManSize.height * oldManScale;
          const noseX = face.keypoints[2].x;
          const noseY = Math.abs(face.keypoints[0].y - face.keypoints[1].y) / 2;
          const noseOffset = getNoseOffset();
          const oldManScaleX = newOldMan.size.width / originalOldManSize.width;
          const oldManScaleY = newOldMan.size.height / originalOldManSize.height;
          newOldMan.coordinates = {
            x: Math.abs(noseX * scaleX - noseOffset.x * oldManScaleX),
            y: Math.abs(
              (face.keypoints[0].y + noseY) * scaleY -
                noseOffset.y * oldManScaleY,
            ),
          };

          newOldMenList.push(newOldMan);
        }

        return newOldMenList;
      }

      set(() => ({ oldMenList: getDetectedOldMen(), status: "READY" }));
    },
  };
};
