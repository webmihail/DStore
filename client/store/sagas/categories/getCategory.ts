import { notification } from "antd";
import { getCategoryByIdApi } from "api/categories";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  getCategory,
  actionCategoryError,
  actionCategorySuccess,
} from "store/reducers/categories/category";
import { Category, CategoryLoadAction } from "types/categories";

export function* getCategorySaga() {
  yield takeEvery(getCategory.type, onGetCategory);

  function* onGetCategory(action: CategoryLoadAction) {
    const { id } = action.payload;

    try {
      const data: Category = yield call(() => getCategoryByIdApi(id));

      yield put(
        actionCategorySuccess({ category: data, loading: false, error: false })
      );
    } catch (error) {
      notification.error({
        message: "Серверная ошибка!",
        description: "К сожалению не удалось загрузить категорию товара.",
      });
      yield put(actionCategoryError({ error: true }));
      throw error;
    }
  }
}
