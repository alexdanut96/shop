import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ProductStatistics = () => {
  return (
    <div className="product-statistics animated">
      <Link to="/products">
        <div className="back-link">
          <ArrowBackIcon />
          Products
        </div>
      </Link>
      <div className="no-statistics-title">No statistics</div>
    </div>
  );
};

export default ProductStatistics;
