import React, { Suspense, lazy } from "react"; // Import lazy and Suspense

import { Route, Routes } from "react-router-dom";

import { RequiresAuth } from "../components/requires-auth/RequiresAuth";
import { Loader } from "../components/Loader/Loader";

import Home from "../pages/Home/Home";

const Cart = lazy(() => import("../pages/Cart/Cart"));
const Login = lazy(() => import("../pages/auth/Login/Login"));
const ProductListing = lazy(
  () => import("../pages/ProductListing/ProductListingOptimized"),
);
const ProductDetails = lazy(
  () => import("../pages/ProductDetails/ProductDetails"),
);
const Signup = lazy(() => import("../pages/auth/Signup/Signup"));
const Logout = lazy(() => import("../pages/auth/Logout/Logout"));
const Checkout = lazy(() => import("../pages/Checkout/Checkout"));
const Wishlist = lazy(() => import("../pages/Wishlist/Wishlist"));
const UserProfile = lazy(() => import("../pages/UserProfile/UserProfile"));
const Profile = lazy(() => import("../pages/UserProfile/Profile/Profile"));
const Addresses = lazy(
  () => import("../pages/UserProfile/Addresses/Addresses"),
);
const Orders = lazy(() => import("../pages/UserProfile/Orders/Orders"));
const PageNotFound = lazy(() => import("../pages/PageNotFound/PageNotFound"));

export const NavRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/cart"
          element={
            <RequiresAuth>
              <Cart />
            </RequiresAuth>
          }
        />
        <Route
          path="/wishlist"
          element={
            <RequiresAuth>
              <Wishlist />
            </RequiresAuth>
          }
        />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/product-listing" element={<ProductListing />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/product-details/:productId"
          element={<ProductDetails />}
        />
        <Route
          path="/checkout"
          element={
            <RequiresAuth>
              <Checkout />
            </RequiresAuth>
          }
        />
        <Route path="/profile" element={<UserProfile />}>
          <Route
            path="/profile/"
            element={
              <RequiresAuth>
                <Profile />
              </RequiresAuth>
            }
          />
          <Route path="/profile/orders" element={<Orders />} />
          <Route path="/profile/addresses" element={<Addresses />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
