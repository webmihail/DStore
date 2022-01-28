import createSagaMiddleware from "@redux-saga/core";
import { Context, createWrapper, MakeStore } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { RootState, reducer } from "./reducers";
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

const store = createStore(reducer, enhancer);

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;

const makeStore: MakeStore<Store<RootState>> = (context: Context) => store;

export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: true,
});
