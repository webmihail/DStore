import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "..";
import { categories } from "./categories/categories";
import { category } from "./categories/category";

export const rootReducer = combineReducers({
  category: category.reducer,
  categories: categories.reducer,
});

export const actions = {
  ...categories.actions,
  ...category.actions,
};

export const reducer = (state: RootState | any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (state.count) nextState.count = state.count;
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};
