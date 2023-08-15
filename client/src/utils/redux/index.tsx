"use client";

import { createSlice } from "@reduxjs/toolkit";

const initState = {
  isLoggedIn: false,
  token: null,
  userId: null,
}

export const auth = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export const { login, logout } = auth.actions;
export default auth.reducer;