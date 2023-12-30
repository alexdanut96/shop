import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

const UserPayment = () => {
  return (
    <div className="info-payments animated">
      <Link to="/users">
        <div className="back-link">
          <ArrowBackIcon />
          Users
        </div>
      </Link>
      <div className="no-payments-title">No payments!</div>
    </div>
  );
};

export default UserPayment;
