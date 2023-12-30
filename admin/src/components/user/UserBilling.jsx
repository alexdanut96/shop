import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BASE_URL } from "../../ApiRequests";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "../Modal";
import { modalActions } from "../../Redux/ModalSlice";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const UserBilling = () => {
  const [bill, setBill] = useState();
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const token = useSelector((state) => state.user.currentUser.accessToken);
  const refresh = useSelector((state) => state.modal.refresh);
  const showModal = useSelector((state) => state.modal.modal);
  const dispatch = useDispatch();
  const [selectedBill, setSelectedBill] = useState("");

  const deleteBill = (userId, billId) => {
    fetch(`${BASE_URL}billing/${userId}`, {
      method: "DELETE",
      headers: { token: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ billId }),
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
      .then((success) => {
        dispatch(modalActions.refresh());
        return success;
      })
      .then((data) => {
        Swal.fire("Deleted!", data.message, "success");
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

  const showEditModal = (e) => {
    setSelectedBill(
      bill.address.find((item) => item._id === e.currentTarget.dataset.billId)
    );
    dispatch(modalActions.show());
  };

  const showAddModal = () => {
    setSelectedBill(false);
    dispatch(modalActions.show());
  };

  const showRemoveModal = (userId, billId) => {
    Swal.fire({
      title: `Bill ID: ${billId}`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBill(userId, billId);
      }
    });
  };

  useEffect(() => {
    const getUserBillAddress = () => {
      fetch(`${BASE_URL}billing/find/${userId}`, {
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
      <Link to="/users">
        <div className="back-link">
          <ArrowBackIcon />
          Users
        </div>
      </Link>
      {showModal && <Modal bill={selectedBill} userId={userId} token={token} />}
      <div className="info-billing animated">
        <button onClick={showAddModal} className="add-new-bill-address">
          <AddIcon />
          Add billing address
        </button>
        <div className="bill-cards-container">
          {bill ? (
            bill.address.map((address) => {
              return (
                <div key={address._id} className="billing-container animated">
                  <div className="billing-title">
                    <FmdGoodOutlinedIcon />
                    <div className="billing-title-container">
                      <div className="billing-name">{address.name}</div>
                      <div className="billing-phoneNumber">
                        +{address.countryCode}
                        {address.phoneNumber}
                      </div>
                    </div>
                  </div>

                  <div className="billing-address">
                    <div className="billing-address-field">
                      {address.street ? address.street : "-"},
                    </div>

                    <div className="billing-address-field">
                      {address.city ? address.city : "-"}
                    </div>

                    <div className="billing-address-field">
                      {address.postalCode ? address.postalCode : "-"},
                    </div>

                    <div className="billing-address-field">
                      {address.country ? address.country : "-"}
                    </div>
                  </div>
                  <div className="billing-buttons">
                    <div
                      data-bill-id={address._id}
                      onClick={showEditModal}
                      className="edit-button"
                    >
                      <EditIcon />
                    </div>
                    <div
                      onClick={() => showRemoveModal(bill.userId, address._id)}
                      className="delete-button"
                    >
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
        {!bill && <div className="no-billing-title">No billing address!</div>}
      </div>
    </>
  );
};

export default UserBilling;
