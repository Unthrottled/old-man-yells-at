import { produce } from "immer";
import { StateCreator } from "zustand";

export interface AppSlice {
  status: AppStatus;
  mode: AppMode;
  messageApi: any;
  drawerOpen: boolean;
  setStatus: (newStatus: AppStatus) => void;
  setMessageApi: (messageApi: any) => void;
  setDrawerOpen: (open: boolean) => void;
  goBackToStart: () => void;
}

export const createAppSlice: StateCreator<AppSlice> = (set) => ({
  status: "START",
  mode: "NORMAL",
  messageApi: undefined,
  drawerOpen: false,
  setStatus: (newStatus: AppStatus) =>
    set(
      produce((draft) => {
        draft.status = newStatus;
      }),
    ),
  setMessageApi: (messageApi: any) =>
    set(
      produce((draft) => {
        draft.messageApi = messageApi;
      }),
    ),
  setDrawerOpen: (open: boolean) =>
    set(
      produce((draft) => {
        draft.drawerOpen = open;
      }),
    ),
  goBackToStart: () =>
    set(
      produce((draft) => {
        draft.status = "START";
      }),
    ),
});
