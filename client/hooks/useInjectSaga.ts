import { useEffect } from 'react';
import { Saga } from 'redux-saga';
import { store } from 'store';

export const useInjectSaga = (key: string, saga: Saga): void => {
  useEffect(() => {
    store.injectSaga(key, saga);

    return () => {
      store.ejectSaga(key);
    };
  }, [key, saga]);
};
