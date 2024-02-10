import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    isAdmin: false,
  },
  reducers: {
    loginStart(state) {
      state.isFetching = true;
    },
    loginSuccess(state, action) {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure(state) {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    setAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
