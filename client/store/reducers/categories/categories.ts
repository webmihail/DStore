import { createSlice } from "@reduxjs/toolkit";
import { CategoriesAction, CategoriesState } from "types/categories";

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: false,
};

export const categories = createSlice({
  name: "categories",
  initialState,
  reducers: {
    getAllCategories: (state: CategoriesState): void => {
      state.loading = true;
      state.error = false;
    },
    getAllCategoriesSuccess: (
      state: CategoriesState,
      action: CategoriesAction
    ): void => {
      state.categories = action.payload.categories;
      state.loading = false;
      state.error = false;
    },
    getAllCategoriesError: (state: CategoriesState): void => {
      state.error = true;
      state.loading = false;
    },
  },
});

export const {
  getAllCategories,
  getAllCategoriesSuccess,
  getAllCategoriesError,
} = categories.actions;
