import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import CryptoJS from "crypto-js";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../ApiRequests";
import { useLocation } from "react-router-dom";
import uploadImage from "../../images/upload_img.png";
import app from "../../Firebase";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  ValidateEmail,
  ValidateEmptyValue,
  ValidatePassword,
  ValidatePhoneNumber,
} from "../../utils/formValidation";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const UserAccount = () => {
  const [user, setUser] = useState();
  const [userSuccess, setUserSuccess] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const token = useSelector((state) => state.user.currentUser.accessToken);
  const location = useLocation();
  const id = location.pathname.split("/")[3];

  //phone number

  const [phoneNumber, setPhoneNumber] = useState("");
  const [validPhoneNumber, setValidPhoneNumber] = useState(true);
  const [usernameValidationError, setUsernameValidationError] = useState(false);
  const [emailValidationError, setEmailValidationError] = useState(false);
  const [passwordValidationError, setPasswordValidationError] = useState(false);
  const [phoneValidationError, setPhoneValidationError] = useState(false);

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

  //phone number

  const saveChanges = (e) => {
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

    fetch(`${BASE_URL}users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        switch (response.status) {
          case 200:
            Swal.fire({
              icon: "success",
              title: "User updated!",
              showConfirmButton: false,
              timer: 1500,
            });
            setUserSuccess(userSuccess + 1);
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

  const addToDatabase = (file) => {
    const fileName = new Date().getTime() + "_" + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadLoading = document.querySelector(".upload-loading");
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        uploadLoading.innerHTML = `${parseInt(progress)}%`;
        switch (snapshot.state) {
          case "paused":
            // console.log("Upload is paused");
            break;
          case "running":
            // console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error}`,
        });
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);

          fetch(`${BASE_URL}users/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              token: `Bearer ${token}`,
            },
            body: JSON.stringify({ profilePicture: downloadURL }),
          })
            .then((response) => {
              switch (response.status) {
                case 200:
                  Swal.fire({
                    icon: "success",
                    title: "Profile picture updated!",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  setUserSuccess(userSuccess + 1);
                  return;
                case 400:
                case 401:
                case 403:
                  return response.json().then((error) => {
                    throw new Error(error.message);
                  });

                default:
                  throw new Error(
                    `Please contact the development departament!`
                  );
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
        });
      }
    );
  };

  const editProfilePicture = () => {
    Swal.fire({
      title: user?.username ? user.username : "",
      text: `${
        user?.profilePicture
          ? "Change or delete the profile picture"
          : "Add profile picture"
      }`,
      imageUrl: `${
        user?.profilePicture
          ? user.profilePicture
          : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
      }`,
      imageAlt: "User avatar",
      showConfirmButton: true,
      showDenyButton: user?.profilePicture ? true : false,
      showCancelButton: true,
      confirmButtonText: user?.profilePicture ? "Change" : "Add",
      denyButtonText: "Delete",
    })
      .then((result) => {
        if (result.isConfirmed === true) {
          Swal.fire({
            html: `<div id="upload-container">
              <label for="input-file" id="drop-area">
                <input type="file" id="input-file" accept="image/*" hidden/>
                <div id="img-view">
                  <img id="uploadImg" src=${uploadImage} alt="avatar"/>
                  <p>Drag and drop or click here<br>to upload image</p>
                </div>
              </label>
              <button disabled class="upload">Save</button>
              <div class="upload-loading">$0%</div>
            </div>
            `,
            showConfirmButton: false,
          });
        }
        return result;
      })
      .then((result) => {
        if (result.isConfirmed === true) {
          const box = document.querySelector("#upload-container");
          const dropArea = document.querySelector("#drop-area");
          const inputFile = document.querySelector("#input-file");
          const imageView = document.querySelector("#img-view");
          const saveBtn = document.querySelector("button.upload");
          const uploadLoading = document.querySelector(".upload-loading");

          const uploadImage = () => {
            let imgLink = URL.createObjectURL(inputFile.files[0]);
            imageView.style.backgroundImage = `url(${imgLink})`;
            imageView.textContent = "";
            saveBtn.disabled = false;
          };

          const uploadUserAvatar = () => {
            const file = inputFile.files[0];
            if (!file) return;
            uploadLoading.style.display = "block";
            addToDatabase(file);
          };

          inputFile.addEventListener("change", uploadImage);

          box.addEventListener("dragover", (e) => {
            e.preventDefault();
            if (e.target.id === "upload-container") {
              dropArea.style.backgroundColor = "#f1f1f9";
              dropArea.style.borderColor = "#aeadad";
            } else {
              dropArea.style.backgroundColor = "#ebebfb";
              dropArea.style.borderColor = "#7e7eff";
            }
          });

          dropArea.addEventListener("dragover", (e) => {
            e.preventDefault();
          });

          dropArea.addEventListener("drop", (e) => {
            e.preventDefault();
            inputFile.files = e.dataTransfer.files;
            uploadImage();
            dropArea.style.backgroundColor = "#f1f1f9";
            dropArea.style.borderColor = "#aeadad";
          });

          saveBtn.addEventListener("click", uploadUserAvatar);
        }
      });
  };

  const showPopup = () => {
    Swal.fire({});
  };

  useEffect(() => {
    const getUser = () => {
      fetch(`${BASE_URL}users/find/${id}`, {
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
        .then((user) => {
          return user;
        })
        .then((data) => {
          if (data.phoneNumber && data.countryCode) {
            setPhoneNumber(`${data.countryCode}${data.phoneNumber}`);
          }
          setUser(data);
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

    getUser();
  }, [userSuccess]);
  console.log(user);

  return (
    <>
      {user ? (
        <div className="userUpdate animated">
          <div className="form-container">
            {/* Form Action */}
            <div className="form-action">
              <div className="profile-picture">
                <div className="img-container">
                  <img
                    className="userUpdateImg"
                    src={
                      user.profilePicture
                        ? user.profilePicture
                        : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                    }
                    alt=""
                  />
                  <div
                    onClick={editProfilePicture}
                    className="editIcon-container"
                  >
                    <EditIcon />
                  </div>
                </div>
              </div>
            </div>

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
                      defaultValue={user.username}
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
                        border: `${
                          phoneValidationError ? "1px solid red" : ""
                        }`,
                      }}
                      country={"us"}
                      value={
                        user.phoneNumber
                          ? `${user.countryCode}${user.phoneNumber}`
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
                      defaultValue={user.email}
                      required
                    />
                  </div>
                  {emailValidationError ? (
                    <div className="email error-message">
                      Invalid email address!
                    </div>
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
                      defaultValue={CryptoJS.AES.decrypt(
                        user.password,
                        process.env.REACT_APP_HPASSWORD
                      ).toString(CryptoJS.enc.Utf8)}
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
                      letter, one uppercase letter, one special character, no
                      space, and it must be 8-16 characters long.
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <button onClick={saveChanges} className="save-changes">
                Save changes
              </button>
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserAccount;
