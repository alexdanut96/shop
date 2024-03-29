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
import NotFound404 from "./pages/NotFound404";
import "./scss/index.scss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { sidebarActions } from "./Redux/SidebarSlice";
import checkAdmin from "./utils/checkAdmin";
import { userActions } from "./Redux/UserSlice";

const App = () => {
  const user = useSelector((state) => state.user);
  // const [admin, setAdmin] = useState(false);
  const isActive = useSelector((state) => state.sidebar.sidebar);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAdminValue = async () => {
      let demo = false;
      if (user.currentUser) {
        demo = await checkAdmin(user.currentUser.accessToken);
        dispatch(userActions.setAdmin(demo));
      } else {
        dispatch(userActions.setAdmin(false));
      }
    };

    getAdminValue();
  }, [user]);

  const hideOverlay = () => {
    dispatch(sidebarActions.hide());
  };

  return (
    <>
      {user.currentUser && user.isAdmin ? (
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
              //404
              <Route path="/*" element={<NotFound404 />} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Navigate replace to="/login" />} />
        </Routes>
      )}
    </>
  );
};

export default App;
