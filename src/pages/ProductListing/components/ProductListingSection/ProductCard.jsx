import React, { useMemo, useContext } from "react";
import Tilt from "react-parallax-tilt";
import { Link } from "react-router-dom";
import { BsFillStarFill } from "react-icons/bs";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import LazyLoad from "react-lazyload";

import { useUserData } from "../../../../contexts/UserDataProvider.js";

export const ProductCard = React.memo(({ product }) => {
  const {
    cartLoading,
    addToCartHandler,
    wishlistHandler,
    isProductInCart,
    isProductInWishlist,
  } = useUserData();

  const {
    _id,
    id,
    name,
    original_price,
    discounted_price,
    category_name,
    is_stock,
    rating,
    reviews,
    trending,
    img,
  } = product;

  // Cache these values instead of calling functions repeatedly
  const inCart = useMemo(
    () => isProductInCart(product),
    [product, isProductInCart],
  );

  const inWishlist = useMemo(
    () => isProductInWishlist(product),
    [product, isProductInWishlist],
  );

  // Memoize the icon components
  const WishlistIcon = useMemo(() => {
    return inWishlist ? (
      <AiTwotoneHeart color="red" size={30} />
    ) : (
      <AiOutlineHeart size={30} />
    );
  }, [inWishlist]);

  return (
    <Tilt
      key={product._id}
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      glareEnable={false}
      transitionSpeed={2000}
      scale={1.02}
    >
      <div className="product-card" key={_id}>
        <Link to={`/product-details/${id}`}>
          <div className="product-card-image">
            <LazyLoad
              once
              placeholder={
                <img
                  src="/assets/images/products-images/loading.jpeg"
                  alt="loading..."
                  className="product-card-image--loading"
                />
              }
            >
              <img src={img} alt={name} loading="lazy" />
            </LazyLoad>
          </div>
        </Link>
        <div className="product-card-details">
          <h3 data-testid={_id}>{name}</h3>
          <p className="ratings">
            {rating}
            <BsFillStarFill color="orange" /> ({reviews} reviews)
          </p>
          <div className="price-container">
            <p className="original-price">${original_price}</p>
            <p className="discount-price">${discounted_price}</p>
          </div>
          <p>Genre: {category_name}</p>
          <div className="info">
            {!is_stock && <p className="out-of-stock">Out of stock</p>}
            {trending && <p className="trending">Trending</p>}
          </div>
        </div>
        <div className="product-card-buttons">
          <button
            disabled={cartLoading}
            onClick={() => addToCartHandler(product)}
            className="cart-btn"
          >
            {!inCart ? "Add To Cart" : "Go to Cart"}
          </button>
          <button
            onClick={() => wishlistHandler(product)}
            className="wishlist-btn"
          >
            {WishlistIcon}
          </button>
        </div>
      </div>
    </Tilt>
  );
});
