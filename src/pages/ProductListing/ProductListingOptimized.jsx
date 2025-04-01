import React from "react";

import "./ProductListing.css";
import { Filter } from "./components/Filter/FilterOptimized";
import { ProductListingSection } from "./components/ProductListingSection/ProductListingSectionOptimized";

export const ProductListing = () => {
  return (
    <div className="page-container">
      <Filter className="filters" />
      <ProductListingSection className="products-container" />
    </div>
  );
};

export default ProductListing;
