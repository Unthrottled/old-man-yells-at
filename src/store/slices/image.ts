import { StateCreator } from "zustand";

import { fileToDataUrl } from "../../lib/utils.ts";

export interface ImageSlice {
  inputFile: File | undefined;
  inputImageDataUrl: string;
  setInputFile: (file: File) => Promise<void>;
}

export const createImageSlice: StateCreator<ImageSlice> = (set) => ({
  inputFile: undefined,
  inputImageDataUrl: "",
  setInputFile: async (file) => {
    const detectedMode = file.name.match(/(hedgehog)/gi)
      ? "HEDGEHOG"
      : "NORMAL";

    const dataUrl = await fileToDataUrl(file);

    set(() => ({
      inputFile: file,
      inputImageDataUrl: dataUrl,
      mode: detectedMode,
      status: "READY",
    }));
  },
});
