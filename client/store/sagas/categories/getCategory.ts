import { notification } from "antd";
import { getCategoryByIdApi } from "api/categories";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  getCategory,
  actionCategoryError,
  actionCategorySuccess,
} from "store/reducers/categories/category";
import { Category, CategoryLoadAction, Subcategory } from "types/categories";

export function* getCategorySaga() {
  yield takeEvery(getCategory.type, onGetCategory);

  function* onGetCategory(action: CategoryLoadAction) {
    try {
      const data: Category | Subcategory = yield call(() =>
        getCategoryByIdApi(action.payload)
      );

      yield put(
        actionCategorySuccess({ category: data, loading: false, error: false })
      );
    } catch (error) {
      notification.error({
        message: "Серверная ошибка!",
        description: "К сожалению не удалось загрузить категорию товара.",
      });
      yield put(actionCategoryError());
      throw error;
    }
  }
}
