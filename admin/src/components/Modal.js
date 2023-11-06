import React from "react";
import { useState, useEffect } from "react";
import { modalActions } from "../Redux/ModalSlice";
import { useSelector, useDispatch } from "react-redux";
import PhoneInput from "react-phone-input-2";

export default function Modal({ bill }) {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.modal.modal);
  const [phoneValidationError, setPhoneValidationError] = useState(false);
  const [cityValidationError, setCityValidationError] = useState(false);
  const [countryValidationError, setCountryValidationError] = useState(false);
  const [nameValidationError, setNameValidationError] = useState(false);
  const [postalCodeValidationError, setPostalCodeValidationError] =
    useState(false);
  const [streetValidationError, setStreetValidationError] = useState(false);

  const closeModal = () => {
    dispatch(modalActions.hide());
  };
  console.log(bill);

  const saveChanges = () => {};

  return (
    <>
      {showModal && (
        <div className="modal">
          <div onClick={closeModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Edit billing address</h2>

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
                      defaultValue={bill.city}
                      required
                    />
                  </div>
                  {cityValidationError ? (
                    <div className="city error-message">
                      This field is required!
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
                        bill.phoneNumber
                          ? `${bill.countryCode}${bill.phoneNumber}`
                          : ""
                      }
                      inputProps={{
                        required: true,
                      }}
                    />
                  </div>
                  {phoneValidationError ? (
                    <div className="phoneNumber error-message">
                      Invalid phone number!
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
                      defaultValue={bill.country}
                      required
                    />
                  </div>
                  {countryValidationError ? (
                    <div className="country error-message">
                      Invalid country!
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
                      defaultValue={bill.name}
                      required
                    />
                  </div>
                  {nameValidationError ? (
                    <div className="name error-message">Invalid name!</div>
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
                      defaultValue={bill.postalCode}
                      required
                    />
                  </div>
                  {postalCodeValidationError ? (
                    <div className="postalCode error-message">
                      Invalid postal code!
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
                      defaultValue={bill.street}
                      required
                    />
                  </div>
                  {streetValidationError ? (
                    <div className="street error-message">Invalid street!</div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <button onClick={saveChanges} className="save-changes">
                Save changes
              </button>
            </form>

            <button onClick={closeModal} className="close-modal">
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
