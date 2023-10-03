import React from "react";
import { Routes, Route } from "react-router-dom";
import Authentication from "../Pages/Authentication";

const AuthenticationRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Authentication />} />
    </Routes>
  );
};

export default AuthenticationRoutes;
