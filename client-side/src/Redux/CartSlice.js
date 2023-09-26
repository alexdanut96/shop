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
      const sameData = currentState.find((item) => {
        console.log(action.payload);
        console.log(item);
        console.log(item.toString() === action.payload.toString());
        return JSON.stringify(item) === JSON.stringify(action.payload);
      });
      // console.log(currentState);
      // console.log(action.payload);
      // console.log(sameData);

      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.amount;
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
