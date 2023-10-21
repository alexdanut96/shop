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

const User = () => {
  const [file, setFile] = useState();
  const [user, setUSer] = useState();
  const token = useSelector((state) => state.user.currentUser.accessToken);
  const location = useLocation();

  const id = location.pathname.split("/")[2];

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
          setUSer(data);
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
  }, []);
  console.log(user);

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + "_" + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

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
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
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
                    <img
                      className="userUpdateImg"
                      src={
                        user.profilePicture
                          ? user.profilePicture
                          : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                      }
                      alt=""
                    />
                    <label htmlFor="upload-img">
                      <FileUploadIcon />
                    </label>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="upload-img"
                    />
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
