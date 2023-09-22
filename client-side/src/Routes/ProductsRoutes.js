import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductsList from "../Pages/ProductsList";

const ProductsRoutes = () => {
  return (
    <Routes>
      <Route path=":category" element={<ProductsList />} />
    </Routes>
  );
};

export default ProductsRoutes;
