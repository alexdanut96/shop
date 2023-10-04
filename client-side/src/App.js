import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import ProductsRoutes from "./Routes/ProductsRoutes";
import ProductRoutes from "./Routes/ProductRoutes";
import CartRoutes from "./Routes/CartRoutes";
import AuthenticationRoutes from "./Routes/AuthenticationRoutes";
import Pay from "./Pages/Pay";
import Success from "./Pages/Success";
import ScrollToTop from "./Components/ScrollToTop";
import "./scss/index.scss";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart/*" element={<CartRoutes />} />
        <Route path="/products/*" element={<ProductsRoutes />} />
        <Route path="/product/*" element={<ProductRoutes />} />
        {/* <Route path="/authentication/*" element={<AuthenticationRoutes />} /> */}
        <Route
          path="/authentication/*"
          element={
            user ? <Navigate replace to="/" /> : <AuthenticationRoutes />
          }
        />
        <Route path="/pay" element={<Pay />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
