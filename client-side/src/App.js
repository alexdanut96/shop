// import "../node_modules/react-bootstrap/dist/react-bootstrap.min.js";
// import "./assets/css/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ProductsRoutes from "./Routes/ProductsRoutes";
import ProductRoutes from "./Routes/ProductRoutes";
import CartRoutes from "./Routes/CartRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart/*" element={<CartRoutes />} />
        <Route path="/products/*" element={<ProductsRoutes />} />
        <Route path="/product/*" element={<ProductRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
