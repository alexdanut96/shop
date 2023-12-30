import React from "react";
import { Routes, Route } from "react-router-dom";
import Product from "../pages/Product";
import NotFound404 from "../pages/NotFound404";

const ProductRoutes = () => {
  return (
    <Routes>
      <Route path="details/:id" element={<Product />} />
      <Route path="statistics/:id" element={<Product />} />
      <Route path="/*" element={<NotFound404 />} />
    </Routes>
  );
};

export default ProductRoutes;
