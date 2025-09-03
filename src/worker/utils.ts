import { BitmapImage } from "gifwrap";
import Jimp from "jimp";

import type { Blit, ResizeClass } from "../index.d.ts";

export function getFrameDelay(
  configurationOptions: ConfigurationOptions,
  frameNumber: number,
  numberOfFrames: number,
): number {
  const { frameDelay, lastFrameDelay } = configurationOptions;
  const isLastFrame = frameNumber === numberOfFrames - 1;
  return Math.round(
    (isLastFrame && lastFrameDelay.enabled ? lastFrameDelay.value : frameDelay) / 10,
  );
}

function getMovementForFrame(
  direction: OldManDirection,
  { width: imageWidth, height: imageHeight }: Bitmap,
  { width: oldManWidth, height: oldManHeight }: Bitmap,
  scaledX: number,
  scaledY: number,
  frameNumber: number,
  numberOfFrames: number,
) {
  if (direction === "up") {
    const yMovementPerFrame = (scaledY + oldManHeight) / numberOfFrames;
    return { x: scaledX, y: frameNumber * yMovementPerFrame - oldManHeight };
  }
  if (direction === "down") {
    const yMovementPerFrame = (imageHeight - scaledY) / numberOfFrames;
    return {
      x: scaledX,
      y: imageHeight - frameNumber * yMovementPerFrame,
    };
  }
  if (direction === "left") {
    const xMovementPerFrame = (scaledX + oldManWidth) / numberOfFrames;
    return { x: frameNumber * xMovementPerFrame - oldManWidth, y: scaledY };
  } else {
    const xMovementPerFrame = (imageWidth - scaledX) / numberOfFrames;
    return {
      x: imageWidth - frameNumber * xMovementPerFrame,
      y: scaledY,
    };
  }
}

export function renderOldManFrame(
  oldMenList: OldMan[],
  oldManImages: Record<nanoId, Jimp>,
  originalImage: Jimp & Blit,
  scaleX: number,
  scaleY: number,
  frameNumber: number,
  configurationOptions: ConfigurationOptions,
): BitmapImage {
  const { numberOfFrames, frameDelay } = configurationOptions;
  const jimpFrame = originalImage.clone();
  for (const oldMan of oldMenList) {
    const scaledX = scaleX * oldMan.coordinates.x;
    const scaledY = scaleY * oldMan.coordinates.y;
    const movement = getMovementForFrame(
      oldMan.direction,
      originalImage.bitmap,
      oldManImages[oldMan.id].bitmap,
      scaledX,
      scaledY,
      frameNumber,
      numberOfFrames,
    );
    jimpFrame.blit(oldManImages[oldMan.id], movement.x, movement.y);
  }
  const jimpBitmap = new BitmapImage(jimpFrame.bitmap);
  jimpBitmap.delayCentisecs = getFrameDelay(
    configurationOptions,
    frameNumber,
    numberOfFrames,
  );
  return jimpBitmap;
}

function maybeFlipImage(image: Jimp, oldMan: OldMan) {
  if (oldMan.flipHorizontally) {
    image.flip(true, false);
  }
  if (oldMan.flipVertically) {
    image.flip(false, true);
  }
}

const oldManImagesCache: Record<string, Jimp & ResizeClass> = {};

export async function getOldManImages(
  oldMenList: OldMan[],
  scaleX: number,
  scaleY: number,
): Promise<Record<nanoId, Jimp>> {
  const outputList = {} as Record<nanoId, Jimp>;
  for (const oldMan of oldMenList) {
    const cacheKey = `${oldMan.styleUrl} ${oldMan.size.width} ${oldMan.size.height} ${scaleX} ${scaleY}`;
    if (!oldManImagesCache[cacheKey]) {
      const oldManImage = await Jimp.read(oldMan.styleUrl);
      oldManImagesCache[cacheKey] = oldManImage.resize(
        scaleX * oldMan.size.width,
        scaleY * oldMan.size.height,
        Jimp.RESIZE_BICUBIC,
      );
    }
    const oldManImage = oldManImagesCache[cacheKey].clone();
    maybeFlipImage(oldManImage, oldMan);
    outputList[oldMan.id] = oldManImage;
  }
  return outputList;
}
