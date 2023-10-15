import Swal from "sweetalert2";
import { BASE_URL } from "../ApiRequests";
// import { useState, useEffect } from "react";

const NewUser = () => {
  const addNewUser = (e) => {
    e.preventDefault();
    const username = document.querySelector(".form-field.username");
    const email = document.querySelector(".form-field.email");
    const password = document.querySelector(".form-field.password");

    const data = {
      username: username.value,
      email: email.value,
      password: password.value,
    };

    if (!data.username || !data.email || !data.password) return;

    fetch(`${BASE_URL}register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        switch (response.status) {
          case 201:
            return response.json();

          case 400:
            return response.json().then((error) => {
              throw new Error(error.message);
            });

          default:
            throw new Error(`Please contact the development departament!`);
        }
      })
      .then((newUser) => {
        Swal.fire(
          "Success!",
          `${newUser.email} has been added to your Database!`,
          "success"
        );
        username.value = "";
        email.value = "";
        password.value = "";
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
      <form onSubmit={addNewUser} className="newUserForm">
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
              Username
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
              Email
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
              Password
            </label>
          </div>
        </div>
        {/* Checkbox */}
        <div className="checkbox-wrapper-4">
          <input className="inp-cbx" id="morning" type="checkbox" />
          <label className="cbx" htmlFor="morning">
            <span>
              <svg width="12px" height="10px">
                <use href="#check-4"></use>
              </svg>
            </span>
            <span>Is admin</span>
          </label>
          <svg className="inline-svg">
            <symbol id="check-4" viewBox="0 0 12 10">
              <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
            </symbol>
          </svg>
        </div>
        {/* Button */}
        <button className="newUserButton">Create</button>
      </form>
    </div>
  );
};
export default NewUser;
