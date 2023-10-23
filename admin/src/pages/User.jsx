import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FlagIcon from "@mui/icons-material/Flag";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import PublishIcon from "@mui/icons-material/Publish";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import app from "../Firebase";
import { BASE_URL } from "../ApiRequests";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import CryptoJS from "crypto-js";
import uploadImage from "../images/upload_img.png";

const User = () => {
  const [user, setUser] = useState();
  const [success, setSuccess] = useState(0);
  const token = useSelector((state) => state.user.currentUser.accessToken);
  const location = useLocation();
  const id = location.pathname.split("/")[2];

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
  }, [success]);

  console.log(user);

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
                  setSuccess(success + 1);
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
  return (
    <div className="user-container">
      {user ? (
        <>
          <div className="userTitleContainer">
            <h1 className="userTitle">Edit User</h1>
            <Link to="/newUser">
              <button className="userAddButton">Create</button>
            </Link>
          </div>
          <div className="user-box">
            <div className="userShow">
              <div className="userShowTop">
                <img
                  src={
                    user.profilePicture
                      ? user.profilePicture
                      : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                  }
                  alt=""
                  className="userShowImg"
                />
                <div className="userShowTopTitle">
                  <span className="userShowUsername">{user.username}</span>
                  <span className="userShowUserTitle">Software Engineer</span>
                </div>
              </div>
              <div className="userShowBottom">
                <div className="userShowTitle">Account Details</div>
                <div className="userShowInfo">
                  <PermIdentityIcon className="userShowIcon" />
                  <span className="userShowInfoTitle">{user.username}</span>
                </div>
                <div className="userShowInfo">
                  <CalendarTodayIcon className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    {user.dateOfBirth ? user.dateOfBirth : "-"}
                  </span>
                </div>
                <div className="userShowTitle">Contact Details</div>
                <div className="userShowInfo">
                  <PhoneAndroidIcon className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    {user.phoneNumber ? user.phoneNumber : "-"}
                  </span>
                </div>
                <div className="userShowInfo">
                  <MailOutlineIcon className="userShowIcon" />
                  <span className="userShowInfoTitle">{user.email}</span>
                </div>

                <div className="userShowTitle">Address</div>
                <div className="userShowInfo">
                  {/* <LocationSearchingIcon className="userShowIcon" /> */}
                  <div>Zip code</div>
                  <span className="userShowInfoTitle">
                    {user.address[0]?.postalCode
                      ? user.address[0].postalCode
                      : "-"}
                  </span>
                </div>
                <div className="userShowInfo">
                  {/* <LocationSearchingIcon className="userShowIcon" /> */}
                  <div>Country</div>
                  <span className="userShowInfoTitle">
                    {user.address[0]?.country ? user.address[0].country : "-"}
                  </span>
                </div>
                <div className="userShowInfo">
                  {/* <LocationSearchingIcon className="userShowIcon" /> */}
                  <div>City</div>
                  <span className="userShowInfoTitle">
                    {user.address[0]?.city ? user.address[0].city : "-"}
                  </span>
                </div>
                <div className="userShowInfo">
                  {/* <LocationSearchingIcon className="userShowIcon" /> */}
                  <div>Street</div>
                  <span className="userShowInfoTitle">
                    {user.address[0]?.street ? user.address[0].street : "-"}
                  </span>
                </div>
              </div>
            </div>
            <div className="userUpdate">
              <span className="userUpdateTitle">Edit</span>
              <div className="form-container">
                <form className="newUserForm">
                  <div className="form-group field">
                    {/* Username */}
                    <div className="wrapper">
                      <input
                        type="text"
                        className="form-field username"
                        placeholder="Username"
                        name="username"
                        id="username"
                        required
                      />
                      <label htmlFor="username" className="form-label">
                        {user.username}
                      </label>
                    </div>
                    {/* Email */}
                    <div className="wrapper">
                      <input
                        type="email"
                        className="form-field email"
                        placeholder="Email"
                        name="email"
                        id="email"
                        required
                      />
                      <label htmlFor="email" className="form-label">
                        {user.email}
                      </label>
                    </div>
                    {/* Password */}
                    <div className="wrapper">
                      <input
                        type="password"
                        className="form-field password"
                        placeholder="Password"
                        name="password"
                        id="password"
                        required
                      />
                      <label htmlFor="password" className="form-label">
                        {CryptoJS.AES.decrypt(
                          user.password,
                          process.env.REACT_APP_HPASSWORD
                        ).toString(CryptoJS.enc.Utf8)}
                      </label>
                    </div>
                    {/* Phone Number */}
                    <div className="wrapper">
                      <input
                        type="number"
                        className="form-field phone-number"
                        placeholder="Phone number"
                        name="phone-number"
                        id="phone-number"
                        required
                      />
                      <label htmlFor="phone-number" className="form-label">
                        {user.phoneNumber
                          ? user.phoneNumber
                          : "Phone number (empty)"}
                      </label>
                    </div>
                    {/* Postal code */}
                    <div className="wrapper">
                      <input
                        type="text"
                        className="form-field postal-code"
                        placeholder="Postal-code"
                        name="postal-code"
                        id="postal-code"
                        required
                      />
                      <label htmlFor="postal-code" className="form-label">
                        {user.address[0]?.postalCode
                          ? user.address[0].postalCode
                          : "Postal Code (empty)"}
                      </label>
                    </div>
                    {/* Country */}
                    <div className="wrapper">
                      <input
                        type="text"
                        className="form-field country"
                        placeholder="Country"
                        name="country"
                        id="country"
                        required
                      />
                      <label htmlFor="country" className="form-label">
                        {user.address[0]?.country
                          ? user.address[0].country
                          : "Country (empty)"}
                      </label>
                    </div>
                    {/* City */}
                    <div className="wrapper">
                      <input
                        type="text"
                        className="form-field city"
                        placeholder="City"
                        name="city"
                        id="city"
                        required
                      />
                      <label htmlFor="city" className="form-label">
                        {user.address[0]?.city
                          ? user.address[0].city
                          : "City (empty)"}
                      </label>
                    </div>
                    {/* Street */}
                    <div className="wrapper">
                      <input
                        type="text"
                        className="form-field street"
                        placeholder="Street"
                        name="street"
                        id="street"
                        required
                      />
                      <label htmlFor="street" className="form-label">
                        {user.address[0]?.street
                          ? user.address[0].street
                          : "Street (empty)"}
                      </label>
                    </div>
                  </div>
                </form>
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
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};
export default User;
