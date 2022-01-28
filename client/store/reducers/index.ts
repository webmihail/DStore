import { HYDRATE } from "next-redux-wrapper";
import { AnyAction, combineReducers } from "redux";

const rootReducer = combineReducers({});

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

export type RootState = ReturnType<typeof rootReducer>;
