import React, { useMemo } from "react";

import { ProductCard } from "./ProductCard";

import { useData } from "../../../../contexts/DataProvider.js";
import { getFilteredProducts } from "../../../../helpers/filteredProducts.js";

import "./ProductListingSection.css";

export const ProductListingSection = () => {
  const { loading, state } = useData();

  const {
    allProductsFromApi,
    inputSearch,
    filters: { rating, categories, price, sort },
  } = state;

  const { sortedProducts, hasProducts } = useMemo(() => {
    if (loading) {
      return {
        sortedProducts: [],
        hasProducts: false,
      };
    }

    const filtered = getFilteredProducts(
      allProductsFromApi,
      inputSearch,
      rating,
      categories,
      price,
      sort,
    );
    return {
      sortedProducts: filtered,
      hasProducts: filtered.length > 0,
    };
  }, [
    allProductsFromApi,
    inputSearch,
    rating,
    categories,
    price,
    sort,
    loading,
  ]);

  return (
    <div className="product-card-container">
      {loading ? null : !hasProducts ? (
        <h2 className="no-products-found">
          Sorry, there are no matching products!
        </h2>
      ) : (
        sortedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      )}
    </div>
  );
};
