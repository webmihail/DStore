import { createSlice } from "@reduxjs/toolkit";
import {
  CategorySuccessAction,
  CategoryLoadAction,
  CategoryState,
  ErrorAction,
} from "types/categories";

const initialState: CategoryState = {
  category: null,
  loading: false,
  error: false,
};

export const category = createSlice({
  name: "category",
  initialState,
  reducers: {
    getCategory: (state: CategoryState, action: CategoryLoadAction): void => {
      state.loading = action.payload.loading;
    },
    actionCategorySuccess: (
      state: CategoryState,
      action: CategorySuccessAction
    ): void => {
      state.category = action.payload.category;
      state.loading = action.payload.loading;
      state.error = action.payload.error;
    },
    actionCategoryError: (state: CategoryState, action: ErrorAction): void => {
      state.error = action.payload.error;
    },
  },
});

export const { getCategory, actionCategorySuccess, actionCategoryError } =
  category.actions;
