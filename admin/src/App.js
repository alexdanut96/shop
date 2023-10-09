import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/Home";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import UserList from "./pages/UserList";
import User from "./pages/User";
import NewUser from "./pages/NewUser";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import NewProduct from "./pages/NewProduct";
import Login from "./pages/Login";
import "./scss/index.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { sidebarActions } from "./Redux/SidebarSlice";

function App() {
  const dispatch = useDispatch();
  dispatch(sidebarActions.hide());
  const admin = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (!admin) {
      navigate("/login");
    }
  }, [admin]);

  return (
    <>
      {admin && admin.isAdmin ? (
        <>
          <Topbar />
          <div className="app-container">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/user/:userId" element={<User />} />
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
}

export default App;