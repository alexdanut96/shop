import React from "react";
import { useState, useEffect } from "react";
import { modalActions } from "../Redux/ModalSlice";
import { useSelector, useDispatch } from "react-redux";
import PhoneInput from "react-phone-input-2";
import CloseIcon from "@mui/icons-material/Close";
import { BASE_URL } from "../ApiRequests";
import Swal from "sweetalert2";
import {
  ValidateEmptyValue,
  ValidatePhoneNumber,
  ValidateLength,
} from "../utils/formValidation";

export default function Modal({ bill, userId, token }) {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.modal.modal);
  const [phoneValidationError, setPhoneValidationError] = useState(false);
  const [cityValidationError, setCityValidationError] = useState(false);
  const [countryValidationError, setCountryValidationError] = useState(false);
  const [nameValidationError, setNameValidationError] = useState(false);
  const [postalCodeValidationError, setPostalCodeValidationError] =
    useState(false);
  const [streetValidationError, setStreetValidationError] = useState(false);
  let editedData = {};
  let newData = {};
  if (bill) {
    editedData.billId = bill._id;
  } else {
    newData.userId = userId;
    newData.address = [{}];
  }

  const closeModal = () => {
    dispatch(modalActions.hide());
    setPhoneValidationError(false);
    setCityValidationError(false);
    setCountryValidationError(false);
    setNameValidationError(false);
    setPostalCodeValidationError(false);
    setStreetValidationError(false);
  };

  const validateForm = () => {
    const inputs = document.querySelectorAll("input");
    Array.from(inputs).forEach((input) => {
      if (input.classList.contains("city")) {
        if (!ValidateEmptyValue(input.value)) {
          setCityValidationError("This field is required!");
          return;
        } else {
          setCityValidationError(false);
        }

        if (!ValidateLength(input.value, 2)) {
          setCityValidationError("Minimum 2 characters are allowed!");
          return;
        } else {
          setCityValidationError(false);
        }
        if (bill) {
          editedData.city = input.value;
        } else {
          newData.address[0].city = input.value;
        }
      }

      if (input.classList.contains("country")) {
        if (!ValidateEmptyValue(input.value)) {
          setCountryValidationError("This field is required!");
          return;
        } else {
          setCountryValidationError(false);
        }

        if (!ValidateLength(input.value, 2)) {
          setCountryValidationError("Minimum 2 characters are allowed!");
          return;
        } else {
          setCountryValidationError(false);
        }

        if (bill) {
          editedData.country = input.value;
        } else {
          newData.address[0].country = input.value;
        }
      }

      if (input.classList.contains("form-control")) {
        const phNumber = input.value
          .split(" ")
          .slice(1)
          .join("")
          .replace(/[^\w]/g, "");
        if (!ValidateEmptyValue(phNumber)) {
          setPhoneValidationError("This field is required!");
          return;
        } else {
          setPhoneValidationError(false);
        }

        if (!ValidatePhoneNumber(phNumber)) {
          setPhoneValidationError("Invalid phone number!");
          return;
        } else {
          setPhoneValidationError(false);
        }

        const countryCode = document
          .querySelector(".selected-flag")
          .title.split(" ")
          .slice(-1)[0];

        if (bill) {
          editedData.phoneNumber = phNumber;
          editedData.countryCode = countryCode;
        } else {
          newData.address[0].phoneNumber = phNumber;
          newData.address[0].countryCode = countryCode;
        }
      }

      if (input.classList.contains("name")) {
        if (!ValidateEmptyValue(input.value)) {
          setNameValidationError("This field is required!");
          return;
        } else {
          setNameValidationError(false);
        }

        if (!ValidateLength(input.value, 2)) {
          setNameValidationError("Minimum 2 characters are allowed!");
          return;
        } else {
          setNameValidationError(false);
        }

        if (bill) {
          editedData.name = input.value;
        } else {
          newData.address[0].name = input.value;
        }
      }

      if (input.classList.contains("street")) {
        if (!ValidateEmptyValue(input.value)) {
          setStreetValidationError("This field is required!");
          return;
        } else {
          setStreetValidationError(false);
        }

        if (!ValidateLength(input.value, 5)) {
          setStreetValidationError("Minimum 5 characters are allowed!");
          return;
        } else {
          setStreetValidationError(false);
        }

        if (bill) {
          editedData.street = input.value;
        } else {
          newData.address[0].street = input.value;
        }
      }

      if (input.classList.contains("postalCode")) {
        if (!ValidateEmptyValue(input.value)) {
          setPostalCodeValidationError("This field is required!");
          return;
        } else {
          setPostalCodeValidationError(false);
        }

        if (bill) {
          editedData.postalCode = input.value;
        } else {
          newData.address[0].postalCode = input.value;
        }
      }
    });

    if (bill) {
      if (
        editedData.phoneNumber &&
        editedData.city &&
        editedData.country &&
        editedData.name &&
        editedData.postalCode &&
        editedData.street &&
        editedData.countryCode
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      if (
        newData.address[0].phoneNumber &&
        newData.address[0].city &&
        newData.address[0].country &&
        newData.address[0].name &&
        newData.address[0].postalCode &&
        newData.address[0].street &&
        newData.address[0].countryCode
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  const saveChanges = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    fetch(`${BASE_URL}billing/${userId}`, {
      method: "PUT",
      headers: { token: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(editedData),
    })
      .then((response) => {
        switch (response.status) {
          case 200:
            closeModal();
            Swal.fire({
              icon: "success",
              title: "Bill updated!",
              showConfirmButton: false,
              timer: 1500,
            });
            dispatch(modalActions.refresh());
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
      .catch((error) => {
        console.error(error.message);
        closeModal();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Something went wrong! ${error.message}`,
          footer: '<a href="/">Go back to home page</a>',
        });
      });
  };

  const addNewAddress = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    fetch(`${BASE_URL}billing/new`, {
      method: "POST",
      headers: { token: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    })
      .then((response) => {
        switch (response.status) {
          case 200:
          case 201:
            closeModal();
            Swal.fire({
              icon: "success",
              title: "Bill added to your database!",
              showConfirmButton: false,
              timer: 1500,
            });
            dispatch(modalActions.refresh());
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
      .catch((error) => {
        console.error(error.message);
        closeModal();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Something went wrong! ${error.message}`,
          footer: '<a href="/">Go back to home page</a>',
        });
      });
  };

  return (
    <>
      {showModal && (
        <div className="modal animated">
          <div onClick={closeModal} className="overlay"></div>
          <div className="modal-content">
            <div className="header">
              <div className="modal-title">
                {bill ? "Edit billing address" : "New billing address"}
              </div>
              <button onClick={closeModal} className="close-modal">
                <CloseIcon />
              </button>
            </div>

            {/* Form */}
            <form>
              <div className="form-group field">
                {/* City */}
                <div className="wrapper">
                  <label htmlFor="city" className="form-label">
                    City *
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      className={`form-field city ${
                        cityValidationError ? "error" : ""
                      }`}
                      placeholder="City"
                      name="city"
                      id="city"
                      defaultValue={bill ? bill.city : ""}
                      required
                    />
                  </div>
                  {cityValidationError ? (
                    <div className="city error-message">
                      {cityValidationError}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>

                {/* Phone Number */}
                <div className="wrapper">
                  <label htmlFor="phone-number" className="form-label">
                    Phone Number *
                  </label>
                  <div className="input-wrapper">
                    <PhoneInput
                      inputStyle={{
                        border: `${
                          phoneValidationError ? "1px solid red" : ""
                        }`,
                      }}
                      country={"us"}
                      value={
                        bill ? `${bill.countryCode}${bill.phoneNumber}` : ""
                      }
                      inputProps={{
                        required: true,
                      }}
                    />
                  </div>
                  {phoneValidationError ? (
                    <div className="phoneNumber error-message">
                      {phoneValidationError}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>

                {/* Country */}
                <div className="wrapper">
                  <label htmlFor="country" className="form-label">
                    Country *
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      className={`form-field country ${
                        countryValidationError ? "error" : ""
                      }`}
                      placeholder="Country"
                      name="country"
                      id="country"
                      defaultValue={bill ? bill.country : ""}
                      required
                    />
                  </div>
                  {countryValidationError ? (
                    <div className="country error-message">
                      {countryValidationError}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>

                {/* Name */}
                <div className="wrapper">
                  <label htmlFor="name" className="form-label">
                    Name *
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      className={`form-field name ${
                        nameValidationError ? "error" : ""
                      }`}
                      placeholder="Name"
                      name="name"
                      id="name"
                      defaultValue={bill ? bill.name : ""}
                      required
                    />
                  </div>
                  {nameValidationError ? (
                    <div className="name error-message">
                      {nameValidationError}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>

                {/* Postal code */}
                <div className="wrapper">
                  <label htmlFor="postalCode" className="form-label">
                    Postal code *
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      className={`form-field postalCode ${
                        postalCodeValidationError ? "error" : ""
                      }`}
                      placeholder="Postal code"
                      name="postalCode"
                      id="postalCode"
                      defaultValue={bill ? bill.postalCode : ""}
                      required
                    />
                  </div>
                  {postalCodeValidationError ? (
                    <div className="postalCode error-message">
                      {postalCodeValidationError}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>

                {/* Street */}
                <div className="wrapper">
                  <label htmlFor="street" className="form-label">
                    Street *
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      className={`form-field street ${
                        streetValidationError ? "error" : ""
                      }`}
                      placeholder="Street"
                      name="street"
                      id="street"
                      defaultValue={bill ? bill.street : ""}
                      required
                    />
                  </div>
                  {streetValidationError ? (
                    <div className="street error-message">
                      {streetValidationError}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <button
                onClick={bill ? saveChanges : addNewAddress}
                className="save-changes"
              >
                {bill ? "Save changes" : "Add new address "}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
