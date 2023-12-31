import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

const UserPayment = () => {
  return (
    <>
      <div className="back-link-container">
        <Link to="/users">
          <div className="back-link">
            <ArrowBackIcon />
            Users
          </div>
        </Link>
      </div>
      <div className="info-payments animated">
        <div className="no-payments-title">No payments!</div>
      </div>
    </>
  );
};

export default UserPayment;
