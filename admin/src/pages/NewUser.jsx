import Swal from "sweetalert2";
import { BASE_URL } from "../ApiRequests";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import {
  ValidateEmail,
  ValidateEmptyValue,
  ValidatePassword,
  ValidatePhoneNumber,
} from "../utils/formValidation";

const NewUser = () => {
  const [usernameValidationError, setUsernameValidationError] = useState(false);
  const [emailValidationError, setEmailValidationError] = useState(false);
  const [passwordValidationError, setPasswordValidationError] = useState(false);
  const [phoneValidationError, setPhoneValidationError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    const password = document.querySelector(".form-field.password");
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    setShowPassword(!showPassword);
  };

  const validForm = (phNumber, email, username, password) => {
    if (!ValidateEmptyValue(username)) {
      setUsernameValidationError(true);
    } else {
      setUsernameValidationError(false);
    }

    if (!ValidatePhoneNumber(phNumber)) {
      setPhoneValidationError(true);
    } else {
      setPhoneValidationError(false);
    }

    if (!ValidateEmail(email)) {
      setEmailValidationError(true);
    } else {
      setEmailValidationError(false);
    }

    if (!ValidatePassword(password)) {
      setPasswordValidationError(true);
    } else {
      setPasswordValidationError(false);
    }

    if (
      !ValidateEmptyValue(username) ||
      !ValidatePhoneNumber(phNumber) ||
      !ValidateEmail(email) ||
      !ValidatePassword(password)
    ) {
      return false;
    } else {
      return true;
    }
  };

  const addNewUser = (e) => {
    e.preventDefault();

    const phNumber = document
      .querySelector("input[type=tel]")
      .value.split(" ")
      .slice(1)
      .join("")
      .replace(/[^\w]/g, "");
    const email = document.querySelector(".form-field.email").value;
    const username = document.querySelector(".form-field.username").value;
    const password = document.querySelector(".form-field.password").value;
    const countryCode = document
      .querySelector(".selected-flag")
      .title.split(" ")
      .slice(-1)[0];

    if (!validForm(phNumber, email, username, password)) return;

    const data = {
      username: username,
      email: email,
      password: password,
      phoneNumber: phNumber,
      countryCode: countryCode,
    };

    console.log(data);

    fetch(`${BASE_URL}register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        switch (response.status) {
          case 201:
            Swal.fire({
              icon: "success",
              title: "User created!",
              showConfirmButton: false,
              timer: 1500,
            });
            return;
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
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Something went wrong! ${error.message}`,
          footer: '<a href="/">Go back to home page</a>',
        });
      });
  };

  return (
    <div className="newUser-container">
      <div className="newUserTitle">New User</div>
      {/* Form */}
      <form>
        <div className="form-group field">
          {/* Username */}
          <div className="wrapper">
            <label htmlFor="username" className="form-label">
              Username *
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                className={`form-field username ${
                  usernameValidationError ? "error" : ""
                }`}
                placeholder="Username"
                name="username"
                id="username"
                required
              />
            </div>
            {usernameValidationError ? (
              <div className="username error-message">
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
                  border: `${phoneValidationError ? "1px solid red" : ""}`,
                }}
                country={"us"}
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

          {/* Email */}
          <div className="wrapper">
            <label htmlFor="email" className="form-label">
              Email *
            </label>
            <div className="input-wrapper">
              <input
                type="email"
                className={`form-field email ${
                  emailValidationError ? "error" : ""
                }`}
                placeholder="Email"
                name="email"
                id="email"
                required
              />
            </div>
            {emailValidationError ? (
              <div className="email error-message">Invalid email address!</div>
            ) : (
              <></>
            )}
          </div>

          {/* Password */}
          <div className="wrapper">
            <label htmlFor="password" className="form-label">
              Password *
            </label>
            <div className="input-wrapper">
              <input
                type="password"
                className={`form-field password ${
                  passwordValidationError ? "error" : ""
                }`}
                placeholder="Password"
                name="password"
                id="password"
                required
              />
              {showPassword ? (
                <RemoveRedEyeOutlinedIcon
                  onClick={handlePasswordVisibility}
                  className="visibility-icon"
                />
              ) : (
                <VisibilityOffOutlinedIcon
                  onClick={handlePasswordVisibility}
                  className="visibility-icon"
                />
              )}
            </div>
            {passwordValidationError ? (
              <div className="password error-message">
                Password must contain one digit from 1 to 9, one lowercase
                letter, one uppercase letter, one special character, no space,
                and it must be 8-16 characters long.
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <button onClick={addNewUser} className="save-changes">
          Save changes
        </button>
      </form>
    </div>
  );
};
export default NewUser;
