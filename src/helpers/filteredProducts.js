import * as R from "remeda";

export const getCategoryWiseProducts = (categories) => (products) =>
  !categories.length
    ? products
    : R.filter(products, (product) =>
        categories.some(
          (category) =>
            product.category_name.toUpperCase() === category.toUpperCase(),
        ),
      );

export const getPricedProducts = (price) => (products) =>
  price.length
    ? R.filter(products, ({ discounted_price }) =>
        price.some(
          (amount) =>
            discounted_price >= amount.min && discounted_price <= amount.max,
        ),
      )
    : products;

export const getRatedProducts = (rating) => (products) =>
  rating
    ? R.filter(products, ({ rating: ratings }) => rating <= ratings)
    : products;

export const getSortedProducts = (sortType) => (products) =>
  sortType
    ? R.sortBy(products, [
        R.prop("discounted_price"),
        sortType === "lowToHigh" ? "asc" : "desc",
      ])
    : products;

export const getSearchedProducts = (input) => (products) =>
  input
    ? R.filter(products, ({ name }) =>
        name.toLowerCase().includes(input.toLowerCase()),
      )
    : products;

export const getFilteredProducts = (
  allProductsFromApi,
  inputSearch,
  rating,
  categories,
  price,
  sort,
) => {
  return R.pipe(
    allProductsFromApi,
    getSearchedProducts(inputSearch),
    getRatedProducts(rating),
    getCategoryWiseProducts(categories),
    getPricedProducts(price),
    getSortedProducts(sort),
  );
};
