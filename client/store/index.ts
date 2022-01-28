import createSagaMiddleware from "@redux-saga/core";
import {
  applyMiddleware,
  compose,
  configureStore,
  Store,
} from "@reduxjs/toolkit";
import { Context, createWrapper, MakeStore } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer, rootReducer } from "./reducers";
import { rootSaga } from "./sagas";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const sagaMiddleware = createSagaMiddleware();

const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(sagaMiddleware))
    : composeWithDevTools(applyMiddleware(sagaMiddleware));

const store = configureStore({ reducer, enhancers: [enhancer] });
const makeStore: MakeStore<Store<RootState>> = (context: Context) => store;

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: true,
});
