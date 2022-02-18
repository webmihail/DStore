import { Saga } from 'redux-saga';

export interface CreateSagaInjectorMethods {
  injectSaga: (T: string, S: Saga) => void;
  ejectSaga: (T: string) => void;
}

export const createSagaInjector = (runSaga: (T: Saga) => {}, saga: Saga) => {
  const injectedSagas = new Map();
  const isInjected = (key: string): boolean => injectedSagas.has(key);
  const injectSaga = (key: string, saga: Saga): void => {
    if (isInjected(key)) {
      return;
    }
    const task = runSaga(saga);
    injectedSagas.set(key, task);
  };

  const ejectSaga = (key: string): void => {
    const task = injectedSagas.get(key);
    if (task.isRunning()) {
      task.cancel();
    }
    injectedSagas.delete(key);
  };

  injectSaga('root', saga);
  return { injectSaga, ejectSaga };
};