import { createSlice } from "@reduxjs/toolkit";
import { CategoryAction, CategoryLoadAction, CategoryState } from "types/categories";

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
      state.loading = true;
      state.error = false;
    },
    actionCategorySuccess: (
      state: CategoryState,
      action: CategoryAction
    ): void => {
      state.category = action.payload.category;
      state.loading = false;
      state.error = false;
    },
    actionCategoryError: (state: CategoryState): void => {
      state.error = true;
      state.loading = false;
    },
  },
});

export const {
  getCategory,
  actionCategorySuccess,
  actionCategoryError,
} = category.actions;
