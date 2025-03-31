import { createContext } from "react";

export const FilterContext = createContext({
  inputSearch: "",
  setInputSearch: () => {},
  rating: "",
  setRating: () => {},
  categories: [],
  setCategories: () => {},
  price: [],
  setPrice: () => {},
  sort: "",
  setSort: () => {},
  page: 1,
  setPage: () => {},
  limit: 12,
  setLimit: () => {},
});
