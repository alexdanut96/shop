// import "../node_modules/react-bootstrap/dist/react-bootstrap.min.js";
// import "./assets/css/style.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import Cart from "./Pages/Cart";
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import ProductsList from "./Pages/ProductsList";
import { Demo, loadingData } from "./Pages/Demo";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />}></Route>,
        <Route path="/product/:id" element={<Product />}></Route>,
        <Route path="/products/:category" element={<ProductsList />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/demo" element={<Demo />} loader={loadingData}></Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      {/* <Home /> */}
      {/* <Product /> */}
      {/* <Cart /> */}
    </>
  );
};
const Root = () => {
  return (
    <>
      <div>
        <Link to="/">Home</Link>
        <Link to="/product/:id">Product</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/demo">Demo</Link>
        <Link to="/products/:category">ProductsList</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default App;
