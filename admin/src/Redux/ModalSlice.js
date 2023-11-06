import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modal: false,
  },
  reducers: {
    show(state) {
      state.modal = true;
    },
    hide(state) {
      state.modal = false;
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice;
