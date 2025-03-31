import { initialState, dataReducer } from "./dataReducer";

describe("dataReducer", () => {
  it("should return the initial state", () => {
    expect(dataReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_ALL_PRODUCTS_FROM_API", () => {
    const payload = [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ];
    const action = { type: "GET_ALL_PRODUCTS_FROM_API", payload };
    const expectedState = { ...initialState, allProductsFromApi: payload };
    expect(dataReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle GET_ALL_CATEGORIES", () => {
    const payload = ["Category A", "Category B"];
    const action = { type: "GET_ALL_CATEGORIES", payload };
    const expectedState = { ...initialState, allCategories: payload };
    expect(dataReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle SEARCH", () => {
    const payload = "search term";
    const action = { type: "SEARCH", payload };
    const expectedState = { ...initialState, inputSearch: payload };
    expect(dataReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle ADD_RATINGS", () => {
    const payload = "4 stars";
    const action = { type: "ADD_RATINGS", payload };
    const expectedState = {
      ...initialState,
      filters: { ...initialState.filters, rating: payload },
    };
    expect(dataReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle ADD_CATEGORIES (add new category)", () => {
    const payload = "Category A";
    const action = { type: "ADD_CATEGORIES", payload };
    const expectedState = {
      ...initialState,
      filters: { ...initialState.filters, categories: [payload] },
    };
    expect(dataReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle ADD_CATEGORIES (remove existing category)", () => {
    const initialStateWithCategory = {
      ...initialState,
      filters: {
        ...initialState.filters,
        categories: ["Category A", "Category B"],
      },
    };
    const payload = "Category A";
    const action = { type: "ADD_CATEGORIES", payload };
    const expectedState = {
      ...initialState,
      filters: { ...initialState.filters, categories: ["Category B"] },
    };
    expect(dataReducer(initialStateWithCategory, action)).toEqual(
      expectedState,
    );
  });

  it("should handle ADD_SORT", () => {
    const payload = "price high to low";
    const action = { type: "ADD_SORT", payload };
    const expectedState = {
      ...initialState,
      filters: { ...initialState.filters, sort: payload },
    };
    expect(dataReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle ADD_PRICE (add new price range)", () => {
    const payload = { min: 10, max: 50 };
    const action = { type: "ADD_PRICE", payload };
    const expectedState = {
      ...initialState,
      filters: { ...initialState.filters, price: [payload] },
    };
    expect(dataReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle ADD_PRICE (remove existing price range)", () => {
    const initialStateWithPrice = {
      ...initialState,
      filters: {
        ...initialState.filters,
        price: [
          { min: 10, max: 50 },
          { min: 100, max: 200 },
        ],
      },
    };
    const payload = { min: 10, max: 50 };
    const action = { type: "ADD_PRICE", payload };
    const expectedState = {
      ...initialState,
      filters: { ...initialState.filters, price: [{ min: 100, max: 200 }] },
    };
    expect(dataReducer(initialStateWithPrice, action)).toEqual(expectedState);
  });

  it("should handle ADD_CATEGORIES_FROM_HOME", () => {
    const payload = "Category A";
    const action = { type: "ADD_CATEGORIES_FROM_HOME", payload };
    const expectedState = {
      ...initialState,
      filters: { ...initialState.filters, categories: [payload] },
    };
    expect(dataReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle RESET", () => {
    const resetFilters = {
      rating: "3 stars",
      categories: ["Category A"],
      price: [{ min: 50, max: 100 }],
      sort: "price low to high",
    };
    const initialStateWithFilters = { ...initialState, filters: resetFilters };
    const action = { type: "RESET", payload: initialState.filters };
    expect(dataReducer(initialStateWithFilters, action)).toEqual(initialState);
  });

  it("should handle default case (return current state)", () => {
    const action = { type: "UNKNOWN_ACTION" };
    expect(dataReducer(initialState, action)).toEqual(initialState);
  });
});
