import { createSlice } from "@reduxjs/toolkit";
import { DrawerAction, DrawerState } from "types/drawer";

const initialState: DrawerState = {
  visible: false,
};

export const drawer = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    setVisible: (state: DrawerState, action: DrawerAction): void => {
      state.visible = action.payload;
    },
  },
});

export const { setVisible } = drawer.actions;
