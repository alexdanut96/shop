import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../../ApiRequests";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "../Modal";
import { modalActions } from "../../Redux/ModalSlice";

const UserBilling = () => {
  const [bill, setBill] = useState();
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const token = useSelector((state) => state.user.currentUser.accessToken);
  const refresh = useSelector((state) => state.modal.refresh);
  const dispatch = useDispatch();
  const [selectedBill, setSelectedBill] = useState("");

  const showEditModal = (e) => {
    setSelectedBill(
      bill.address.find((item) => item._id === e.currentTarget.dataset.billId)
    );
    dispatch(modalActions.show());
  };

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
  }, [refresh]);
  console.log(bill);
  return (
    <>
      {selectedBill && (
        <Modal bill={selectedBill} userId={bill.userId} token={token} />
      )}
      <div className="info-billing">
        {bill ? (
          bill.address.map((bill) => {
            return (
              <div key={bill._id} className="billing-container">
                <div className="billing-title">
                  <FmdGoodOutlinedIcon />
                  <div className="billing-title-container">
                    <div className="billing-name">{bill.name}</div>
                    <div className="billing-phoneNumber">
                      +{bill.countryCode}
                      {bill.phoneNumber}
                    </div>
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
                  <div
                    data-bill-id={bill._id}
                    onClick={showEditModal}
                    className="edit-billing-button"
                  >
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
      </div>
    </>
  );
};

export default UserBilling;
