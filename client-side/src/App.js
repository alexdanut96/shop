import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ProductsRoutes from "./Routes/ProductsRoutes";
import ProductRoutes from "./Routes/ProductRoutes";
import CartRoutes from "./Routes/CartRoutes";
import AuthenticationRoutes from "./Routes/AuthenticationRoutes";
import Pay from "./Pages/Pay";
import ScrollToTop from "./Components/ScrollToTop";
import "./scss/index.scss";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart/*" element={<CartRoutes />} />
        <Route path="/products/*" element={<ProductsRoutes />} />
        <Route path="/product/*" element={<ProductRoutes />} />
        <Route path="/authentication/*" element={<AuthenticationRoutes />} />
        <Route path="/pay" element={<Pay />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
