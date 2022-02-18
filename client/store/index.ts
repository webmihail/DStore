import createSagaMiddleware from "@redux-saga/core";
import { configureStore, EnhancedStore, Store } from "@reduxjs/toolkit";
import { Context, createWrapper, MakeStore } from "next-redux-wrapper";
import { reducer, rootReducer } from "./reducers";
import { createSagaInjector, CreateSagaInjectorMethods } from "./sagaInjector";
import { rootSaga } from "./sagas";

const configureStoreWithInjectSaga = (): EnhancedStore<RootState> & CreateSagaInjectorMethods => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV === "production" ? false : true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware),
  });

  Object.assign(store, createSagaInjector(sagaMiddleware.run, rootSaga));

  return store as EnhancedStore<RootState> & CreateSagaInjectorMethods;
};

export const store = configureStoreWithInjectSaga();
const makeStore: MakeStore<Store<RootState>> = (context: Context) => store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: true,
});
