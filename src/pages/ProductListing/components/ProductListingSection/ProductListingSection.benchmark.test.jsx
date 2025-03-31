import React from "react";
import { render, act } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import { ProductListingSection } from "./ProductListingSection";
import { ProductListingSection as ProductListingSectionOptimized } from "./ProductListingSectionOptimized";

import { products } from "../../../../backend/db/products.js";
import { useData } from "../../../../contexts/DataProvider.js";
import { useUserData } from "../../../../contexts/UserDataProvider.js";

jest.mock("../../../../contexts/DataProvider", () => ({
  useData: jest.fn(),
}));

jest.mock("../../../../contexts/UserDataProvider.js", () => ({
  useUserData: jest.fn(),
}));

describe("ProductListingSection Performance Benchmark", () => {
  let unoptimizedTime = 0;
  let optimizedTime = 0;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const runBenchmark = async (component) => {
    const iterations = 10; // Number of times to run the test
    let totalTime = 0;

    const mockState = {
      allProductsFromApi: products,
      filters: { price: [], categories: [], rating: "", sort: "" },
      inputSearch: "",
    };

    const mockUseData = { state: mockState };
    const mockUseUserData = {
      isProductInCart: () => false,
      addToCartHandler: jest.fn(),
      wishlistHandler: jest.fn(),
      isProductInWishlist: () => false,
      cartLoading: false,
    };

    useData.mockReturnValue(mockUseData);
    useUserData.mockReturnValue(mockUseUserData);

    for (let i = 0; i < iterations; i++) {
      const startTime = performance.now();

      await act(async () => {
        render(
          <BrowserRouter
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          >
            {component}
          </BrowserRouter>,
        );
      });

      const endTime = performance.now();
      totalTime += endTime - startTime;
    }

    const averageTime = totalTime / iterations;
    return averageTime;
  };

  it("benchmarks rendering time (Unoptimized)", async () => {
    unoptimizedTime = await runBenchmark(<ProductListingSection />);
    expect(unoptimizedTime).toBeGreaterThan(0);
    console.log(`Unoptimized Rendering Time: ${unoptimizedTime.toFixed(2)}ms`);
  }, 60000);

  it("benchmarks rendering time (Optimized)", async () => {
    optimizedTime = await runBenchmark(<ProductListingSectionOptimized />);
    expect(optimizedTime).toBeGreaterThan(0); // Sanity check
    console.log(`Optimized Rendering Time: ${optimizedTime.toFixed(2)}ms`);
  }, 60000);

  it("compare optimized and unoptimized rendering time", async () => {
    console.log(
      `Average Render Time: unoptimized ${unoptimizedTime.toFixed(2)}ms vs optimized ${optimizedTime.toFixed(2)}ms`,
    );

    expect(unoptimizedTime).toBeGreaterThan(optimizedTime);
  }, 60000);
});
