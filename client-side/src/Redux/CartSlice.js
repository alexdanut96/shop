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
        return JSON.stringify(item._id) === JSON.stringify(action.payload._id);
      });

      console.log(sameProduct);

      if (sameProduct) {
        if (
          sameProduct.selectedColor === action.payload.selectedColor &&
          sameProduct.selectedSize === action.payload.selectedSize
        ) {
          newProduct = {
            ...sameProduct,
            amount: sameProduct.amount + action.payload.amount,
          };
        } else {
          state.quantity += 1;
          state.products.push(action.payload);
          state.total += action.payload.price * action.payload.amount;
        }
        filteredProducts = currentState.filter((item) => {
          return (
            JSON.stringify(item._id) !== JSON.stringify(action.payload._id)
          );
        });

        state.products = [...filteredProducts, newProduct].sort(
          (a, b) => a.listNumber - b.listNumber
        );
      } else {
        state.quantity += 1;
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.amount;
      }

      // console.log(currentState);
      // console.log(action.payload);
      // console.log(sameData);
    },
    modifyOrder(state, action) {
      console.log(action.payload.productId);

      // find product you want to modify
      const currentProduct = state.products.find(
        (item) => item._id === action.payload.productId
      );

      if (action.payload.property === "color") {
        currentProduct.selectedColor = action.payload.selectedColor;
      } else if (action.payload.property === "amount") {
        if (action.payload.amountAction === "increase") {
          currentProduct.amount = currentProduct.amount += 1;
        } else {
          if (currentProduct.amount > 1)
            currentProduct.amount = currentProduct.amount -= 1;
        }
      }

      // recreate the products list in the initial order
      const filteredProducts = state.products.filter(
        (item) => item._id !== currentProduct._id
      );

      state.products = [...filteredProducts, currentProduct].sort(
        (a, b) => a.listNumber - b.listNumber
      );
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
