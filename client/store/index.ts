import createSagaMiddleware from "@redux-saga/core";
import { configureStore, Store } from "@reduxjs/toolkit";
import { Context, createWrapper, MakeStore } from "next-redux-wrapper";
import { reducer, rootReducer } from "./reducers";
import { rootSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === "production" ? false : true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

const makeStore: MakeStore<Store<RootState>> = (context: Context) => store;

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: true,
});
