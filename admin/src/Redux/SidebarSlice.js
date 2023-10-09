import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    sidebar: false,
  },
  reducers: {
    show(state) {
      state.sidebar = true;
    },
    hide(state) {
      state.sidebar = false;
    },
  },
});

export const sidebarActions = sidebarSlice.actions;
export default sidebarSlice;
