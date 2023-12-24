import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    sidebar: false,
  },
  reducers: {
    show(state) {
      state.sidebar = true;
      document.querySelector("body").style.overflow = "hidden";
    },
    hide(state) {
      state.sidebar = false;
      document.querySelector("body").style.overflow = "unset";
    },
  },
});

export const sidebarActions = sidebarSlice.actions;
export default sidebarSlice;
