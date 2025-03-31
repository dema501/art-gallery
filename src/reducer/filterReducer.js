export const initialFilterState = {
  rating: "",
  categories: [],
  price: [],
  sort: "",
};

export const filterActionTypes = {
  ADD_RATINGS: "ADD_RATINGS",
  ADD_CATEGORIES: "ADD_CATEGORIES",
  ADD_PRICE: "ADD_PRICE",
  ADD_SORT: "ADD_SORT",
  RESET: "RESET",
};

export const filterReducer = (state = initialFilterState, action) => {
  const { type, payload } = action;

  console.log("Action Type:", type, "Payload:", payload);

  switch (type) {
    case filterActionTypes.ADD_RATINGS:
      return {
        ...state,
        filters: {
          ...state.filters,
          rating: payload,
        },
      };

    case filterActionTypes.ADD_CATEGORIES:
      // Toggle category (add if not present, remove if present)
      const updatedCategories = state.filters.categories.includes(payload)
        ? state.filters.categories.filter((category) => category !== payload)
        : [...state.filters.categories, payload];

      return {
        ...state,
        filters: {
          ...state.filters,
          categories: updatedCategories,
        },
      };

    case filterActionTypes.ADD_PRICE:
      const isPricePresent = state.filters.price.some(
        (priceRange) =>
          priceRange.min === payload.min && priceRange.max === payload.max,
      );

      const updatedPrice = isPricePresent
        ? state.filters.price.filter(
            (priceRange) =>
              !(
                priceRange.min === payload.min && priceRange.max === payload.max
              ),
          )
        : [...state.filters.price, payload];

      return {
        ...state,
        filters: {
          ...state.filters,
          price: updatedPrice,
        },
      };

    case filterActionTypes.ADD_SORT:
      return {
        ...state,
        filters: {
          ...state.filters,
          sort: payload,
        },
      };

    case filterActionTypes.RESET:
      return {
        ...state,
        filters: initialFilterState,
      };

    default:
      return state;
  }
};
