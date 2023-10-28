import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../../ApiRequests";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import EditIcon from "@mui/icons-material/Edit";

const UserBilling = () => {
  const [bill, setBill] = useState();
  const [billSuccess, setBillSuccess] = useState(0);
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const token = useSelector((state) => state.user.currentUser.accessToken);

  useEffect(() => {
    const getUserBillAddress = () => {
      fetch(`${BASE_URL}billing/find/${id}`, {
        method: "GET",
        headers: { token: `Bearer ${token}` },
      })
        .then((response) => {
          switch (response.status) {
            case 200:
              return response.json();

            case 400:
            case 401:
            case 403:
              return response.json().then((error) => {
                throw new Error(error.message);
              });

            default:
              throw new Error(`Please contact the development departament!`);
          }
        })
        .then((bill) => {
          return bill;
        })
        .then((data) => {
          setBill(data);
        })
        .catch((error) => {
          console.error(error.message);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Something went wrong! ${error.message}`,
            footer: '<a href="/">Go back to home page</a>',
          });
        });
    };

    getUserBillAddress();
  }, [billSuccess]);
  console.log(bill);
  return (
    <>
      {bill ? (
        bill.address.map((bill) => {
          return (
            <div key={bill._id} className="billing-container">
              <div className="billing-title">
                <FmdGoodOutlinedIcon />
                <div className="billing-title-container">
                  <div className="billing-name">Burcea Alexandru-Danut</div>
                  <div className="billing-phoneNumber">0767061115</div>
                </div>
              </div>

              <div className="billing-address">
                <div className="billing-address-field">
                  {bill.street ? bill.street : "-"},
                </div>

                <div className="billing-address-field">
                  {bill.city ? bill.city : "-"}
                </div>

                <div className="billing-address-field">
                  {bill.postalCode ? bill.postalCode : "-"},
                </div>

                <div className="billing-address-field">
                  {bill.country ? bill.country : "-"}
                </div>
              </div>
              <div className="billing-buttons">
                <div className="edit-billing-button">
                  <EditIcon />
                </div>
                <div className="delete-billing-button">
                  <DeleteOutlineOutlinedIcon />
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};

export default UserBilling;
