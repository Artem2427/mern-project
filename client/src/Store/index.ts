import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authSlice from "./auth/reducer";

const rootReducer = combineReducers({
  authSlice,
});

export const store = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore["dispatch"];
