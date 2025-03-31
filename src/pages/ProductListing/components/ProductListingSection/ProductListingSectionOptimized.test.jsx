import React from "react";

import { render, screen, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ProductListingSection } from "./ProductListingSectionOptimized";

import { products } from "../../../../backend/db/products.js";
import { useData } from "../../../../contexts/DataProvider.js";
import { useUserData } from "../../../../contexts/UserDataProvider.js";

// Mock the contexts
jest.mock("../../../../contexts/DataProvider", () => ({
  useData: jest.fn(),
}));

jest.mock("../../../../contexts/UserDataProvider.js", () => ({
  useUserData: jest.fn(),
}));

describe("ProductListingSection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders products when available", async () => {
    // Arrange
    const mockState = {
      allProductsFromApi: products,
      filters: {
        price: [],
        categories: [],
        rating: "",
        sort: "",
      },
      inputSearch: "",
    };

    const mockUseData = {
      state: mockState,
    };

    const mockUseUserData = {
      isProductInCart: () => false,
      addToCartHandler: jest.fn(),
      wishlistHandler: jest.fn(),
      isProductInWishlist: () => false,
      cartLoading: false,
    };

    useData.mockReturnValue(mockUseData);
    useUserData.mockReturnValue(mockUseUserData);

    // Act
    await act(async () => {
      render(
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <ProductListingSection />
        </BrowserRouter>,
      );
    });

    expect(screen.getByTestId(products[0]._id)).toBeInTheDocument();

    const headingElements = screen.getAllByRole("heading", {
      name: (name) => products.some((product) => product.name === name), // Dynamically check names.
    });

    // Assert that the correct number of headings were rendered
    expect(headingElements.length).toBe(products.length);
  });

  test("renders 'Sorry, there are no matching products!' when no products match filters", async () => {
    const mockState = {
      allProductsFromApi: [], // No products
      filters: {
        price: [],
        categories: [],
        rating: "",
        sort: "",
      },
      inputSearch: "",
    };

    const mockUseData = {
      state: mockState,
    };

    const mockUseUserData = {
      isProductInCart: () => false,
      addToCartHandler: jest.fn(),
      wishlistHandler: jest.fn(),
      isProductInWishlist: () => false,
      cartLoading: false,
    };

    useData.mockReturnValue(mockUseData);
    useUserData.mockReturnValue(mockUseUserData);

    // Act
    await act(async () => {
      render(
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <ProductListingSection />
        </BrowserRouter>,
      );
    });

    // Assert
    expect(
      screen.getByText("Sorry, there are no matching products!"),
    ).toBeInTheDocument();
  });
});
