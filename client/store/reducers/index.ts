import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "..";

export const rootReducer = combineReducers({});

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
