import { testSaga, expectSaga } from "redux-saga-test-plan";
import { throwError} from "redux-saga-test-plan/providers";
import {
  categoriesSaga,
  fetchCategoriesAsync,
  onFetchCategories,
} from "../category.saga";
import { call } from "typed-redux-saga/macro";
import { CATEGORY_ACTION_TYPE } from "../category.types";
import { getCategoriesAndDocuments } from "../../../utils/firebase/firebase.utils";
import { fetchCategoryFailed, fetchCategorySuccess } from "../category.action";
describe("Category sagas", () => {
  test("categoriesSaga", () => {
    testSaga(categoriesSaga)
      .next()
      .all([call(onFetchCategories)])
      .next()
      .isDone();
  });

  test("onFetchCategories", () => {
    testSaga(onFetchCategories)
      .next()
      .takeLatest(
        CATEGORY_ACTION_TYPE.FETCH_CATEGORIES_START,
        fetchCategoriesAsync
      )
      .next()
      .isDone();
  });

  test("fetchCategoriesAsync success", () => {
    const mockCategoriesArray = [
      { id: 1, name: "Category 1" },
      { id: 12, name: "Category 12" },
    ];

    return expectSaga(fetchCategoriesAsync)
      .provide([[call(getCategoriesAndDocuments), mockCategoriesArray]])
      .put(fetchCategorySuccess(mockCategoriesArray))
      .run();
  });

  test("fetchCategoriesAsync failure", () => {
    const mockCategoriesError = new Error("Error in fetchCategoriesAsync");

    return expectSaga(fetchCategoriesAsync)
      .provide([[call(getCategoriesAndDocuments), throwError(mockCategoriesError)]])
      .put(fetchCategoryFailed(mockCategoriesError))
      .run();
  });
});
