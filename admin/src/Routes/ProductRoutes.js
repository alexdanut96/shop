import React from "react";
import { Routes, Route } from "react-router-dom";
import Product from "../pages/Product";

const ProductRoutes = () => {
  return (
    <Routes>
      <Route path="details/:id" element={<Product />} />
      <Route path="statistics/:id" element={<Product />} />
    </Routes>
  );
};

export default ProductRoutes;
