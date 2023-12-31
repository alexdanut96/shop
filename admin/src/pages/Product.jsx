import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ProductDetails from "../components/product/ProductDetails";
import ProductStatistics from "../components/product/ProductStatistics";
import ScrollToTop from "../components/ScrollToTop";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Tooltip from "@mui/material/Tooltip";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const barOptions = [
    { name: "Details", href: `/product/details/${id}` },
    { name: "Statistics", href: `/product/statistics/${id}` },
  ];
  let component;

  switch (location.pathname) {
    case `/product/details/${id}`:
      component = <ProductDetails />;
      break;
    case `/product/statistics/${id}`:
      component = <ProductStatistics />;
      break;
  }
  return (
    <div className="right-side-container">
      <ScrollToTop />
      <div className="product-container">
        <div className="product-title">Product Information</div>

        <div className="product-edit-bar">
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
        {/* <div className="back-link-container">
          <Link to="/products">
            <div className="back-link">
              <ArrowBackIcon />
              Products
            </div>
          </Link>
          <Link to="/newproduct">
            <Tooltip title="Add new product" placement="left" arrow>
              <AddCircleIcon className="newProduct" />
            </Tooltip>
          </Link>
        </div> */}
        <div className="product-box">
          {component}
          {/* <div className="info-billing">{component}</div> */}
        </div>
      </div>
    </div>
  );
};
export default Product;
