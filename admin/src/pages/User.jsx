import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import UserAccount from "../components/user/UserAccount";
import UserBilling from "../components/user/UserBilling";
import UserPayment from "../components/user/UserPayment";
import UserInvoices from "../components/user/UserInvoices";
import ScrollToTop from "../components/ScrollToTop";

const User = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const barOptions = [
    { name: "Account", href: `/user/account/${id}` },
    { name: "Billing", href: `/user/billing/${id}` },
    { name: "Payment", href: `/user/payment/${id}` },
    { name: "Invoices", href: `/user/invoices/${id}` },
  ];
  let component;

  switch (location.pathname) {
    case `/user/account/${id}`:
      component = <UserAccount />;
      break;
    case `/user/billing/${id}`:
      component = <UserBilling />;
      break;
    case `/user/payment/${id}`:
      component = <UserPayment />;
      break;
    case `/user/invoices/${id}`:
      component = <UserInvoices />;
      break;
  }

  return (
    <div className="right-side-container">
      <ScrollToTop />
      <div className="user-container">
        <div className="title">User Information</div>

        <div className="user-edit-bar">
          {barOptions.map((option) => {
            return (
              <NavLink
                key={option.name}
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#0d6efd" : "",
                    borderBottom: isActive ? "2px solid #0d6efd" : "",
                  };
                }}
                to={option.href}
              >
                {option.name}
              </NavLink>
            );
          })}
        </div>
        <div className="user-box">
          {component}
          {/* <div className="info-billing">{component}</div> */}
        </div>
      </div>
    </div>
  );
};
export default User;
