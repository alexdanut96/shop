import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

const UserInvoices = () => {
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
      <div className="info-invoices animated">
        <div className="no-invoices-title">No invoices!</div>
      </div>
    </>
  );
};

export default UserInvoices;
