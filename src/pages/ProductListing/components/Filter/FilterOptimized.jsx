import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { useState, useCallback } from "react";
import "./Filter.css";
import { useData } from "../../../../contexts/DataProvider";
import {
  filterActionTypes,
  initialFilterState,
} from "../../../../reducer/filterReducer";

// Move price ranges to constants to improve maintainability
const PRICE_RANGES = [
  { id: "below-200", label: "Below $200", min: 0, max: 200 },
  { id: "201-999", label: "$201 - $999", min: 201, max: 999 },
  { id: "1000-1999", label: "$1000 - $1999", min: 1000, max: 1999 },
  { id: "above-2000", label: "Over $2000", min: 2000, max: 5000 },
];

// Define sort options as constants
const SORT_OPTIONS = [
  { id: "high-to-low", label: "Price-high to low", value: "highToLow" },
  { id: "low-to-high", label: "Price-low to high", value: "lowToHigh" },
];

const RATING_POINTS = [
  { label: "0", value: 0 },
  { label: "2.5", value: 2.5 },
  { label: "5", value: 5.0 },
];

const { min: minRating, max: maxRating } = RATING_POINTS.reduce(
  (acc, point) => {
    if (point.value < acc.min) {
      acc.min = point.value;
    }
    if (point.value > acc.max) {
      acc.max = point.value;
    }

    return acc;
  },
  { min: 0, max: 0 }, // Initial accumulator values
);

export const Filter = () => {
  const { dispatch, state } = useData();
  const [isFilterMenuOn, setIsFilterMenuOn] = useState(false);

  // Memoize handlers to prevent unnecessary re-renders
  const toggleFilterMenu = useCallback(() => {
    setIsFilterMenuOn((prev) => !prev);
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({
      type: filterActionTypes.RESET,
      payload: initialFilterState,
    });
  }, [dispatch]);

  const handlePriceChange = useCallback(
    (min, max) => {
      dispatch({
        type: filterActionTypes.ADD_PRICE,
        payload: { min, max },
      });
    },
    [dispatch],
  );

  const handleRatingChange = useCallback(
    (e) => {
      dispatch({
        type: filterActionTypes.ADD_RATINGS,
        payload: Number(e.target.value),
      });
    },
    [dispatch],
  );

  const handleCategoryChange = useCallback(
    (e) => {
      dispatch({
        type: filterActionTypes.ADD_CATEGORIES,
        payload: e.target.value,
      });
    },
    [dispatch],
  );

  const handleSortChange = useCallback(
    (e) => {
      dispatch({
        type: filterActionTypes.ADD_SORT,
        payload: e.target.value,
      });
    },
    [dispatch],
  );

  return (
    <>
      <div
        className={`filter-container filter-container-mobile-${isFilterMenuOn ? "open" : "closed"}`}
      >
        <div
          className={`filter-header filter-header-mobile-${isFilterMenuOn ? "open" : "closed"}`}
        >
          <span className="close-tab" onClick={toggleFilterMenu}>
            {isFilterMenuOn ? <RxCross2 /> : <TbAdjustmentsHorizontal />}
          </span>
          <h2>Filters</h2>
          <button
            className={isFilterMenuOn ? "reset-btn" : "reset-btn-hide"}
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>

        <div
          className={`filter-types-container ${isFilterMenuOn ? "filter-types-container-mobile" : ""}`}
        >
          {/* Price Filter Section */}
          <div className="price-container">
            <h3>Price</h3>
            <div className="price-input-container">
              {PRICE_RANGES.map(({ id, label, min, max }) => (
                <label key={id} htmlFor={id}>
                  {label}
                  <input
                    checked={state.filters.price.some(
                      (price) => price.min === min,
                    )}
                    onChange={() => handlePriceChange(min, max)}
                    id={id}
                    type="checkbox"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Ratings Filter Section */}
          <div className="ratings-container ratings-container-mobile">
            <h3>Ratings (min)</h3>
            <div className="input-range">
              <datalist id="markers">
                {RATING_POINTS.map(({ label, value }) => (
                  <option key={value} value={value} label={label}></option>
                ))}
              </datalist>

              <input
                step="0.1"
                onChange={handleRatingChange}
                id="price"
                type="range"
                min={minRating}
                max={maxRating}
                value={state.filters.rating || 0}
              />
            </div>
          </div>

          {/* Categories Filter Section */}
          <div className="category-container">
            <h3>Categories</h3>
            <div className="category-input-container">
              {state.allCategories?.map(({ categoryName }) => (
                <div className="category-input-container" key={categoryName}>
                  <label htmlFor={`category-${categoryName}`}>
                    {`${categoryName}'s wear`}
                    <input
                      checked={state.filters.categories.includes(categoryName)}
                      onChange={handleCategoryChange}
                      value={categoryName}
                      name="category"
                      id={`category-${categoryName}`}
                      type="checkbox"
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Sorting Section */}
          <div className="sorting-container">
            <h3>Sort by price</h3>
            <div className="sorting-input-container">
              {SORT_OPTIONS.map(({ id, label, value }) => (
                <label key={id} htmlFor={id}>
                  {label}
                  <input
                    checked={state.filters.sort === value}
                    onChange={handleSortChange}
                    value={value}
                    name="sort"
                    id={id}
                    type="radio"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
