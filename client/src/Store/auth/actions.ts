import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "..";
import authServices from "../../Services/authService";
import { authActions } from "./reducer";

export const setCount = (count: number) => (dispatch: AppDispatch) => {
  dispatch(authActions.setCount(count));
};
