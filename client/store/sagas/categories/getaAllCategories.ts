import { notification } from "antd";
import { getCategoriesListApi } from "api/categories";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAllCategories,
  getAllCategoriesError,
  getAllCategoriesSuccess,
} from "store/reducers/categories/categories";
import { Category } from "types/categories";

export function* getAllCategoriesSaga() {
  yield takeEvery(getAllCategories.type, onGetAllCategories);

  function* onGetAllCategories() {
    try {
      const data: Category[] = yield call(getCategoriesListApi);

      yield put(
        getAllCategoriesSuccess({
          categories: data,
          loading: false,
          error: false,
        })
      );
    } catch (error) {
      notification.error({
        message: "Серверная ошибка!",
        description:
          "К сожалению не удалось загрузить список категорий товаров.",
      });
      yield put(getAllCategoriesError({ error: true }));
      throw error;
    }
  }
}
