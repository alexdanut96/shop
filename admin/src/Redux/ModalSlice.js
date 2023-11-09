import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modal: false,
    refresh: false,
  },
  reducers: {
    show(state) {
      state.modal = true;
    },
    hide(state) {
      state.modal = false;
    },
    refresh(state) {
      state.refresh = !state.refresh;
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice;
