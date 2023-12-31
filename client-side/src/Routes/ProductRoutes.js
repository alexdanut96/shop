import React from "react";
import { Routes, Route } from "react-router-dom";
import Product from "../Pages/Product";

const ProductRoutes = () => {
  return (
    <Routes>
      <Route path=":id" element={<Product />} />
    </Routes>
  );
};

export default ProductRoutes;
