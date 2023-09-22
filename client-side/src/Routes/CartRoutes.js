import React from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "../Pages/Cart";

const CartRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Cart />} />
    </Routes>
  );
};

export default CartRoutes;
