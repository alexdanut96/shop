import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/Home";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import UserRoutes from "./Routes/UserRoutes";
import ProductRoutes from "./Routes/ProductRoutes";
import NewUser from "./pages/NewUser";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import NewProduct from "./pages/NewProduct";
import Login from "./pages/Login";
import UsersList from "./pages/UsersList";
import Analytics from "./pages/Analytics";
import Sales from "./pages/Sales";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";
import Mail from "./pages/Mail";
import Feedback from "./pages/Feedback";
import Messages from "./pages/Messages";
import StaffAnalytics from "./pages/StaffAnalytics";
import StaffManage from "./pages/StaffManage";
import StaffReports from "./pages/StaffReports";
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
              // DASHBOARD
              <Route path="/" element={<Home />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/sales" element={<Sales />} />
              // QUICK MENU
              <Route path="/users" element={<UsersList />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/reports" element={<Reports />} />
              // NOTIFICATIONS
              <Route path="/mail" element={<Mail />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/messages" element={<Messages />} />
              // Staff
              <Route path="/staff-manage" element={<StaffManage />} />
              <Route path="/staff-analytics" element={<StaffAnalytics />} />
              <Route path="/staff-reports" element={<StaffReports />} />
              // REST
              <Route path="/user/*" element={<UserRoutes />} />
              <Route path="/product/*" element={<ProductRoutes />} />
              <Route path="/newUser" element={<NewUser />} />
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
