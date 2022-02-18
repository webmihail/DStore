import { createSlice } from "@reduxjs/toolkit";
import { CategoriesSuccessAction, CategoriesState, ErrorAction, CategoriesLoadAction } from "types/categories";

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: false,
};

export const categories = createSlice({
  name: "categories",
  initialState,
  reducers: {
    getAllCategories: (state: CategoriesState, action: CategoriesLoadAction): void => {
      state.loading = action.payload.loading;
    },
    getAllCategoriesSuccess: (
      state: CategoriesState,
      action: CategoriesSuccessAction
    ): void => {
      state.categories = action.payload.categories;
      state.error = action.payload.error;
      state.loading = action.payload.loading;
    },
    getAllCategoriesError: (state: CategoriesState, action: ErrorAction): void => {
      state.error = action.payload.error;
    },
  },
});

export const {
  getAllCategories,
  getAllCategoriesSuccess,
  getAllCategoriesError,
} = categories.actions;
