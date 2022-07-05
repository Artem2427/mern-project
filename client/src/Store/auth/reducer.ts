import { createSlice } from "@reduxjs/toolkit";

const initialAuthState: AuthState = {
  count: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setCount: (state, action) => {
      state.count = action.payload;
    },
  },

  extraReducers: {},
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
