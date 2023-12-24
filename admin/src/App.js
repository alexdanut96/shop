import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/Home";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import UserRoutes from "./Routes/UserRoutes";
import NewUser from "./pages/NewUser";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import NewProduct from "./pages/NewProduct";
import Login from "./pages/Login";
import UsersList from "./pages/UsersList";
import "./scss/index.scss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { sidebarActions } from "./Redux/SidebarSlice";

const App = () => {
  const admin = useSelector((state) => state.user.currentUser);
  const isActive = useSelector((state) => state.sidebar.sidebar);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!admin) {
      navigate("/login");
    }
  }, [admin]);

  const hideOverlay = () => {
    dispatch(sidebarActions.hide());
  };

  return (
    <>
      {admin && admin.isAdmin ? (
        <>
          <div
            onClick={hideOverlay}
            className={`window ${isActive ? "active" : ""}`}
          ></div>
          <Topbar />
          <div className="app-container">
            {/* <div className={`window ${isActive ? "active" : ""}`}></div> */}
            <Sidebar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<UsersList />} />
              <Route path="/user/*" element={<UserRoutes />} />
              <Route path="/newUser" element={<NewUser />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route path="/newproduct" element={<NewProduct />} />
              <Route path="/login" element={<Navigate replace to="/" />} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </>
  );
};

export default App;
