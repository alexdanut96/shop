import React from "react";
import { Routes, Route } from "react-router-dom";
import User from "../pages/User";
import NotFound404 from "../pages/NotFound404";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="account/:id" element={<User />} />
      <Route path="billing/:id" element={<User />} />
      <Route path="payment/:id" element={<User />} />
      <Route path="invoices/:id" element={<User />} />
      <Route path="/*" element={<NotFound404 />} />
    </Routes>
  );
};

export default UserRoutes;
