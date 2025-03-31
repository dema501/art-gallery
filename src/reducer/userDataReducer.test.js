import { userDataReducer, initialUserData } from "./userDataReducer";

describe("userDataReducer", () => {
  it("should return the initial state", () => {
    expect(userDataReducer(undefined, {})).toEqual(initialUserData);
  });

  it("should handle SET_CART", () => {
    const payload = [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ];
    const action = { type: "SET_CART", payload };
    const expectedState = { ...initialUserData, cartProducts: payload };
    expect(userDataReducer(initialUserData, action)).toEqual(expectedState);
  });

  it("should handle SET_ADDRESS", () => {
    const payload = [
      { id: 1, street: "Street 1" },
      { id: 2, street: "Street 2" },
    ];
    const action = { type: "SET_ADDRESS", payload };
    const expectedState = { ...initialUserData, addressList: payload };
    expect(userDataReducer(initialUserData, action)).toEqual(expectedState);
  });

  it("should handle SET_WISHLIST", () => {
    const payload = [
      { id: 1, name: "Wishlist Product 1" },
      { id: 2, name: "Wishlist Product 2" },
    ];
    const action = { type: "SET_WISHLIST", payload };
    const expectedState = { ...initialUserData, wishlistProducts: payload };
    expect(userDataReducer(initialUserData, action)).toEqual(expectedState);
  });

  it("should handle SET_ORDER", () => {
    const payload = { cartItemsTotal: "100", orderId: "order123" };
    const action = { type: "SET_ORDER", payload };
    const expectedState = {
      ...initialUserData,
      orderDetails: { ...initialUserData.orderDetails, ...payload },
    };
    expect(userDataReducer(initialUserData, action)).toEqual(expectedState);
  });

  it("should handle SET_ORDERS", () => {
    const payload = {
      orderId: "order123",
      items: [{ id: 1, name: "Product 1" }],
    };
    const action = { type: "SET_ORDERS", payload };
    const expectedState = { ...initialUserData, orders: [payload] };
    expect(userDataReducer(initialUserData, action)).toEqual(expectedState);

    // Test adding another order
    const secondPayload = {
      orderId: "order456",
      items: [{ id: 2, name: "Product 2" }],
    };
    const secondAction = { type: "SET_ORDERS", payload: secondPayload };
    const secondExpectedState = {
      ...expectedState,
      orders: [...expectedState.orders, secondPayload],
    };
    expect(userDataReducer(expectedState, secondAction)).toEqual(
      secondExpectedState,
    );
  });

  it("should handle default case (return current state)", () => {
    const action = { type: "UNKNOWN_ACTION" };
    expect(userDataReducer(initialUserData, action)).toEqual(initialUserData);
  });
});
