import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    listNumber: 0,
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct(state, action) {
      const currentState = JSON.parse(JSON.stringify(state.products));
      let newProduct;
      let filteredProducts;
      const sameProduct = currentState.find((item) => {
        return (
          JSON.stringify(item._id) === JSON.stringify(action.payload._id) &&
          JSON.stringify(item.selectedColor) ===
            JSON.stringify(action.payload.selectedColor) &&
          JSON.stringify(item.selectedSize) ===
            JSON.stringify(action.payload.selectedSize)
        );
      });

      if (sameProduct) {
        newProduct = {
          ...sameProduct,
          amount: sameProduct.amount + action.payload.amount,
        };
        filteredProducts = currentState.filter((item) => {
          if (JSON.stringify(item._id === JSON.stringify(action.payload._id))) {
            return (
              JSON.stringify(item.selectedColor) !==
                JSON.stringify(action.payload.selectedColor) ||
              JSON.stringify(item.selectedSize) !==
                JSON.stringify(action.payload.selectedSize)
            );
          }
        });

        state.products = [...filteredProducts, newProduct].sort(
          (a, b) => a.listNumber - b.listNumber
        );
      } else {
        state.quantity += 1;
        state.products.push(action.payload);
      }
      let totalPrice = 0;
      JSON.parse(JSON.stringify(state.products)).forEach(
        (item) => (totalPrice += item.amount * item.price)
      );
      state.total = totalPrice;
    },

    modifyOrder(state, action) {
      const currentState = JSON.parse(JSON.stringify(state.products));

      // find product you want to modify
      const currentProduct = currentState.find(
        (item) =>
          JSON.stringify(item._id) ===
            JSON.stringify(action.payload.productId) &&
          JSON.stringify(item.selectedColor) ===
            JSON.stringify(action.payload.productColor) &&
          JSON.stringify(item.selectedSize) ===
            JSON.stringify(action.payload.productSize)
      );

      if (action.payload.amountAction === "increase") {
        currentProduct.amount = currentProduct.amount += 1;
      } else {
        if (currentProduct.amount > 1)
          currentProduct.amount = currentProduct.amount -= 1;
      }

      // recreate the products list in the initial order
      const filteredProducts = currentState.filter((item) => {
        if (
          JSON.stringify(item._id === JSON.stringify(action.payload.productId))
        ) {
          return (
            JSON.stringify(item.selectedColor) !==
              JSON.stringify(action.payload.productColor) ||
            JSON.stringify(item.selectedSize) !==
              JSON.stringify(action.payload.productSize)
          );
        }
      });

      state.products = [...filteredProducts, currentProduct].sort(
        (a, b) => a.listNumber - b.listNumber
      );

      let totalPrice = 0;
      JSON.parse(JSON.stringify(state.products)).forEach(
        (item) => (totalPrice += item.amount * item.price)
      );
      state.total = totalPrice;
    },

    removeFromCart(state, action) {
      const currentState = JSON.parse(JSON.stringify(state.products));

      // find product you want to remove
      const currentProduct = currentState.find(
        (item) =>
          JSON.stringify(item._id) ===
            JSON.stringify(action.payload.productId) &&
          JSON.stringify(item.selectedColor) ===
            JSON.stringify(action.payload.productColor) &&
          JSON.stringify(item.selectedSize) ===
            JSON.stringify(action.payload.productSize)
      );

      const filteredProducts = currentState.filter(
        (item) => JSON.stringify(item) !== JSON.stringify(currentProduct)
      );

      state.products = [...filteredProducts].sort(
        (a, b) => a.listNumber - b.listNumber
      );

      state.quantity -= 1;
      let totalPrice = 0;
      JSON.parse(JSON.stringify(state.products)).forEach(
        (item) => (totalPrice += item.amount * item.price)
      );
      state.total = totalPrice;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
