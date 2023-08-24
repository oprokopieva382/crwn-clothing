import { fetchCategoryFailed, fetchCategoryStart, fetchCategorySuccess } from "../category.action";
import { CATEGORIES_INITIAL_STATE, categoryReducer } from "../categoryReducer";

describe("Category Reducer tests", () => {
  test("fetchCategoriesStart", () => {
    const expectedState = {
      ...CATEGORIES_INITIAL_STATE,
      isLoading: true,
    };

    expect(
      categoryReducer(CATEGORIES_INITIAL_STATE, fetchCategoryStart())
    ).toEqual(expectedState);
  });

  test("fetchCategorySuccess", () => {
    const mockData = [
      {
        title: "mens",
        imageUrl: "test",
        items: [
          { id: 1, name: "product 1" },
          { id: 2, name: "product 2" },
        ],
      },
      {
        title: "womens",
        imageUrl: "test2",
        items: [
          { id: 3, name: "product 3" },
          { id: 4, name: "product 4" },
        ],
      },
    ];

    const expectedState = {
      ...CATEGORIES_INITIAL_STATE,
      isLoading: false,
      categories: mockData,
    };

    expect(
      categoryReducer(CATEGORIES_INITIAL_STATE, fetchCategorySuccess(mockData))
    ).toEqual(expectedState);
  });

test("fetchCategoryFailed", () => {
  const mockError = new Error("Error fetching categories")

  const expectedState = {
    ...CATEGORIES_INITIAL_STATE,
    isLoading: false,
    error: mockError,
  };

  expect(
    categoryReducer(CATEGORIES_INITIAL_STATE, fetchCategoryFailed(mockError))
  ).toEqual(expectedState);
});

});
